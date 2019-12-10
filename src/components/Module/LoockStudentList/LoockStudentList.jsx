import React from "react";
import { connect } from "dva";
import {
  Modal,
  Table,
  Tag,
  Switch,
  Button,
  Divider,
  Popconfirm,
  notification,
  Card,
  Row,
  Col
} from "antd";
import cookie from "react-cookies";

@connect(({ stageManage, loading }) => ({
  stageManage: stageManage,
  loading: loading.effects["stageManage/groupStudentList"],
  checkLoading: loading.effects["stageManage/fetch"]
}))
export default class LookStudentList extends React.Component {
  state = {
    isShow: true,
    stage1ResultModal: {
      isShow: false,
      current: ""
    }
  };
  handleColse = () => {
    this.setState({
      stage1ResultModal: {
        isShow: false,
        current: ""
      }
    });
  };
  changeColumn = () => {
    const isShow = this.state.isShow;
    this.setState({
      isShow: !isShow
    });
  };
  downStage1 = () => {
    this.props.dispatch({
      type: "stageManage/downStage1GroupStuden",
      payload: {
        group_id: this.props.id
      }
    });
  };
  openQuestModal = item => {
    this.props.dispatch({
      type: "stageManage/lookStageOneResult",
      payload: {
        uid: item.id
      },
      callback: res => {
        if (res.status == 1) {
          this.setState({
            stage1ResultModal: {
              isShow: true,
              current: item
            }
          });
        }
      }
    });
    // this.props.form.set
  };
  downStageResult = () => {
    const id = this.state.stage1ResultModal.current.id;
    this.props.dispatch({
      type: "stageManage/downPersonResult",
      payload: {
        uid: id
      }
    });
  };
  confirm = item => {
    this.props.dispatch({
      type: "stageManage/delGroupStudent",
      payload: {
        id: item.id,
        username: cookie.load("currentUser").admin
      },
      callback: res => {
        if (res.status === 1) {
          notification.success({
            message: "删除成功",
            duration: 1.5
          });
          this.props.dispatch({
            type: "stageManage/groupStudentList",
            payload: {
              username: cookie.load("currentUser").admin,
              id: this.props.id
            }
          });
        }
      }
    });
  };
  render() {
    const { isShow, handleColse } = this.props;
    let column = [
      {
        title: "姓名",
        key: "username",
        dataIndex: "username",
        fixed: "left",
        width: 100
      },
      // {
      //   title: "编号",
      //   key: "id",
      //   dataIndex: "id"
      // },
      {
        title: "手机号",
        key: "phone",
        isShow: true,
        dataIndex: "phone"
      },
      {
        title: "柜台",
        key: "counter",
        isShow: true,
        dataIndex: "counter"
      },
      // {
      //   title: "期数",
      //   key: "batch",
      //   dataIndex: "batch"
      // },
      {
        title: "工号",
        key: "Worknumber",
        dataIndex: "Worknumber"
      },
      {
        title: "签到状态",
        key: "sign",
        dataIndex: "sign",
        sorter: (a, b) =>
          (a.sign == "true" ? 1 : 0) - (b.sign == "true" ? 1 : 0),
        render: (value, item, index) => (
          <Switch
            checked={value === "true" ? true : false}
            onChange={this.onChange}
          />
        )
      },
      {
        title: "Day1",
        key: "day1",
        dataIndex: "day1",
        sorter: (a, b) => a.day1 - b.day1
      },
      {
        title: "Day2",
        key: "day2",
        dataIndex: "day2",
        sorter: (a, b) => a.day2 - b.day2
      },
      {
        title: "Day3",
        key: "day3",
        dataIndex: "day3",
        sorter: (a, b) => a.day3 - b.day3
      },
      {
        title: "Day4",
        key: "day4",
        dataIndex: "day4",
        sorter: (a, b) => a.day4 - b.day4
      },
      {
        title: "阶段分数",
        key: "stage",
        dataIndex: "stage",
        sorter: (a, b) => a.stage - b.stage
      },
      {
        title: "学员状态",
        key: "delete",
        dataIndex: "delete",
        render: value => (
          <div>
            {value == "1" ? (
              <Tag color="red">离职</Tag>
            ) : (
              <Tag color="green">正常</Tag>
            )}
          </div>
        )
      },
      {
        title: "操作",
        key: "action",
        dataIndex: "action",
        width: 250,
        render: (_, item, index) => (
          <div>
            <span className="link" onClick={() => this.openQuestModal(item)}>
              查看阶段测试成绩
            </span>
            <Popconfirm
              title="确定删除吗?"
              onConfirm={() => this.confirm(item)}
            >
              <span className="link">删除</span>
            </Popconfirm>
          </div>
        )
      }
    ];
    if (!this.state.isShow) {
      column = column.filter(item => !item.isShow);
    }
    const questColumn = [
      {
        title: "编号",
        key: "sid",
        dataIndex: "sid"
      },
      {
        title: "题目",
        key: "title",
        dataIndex: "title"
      },
      {
        title: "正误",
        key: "judge",
        dataIndex: "judge",
        render: value => (
          <div>
            {value == "1" ? (
              <Tag color="green">正确</Tag>
            ) : (
              <Tag color="red">错误</Tag>
            )}
          </div>
        )
      },
      {
        title: "错误选项",
        key: "aid",
        dataIndex: "aid"
      }
    ];
    console.log(this.props);
    const { lookStageOneResult } = this.props.stageManage;
    return (
      <div>
        <Button className="mr20" type="primary" onClick={this.downStage1}>
          导出成绩
        </Button>
        <Button type="primary" onClick={this.changeColumn}>
          {this.state.isShow ? "隐藏手机柜台" : "显示手机柜台"}
        </Button>

        <Divider />
        <Table
          title={() => (
            <Card title="小组信息">
              <span className="mr20">
                小组人数：{this.props.stageManage.groupDetail.total}
              </span>
              <span>分组名称：{this.props.stageManage.groupDetail.gname}</span>
            </Card>
          )}
          columns={column}
          dataSource={this.props.stageManage.groupStudentList}
          scroll={{ y: 300, x: 1600 }}
          pagination={false}
          rowKey={item => item.id}
          loading={this.props.loading}
        />

        {this.state.stage1ResultModal.isShow && (
          <Modal
            title={"阶段测试成绩查看"}
            visible={this.state.stage1ResultModal.isShow}
            onCancel={this.handleColse}
            width={1200}
            footer={null}
          >
            <Card>
              <Row>
                <Col span={4}>姓名: {lookStageOneResult.username}</Col>
                <Col span={4}>工号: {lookStageOneResult.Worknumber}</Col>
                <Col span={4}>期数: {lookStageOneResult.batch}</Col>
                <Col span={4}>
                  <div>
                    测试成绩:{" "}
                    <span
                      style={{
                        color: lookStageOneResult.total >= 60 ? "blue" : "red"
                      }}
                    >
                      {lookStageOneResult.total}
                    </span>
                  </div>
                </Col>
                <Col span={4}>
                  <Button type="primary" onClick={this.downStageResult}>
                    导出成绩
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={4}>总准确率: {lookStageOneResult.all_accuracy}%</Col>
                {lookStageOneResult.cate.map(item => (
                  <Col key={item.id} span={4}>
                    {item.title}准确率: {item.accuracy}%
                  </Col>
                ))}
                {/* <Col span={4}>彩妆准确率: 89%</Col>
                <Col span={4}>护肤准确率: 89%</Col>
                <Col span={4}>香水准确率: 89%</Col> */}
              </Row>
              <div className="h30"></div>
              <Table
                columns={questColumn}
                dataSource={
                  lookStageOneResult.list ? lookStageOneResult.list : []
                }
              />
            </Card>
          </Modal>
        )}
      </div>
    );
  }
}
