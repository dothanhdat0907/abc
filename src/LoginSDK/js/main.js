function App () {
  let modules = [
     'js/components/milestone-login-form/main.js'
   ];

   modules.forEach((module) => {
     let modulesScript = document.createElement('script');
     modulesScript.type = "module";
     modulesScript.src = module;
     document.querySelector('head').appendChild(modulesScript);
   });

   var startApp = function () {
       XPMobileSDK.onLoad = () => {};
   }

   let SDKScript = document.createElement('script');
   SDKScript.addEventListener('load', startApp);
   SDKScript.src = './XPMobileSDK/XPMobileSDK.js';

   document.querySelector('head').appendChild(SDKScript);
}

window.addEventListener('load', App);
