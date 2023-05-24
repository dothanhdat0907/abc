const Login = () => {

    const onLoginButtonClick = (e) => {
        XPMobileSDK.addObserver({
          connectionDidConnect: onSDKConnect,
          connectionDidLogIn: onSDKLogin
        });
        XPMobileSDK.connect('http://10.0.5.113:8081');
      }
    
    const onSDKConnect = () => {
        XPMobileSDK.login(this.shadow.getElementById('username').value, this.shadow.getElementById('password').value);
      }
    
    const onSDKLogin = () => {
        this.dispatchEvent(new CustomEvent('login'));
      }
    
    return (

        <div>
            <fieldset>
            <legend>Login</legend>
                <label for="username"></label>
                <input type="text" name="username" id="username" value="" />
                <label for="password">Password</label>
                <input type="password" name="passowrd" value="" id="password" />
                <button onClick={onLoginButtonClick}>Login</button>
            </fieldset>
        </div>     
    )
}

export default Login