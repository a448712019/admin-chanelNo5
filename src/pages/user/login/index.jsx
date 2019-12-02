import { Alert, Checkbox, Icon, notification } from "antd";
import { FormattedMessage, formatMessage } from "umi-plugin-react/locale";
import React, { Component } from "react";
import Link from "umi/link";
import { connect } from "dva";
import LoginComponents from "./components/Login";
import styles from "./style.less";
import cookie from "react-cookies";
import { getAuthority } from "@/utils/authority";
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects["login/login"]
}))
class Login extends Component {
  loginForm = undefined;
  state = {
    type: "account",
    autoLogin: true
  };
  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };
  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: "login/login",
        payload: { ...values, type },
        callback: res => {
          if (res.status == 1) {
            notification.success({
              message: res.message,
              duration: 1.5
            });
            // getAuthority()
            this.props.history.push("/");
            // let timer = setInterval(() => {
            //   console.log(123)
            //   console.log(localStorage.getItem('currentUser'))
            //   if(localStorage.getItem('currentUser')){

            //     clearInterval(timer)
            //   }
            // }, 100)
          } else {
            notification.error({
              message: res.message,
              duration: 1.5
            });
          }
        }
      });
    }
  };
  onTabChange = type => {
    this.setState({
      type
    });
  };
  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(["mobile"], {}, async (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          try {
            const success = await dispatch({
              type: "login/getCaptcha",
              payload: values.mobile
            });
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          <Tab
            key="account"
            tab={formatMessage({
              id: "user-login.login.tab-login-credentials"
            })}
          >
            {/* {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                formatMessage({
                  id: 'user-login.login.message-invalid-credentials',
                }),
              )} */}
            <UserName
              name="name"
              // placeholder={`${formatMessage({
              //   id: 'user-login.login.userName',
              // })}: admin or user`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "user-login.userName.required"
                  })
                }
              ]}
            />
            <Password
              name="password"
              // placeholder={`${formatMessage({
              //   id: 'user-login.login.password',
              // })}: ant.design`}
              rules={[
                {
                  required: true,
                  message: formatMessage({
                    id: "user-login.password.required"
                  })
                }
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>

          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
          <div className={styles.other}>
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="userandlogin.login.signup" />
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
