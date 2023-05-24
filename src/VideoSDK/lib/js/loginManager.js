(function (undefined) {
    var loginManager = function (settings) {
        var self = this;

        self.container;
        self.streamsContainer;
        self.loginFormShown;
        self.connectionDidLogIn;
        self.credentials;

        var connectForm,
            loginForm,
            lastObserver,
            audioController,
            microphoneStreaming;

        function connectToServer() {
            // Connect to the desired server (defaults to the current URL)
            url = self.credentials.url;
            XPMobileSDKSettings.MobileServerURL = url;

            if (lastObserver) {
                XPMobileSDK.removeObserver(lastObserver);
            }

            lastObserver = {
                connectionDidConnect: connectionDidConnect,
                connectionDidLogIn: self.connectionDidLogIn
            };

            XPMobileSDK.addObserver(lastObserver);

            XPMobileSDK.connect(url);

        }

        function loginCommand(username, password) {
            XPMobileSDK.login(username, password, {
                SupportsAudioIn: 'Yes',
                SupportsAudioOut: 'Yes'
            });
        }

  

        function normalizeSettings() {
            self.container = settings.container || {};
            self.streamsContainer = settings.streamsContainer || {};
            self.loginFormShown = settings.loginFormShown || function () { };
            self.connectionDidLogIn = settings.connectionDidLogIn || function () { };
            self.credentials = settings.credentials;
        }

        function init() {
            normalizeSettings();

            if (self.credentials) {
                connectionDidConnect = function () {
                    if (self.credentials) {
                        loginCommand(self.credentials.user, self.credentials.pass);
                    }
                };

                setTimeout(connectToServer, 500);

                return;
            }

        }

        function destroy() {
            self.container = null;
            self.streamsContainer = null;
            self.loginFormShown = null;
            self.connectionDidLogIn = null;
            self.credentials = null;
        }

        return {
            init: init,
            destroy: destroy
        };
    };

    loginManager.loadAndLogin = function (params) {
        function loadLoginManager() {
            var loginContainer,
                credentials;

            if (!!params.user && !!params.pass) {
                credentials = {
                    user: params.user,
                    pass: params.pass,
					url:  params.url
                };
            }
            params.loginContainerId = params.loginContainerId || 'login-form-container';

            loginContainer = document.getElementById(params.loginContainerId);

            // You can pass username and password for auto-login (just for simplicity in the sample, otherwise - NOT RECOMMENDED)
            var loginManager = new LoginManager({
                credentials: credentials,
                container: loginContainer,
                connectionDidLogIn: function () {
                    loginManager.destroy();

                    params.connectionDidLogIn();
                }
            });

            loginManager.init();
        }

        LoadMobileSdk(loadLoginManager);
    };
    
    

    window.LoginManager = loginManager;
})();