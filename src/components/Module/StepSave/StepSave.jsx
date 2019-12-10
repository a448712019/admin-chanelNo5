import React from "react";
import { connect } from "dva";
import {
  Modal,
  Form,
  Switch,
  Select,
  Input,
  Button,
  Icon,
  Upload,
  notification
} from "antd";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 }
};

@connect(({ theme, loading }) => ({
  theme: theme
}))
@Form.create()
export default class StepSave extends React.Component {
  state = {
    fileList: [],
    previewVisible: false,
    previewImage: ""
  };
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };
  beforeUpload = file => {
    console.log(file);
    this.props.dispatch({
      type: "theme/uploadImage",
      payload: {
        name: file.name,
        filename: file
      },
      callback: res => {
        this.setState({
          fileList: [{ uid: 1, url: "https://" + res.imgURL }]
        });
      }
    });
  };
  onRemove = () => {
    this.setState({
      fileList: []
    });
  };
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      if (this.props.themeCurrent) {
        values.sid = this.props.themeCurrent.id;
      }
      if (this.props.current) {
        values.sid = this.props.current.sid;
      }
      this.props.dispatch({
        type: "theme/saveStep",
        payload: {
          ...values,
          logoImg:
            this.state.fileList.length > 0 ? this.state.fileList[0].url : "",
          id: this.props.current ? `-${this.props.current.id}` : "columncreate"
        },
        callback: res => {
          if (res.status == 1) {
            notification.success({
              message: res.message,
              duration: 1.5
            });
            this.props.getData();
            this.props.handleColse();
          }
        }
      });
    });
  };
  componentDidMount() {
    const current = this.props.current;
    if (current) {
      this.props.dispatch({
        type: "theme/stepDetail",
        payload: {
          id: `-${current.id}`
        },
        callback: res => {
          const data = this.props.theme.stepDetail;
          if (res.status == 1) {
            this.props.form.setFieldsValue({
              title: data.title,
              sid: data.sid,
              type: data.type,
              logoImg: data.image,
              displayorder: data.displayorder,
              status: data.status == 1 ? true : false
            });
            if (data.image) {
              this.setState({
                fileList: [{ uid: 1, url: data.image }]
              });
            }
          } else {
            notification.error({
              message: res.message,
              duration: 1.5
            });
          }
        }
      });
    }
  }
  render() {
    console.log(this.props);
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { fileList, previewVisible, previewImage } = this.state;
    const {
      getFieldDecorator,
      setFieldsValue,
      validateFields
    } = this.props.form;
    const { isShow, handleColse, themeCurrent, current } = this.props;
    return (
      <Modal
        visible={isShow}
        onCancel={handleColse}
        title={"步骤添加"}
        onOk={this.submit}
      >
        <Form.Item {...formItemLayout} label="步骤名称">
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "请输入步骤名称" }]
          })(<Input placeholder="步骤名称" autoComplete="off" />)}
        </Form.Item>
        {!themeCurrent && !current && (
          <Form.Item {...formItemLayout} label="所属主题">
            {getFieldDecorator("sid", {
              rules: [{ required: true, message: "请选择所属主题" }]
            })(
              <Select placeholder="所属主题">
                {this.props.theme.allTheme.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.daytitle}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        )}
        <Form.Item {...formItemLayout} label="步骤类型">
          {getFieldDecorator("type", {
            rules: [{ required: true, message: "请选择步骤类型" }]
          })(
            <Select placeholder="步骤类型">
              <Select.Option value="0">体验产品</Select.Option>
              <Select.Option value="1">阅读产品手册</Select.Option>
              <Select.Option value="2">观看产品视频</Select.Option>
              <Select.Option value="3">小测试</Select.Option>
              {/* <Select.Option value='4'>课件下载</Select.Option> */}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="主题封面">
          {getFieldDecorator("logoImg", {
            // rules: [{ required: true, message: '培训说明' }],
          })(
            <div>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                beforeUpload={this.beforeUpload}
                onRemove={this.onRemove}
              >
                {fileList.length > 0 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="步骤排序">
          {getFieldDecorator("displayorder", {
            // rules: [{ required: true, message: '请输入步骤名称' }],
          })(<Input placeholder="步骤排序" autoComplete="off" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="显示/隐藏">
          {getFieldDecorator("status", {
            valuePropName: "checked"
            // rules: [{ required: true, message: '培训说明' }],
          })(<Switch />)}
        </Form.Item>
      </Modal>
    );
  }
}
