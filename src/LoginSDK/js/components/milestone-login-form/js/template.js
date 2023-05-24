export default class LoginTemplate {
  constructor(id) {
    this.template = document.createElement('template');

    this.template.innerHTML =  `
      <style>
          @import "/js/components/${id}/css/main.css";
      </style>
      <div id="${id}">
        <fieldset>
          <legend>Login</legend>
            <label for="username"></label>
            <input type="text" name="username" id="username" value="" />
            <label for="password">Password</label>
            <input type="password" name="passowrd" value="" id="password" />
            <button type="button" name="button" id="loginButton">Login</button>
        </fieldset>
      </div>`;
  }

  get() {
    return this.template;
  }
}
