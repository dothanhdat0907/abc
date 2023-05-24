const CONTROLLER_PLAY = 1;
const CONTROLLER_PAUSE = 0;
var _isLoginedMilestoneSystem = false;

var controllers = [];
var connectionLive = []

window.StreamVideoMilestone = function (cam_pos, device_id, image_width, image_heigth, start_time, end_time, timeout=10)
{
  var controller_id = '';
  var control;
  // Check if not logined
  if(!_isLoginedMilestoneSystem)
  {
    if(timeout <= 0)
    {
      DisplayNotAvailableError(cam_pos);
    }
    else
    {
      setTimeout(StreamVideoMilestone(cam_pos, device_id, image_width, image_heigth, start_time, end_time, timeout-1), 5000);
    }
    console.error("Need logined Milestone system before");
    return;
  }

  var controller_info = controllers.find(element => element.cam_pos === cam_pos);
  if(controller_info != undefined)
  {
    console.error("A video is playing in " +  cam_pos);
    return;
  }
  controller_info = {
    cam_pos: cam_pos,
    device_id: device_id,
    start_time: start_time,
    end_time: end_time,
    is_playing: false,
    connection: null,
    control: null,
    controller_id: null,
  }
  
  // create controller for video
  CreateControllerPlayback(start_time, cam_pos);

  function CreateControllerPlayback(start_time){
    XPMobileSDK.createPlaybackController(
      {
        SeekType: 'Time',
        Time: start_time,
        CloseOldControllers: 'No',
      },
      createControllerSuccessCallback,
      createControllerErrorCallback,
    );
  }

  function createControllerSuccessCallback(connection) 
  {
    controller_id = connection.response.parameters.PlaybackControllerId;
    controller_info.controller_id = controller_id;
    var videoConnectionObserver = {
      videoConnectionTemporaryDown: function(e) {
        DisplayBrokenError(cam_pos);
        controller_id = '';
      },
      videoConnectionRecovered: function() {
        DisplayBrokenError(cam_pos);
        controller_id = '';
      },
      videoConnectionNotAvailable: function() {
        DisplayBrokenError(cam_pos);
        controller_id = '';
      },
    };

    if (connection.getState() == XPMobileSDK.library.VideoConnectionState.notOpened) {
      connection.open();
      control = new Controls(controller_id);
      connection.addObserver(videoConnectionObserver);
      createButton(cam_pos)
      raiseDisplayVideo(cam_pos, device_id);
      controller_info.control = control;
      controller_info.connection = connection;
    }
    controllers.push(controller_info); // push to global variable
  }

  function createControllerErrorCallback(error) 
  {
    DisplayBrokenError(cam_pos);
  }

  function raiseDisplayVideo(cam_pos, device_id)
  {
    // Create HTML for display
    var wrapper = document.getElementById("stream-container-" + cam_pos);
    var container = document.createElement('div');
    container.setAttribute('id', 'container' + device_id);
    container.setAttribute('class', 'camera');
    var canvasElement = document.createElement('canvas');
    canvasElement.setAttribute('cam_pos', cam_pos);
    container.appendChild(canvasElement);
    container.addEventListener('PlayVideo', PlayVideo);
    if(wrapper)
    {
      wrapper.innerHTML = '';
      wrapper.appendChild(container);
    }

    var event = new CustomEvent('PlayVideo', {
      detail: {
        'cam_pos': cam_pos
      }
    });
    container.dispatchEvent(event);
  }

  function createButton(cam_pos)
  {
    
    var button = document.getElementsByClassName('button');
    control = new Controls(controller_info.controller_id);
    var playBtn = document.createElement('button')
    playBtn.innerHTML = 'Play'
    playBtn.addEventListener('click', control.play);
    button[0].appendChild(playBtn)  
    var pauseBtn = document.createElement('button')
    pauseBtn.innerHTML = 'Pause'
    pauseBtn.addEventListener('click', control.pause);
    button[0].appendChild(pauseBtn) 
  }

  function Controls(controller_id) {
    this.play = function() {
      XPMobileSDK.changeMultipleStreams(
        {
          PlaybackControllerId: controller_id,
          Speed: CONTROLLER_PLAY,
        },
        function(parameters) {
          console.error("CONTROLLER_PLAY");
        },
      );
      console.log("CONTROLLER_PLAY");
    };
  
    this.pause = function() {
      XPMobileSDK.changeMultipleStreams(
        {
          PlaybackControllerId: controller_id,
          Speed: CONTROLLER_PAUSE,
        },
        function(parameters) {
          console.error("CONTROLLER_PAUSE");
        },
      );
      console.log("CONTROLLER_PAUSE");
    };
  
    this.goToTime = function(timestamp) {
      XPMobileSDK.changeMultipleStreams(
        {
          PlaybackControllerId: controller_id,
          SeekType: 'Time',
          Time: timestamp,
        },
        function(parameters) {
          console.error("CONTROLLER_GO_TO_TIME");
        },
      );
      console.log("CONTROLLER_GO_TO_TIME");
    };
  }

  function PlayVideo(event)
  {
    var container = event.target;
    var cam_pos = event.detail.cam_pos;
    if (event.currentTarget.classList.contains("pauseButton")) {
        var Id = event.currentTarget.parentNode.parentNode.id.replace('container', '');
    }
    else {
        var Id = event.currentTarget.id.replace('container', '');
    }
    var canvas = document.querySelector("#container" + Id + ' canvas' + '[cam_pos=' + cam_pos + ']');
    var canvasContext = canvas.getContext('2d');
  
    var image = document.createElement('img');
    image.addEventListener('load', onImageLoad);
    image.addEventListener('error', onImageError);
    var imageURL;
    var drawing = false;
  
    var videoConnectionObserver = {
      videoConnectionReceivedFrame: videoConnectionReceivedFrame,
      videoConnectionFailed: requestStreamErrorCallback,
    }
  
    XPMobileSDK.library.Connection.webSocketBrowser = false;
    /**
     * Requesting a video stream. 
     */
    XPMobileSDK.RequestStream(RequestStreamParams(Id, 'Playback', controller_id, image_width, image_heigth), requestStreamSuccessedCallback, requestStreamErrorCallback );
  
    /**
     * Video stream request callback 
     */
    function requestStreamSuccessedCallback(videoConnection) 
    {
      videoConnection.addObserver(videoConnectionObserver);
      videoConnection.open();
      if(container)
      {
        if(container.parentNode)
        {
          container.parentNode.setAttribute('video_id', videoConnection.videoId);
        }
      }
    }
  
    function requestStreamErrorCallback() 
    {
      DisplayBrokenError(cam_pos);
    }
    
    /**
     * Executed on received frame. 
     */
    function videoConnectionReceivedFrame(frame) {
      if (!drawing && frame.dataSize > 0) 
      {
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
        image.src = imageURL;
        var date = new Date(frame.timestamp);
        if(date.getTime() > (parseInt(end_time)))
        {
          control.pause();
          // control.goToTime(start_time);
          controller_info.is_playing = false;
        }
        if(controller_info.is_playing == false)
        {
          control.play();
          controller_info.is_playing = true;
        }
      }
    }
  
    /**
     * Executed on image load. 
     */
    function onImageLoad(event) {
      var parent_frame_node = canvas.parentNode.parentNode.parentNode;
      if(parent_frame_node  == null)
      {
        return;
      }
      var image_height = 720;
      var image_width = 1440;
      canvas.width = image_width;
      canvas.height = image_height;
      canvasContext.drawImage(image, 0, 0, image_width, image_height);
      console.log(image_width);
      console.log(image_height);
      drawing = false;
    }
  
    function onImageError(event) 
    {
      drawing = false;
      requestStreamErrorCallback();
    }
  }
}








window.StreamLiveMilestone = function (cam_pos, device_id, image_width, image_heigth, timeout=10)
{
  
  // Check if not logined
  if(!_isLoginedMilestoneSystem)
  {
    console.error("Need logined Milestone system before");
    if(timeout <= 0)
    {
      DisplayNotAvailableError(cam_pos);
    }
    else
    {
      setTimeout(StreamLiveMilestone(cam_pos, device_id, image_width, image_heigth, timeout-1), 5000);
    }
    return;
  }
  
  raiseDisplayLive(cam_pos, device_id);

  function raiseDisplayLive(cam_pos, device_id)
  {
    // Create HTML for display
    var wrapper = document.getElementById("stream-container-" + cam_pos);
    var container = document.createElement('div');
    container.setAttribute('id', 'container' + device_id);
    container.setAttribute('class', 'camera');
    var canvasElement = document.createElement('canvas');
    canvasElement.setAttribute('cam_pos', cam_pos);
    container.appendChild(canvasElement);
    container.addEventListener('PlayLive', PlayLive);
    if(wrapper)
    {
      wrapper.innerHTML = '';
      wrapper.appendChild(container);
    }

    var event = new CustomEvent('PlayLive', {
      detail: {
        'cam_pos': cam_pos
      }
    });
    container.dispatchEvent(event);
  }


  function PlayLive(event) 
  {

    var container = event.target;
    var cam_pos = event.detail.cam_pos;
    if (event.currentTarget.classList.contains("pauseButton")) {
        var Id = event.currentTarget.parentNode.parentNode.id.replace('container', '');
    }
    else {
        var Id = event.currentTarget.id.replace('container', '');
    }
    var canvas = document.querySelector("#container" + Id + ' canvas' + '[cam_pos=' + cam_pos + ']');
    
  
    var image = document.createElement('img');
    image.addEventListener('load', onImageLoad);
    image.addEventListener('error', onImageError);
    var imageURL;
    var drawing = false;
  
    var videoConnectionObserver = {
      videoConnectionReceivedFrame: videoConnectionReceivedFrame,
      videoConnectionFailed: requestStreamErrorCallback,
    }
  
    XPMobileSDK.library.Connection.webSocketBrowser = false;
    /**
     * Requesting a video stream. 
     */
    XPMobileSDK.RequestStream(RequestStreamParams(Id, 'Live', '', image_width, image_heigth), requestStreamSuccessedCallback, requestStreamErrorCallback );
  
    /**
     * Video stream request callback 
     */
    function requestStreamSuccessedCallback(videoConnection) 
    {
      videoConnection.addObserver(videoConnectionObserver);
      videoConnection.open();
      connectionLive.push(videoConnection);
      CreateControllerLive();
    }
    

    function CreateControllerLive(start_time){
      XPMobileSDK.createPlaybackController(
        {
        },
        createControllerSuccessCallback,
        createControllerErrorCallback,
      );
    }

    function createControllerSuccessCallback(connection) 
    {
      var videoConnectionObserver = {
        videoConnectionTemporaryDown: function(e) {
          DisplayBrokenError(cam_pos);
        },
        videoConnectionRecovered: function() {
          DisplayBrokenError(cam_pos);
        },
        videoConnectionNotAvailable: function() {
          DisplayBrokenError(cam_pos);
        },
      };

      connection.addObserver(videoConnectionObserver);
      if (connection.getState() == XPMobileSDK.library.VideoConnectionState.notOpened) {
        connection.open();
      }
    }

    function createControllerErrorCallback(error) 
    {
      DisplayBrokenError(cam_pos);
    }
  
    function requestStreamErrorCallback() 
    {
      DisplayBrokenError(cam_pos);
    }
    
    /**
     * Executed on received frame. 
     */
    function videoConnectionReceivedFrame(frame) {
      if (!drawing && frame.dataSize > 0) 
      {
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
        image.src = imageURL;
      }
    }
  
    /**
     * Executed on image load. 
     */
    function onImageLoad(event) {
      if(canvas == null || canvas == undefined)
      {
        document.querySelector("#container" + Id + ' canvas' + '[cam_pos=' + cam_pos + ']');
        return;
      }
      var canvasContext = canvas.getContext('2d');
      var parent_frame_node = canvas.parentNode.parentNode.parentNode;
      if(parent_frame_node  == null)
      {
        return;
      }
      var image_height = parent_frame_node.offsetHeight;
      var image_width = parent_frame_node.offsetWidth;
      canvas.width = image_width;
      canvas.height = image_heigth;
      canvasContext.drawImage(image, 0, 0, image_width, image_height);
      drawing = false;
    }
  
    function onImageError(event) 
    {
      drawing = false;
      requestStreamErrorCallback();
    }
  }
}

window.RequestStreamParams = function(cameraId, signalType, controller_id, image_width, image_height) {
  return {
    CameraId: cameraId,
    DestWidth: image_width,
    DestHeight: image_height,
    SignalType: signalType,
    MethodType: 'Push',
    Fps: 25,
    ComprLevel: 90,
    KeyFramesOnly: 'No',
    RequestSize: 'Yes',
    StreamType: 'Transcoded',
    PlaybackControllerId: controller_id,
  };
};

window.openConnection = function(connection_params) {
  var params = {
    connectionDidLogIn: LoginSuccessCallback, // callback after login success
    url: connection_params.video_url,
    user: connection_params.video_user,
    pass: connection_params.video_pass
  };
  LoginManager.loadAndLogin(params);
};

window.DisplayNotAvailableError = function (cam_pos, time_out = 10)
{
  var container = document.getElementById("stream-container-" + cam_pos);
  if(container != null)
  {
    container.innerHTML = '<center>Hệ thống xem video đang không sẵn sàng!</center>';
  }
  else if(time_out > 0)
  {
    setTimeout(() => {
      window.DisplayNotAvailableError(cam_pos, time_out - 1);
    }, 500);
  }
}

window.DisplayBrokenError = function (cam_pos, time_out = 10)
{
  var container = document.getElementById("stream-container-" + cam_pos);
  if(container != null)
  {
    container.innerHTML = '<center>Hệ thống xem video bị gián đoạn!</center>';
  }
  else if(time_out > 0)
  {
    setTimeout(() => {
      window.DisplayBrokenError(cam_pos, time_out - 1);
    }, 500);
  }
}

// connect to milestone system
// openConnection({video_url:'http://10.0.5.113:8081', video_user: 'dev', video_pass:'12345677'});
// openConnection({video_url:'http://14.177.235.107:8081', video_user: 'dev', video_pass:'12345677'});
openConnection({video_url:'http://10.0.5.113:8081', video_user: 'onvif', video_pass:'onvif'});

function LoginSuccessCallback()
{
  _isLoginedMilestoneSystem = true;
  // Play a video
  StreamVideoMilestone('video', 'a5376af0-125b-4ae1-a6e7-6ed9ffb8f3a4', 1920, 1080, '1684375494079', '1684376499079')
  // cam_pos, device_id, image_width, image_heigth, start_time, end_time
  // StreamVideoMilestone('video', '69c89d53-3237-4c9d-aa00-6bc3a4564c53', 1920, 1080)
  // StreamVideoMilestone('video', '7b2c62d1-3e46-4ad5-869f-d91003df4c59', 1080, 720)
}
