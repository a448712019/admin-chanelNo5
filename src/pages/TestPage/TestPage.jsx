import React from "react";
import { connect } from "dva";
import { Form, Row, Col, Button, Input, Divider, Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 }
};

@connect(({ theme, loading }) => ({
  theme: theme
}))
@Form.create()
export default class TestPage extends React.Component {
  down = () => {
    this.props.form.validateFields((err, values) => {
      this.props.dispatch({
        type: "theme/testDown",
        payload: {
          name: values.name,
          password: values.password
        }
      });
    });
  };
  render() {
    const {
      getFieldDecorator,
      setFieldsValue,
      validateFields
    } = this.props.form;
    return (
      <PageHeaderWrapper>
        <Card title="导出表格">
          <Form.Item {...formItemLayout} label="名称">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入名称" }]
            })(<Input placeholder="名称" autoComplete="off" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="密码">
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(<Input placeholder="密码" autoComplete="off" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} colon={false} label=" ">
            <Button type="primary" onClick={this.down}>
              导出表格
            </Button>
          </Form.Item>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
