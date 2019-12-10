import React from "react";
import { connect } from "dva";
import { toUndefind } from "@/utils/utils";
import {
  Tabs,
  Form,
  Tag,
  Table,
  Row,
  Col,
  Input,
  Upload,
  Icon,
  Modal,
  Switch,
  Button,
  notification,
  Popconfirm,
  Select
} from "antd";

const { TextArea } = Input;
const { TabPane } = Tabs;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 }
};

@connect(({ theme, loading }) => ({
  theme: theme
}))
@Form.create()
export default class TypeFour extends React.Component {
  state = {
    tabKey: "1",
    content: [
      {
        judge: "",
        status: 0
      }
    ],
    current: "",

    questionNumModal: {
      isShow: false,
      current: ""
    },
    eidtTypeModal: {
      isShow: false,
      current: ""
    }
  };
  handleColse = () => {
    this.setState({
      questionNumModal: {
        isShow: false,
        current: ""
      },
      eidtTypeModal: {
        isShow: false,
        current: ""
      }
    });
  };
  editType = item => {
    this.props.form.setFieldsValue({
      typeTitle: item.title,
      typeStatus: item.status == "1" ? true : false
    });
    this.setState({
      eidtTypeModal: {
        isShow: true,
        current: item
      }
    });
  };
  getData = () => {
    this.props.dispatch({
      type: "theme/typeFourList",
      payload: {
        cid: this.props.sid
      }
    });
  };
  getTypeList = () => {
    this.props.dispatch({
      type: "theme/typeList",
      payload: {
        cid: this.props.sid
      }
    });
  };
  addItem = () => {
    const content = this.state.content;
    content.push({
      status: "false",
      judge: ""
    });
    this.setState({
      content
    });
  };
  tabChange = value => {
    this.setState({
      tabKey: value,
      current: "",
      content: [
        {
          judge: "",
          status: "false"
        }
      ]
    });
    if (value == "2") {
      this.getQuestType();
    }
    this.props.form.resetFields();
  };
  getQuestType = () => {
    this.props.dispatch({
      type: "theme/questType",
      payload: {
        cid: this.props.sid
      }
    });
  };
  reset = () => {
    this.props.form.resetFields();
    this.setState({
      content: [
        {
          judge: "",
          status: "false"
        }
      ]
    });
  };
  edit = item => {
    this.props.dispatch({
      type: "theme/fourDetail",
      payload: {
        id: item.id
      },
      callback: res => {
        const data = this.props.theme.fourDetail;
        if (res.status == 1) {
          this.props.form.setFieldsValue({
            title: data.title,
            status: data.status == "1" ? true : false,
            type: data.type,
            s_type: data.s_id,
            sel_type: data.sel_type,
            sort: data.sort
          });
          this.setState({
            tabKey: "2",
            current: item,
            content: data.content
              ? data.content
              : [
                  {
                    status: "false",
                    judge: ""
                  }
                ]
          });
          if (data.banner) {
            this.setState({
              fileList: [{ uid: 1, url: data.banner }]
            });
          }
        }
      }
    });
  };
  submit = () => {
    const { current, content } = this.state;
    let obj = {};
    content.forEach((item, index) => {
      obj[`items[${index}][status]`] = item.status;
      obj[`items[${index}][judge]`] = item.judge;
    });
    console.log(124);
    this.props.form.validateFields((err, values) => {
      // if(err)return;
      toUndefind(values);
      this.props.dispatch({
        type: `theme/${current ? "updateFour" : "addFour"}`,
        payload: {
          id: current ? current.id : "",
          ...values,
          cid: this.props.sid,
          ...obj
        },
        callback: res => {
          if (res.status == 1) {
            notification.success({
              message: res.message,
              duration: 1.5
            });
            this.setState({
              tabKey: "1",
              current: ""
            });
            this.getData();
          }
        }
      });
    });
  };
  addType = () => {
    this.props.form.resetFields();
    this.setState({
      eidtTypeModal: {
        isShow: true,
        current: ""
      }
    });
  };
  delItem = index => {
    const content = this.state.content;
    if (content.length === 1) {
      notification.info({
        message: "至少保留一项",
        duration: 1.5
      });
      return;
    }
    let newArr = content.filter((item, i) => i !== index);
    this.setState({
      content: newArr
    });
  };
  openSetNumModal = item => {
    this.setState({
      questionNumModal: {
        isShow: true,
        current: item
      }
    });
  };
  componentDidMount() {
    this.getData();
    this.getTypeList();
    this.getQuestType();
  }
  deleteType = item => {
    this.props.dispatch({
      type: "theme/delType",
      payload: {
        id: item.id
      },
      callback: res => {
        notification.info({
          message: res.message,
          duration: 1.5
        });
        this.handleColse();
        this.getTypeList();
      }
    });
  };
  editSubmit = () => {
    console.log(1);
    this.props.form.validateFields((err, values) => {
      let obj = {};
      obj.title = values.typeTitle;
      obj.status = values.typeStatus ? "1" : "0";
      if (this.state.eidtTypeModal.current) {
        obj.id = this.state.eidtTypeModal.current.id;
      }
      this.props.dispatch({
        type: `theme/${
          this.state.eidtTypeModal.current ? "editType" : "addType"
        }`,
        payload: {
          ...obj,
          cid: this.props.sid
        },
        callback: res => {
          notification.info({
            message: res.message,
            duration: 1.5
          });
          this.handleColse();
          this.getTypeList();
        }
      });
    });
  };
  questionModalSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.props.dispatch({
        type: "theme/editTypeNum",
        payload: {
          id: this.state.questionNumModal.current.id,
          s_total: values.questNum
        },
        callback: res => {
          notification.info({
            message: res.message,
            duration: 1.5
          });
          this.handleColse();
          this.getTypeList();
        }
      });
    });
  };
  itmeChange = (type, index, e) => {
    const content = this.state.content;
    if (type === "status") {
      content[index][type] = e + "";
    } else {
      content[index][type] = e.target.value;
    }

    this.setState({
      content
    });
  };
  delete = item => {
    this.props.dispatch({
      type: "theme/delQuest",
      payload: {
        id: item.id
      },
      callback: res => {
        notification.success({
          message: res.message,
          duration: 1.5
        });
        this.getData();
      }
    });
  };
  render() {
    const { tabKey, content, current } = this.state;
    const {
      getFieldDecorator,
      setFieldsValue,
      validateFields
    } = this.props.form;
    const column = [
      {
        title: "编号",
        key: "id",
        dataIndex: "id"
      },
      {
        title: "题目",
        key: "title",
        dataIndex: "title"
      },
      {
        title: "排序",
        key: "sort",
        dataIndex: "sort"
      },
      {
        title: "分类",
        key: "s_type",
        dataIndex: "s_type"
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
            <span className="link" onClick={() => this.edit(item)}>
              编辑
            </span>
            <Popconfirm
              title="确认删除吗？"
              onConfirm={() => this.delete(item)}
            >
              <span className="link">删除</span>
            </Popconfirm>
          </div>
        )
      }
    ];
    const column1 = [
      {
        title: "分类名称",
        dataIndex: "title",
        key: "title"
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
        title: "题目数量",
        key: "j_total",
        dataIndex: "j_total"
      },
      {
        title: "取题数量",
        key: "s_total",
        dataIndex: "s_total",
        render: value => (
          <div style={{ color: "green" }}>
            <Tag color="green">{value}</Tag>
          </div>
        )
      },
      {
        title: "操作",
        key: "aciton",
        dataIndex: "action",
        render: (_, item, index) => (
          <div>
            {item.id > 0 && (
              <span className="link" onClick={() => this.editType(item)}>
                编辑
              </span>
            )}
            <span className="link" onClick={() => this.openSetNumModal(item)}>
              设置选题数量
            </span>
            {item.id > 0 && (
              <Popconfirm
                title="确认删除吗？"
                onConfirm={() => this.deleteType(item)}
              >
                <span className="link">删除</span>
              </Popconfirm>
            )}
          </div>
        )
      }
    ];
    const eng = ["A", "B", "C", "D", "E", "F", "G"];
    return (
      <div>
        <Tabs activeKey={tabKey} onChange={this.tabChange}>
          <TabPane tab="题库管理" key="1">
            <Table
              columns={column}
              rowKey={item => item.id}
              dataSource={this.props.theme.typeFourList}
            />
          </TabPane>
          <TabPane tab="添加题目" key="2">
            <Row>
              <Col span={24}>
                <Form.Item {...formItemLayout} label="题目">
                  {getFieldDecorator("title", {
                    // rules: [{ required: true, message: '请输入题目' }],
                  })(<Input placeholder="题目" autoComplete="off" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="题目类型">
                  {getFieldDecorator("type", {
                    initialValue: "0"
                  })(
                    <Select>
                      <Select.Option value="0">图片</Select.Option>
                      <Select.Option value="1">文字</Select.Option>
                      <Select.Option value="2">多图片</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="单选/多选">
                  {getFieldDecorator("sel_type", {
                    initialValue: "radio"
                  })(
                    <Select>
                      <Select.Option value="radio">单选</Select.Option>
                      <Select.Option value="checkbox">多选</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="题目分类">
                  {getFieldDecorator("s_type", {
                    // initialValue: "radio"
                  })(
                    <Select>
                      {this.props.theme.questType.map((item, index) => (
                        <Select.Option key={index} value={item.id}>
                          {item.title}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="排序">
                  {getFieldDecorator("sort", {
                    // rules: [{ required: true, message: '排序' }],
                  })(<Input placeholder="排序" autoComplete="off" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态">
                  {getFieldDecorator("status", {
                    valuePropName: "checked"
                    // rules: [{ required: true, message: '培训说明' }],
                  })(<Switch />)}
                </Form.Item>
                <Form.Item {...formItemLayout} colon={false} label=" ">
                  <Button type="primary" onClick={this.addItem}>
                    添加选项
                  </Button>
                </Form.Item>
                {content.map((item, index) => (
                  <Row key={index} style={{ marginBottom: "10px" }}>
                    <Col>
                      <Col span={5}></Col>
                      <Col
                        span={19}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Col span={8}>
                          <Col span={22} style={{ textAlign: "center" }}>
                            选项{eng[index]}/图片地址:
                          </Col>
                          <Col span={22}>
                            <TextArea
                              onChange={e => this.itmeChange("judge", index, e)}
                              value={item.judge}
                            />
                          </Col>
                        </Col>
                        <Col span={8}>
                          <Col span={22} style={{ textAlign: "center" }}>
                            正误:
                          </Col>
                          <Col
                            span={22}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "52px"
                            }}
                          >
                            <Switch
                              onChange={e =>
                                this.itmeChange("status", index, e)
                              }
                              checked={item.status == "true" ? true : false}
                            />
                          </Col>
                        </Col>
                        <Col span={8}>
                          <Col span={22} style={{ textAlign: "center" }}></Col>
                          <Col span={22}>
                            <Button onClick={() => this.delItem(index)}>
                              删除
                            </Button>
                          </Col>
                        </Col>
                      </Col>
                    </Col>
                  </Row>
                ))}
                <Form.Item
                  style={{ marginTop: "30px" }}
                  {...formItemLayout}
                  colon={false}
                  label=" "
                >
                  <Button type="primary" className="mr20" onClick={this.submit}>
                    {current ? "保存" : "创建"}
                  </Button>
                  <Button type="primary" onClick={this.reset}>
                    重置
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="分类设置" key="3">
            <Button type="primary" onClick={this.addType}>
              添加分类
            </Button>
            <Table
              columns={column1}
              dataSource={this.props.theme.typeList}
              rowKey={item => item.id}
            />
          </TabPane>
        </Tabs>
        {
          <Modal
            title={this.state.eidtTypeModal.current ? "编辑分类" : "添加分类"}
            visible={this.state.eidtTypeModal.isShow}
            onCancel={this.handleColse}
            onOk={this.editSubmit}
          >
            <Form.Item {...formItemLayout} label="分类名称">
              {getFieldDecorator("typeTitle", {
                // rules: [{ required: true, message: '分类名称' }],
              })(<Input placeholder="分类名称" autoComplete="off" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="状态">
              {getFieldDecorator("typeStatus", {
                valuePropName: "checked"
                // rules: [{ required: true, message: '培训说明' }],
              })(<Switch />)}
            </Form.Item>
          </Modal>
        }
        <Modal
          visible={this.state.questionNumModal.isShow}
          onCancel={this.handleColse}
          onOk={this.questionModalSubmit}
        >
          <Form.Item {...formItemLayout} label="选题数量">
            {getFieldDecorator("questNum", {
              // rules: [{ required: true, message: '选题数量' }],
            })(<Input placeholder="选题数量" autoComplete="off" />)}
          </Form.Item>
        </Modal>
      </div>
    );
  }
}
