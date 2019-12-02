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
  notification
} from "antd";
import cookie from "react-cookies";

@connect(({ stageManage, loading }) => ({
  stageManage: stageManage,
  loading: loading.effects["stageManage/groupStudentList"],
  checkLoading: loading.effects["stageManage/fetch"]
}))
export default class LookStudentList extends React.Component {
  downStage1 = () => {
    this.props.dispatch({
      type: "stageManage/downStage1GroupStuden",
      payload: {
        group_id: this.props.id
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
    const column = [
      {
        title: "姓名",
        key: "username",
        dataIndex: "username",
        fixed: "left",
        width: 100
      },
      {
        title: "编号",
        key: "id",
        dataIndex: "id"
      },
      {
        title: "手机号",
        key: "phone",
        dataIndex: "phone"
      },
      {
        title: "柜台",
        key: "counter",
        dataIndex: "counter"
      },
      {
        title: "期数",
        key: "batch",
        dataIndex: "batch"
      },
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
            {value == "0" ? (
              <Tag color="green">正常</Tag>
            ) : (
              <Tag color="red">离职</Tag>
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
    return (
      <div>
        <Button type="primary" onClick={this.downStage1}>
          导出成绩
        </Button>
        <Divider />
        <Table
          columns={column}
          dataSource={this.props.stageManage.groupStudentList}
          scroll={{ y: 300, x: 1600 }}
          pagination={false}
          rowKey={item => item.id}
          loading={this.props.loading}
        />
      </div>
    );
  }
}
