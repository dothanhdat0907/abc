﻿const MAX_RETRY_TIMEOUT = 10000; // in ms.
const VIDEO_STUCK_CHECK_TIMEOUT = 2000; // in ms.
const NO_VIDEO_TIMEOUT = 3000; // in ms.
const VIDEO_PLAYER_STUCK_TIMEOUT = 5000; // in ms
const SHOW_LOG = false; // Flag that turns logging on/off
const SUPPORTED_CODECS = ['H264']; // List of supported codecs
const SUPPORTED_STREAM_TYPES = ['FragmentedMP4']; // List of supported stream types
const MAX_RESTARTS_ON_VIDEO_STUCK = 1; // Maximum number of restarts for a given time controlled by the Web Component

/**
 * This class handles the fallback logic for DirectStreaming
 * 
 * @param   videoPlayer     object      Reference to video player component
 */
export default class Fallback {
    constructor(videoPlayer, restartCount = 0) {
        this.fallback = () => { };
        this.onClearVideoStuck = () => { };
        this.onStartVideoStuck = () => { };
        this.onRestartStream = () => { };

        this.videoPlayer = videoPlayer;
        this.videoPlayer.videoElement.addEventListener('waiting', this.onVideoWaiting.bind(this));
        this.videoPlayer.videoElement.addEventListener('canplay', this.onCanPlay.bind(this), false);

        this.lastFragment = null;
        this.videoCurrentTime = 0;
        this.restartCount = restartCount;
        this.lastFragmentReceiveTime = null;
        this.fragmentCountTimeout = null;
        this.noVideoTimeout = null;
        this.onStuckVideoPlayerTimeout = null;

        SHOW_LOG && console.log('Fallback controller initilized');
    }

    /**
     * This method is called each time when new fragment is received.
     * It monitors the network and checks if the video player have stucked
     * 
     * @param {object} fragment  
     */
    addFragment(fragment) {
        this.lastFragment = fragment;
        this.lastFragmentReceiveTime = Date.now();
        SHOW_LOG && console.log('Received fragment with size: ' + fragment.dataSize);
        this.resetFragmentCountTimeout();
        this.videoPlayer.isVideoStuck = this.checkVideoStuck();
    }

    /**
     * This method calculates if the video player is stucked or not.
     */
    checkVideoStuck() {
        let isVideoStuck = false;

        if (this.noVideoTimeout) {
            clearTimeout(this.noVideoTimeout);
            this.noVideoTimeout = null;
        }

        if (!this.videoCurrentTimeTimeStamp) {
            this.videoCurrentTimeTimeStamp = Date.now();
            return isVideoStuck;
        }

        let dateNow = Date.now();

        if (this.videoCurrentTime != this.videoPlayer.videoElement.currentTime) {
            this.videoCurrentTime = this.videoPlayer.videoElement.currentTime;
            this.videoCurrentTimeTimeStamp = dateNow;
            this.onClearVideoStuck();
            if (this.onStuckVideoPlayerTimeout) {
                clearTimeout(this.onStuckVideoPlayerTimeout);
                this.onStuckVideoPlayerTimeout = null;
            }
        }
        else if (dateNow - this.videoCurrentTimeTimeStamp > MAX_RETRY_TIMEOUT) {
            SHOW_LOG && console.error('Falling back because the video player is stuck for more than : ' + MAX_RETRY_TIMEOUT / 1000 + ' s.');
            isVideoStuck = true;
            this.fallback();
            return;
        }
        // video data received from server but player is stuck
        else if (dateNow - this.videoCurrentTimeTimeStamp > VIDEO_STUCK_CHECK_TIMEOUT) {
            this.onStartVideoStuck();
            if (!this.onStuckVideoPlayerTimeout) {
                this.onStuckVideoPlayerTimeout = setTimeout(() => {
                    if (this.restartCount >= MAX_RESTARTS_ON_VIDEO_STUCK) {
                        SHOW_LOG && console.error('Falling back because the video player has been restarted more than : ' + MAX_RESTARTS_ON_VIDEO_STUCK + ' time(s) for a specific time.');
                        this.fallback();
                        return;
                    } else {
                        SHOW_LOG && console.log('Restarting the player because video data received from server but player is stuck');
                        this.onRestartStream();
                    }
                }, VIDEO_PLAYER_STUCK_TIMEOUT);
            }
        }

        // No video data received from server
        this.noVideoTimeout = setTimeout(() => {
            this.onStartVideoStuck();
            this.onRestartStream();
        }, VIDEO_STUCK_CHECK_TIMEOUT);

        return isVideoStuck;
    }

    /**
     * This checks if the fragment receveid for DirectStreaming is supported or not.
     * In case that it is not supported it will trigger an fallback.
     * 
     * @param {object} fragment
     */
    isDataTypeSupported(fragment) {
        let supportedDataType;
        if(fragment.stream)
        {
            const dataType = fragment.stream.dataType;
            supportedDataType = SUPPORTED_CODECS.indexOf(dataType) > -1;
            if (!supportedDataType) {
                this.fallback();
                SHOW_LOG && console.error('DirectStreaming is not supported for codec: ' + dataType);
            }
        }
        return supportedDataType;
    }

    /**
     * Checks if the stream is DirectStreaming or not. It received the data from the RequestStream repond
     * 
     * @param {string} streamType
     */
    isDirectStreaminigSupported(streamType) {
        let supportedStream = SUPPORTED_STREAM_TYPES.indexOf(streamType) > -1;
        if (!supportedStream) {
            this.fallback();
            SHOW_LOG && console.error('DirectStreaming is not supported for stream type: ' + streamType);
        }
        SHOW_LOG && console.warn(streamType + ' supported: ' + supportedStream);
        return supportedStream;
    }

    /**
     * Fallback if there is any exception while adding data to the source buffer.
     * 
     * @param {exception} exception
     */
    codeException(exception) {
        SHOW_LOG && console.error('Exception: ' + exception);
    }

    /**
     * This method monitor video player and triger a timeout that
     * will be executed if there is no video for some time:NO_VIDEO_TIMEOUT
     * 
     * @param {object} event
     */
    onVideoWaiting(event) {
        this.resetFragmentCountTimeout();
        let playedBefore = this.videoPlayer.videoElement.played.length ? this.videoPlayer.videoElement.played.end(0) : 0;
        let bufferedBefore = this.videoPlayer.videoElement.buffered.length ? this.videoPlayer.videoElement.buffered.end(0) : 0;

        SHOW_LOG && console.log('Video player is waiting for data.');
        this.fragmentCountTimeout = setTimeout(() => {
            let playedAfter = this.videoPlayer.videoElement.played.length ? this.videoPlayer.videoElement.played.end(0) : 0;
            let bufferedAfter = this.videoPlayer.videoElement.buffered.length ? this.videoPlayer.videoElement.buffered.end(0) : 0;

            if (playedBefore === playedAfter && bufferedBefore === bufferedAfter && Date.now() - this.lastFragmentReceiveTime < NO_VIDEO_TIMEOUT * 80 / 100) {
                this.fallback();
                SHOW_LOG && console.error('Video is waiting for more than ' + NO_VIDEO_TIMEOUT / 1000 + ' seconds');
            }
        }, NO_VIDEO_TIMEOUT);
    }

    /**
     * This method will executed when the video can be played and will reset the timeout,
     * which monitor the netowrk
     */
    onCanPlay() {
        this.resetFragmentCountTimeout();
    }

    /**
     * This method will executed when the video can be played and will reset the timeout,
     * which monitor the netowrk
     */
    resetFragmentCountTimeout() {
        if (this.fragmentCountTimeout) {
            clearTimeout(this.fragmentCountTimeout);
            this.fragmentCountTimeout = null;
        }
    }

    /**
     * This method is the actual fallback. It notify the parent class that we are doing a fallback
     * and reset it state.
     */
    destroy() {
        SHOW_LOG && console.log('Fallback component is destroyed.');

        this.fallback = () => { };
        this.onClearVideoStuck = () => { };
        this.onStartVideoStuck = () => { };
        this.onRestartStream = () => { };
        this.lastFragment = null;
        this.onStuckVideoPlayerTimeout = null;
        this.resetFragmentCountTimeout();

        if (this.noVideoTimeout) {
            clearTimeout(this.noVideoTimeout);
            this.noVideoTimeout = null;
        }
    }
}