(function () {
    // Custom Event polyfill
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

    if (typeof window.CustomEvent === "function") {
        return;
    }

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

function RequestStreamParams(cameraId, signalType) {
    return {
        CameraId: cameraId,
        DestWidth: 600,
        DestHeight: 400,
        SignalType: signalType /*'Live' or 'Playback'*/,
        MethodType: 'Push' /*'Pull'*/,
        Fps: 25, // This doesn't work for Pull mode, but we have to supply it anyway to keep the server happy
        ComprLevel: 71,
        KeyFramesOnly: 'No' /*'Yes'*/, // Server will give only key frame thumb nails. This will reduce FPS
        RequestSize: 'Yes',
        StreamType: 'Transcoded'
    };
}

var Application = new function () {
    this.connectionDidLogIn = connectionDidLogIn;
    var attachContainerClick = true;
	this.image_draw_state = false;
	
    /**
	 * Connection state observing. 
	 */
    function connectionDidLogIn(container, deviceId, doNotAttackOnContainerClick) {
        container = container || document.body;

        if (doNotAttackOnContainerClick) {
            attachContainerClick = false;
        }

		XPMobileSDK.getAllViews(function (items) {
			if (!items) {
				if (typeof window.closeVideoConnection === "function") window.cleanPlaybackController();
				return;
			}

		    for (var i = 0; i < items[0].Items[0].Items[0].Items.length; i++) {
				if (deviceId == items[0].Items[0].Items[0].Items[i]['Id']) {
					buildCameraElement(items[0].Items[0].Items[0].Items[i], container);
					break;
				}
		    }
		});
        return true;
    }

    /**
     * Builds camera element
     */
    function buildCameraElement(item, wrapper) {
        var container = document.createElement('div');
        container.setAttribute('id', 'container' + item.Id);
        container.setAttribute('class', 'camera');

        var canvasElement = document.createElement('canvas');
        container.appendChild(canvasElement);


        container.addEventListener('click', Camera);

        wrapper.appendChild(container);

        var event = new CustomEvent('cameraElementAdded', {
            detail: {
                cameraItem: item,
                cameraContainer: container
            }
        });

        wrapper.dispatchEvent(event);
    };
    
	function Camera(event) {
	    var container = event.target;

	    if (event.currentTarget.classList.contains("pauseButton")) {
	        var Id = event.currentTarget.parentNode.parentNode.id.replace('container', '');
	    }
	    else {
	        var Id = event.currentTarget.id.replace('container', '');
	    }
	    
	    var canvas = document.querySelector("#container" + Id + ' canvas');
	    var canvasContext = canvas.getContext('2d');

	    var image = document.createElement('img');
	    image.addEventListener('load', onImageLoad);
	    image.addEventListener('error', onImageError);
	    var imageURL, videoController;
	    var drawing = false;

	    var videoConnectionObserver = {
	            videoConnectionReceivedFrame: videoConnectionReceivedFrame
	    }

        XPMobileSDK.library.Connection.webSocketBrowser = false;
	    /**
	     * Requesting a video stream. 
	     */
	    var streamRequest = XPMobileSDK.RequestStream(RequestStreamParams(Id, 'Playback'), requestStreamCallback, function (error) { } );


	    /**
	     * Video stream request callback 
	     */
	    function requestStreamCallback(videoConnection) {
	        videoController = videoConnection;
	        videoConnection.addObserver(videoConnectionObserver);
	        videoConnection.open();

	        var event = new CustomEvent('playStream', {
	            detail: {
                    cameraId: Id,
	                videoConnection: videoConnection
	            }
	        });

	        container.parentNode.dispatchEvent(event);
	    }

        document.getElementById('container' + Id).removeEventListener('click', Camera);
	    /**
	     * Executed on received frame. 
	     */
	    function videoConnectionReceivedFrame(frame) {
	        if (!drawing && frame.dataSize > 0) {

	            drawing = true;

	            if (frame.hasSizeInformation) {
	                var multiplier = (frame.sizeInfo.destinationSize.resampling * XPMobileSDK.getResamplingFactor()) || 1;
	                image.width = multiplier * frame.sizeInfo.destinationSize.width;
	                image.height = multiplier * frame.sizeInfo.destinationSize.height;
	            }

	            if (imageURL) {
	                window.URL.revokeObjectURL(imageURL);
	            }

	            imageURL = window.URL.createObjectURL(frame.blob);
	            image.src = imageURL
	        }
	    }

	    /**
	     * Executed on image load. 
	     */
	    function onImageLoad(event) {
	        canvas.width = image.width;
	        canvas.height = image.height;
	        canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);
			var container = document.getElementById('streams-container');
      		var loading_element = document.getElementById('stream-loading-display');
			if(container!= null && loading_element!= null)
			{
				if(canvas.width != 0 && canvas.height != 0)
				{
					container.removeChild(loading_element);
					image_draw_state = true;
				}
			}
      		
	        drawing = false;
	    }

	    function onImageError(event) {

	        drawing = false;
	    }
        
        function getAttachContainerClick(event) {

	        return attachContainerClick;
	    }

		function getDrawState() {
			return this.image_draw_state;
		}

	}
};