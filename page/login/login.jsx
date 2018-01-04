import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import { ajax } from '../../util/index.js';
import './login.less';
let Login =  class extends Component {
  constructor () {
    super();
    this.state = {
      username: null,
      password: null
    }
  }

  userNameHandler (e) {
    let username = e.target.value;
    this.setState({ username });
  }

  passwordHandler (e) {
    let password = e.target.value;
    this.setState({ password });
  }

  loginHandler () {
    let { username, password } = this.state;

    if ( username && password ) {
      ajax({
        url: 'http://localhost:8333/api/login',
        method: 'post',
        data: { username, password }
      }).then((val) => {
        // debugger
        location.href = 'http://localhost:8333';
      }).catch((err) => {
        console.log(err);
      });
    } else {
      alert('请输入账号密码');
    }
  }

  render () {
    return (
      <div className="login-page">
        <div className="login-title">
          <h3>测试webpack</h3>
        咋不显示呢原来是没写router太二了看看热更新怎么样////
        </div>
      </div>
    )
  }
};



ReactDOM.render(<Login/>,document.getElementById("root"));



