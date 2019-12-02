import React from "react";
import { connect } from "dva";
import {
  Form,
  Button,
  Table,
  Tag,
  Modal,
  Input,
  Switch,
  notification,
  Select,
  Popconfirm,
  Upload,
  Icon
} from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { toUndefind } from "@/utils/utils";
import StepSave from "@/components/Module/StepSave/StepSave";

const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 }
};

@connect(({ theme }) => ({
  theme: theme
}))
@Form.create()
export default class ThemeManage extends React.Component {
  state = {
    saveModal: {
      isShow: false,
      curret: ""
    },
    stepModal: {
      isShow: false,
      themeCurrent: ""
    },
    fileList: [],
    fileList1: [],
    fileList2: [],
    previewVisible: false,
    previewImage: "",
    zid: ""
  };
  handleColose = () => {
    this.setState({
      saveModal: {
        isShow: false,
        curret: ""
      },
      stepModal: {
        isShow: false,
        themeCurrent: ""
      },
      fileList: [],
      fileList1: [],
      fileList2: []
    });
    this.props.form.resetFields();
  };
  addTheme = () => {
    this.setState({
      saveModal: {
        isShow: true,
        curret: ""
      },
      fileList: [],
      fileList1: [],
      fileList2: []
    });
  };
  getData = () => {
    this.props.dispatch({
      type: "theme/fetch",
      payload: {}
    });
  };
  componentDidMount() {
    this.getData();
    this.props.dispatch({
      type: "theme/getThemeStageList"
    });
    this.props.dispatch({
      type: "theme/allTheme"
    });
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };
  handleCancel1 = () => this.setState({ previewVisible1: false });
  handlePreview1 = file => {
    this.setState({
      previewImage1: file.url || file.preview,
      previewVisible1: true
    });
  };
  handleCancel2 = () => this.setState({ previewVisible2: false });
  handlePreview2 = file => {
    this.setState({
      previewImage2: file.url || file.preview,
      previewVisible2: true
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
  beforeUpload1 = file => {
    console.log(file);
    this.props.dispatch({
      type: "theme/uploadImage",
      payload: {
        name: file.name,
        filename: file
      },
      callback: res => {
        this.setState({
          fileList1: [{ uid: 1, url: "https://" + res.imgURL }]
        });
      }
    });
  };
  beforeUpload2 = file => {
    console.log(file);
    this.props.dispatch({
      type: "theme/uploadImage",
      payload: {
        name: file.name,
        filename: file
      },
      callback: res => {
        this.setState({
          fileList2: [{ uid: 1, url: "https://" + res.imgURL }]
        });
      }
    });
  };
  onRemove = () => {
    this.setState({
      fileList: []
    });
  };
  onRemove1 = () => {
    this.setState({
      fileList1: []
    });
  };
  onRemove2 = () => {
    this.setState({
      fileList2: []
    });
  };
  handleOk = () => {
    const { saveModal, fileList, fileList1, fileList2 } = this.state;
    this.props.form.validateFields((err, values) => {
      if (err) return;
      toUndefind(values);
      this.props.dispatch({
        type: "theme/updateTheme",
        payload: {
          ...values,
          id: this.state.saveModal.current
            ? this.state.saveModal.current.id
            : "create",
          banner: fileList.length > 0 ? fileList[0].url : "",
          icon: fileList1.length > 0 ? fileList[0].url : "",
          titles: fileList2.length > 0 ? fileList[0].url : ""
        },
        callback: res => {
          if (res.status == 1) {
            notification.success({
              message: saveModal.curret ? "更新成功" : "新建成功",
              duration: 1.5
            });
            this.handleColose();
            this.getData();
          }
        }
      });
    });
  };
  delete = item => {
    this.props.dispatch({
      type: "theme/delTheme",
      payload: {
        id: item.id
      },
      callback: res => {
        if (res.status == 1) {
          notification.success({
            message: "删除成功",
            duration: 1.5
          });
          this.getData();
        }
      }
    });
  };
  addStepModal = item => {
    if (item.id == "19") {
      this.props.history.push("/step/stepcontent/3/-19");
    }
    this.setState({
      zid: item.id,
      stepModal: {
        isShow: true,
        themeCurrent: item
      }
    });
  };
  editTheme = item => {
    this.props.dispatch({
      type: "theme/getThemeDetail",
      payload: {
        id: item.id
      },
      callback: res => {
        const data = this.props.theme.detail;
        if (res.status == 1) {
          this.props.form.setFieldsValue({
            daytitle: data.daytitle,
            abstract: data.abstract,
            sid: data.sid,
            status: data.status == "1" ? true : false,
            banner: data.banner,
            icon: data.icon,
            titles: data.titles
          });
          this.setState({
            saveModal: {
              isShow: true,
              current: item
            },
            fileList: data.banner ? [{ uid: 1, url: data.banner }] : [],
            fileList1: data.icon ? [{ uid: 1, url: data.icon }] : [],
            fileList2: data.titles ? [{ uid: 1, url: data.titles }] : []
          });
        }
      }
    });
  };
  render() {
    const column = [
      {
        title: "主题名称",
        key: "daytitle",
        dataIndex: "daytitle"
      },
      {
        title: "缩略图",
        key: "banner",
        dataIndex: "banner",
        render: value => <img src={value} style={{ width: "30px" }} alt="" />
      },
      {
        title: "学习概要",
        key: "abstract",
        dataIndex: "abstract",
        width: 200
      },
      {
        title: "所属阶段",
        key: "stageTitle",
        dataIndex: "stageTitle"
      },
      {
        title: "排序",
        key: "displayorder",
        dataIndex: "displayorder"
      },
      {
        title: "状态",
        key: "status",
        dataIndex: "status",
        render: value => (
          <div>
            {value == "1" ? (
              <Tag color="green">开启</Tag>
            ) : (
              <Tag color="red">关闭</Tag>
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
            <span className="link" onClick={() => this.editTheme(item)}>
              编辑
            </span>
            <Popconfirm
              title="确认删除吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => this.delete(item)}
            >
              <span className="link">删除</span>
            </Popconfirm>
            <span className="link" onClick={() => this.addStepModal(item)}>
              {item.id == "19" ? "阶段测试" : "步骤添加"}
            </span>
          </div>
        )
      }
    ];
    const {
      fileList,
      fileList1,
      fileList2,
      previewVisible,
      previewImage,
      previewVisible1,
      previewImage1,
      previewVisible2,
      previewImage2
    } = this.state;
    console.log(this.props);
    const {
      getFieldDecorator,
      setFieldsValue,
      validateFields
    } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <PageHeaderWrapper
        extra={
          <Button type="primary" onClick={this.addTheme}>
            主题添加
          </Button>
        }
      >
        <Table
          columns={column}
          dataSource={this.props.theme.themeList.data}
          rowKey={item => item.id}
        />
        {
          <Modal
            visible={this.state.saveModal.isShow}
            onCancel={this.handleColose}
            title={this.state.saveModal.current ? "编辑主题" : "新增主题"}
            onOk={this.handleOk}
          >
            <Form.Item {...formItemLayout} label="主题名称">
              {getFieldDecorator("daytitle", {
                rules: [{ required: true, message: "请输入主题名称" }]
              })(<Input placeholder="主题名称" autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="学习概要">
              {getFieldDecorator("abstract", {
                // rules: [{ required: true, message: '请输入标题' }],
              })(<Input placeholder="学习概要" autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="所属阶段">
              {getFieldDecorator("sid", {
                // rules: [{ required: true, message: '请输入标题' }],
              })(
                <Select placeholder="所属阶段">
                  {this.props.theme.stageList.map(item => (
                    <Select.Option value={item.id}>{item.title}</Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="状态">
              {getFieldDecorator("status", {
                valuePropName: "checked"
                // rules: [{ required: true, message: '培训说明' }],
              })(<Switch />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="主题封面">
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
            <Form.Item {...formItemLayout} label="内容封面">
              {getFieldDecorator("icon", {
                // rules: [{ required: true, message: '培训说明' }],
              })(
                <div>
                  <Upload
                    listType="picture-card"
                    fileList={fileList1}
                    onPreview={this.handlePreview1}
                    beforeUpload={this.beforeUpload1}
                    onRemove={this.onRemove1}
                  >
                    {fileList1.length > 0 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={previewVisible1}
                    footer={null}
                    onCancel={this.handleCancel1}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage1}
                    />
                  </Modal>
                </div>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="标题">
              {getFieldDecorator("titles", {
                // rules: [{ required: true, message: '培训说明' }],
              })(
                <div>
                  <Upload
                    listType="picture-card"
                    fileList={fileList2}
                    onPreview={this.handlePreview2}
                    beforeUpload={this.beforeUpload2}
                    onRemove={this.onRemove2}
                  >
                    {fileList2.length > 0 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={previewVisible2}
                    footer={null}
                    onCancel={this.handleCancel2}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImage2}
                    />
                  </Modal>
                </div>
              )}
            </Form.Item>
          </Modal>
        }
        {this.state.stepModal.isShow && (
          <StepSave
            isShow={this.state.stepModal.isShow}
            handleColse={this.handleColose}
            themeCurrent={this.state.stepModal.themeCurrent}
            getData={this.getData}
          />
        )}
      </PageHeaderWrapper>
    );
  }
}
