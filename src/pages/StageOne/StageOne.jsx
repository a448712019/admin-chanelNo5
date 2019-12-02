import React from "react";
import { connect } from "dva";
import {
  Table,
  Tag,
  Tabs,
  Popconfirm,
  Card,
  Radio,
  Input,
  Row,
  Col,
  Form,
  Button,
  Modal,
  notification,
  Select
} from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import cookie from "react-cookies";
import LookStudentList from "@/components/Module/LoockStudentList/LoockStudentList";
import config from "@/services/baseUrl";

const { TabPane } = Tabs;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 }
};

@connect(({ stageManage, loading }) => ({
  stageManage: stageManage,
  loading: loading.effects["stageManage/fetch"],
  userloading: loading.effects["stageManage/allUserList"]
}))
@Form.create()
export default class StageOne extends React.Component {
  state = {
    lookStudent: {
      isShow: false
    },
    addGroup: {
      isShow: false
    },
    renameOrStatus: {
      isShow: false
    },
    codeModle: {
      isShow: false
    },
    currentUser: "",
    tabKey: "1",
    keyword: "",
    selectedRowKeys: [],
    groupName: "",
    current: "",
    codeCurrent: ""
  };
  handleColse = () => {
    this.setState({
      lookStudent: {
        isShow: false,
        current: ""
      },
      addGroup: {
        isShow: false
      },
      renameOrStatus: {
        isShow: false
      },
      codeModle: {
        isShow: false
      }
    });
  };
  addUser = item => {
    this.setState({
      tabKey: "2",
      currentUser: item.id
    });
  };
  getUserData = json => {
    this.props.dispatch({
      type: "stageManage/allUserList",
      payload: {
        username: cookie.load("currentUser").admin,
        ...json
      }
    });
  };
  callback = key => {
    console.log(key);
    this.setState({
      tabKey: key,
      currentUser: "",
      groupName: ""
    });
    if (key === 1) {
      this.getData();
    } else {
      this.getUserData();
    }
  };
  getData = () => {
    this.props.dispatch({
      type: "stageManage/fetch"
    });
  };
  openStudentList = item => {
    this.props.history.push(`/stage1GroupPerson/${item.id}`);
    // let username = cookie.load('currentUser').admin
    // this.props.dispatch({
    //     type: 'stageManage/groupStudentList',
    //     payload: {
    //         username,
    //         id: item.id
    //     },
    //     callback: (res) => {
    //         if(res.status === 1){
    //             this.setState({
    //                 lookStudent: {
    //                     isShow: true,
    //                     current: item
    //                 }
    //             })
    //         }
    //         console.log(res)
    //     }
    // })
  };
  inputChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };
  radioChange = e => {
    console.log(e);
    this.getUserData({ sort: e.target.value });
  };
  search = () => {
    const keyword = this.state.keyword;
    this.getUserData({ keyword });
  };

  onSelectChange = value => {
    console.log(value);
    this.setState({
      selectedRowKeys: value
    });
  };
  nameChange = e => {
    this.setState({
      groupName: e.target.value
    });
  };
  addGroupSubmit = () => {
    const { selectedRowKeys, currentUser, groupName } = this.state;
    const username = cookie.load("currentUser").admin;
    let obj = {};
    if (selectedRowKeys.length > 0) {
      selectedRowKeys.forEach((item, index) => {
        obj[`id[${index}]`] = item;
      });
    } else {
      notification.info({
        message: "请选择学员",
        duration: 1.5
      });
    }

    this.props.dispatch({
      type: "stageManage/addUserToGroup",
      payload: {
        groupid: currentUser ? currentUser : "create",
        username,
        gname: groupName,
        ...obj
      },
      callback: res => {
        if (res.status === 1) {
          notification.success({
            message: currentUser ? "添加学员成功" : "新建并添加成功",
            duration: 1.5
          });
          this.setState({
            selectedRowKeys: []
          });
          this.getUserData();
          this.handleColse();
        }
      }
    });
  };
  addGroup = () => {
    this.setState({
      addGroup: {
        isShow: true
      }
    });
  };
  openRenameOrStatus = item => {
    console.log(item);
    this.setState({
      renameOrStatus: {
        isShow: true
      },
      current: item
    });
    this.props.form.setFieldsValue({
      gname: item.gname,
      status: item.status
    });
  };
  updateGroupNameOrStatus = () => {
    const { current } = this.state;
    console.log(current);
    this.props.form.validateFields((err, values) => {
      console.log(values);
      this.props.dispatch({
        type: "stageManage/updateRenameOrStatus",
        payload: {
          stage: current.stage,
          id: current.id,
          username: cookie.load("currentUser").admin,
          ...values
        },
        callback: res => {
          if (res.status === 1) {
            notification.success({
              message: "修改成功",
              duration: 1.5
            });
            this.handleColse();
            this.getData();
          }
        }
      });
    });
  };
  groupUser = item => {
    this.props.dispatch({
      type: "stageManage/downStage1GroupStuden",
      payload: {
        group_id: item.id
      }
    });
  };
  goResult = item => {
    this.props.history.push({
      pathname: "/record/stage",
      query: {
        id: item.id
      }
    });
  };
  delete = item => {
    this.props.dispatch({
      type: "stageManage/deleteGroup",
      payload: {
        id: item.id,
        username: cookie.load("currentUser").admin
      },
      callback: res => {
        if (res.status === 1) {
          notification.success({
            message: "解散成功",
            duration: 1.6
          });
          this.getData();
        }
      }
    });
  };
  openCodeModle = item => {
    this.props.dispatch({
      type: "stageManage/getCode",
      payload: {
        gid: item.id
      },
      callback: res => {
        if (res.status === 1) {
          this.setState({
            codeModle: {
              isShow: true
            },
            codeCurrent: item
          });
        }
      }
    });
  };
  getSignCode = () => {
    const username = cookie.load("currentUser").admin;
    const id = this.state.codeCurrent.id;
    this.props.dispatch({
      type: "stageManage/getSignParams",
      payload: {
        gid: id,
        username
      },
      callback: res => {
        console.log();
        if (res.status === 1) {
          this.props.dispatch({
            type: "stageManage/getSignCode",
            payload: {
              id,
              url: config.codeBaseApi + res.data
            },
            callback: res => {
              if (res.status === 1) {
                notification.success({
                  message: "二维码生成成功",
                  duration: 1.5
                });
              }
            }
          });
        }
      }
    });
  };
  getTestCode = () => {
    const username = cookie.load("currentUser").admin;
    const id = this.state.codeCurrent.id;
    this.props.dispatch({
      type: "stageManage/getTestParams",
      payload: {
        gid: id,
        username
      },
      callback: res => {
        if (res.status === 1) {
          this.props.dispatch({
            type: "stageManage/getTestCode",
            payload: {
              id,
              url: config.codeBaseApi + res.data
            },
            callback: res => {
              if (res.status === 1) {
                notification.success({
                  message: "二维码生成成功",
                  duration: 1.5
                });
              }
            }
          });
        }
      }
    });
  };
  componentDidMount() {
    this.getData();
    this.getUserData();
  }
  render() {
    const { selectedRowKeys, currentUser, tabKey } = this.state;
    const {
      getFieldDecorator,
      setFieldsValue,
      validateFields
    } = this.props.form;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const column = [
      {
        title: "分组名称",
        dataIndex: "gname",
        key: "gname"
      },
      {
        title: "小组老师",
        dataIndex: "teacher",
        key: "teacher"
      },
      {
        title: "所属阶段",
        dataIndex: "stage",
        key: "stage"
      },
      {
        title: "创建日期",
        dataIndex: "createtime",
        key: "createtime"
      },
      {
        title: "当前状态",
        dataIndex: "status",
        key: "status",
        render: value => (
          <div>
            {value === "2" && <Tag color="blue">已完成</Tag>}
            {value === "1" && <Tag color="gold">培训中</Tag>}
            {value === "0" && <Tag color="red">未开始</Tag>}
          </div>
        )
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (_, item, index) => (
          <div>
            <span className="link" onClick={() => this.openStudentList(item)}>
              查看学员
            </span>
            <span className="link" onClick={() => this.openCodeModle(item)}>
              二维码
            </span>
            <span className="link" onClick={() => this.addUser(item)}>
              添加学员
            </span>
            <span
              className="link"
              onClick={() => this.openRenameOrStatus(item)}
            >
              状态及名称编辑
            </span>
            <Popconfirm
              title="确认解散?"
              onConfirm={() => this.delete(item)}
              okText="确认"
              cancelText="取消"
            >
              <span className="link">解散</span>
            </Popconfirm>

            <span className="link" onClick={() => this.groupUser(item)}>
              导出学员信息
            </span>
            <span className="link" onClick={() => this.goResult(item)}>
              成绩查看
            </span>
          </div>
        )
      }
    ];
    const userColumn = [
      {
        title: "学员姓名",
        key: "username",
        dataIndex: "username"
      },
      {
        title: "手机号",
        key: "phone",
        dataIndex: "phone"
      },
      {
        title: "期数",
        key: "batch",
        dataIndex: "batch"
      },
      {
        title: "入职时间",
        key: "date",
        dataIndex: "date",
        sorter: (a, b) =>
          (a.date ? new Date(a.date).getTime() : 0) -
          (a.date ? new Date(b.date).getTime() : 0)
      },
      {
        title: "工号",
        key: "Worknumber",
        dataIndex: "Worknumber"
      },
      {
        title: "柜台",
        key: "counter",
        dataIndex: "counter"
      }
    ];
    console.log(this.props);
    return (
      <PageHeaderWrapper>
        <Tabs activeKey={this.state.tabKey} onChange={this.callback}>
          <TabPane tab="分组列表" key="1">
            <Table
              columns={column}
              rowKey={item => item.id}
              dataSource={this.props.stageManage.groupList}
            />
          </TabPane>
          <TabPane tab="用户添加" key="2">
            <Card title="筛选">
              <Radio.Group
                defaultValue=""
                buttonStyle="solid"
                onChange={this.radioChange}
              >
                <Radio.Button value="">默认</Radio.Button>
                <Radio.Button value="3">期数/降序</Radio.Button>
                <Radio.Button value="4">期数/升序</Radio.Button>
              </Radio.Group>
            </Card>
            <div style={{ height: "20px" }}></div>
            <Card title="搜索">
              <Row type="flex" align="middle">
                <Col align="middle" span={18}>
                  <Col style={{ lineHeight: "32px" }} span={3}>
                    搜索内容：
                  </Col>
                  <Col span={14}>
                    {tabKey == "2" && <Input onBlur={this.inputChange} />}
                  </Col>
                  <Col span={5}>
                    <Button type="primary" onClick={this.search}>
                      搜索
                    </Button>
                  </Col>
                </Col>
              </Row>
            </Card>
            <div style={{ height: "20px" }}></div>
            <Table
              columns={userColumn}
              rowKey={item => item.id}
              dataSource={this.props.stageManage.allUserList}
              rowSelection={rowSelection}
              title={() => (
                <Button
                  type="primary"
                  disabled={selectedRowKeys.length > 0 ? false : true}
                  onClick={this.addGroup}
                >
                  {currentUser ? "添加到分组" : "分组"}
                </Button>
              )}
            />
          </TabPane>
        </Tabs>
        <Modal
          visible={this.state.addGroup.isShow}
          onCancel={this.handleColse}
          title={"新建分组"}
          onOk={this.addGroupSubmit}
        >
          <Row>
            {currentUser ? (
              "确认添加到该分组吗?"
            ) : (
              <Col span={15}>
                <Col style={{ lineHeight: "32px" }} span={6}>
                  分组名称：
                </Col>
                <Col span={18}>
                  <Input onChange={this.nameChange} />
                </Col>
              </Col>
            )}
          </Row>
        </Modal>
        <Modal
          title="编辑"
          visible={this.state.renameOrStatus.isShow}
          onCancel={this.handleColse}
          onOk={this.updateGroupNameOrStatus}
        >
          <Form.Item {...formItemLayout} label="分组名称">
            {getFieldDecorator("gname", {
              rules: [{ required: true, message: "请输入组名" }]
            })(<Input placeholder="组名" autoComplete="off" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="状态">
            {getFieldDecorator("status", {
              rules: [{ required: true, message: "请输入组名" }]
            })(
              <Select>
                <Select.Option value={"0"}>未开始</Select.Option>
                <Select.Option value={"1"}>进行中</Select.Option>
                <Select.Option value={"2"}>已完成</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Modal>
        <Modal
          visible={this.state.codeModle.isShow}
          onCancel={this.handleColse}
          footer={false}
          title="二维码"
        >
          <Row>
            <Col>
              <Col style={{ textAlign: "right", lineHeight: "32px" }} span={8}>
                点击生成签到二维码：
              </Col>
              <Col span={6}>
                <Button type="primary" onClick={this.getSignCode}>
                  生成签到二维码
                </Button>
              </Col>
            </Col>
          </Row>
          <div style={{ height: "10px" }}></div>
          <Row>
            <Col>
              <Col style={{ textAlign: "right", lineHeight: "32px" }} span={8}>
                二维码：
              </Col>
              <Col span={6}>
                <div
                  style={{
                    textAlign: "center",
                    width: "202px",
                    height: "202px",
                    border: "1px dashed rgb(170, 170, 170)"
                  }}
                >
                  {/* <img style={{width: '200px'}} src={this.props.stageManage.codeData.surl}/>
                                    <span style={{lineHeight: '202px'}}>加载失败请重新生成</span> */}
                  {this.props.stageManage.signCode ? (
                    <img
                      style={{ width: "200px" }}
                      src={this.props.stageManage.signCode}
                    />
                  ) : (
                    <span style={{ lineHeight: "202px" }}>
                      加载失败请重新生成
                    </span>
                  )}
                </div>
              </Col>
            </Col>
          </Row>
          <div style={{ height: "30px" }}></div>
          <Row>
            <Col>
              <Col style={{ textAlign: "right", lineHeight: "32px" }} span={8}>
                点击生成考试二维码：
              </Col>
              <Col span={6}>
                <Button type="primary" onClick={this.getTestCode}>
                  生成考试二维码
                </Button>
              </Col>
            </Col>
          </Row>
          <div style={{ height: "10px" }}></div>
          <Row>
            <Col>
              <Col style={{ textAlign: "right", lineHeight: "32px" }} span={8}>
                二维码：
              </Col>
              <Col span={6}>
                <div
                  style={{
                    textAlign: "center",
                    width: "202px",
                    height: "202px",
                    border: "1px dashed rgb(170, 170, 170)"
                  }}
                >
                  {this.props.stageManage.testCode ? (
                    <img
                      style={{ width: "200px" }}
                      src={this.props.stageManage.testCode}
                    />
                  ) : (
                    <span style={{ lineHeight: "202px" }}>
                      加载失败请重新生成
                    </span>
                  )}
                </div>
              </Col>
            </Col>
          </Row>
        </Modal>
        <LookStudentList
          isShow={this.state.lookStudent.isShow}
          handleColse={this.handleColse}
          current={this.state.lookStudent.current}
        />
      </PageHeaderWrapper>
    );
  }
}
