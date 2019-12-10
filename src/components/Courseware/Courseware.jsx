import React from "react";
import { connect } from "dva";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import {
  Form,
  Button,
  Popconfirm,
  Table,
  Modal,
  Tabs,
  Col,
  Row,
  Input,
  Icon,
  Upload,
  Switch,
  notification,
  Tag
} from "antd";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

@connect(({ theme }) => ({
  theme: theme
}))
@Form.create()
export default class Courseware extends React.Component {
  state = {
    fileList: [],
    previewVisible: false,
    previewImage: "",
    editorState: BraftEditor.createEditorState(null),
    current: "",
    tabKey: "1"
  };
  getData = () => {
    this.props.dispatch({
      type: "theme/typeFiveList",
      payload: {
        sid: this.props.sid
      }
    });
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
  myUploadfn = params => {
    console.log(params);
    this.props.dispatch({
      type: "theme/uploadImage",
      payload: {
        name: params.file.name,
        filename: params.file
      },
      callback: res => {
        let url = "https://" + res.imgURL;
        console.log(url);
        params.success({
          url: url
          // loop: true, // 指定音视频是否循环播放
          // autoPlay: true, // 指定音视频是否自动播放
          // controls: true, // 指定音视频是否显示控制栏
        });
      }
    });
  };
  onRemove = () => {
    this.setState({
      fileList: []
    });
  };
  handleEditorChange = editorState => {
    console.log(editorState);
    this.setState({ editorState });
  };
  submit = () => {
    this.props.form.validateFields((err, values) => {
      console.log(values);
      console.log(this.state.editorState.toHTML());
      const { fileList, editorState, current } = this.state;
      if (fileList.length > 0) {
        values.banner = fileList[0].url;
      } else {
        values.banner = "";
      }
      values.content = editorState.toHTML();
      if (current) {
        values.id = current.id;
      }

      this.props.dispatch({
        type: "theme/typeFiveSave",
        payload: {
          ...values,
          sid: this.props.sid
        },
        callback: res => {
          notification.info({
            message: res.message,
            duration: 1.5
          });
          if (res.status == 1) {
            this.setState({
              tabKey: "1",
              fileList: [],
              editorState: BraftEditor.createEditorState(null)
            });
            this.props.form.resetFields();
            this.getData();
          }
        }
      });
    });
  };
  tabChange = value => {
    this.setState({
      tabKey: value,
      fileList: [],
      editorState: BraftEditor.createEditorState(null)
    });
    this.props.form.resetFields();
  };
  edit = item => {
    this.setState({
      current: item,
      tabKey: "2",
      fileList: [{ uid: 1, url: item.banner }],
      editorState: BraftEditor.createEditorState(item.content)
    });
    this.props.form.setFieldsValue({
      title: item.title,
      status: item.status == "1" ? true : false
    });
  };
  delete = item => {
    this.props.dispatch({
      type: "theme/delFive",
      payload: {
        id: item.id
      },
      callback: res => {
        if (res.status == 1) {
          this.getData();
        }
        notification.info({
          message: res.message,
          duration: 1.5
        });
      }
    });
  };
  componentDidMount() {
    // this.setState({
    //     editorState: BraftEditor.createEditorState(htmlContent)
    // })
    this.getData();
  }
  render() {
    const column = [
      {
        title: "名称",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "banner",
        dataIndex: "banner",
        key: "banner",
        render: value => <img style={{ width: "30px" }} src={value} />
      },
      {
        title: "所属主题",
        dataIndex: "setptitle",
        key: "setptitle"
      },
      {
        title: "状态显示",
        key: "status",
        dataIndex: "status",
        render: value => (
          <div>
            {value == "1" ? (
              <Tag color="green">显示</Tag>
            ) : (
              <Tag color="red">隐藏</Tag>
            )}
          </div>
        )
      },
      {
        title: "操作",
        key: "action",
        dataIndex: "action",
        render: (_, item, index) => (
          <div>
            <span className="link" onClick={() => this.edit(item)}>
              编辑
            </span>
            <Popconfirm
              onConfirm={() => this.delete(item)}
              okText="确定"
              title="确认删除？"
              cancelText="取消"
            >
              <span className="link">删除</span>
            </Popconfirm>
          </div>
        )
      }
    ];
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {
      getFieldDecorator,
      setFieldsValue,
      validateFields
    } = this.props.form;
    const { fileList, previewVisible, previewImage, code } = this.state;
    console.log(this.props);
    return (
      <PageHeaderWrapper>
        <Tabs onChange={this.tabChange} activeKey={this.state.tabKey}>
          <Tabs.TabPane tab="课件列表" key={"1"}>
            <Table
              columns={column}
              dataSource={this.props.theme.typeFiveList}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="添加课件" key={"2"}>
            <Row>
              <Col>
                <Form.Item {...formItemLayout} label="课件名称">
                  {getFieldDecorator("title", {
                    rules: [{ required: true, message: "请输入" }]
                  })(<Input placeholder="课件名称" autoComplete="off" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="banner">
                  {getFieldDecorator("banner", {
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
                <Form.Item {...formItemLayout} label="状态">
                  {getFieldDecorator("status", {
                    valuePropName: "checked"
                    // rules: [{ required: true, message: '培训说明' }],
                  })(<Switch />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态">
                  <BraftEditor
                    value={this.state.editorState}
                    onChange={this.handleEditorChange}
                    media={{ uploadFn: this.myUploadfn }}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态">
                  <Button type="primary" onClick={this.submit}>
                    {this.state.current ? "保存" : "创建"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}
