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
  stageManage: stageManage
}))
export default class LookTransitionStudentList extends React.Component {
  state = {
    selectedRowKeys: []
  };
  onSelectChange = value => {
    console.log(value);
    this.setState({
      selectedRowKeys: value
    });
  };
  radioChange = (item, index, type) => {
    const username = cookie.load("currentUser").admin;
    console.log(item);
    this.props.dispatch({
      type: "stageManage/changeWeekStatus",
      payload: {
        sign: type,
        id: item.id,
        username
      },
      callback: res => {
        if (res.status === 1) {
          this.getData();
        }
      }
    });
  };
  getData = () => {
    console.log("123xs");
    let username = cookie.load("currentUser").admin;
    this.props.dispatch({
      type: "stageManage/getTransitionGroupList",
      payload: {
        username,
        id: this.props.id
      }
    });
  };
  changeAllwo = item => {
    let username = cookie.load("currentUser").admin;
    this.props.dispatch({
      type: "stageManage/changeAllow",
      payload: {
        id: item.id,
        username
      },
      callback: res => {
        if (res.status == "1") {
          notification.success({
            message: "操作成功",
            duration: 1.5
          });
          this.getData();
        } else {
          notification.info({
            message: res.message,
            duration: 1.5
          });
        }
      }
    });
  };
  changeAllwos = () => {
    let { selectedRowKeys } = this.state;
    let obj = {};
    selectedRowKeys.forEach((item, index) => {
      obj[`id[${index}]`] = item;
    });
    let username = cookie.load("currentUser").admin;
    this.props.dispatch({
      type: "stageManage/changeAllows",
      payload: {
        ...obj,
        username
      },
      callback: res => {
        if (res.status == "1") {
          notification.success({
            message: "操作成功",
            duration: 1.5
          });
          this.getData();
        } else {
          notification.info({
            message: res.message,
            duration: 1.5
          });
        }
      }
    });
  };
  confirm = item => {
    this.props.dispatch({
      type: "stageManage/delTransition",
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
          this.getData();
        }
      }
    });
  };
  componentDidMount() {
    this.getData();
  }
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
        title: "第一轮实战",
        key: "work1",
        dataIndex: "work1",
        sorter: (a, b) => a.work1 - b.work1
      },
      {
        title: "第二轮实战",
        key: "work2",
        dataIndex: "work2",
        sorter: (a, b) => a.work2 - b.work2
      },
      {
        title: "第一轮实战",
        key: "work3",
        dataIndex: "work3",
        sorter: (a, b) => a.work3 - b.work3
      },
      {
        title: "状态",
        children: [
          {
            title: "学员状态",
            dataIndex: "delete",
            key: "delete",
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
            title: "W1",
            key: "w1",
            dataIndex: "w1",
            sorter: (a, b) => a.wsign.w1 - b.wsign.w1,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "1")}
                  checked={item.wsign.w1 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W2",
            key: "w2",
            dataIndex: "w2",
            sorter: (a, b) => a.wsign.w2 - b.wsign.w2,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "2")}
                  checked={item.wsign.w2 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W3",
            key: "w3",
            dataIndex: "w3",
            sorter: (a, b) => a.wsign.w3 - b.wsign.w3,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "3")}
                  checked={item.wsign.w3 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W4",
            key: "w4",
            dataIndex: "w4",
            sorter: (a, b) => a.wsign.w4 - b.wsign.w4,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "4")}
                  checked={item.wsign.w4 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W5",
            key: "w5",
            dataIndex: "w5",
            sorter: (a, b) => a.wsign.w5 - b.wsign.w5,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "5")}
                  checked={item.wsign.w5 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W6",
            key: "w6",
            dataIndex: "w6",
            sorter: (a, b) => a.wsign.w6 - b.wsign.w6,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "6")}
                  checked={item.wsign.w6 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W7",
            key: "w7",
            dataIndex: "w7",
            sorter: (a, b) => a.wsign.w7 - b.wsign.w7,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "7")}
                  checked={item.wsign.w7 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W8",
            key: "w8",
            dataIndex: "w8",
            sorter: (a, b) => a.wsign.w8 - b.wsign.w8,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "8")}
                  checked={item.wsign.w8 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W9",
            key: "w9",
            dataIndex: "w9",
            sorter: (a, b) => a.wsign.w9 - b.wsign.w9,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "9")}
                  checked={item.wsign.w9 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W10",
            key: "w10",
            dataIndex: "w10",
            sorter: (a, b) => a.wsign.w10 - b.wsign.w10,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "10")}
                  checked={item.wsign.w10 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W11",
            key: "w11",
            dataIndex: "w11",
            sorter: (a, b) => a.wsign.w11 - b.wsign.w11,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "11")}
                  checked={item.wsign.w11 == "1" ? true : false}
                />
              </div>
            )
          },
          {
            title: "W12",
            key: "w12",
            dataIndex: "w12",
            sorter: (a, b) => a.wsign.w12 - b.wsign.w12,
            render: (_, item, index) => (
              <div>
                <Switch
                  onChange={() => this.radioChange(item, index, "12")}
                  checked={item.wsign.w12 == "1" ? true : false}
                />
              </div>
            )
          }
        ]
      },
      // {
      //     title: '进入STAGE2',
      //     key: 'delete',
      //     dataIndex: 'delete',
      //     render: value => (
      //         <div>
      //             {value == '0' ? <Tag color="green">正常</Tag> : <Tag color='red'>离职</Tag>}
      //         </div>
      //     )
      // },
      {
        title: "进入STAGE2",
        key: "action",
        dataIndex: "action",
        width: 200,
        render: (_, item, index) => (
          <div>
            {cookie.load("currentUser").admin === "admin" && (
              <Popconfirm
                title="确定通过吗?"
                onConfirm={() => this.changeAllwo(item)}
              >
                <Button
                  className="m10"
                  disabled={item.adopt == "1" ? true : false}
                  type="primary"
                >
                  {item.adopt == "1" ? "已通过" : "通过"}
                </Button>
              </Popconfirm>
            )}
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
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div>
        <Popconfirm title="确定通过吗?" onConfirm={() => this.changeAllwos()}>
          <Button disabled={selectedRowKeys > 0 ? false : true} type="primary">
            通过
          </Button>
        </Popconfirm>
        <div style={{ height: "10px" }}></div>
        <Table
          columns={column}
          dataSource={this.props.stageManage.getTransitionGroupList}
          scroll={{ y: 300, x: 2900 }}
          pagination={false}
          rowKey={item => item.id}
          loading={this.props.loading}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}
