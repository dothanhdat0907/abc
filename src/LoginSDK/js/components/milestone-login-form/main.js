import LoginFormTemplate from './js/template.js';

const moduleName = 'milestone-login-form';

export default class LoginFormModule extends HTMLElement {
  constructor() {
    super(name);
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = new LoginFormTemplate(moduleName).get();
    this.shadow.appendChild(template.content.cloneNode(true));
    this.shadow.getElementById('loginButton').addEventListener('click', this.onLoginButtonClick.bind(this))
  }

  onLoginButtonClick(e) {
    XPMobileSDK.addObserver({
      connectionDidConnect: this.onSDKConnect.bind(this),
      connectionDidLogIn: this.onSDKLogin.bind(this)
    });
    XPMobileSDK.connect();
  }

  onSDKConnect() {
    XPMobileSDK.login(this.shadow.getElementById('username').value, this.shadow.getElementById('password').value);
  }

  onSDKLogin() {
    this.shadow.getElementById(moduleName).classList.add('hidden');
    alert('Logged in!')
  }

}

window.customElements.define('milestone-login-form', LoginFormModule);
