import {
  Button,
  Col,
  Form,
  Input,
  Popover,
  Progress,
  Row,
  Select,
  message
} from "antd";
import { FormattedMessage, formatMessage } from "umi-plugin-react/locale";
import React, { Component } from "react";
import Link from "umi/link";
import { connect } from "dva";
import router from "umi/router";
import styles from "./style.less";

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregister.strength.short" />
    </div>
  )
};
const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception"
};

@connect(({ userAndregister, login, loading }) => ({
  userAndregister,
  login,
  submitting: loading.effects["userAndregister/submit"]
}))
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: "",
    prefix: "86"
  };

  interval = undefined;

  componentDidUpdate() {
    const { userAndregister, form } = this.props;
    const account = form.getFieldValue("mail");

    if (userAndregister.status === "ok") {
      message.success("注册成功！");
      router.push({
        pathname: "/user/register-result",
        state: {
          account
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({
      count
    });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({
        count
      });

      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");

    if (value && value.length > 9) {
      return "ok";
    }

    if (value && value.length > 5) {
      return "pass";
    }

    return "poor";
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(
      {
        force: true
      },
      (err, values) => {
        if (!err) {
          const { prefix } = this.state;
          console.log(values)
          dispatch({
            type: "login/register",
            payload: { ...values }
          });
        }
      }
    );
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue("password")) {
      callback(
        formatMessage({
          id: "userandregister.password.twice"
        })
      );
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;

    if (!value) {
      this.setState({
        help: formatMessage({
          id: "userandregister.password.required"
        }),
        visible: !!value
      });
      callback("error");
    } else {
      this.setState({
        help: ""
      });

      if (!visible) {
        this.setState({
          visible: !!value
        });
      }

      if (value.length < 6) {
        callback("error");
      } else {
        const { form } = this.props;

        if (value && confirmDirty) {
          form.validateFields(["confirm"], {
            force: true
          });
        }

        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue("password");
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="userandregister.register.register" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "userandregister.email.required"
                  })
                },
              ]
            })(
              <Input
                size="large"
                autoComplete="off"
                placeholder={formatMessage({
                  id: "userandregister.email.placeholder"
                })}
              />
            )}
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }

                return node;
              }}
              content={
                <div
                  style={{
                    padding: "4px 0"
                  }}
                >
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10
                    }}
                  >
                    <FormattedMessage id="userandregister.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{
                width: 240
              }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.checkPassword
                  }
                ]
              })(
                <Input
                  size="large"
                  autoComplete="off"
                  type="password"
                  placeholder={formatMessage({
                    id: "userandregister.password.placeholder"
                  })}
                />
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator("confirm_password", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "userandregister.confirm-password.required"
                  })
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(
              <Input
                size="large"
                type="password"
                autoComplete="off"
                placeholder={formatMessage({
                  id: "userandregister.confirm-password.placeholder"
                })}
              />
            )}
          </FormItem>
          
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="userandregister.register.register" />
            </Button>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id="userandregister.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Register);