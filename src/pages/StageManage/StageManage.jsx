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
  Popconfirm
} from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";

const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 }
};

@connect(({ stageManage }) => ({
  stageManage: stageManage
}))
@Form.create()
export default class DayRecord extends React.Component {
  state = {
    addModal: {
      isShow: false,
      current: ""
    }
  };
  handleColse = () => {
    this.setState({
      addModal: {
        isShow: false
      }
    });
  };
  addOpenModal = () => {
    this.setState({
      addModal: {
        isShow: true,
        current: ""
      }
    });
  };
  eidtOpenModal = item => {
    this.props.dispatch({
      type: "stageManage/editStage",
      payload: {
        id: item.id
      },
      callback: res => {
        if (res.status === 1) {
          const data = this.props.stageManage.editStageData;
          this.props.form.setFieldsValue({
            title: data.title,
            contentTitle: data.contentTitle,
            buzhouTitle: data.buzhouTitle,
            displayorder: data.displayorder,
            introduce: data.introduce,
            explain: data.explain,
            status: data.status == "1" ? true : false
          });
        }
        this.setState({
          addModal: {
            isShow: true,
            current: item
          }
        });
      }
    });
  };
  getData = () => {
    this.props.dispatch({
      type: "stageManage/getStageList",
      payload: {}
    });
  };
  delete = item => {
    this.props.dispatch({
      type: "stageManage/delStage",
      payload: {
        id: item.id
      },
      callback: res => {
        if (res.status === 1) {
          notification.success({
            message: "删除成功",
            duration: 1.5
          });
          this.getData();
        }
      }
    });
  };
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.props.dispatch({
        type: "stageManage/saveStage",
        payload: {
          id: this.state.addModal.current
            ? this.state.addModal.current.id
            : "create",
          ...values
        },
        callback: res => {
          if (res.status === 1) {
            notification.success({
              message: this.state.addModal.current ? "保存成功" : "新建成功",
              duration: 1.5
            });
            this.handleColse();
            this.getData();
          }
        }
      });
    });
  };
  componentDidMount() {
    console.log("1");
    this.getData();
  }
  render() {
    const column = [
      {
        title: "标题",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "培训介绍",
        dataIndex: "introduce",
        key: "introduce",
        width: 300
      },
      {
        title: "阶段说明",
        dataIndex: "explain",
        key: "explain",
        width: 300
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: value => (
          <div>
            {value == 1 ? (
              <Tag color="green">开启</Tag>
            ) : (
              <Tag color="red">关闭</Tag>
            )}
          </div>
        )
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "aciton",
        render: (_, item, index) => (
          <div>
            <span className="link" onClick={() => this.eidtOpenModal(item)}>
              编辑
            </span>
            <Popconfirm
              title="确认删除该阶段？"
              onConfirm={() => this.delete(item)}
              okText="确认"
              cancelText="取消"
            >
              <span className="link">删除此阶段</span>
            </Popconfirm>
          </div>
        )
      }
    ];
    console.log(this.props);
    const {
      getFieldDecorator,
      setFieldsValue,
      validateFields
    } = this.props.form;
    return (
      <PageHeaderWrapper
        extra={
          <Button type="primary" onClick={this.addOpenModal}>
            新建阶段
          </Button>
        }
      >
        <Table
          columns={column}
          dataSource={this.props.stageManage.stageList.data}
          rowKey={item => item.id}
        />
        <Modal
          visible={this.state.addModal.isShow}
          onCancel={this.handleColse}
          title={this.state.addModal.curent ? "编辑阶段" : "新增阶段"}
          onOk={this.submit}
        >
          <Form.Item {...formItemLayout} label="标题">
            {getFieldDecorator("title", {
              // rules: [{ required: true, message: '请输入标题' }],
            })(<Input placeholder="标题" autoComplete="off" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="内容标题">
            {getFieldDecorator("contentTitle", {
              // rules: [{ required: true, message: '请输入内容标题' }],
            })(<TextArea placeholder="内容标题" autoComplete="off" rows={6} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="步骤标题">
            {getFieldDecorator("buzhouTitle", {
              // rules: [{ required: true, message: '请输入步骤标题' }],
            })(<TextArea placeholder="步骤标题" autoComplete="off" rows={6} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="排序">
            {getFieldDecorator("displayorder", {
              // rules: [{ required: true, message: '排序' }],
            })(<Input placeholder="排序" autoComplete="off" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="培训介绍">
            {getFieldDecorator("introduce", {
              // rules: [{ required: true, message: '培训介绍' }],
            })(<TextArea placeholder="培训介绍" autoComplete="off" rows={6} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="培训说明">
            {getFieldDecorator("explain", {
              // rules: [{ required: true, message: '培训说明' }],
            })(<TextArea placeholder="培训说明" autoComplete="off" rows={6} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="显示/隐藏">
            {getFieldDecorator("status", {
              valuePropName: "checked"
              // rules: [{ required: true, message: '培训说明' }],
            })(<Switch />)}
          </Form.Item>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
