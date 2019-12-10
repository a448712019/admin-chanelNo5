import React from "react";
import { connect } from "dva";
import {
  Row,
  Col,
  Select,
  Statistic,
  Icon,
  List,
  Divider,
  Table,
  Tag,
  Descriptions
} from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ErrorModle from "@/components/Module/ErrorModle/ErrorModle";
@connect(({ record, loading }) => ({
  record: record
}))
export default class StageRecord extends React.Component {
  state = {
    gid: "",
    errorModle: {
      isShow: false,
      current: ""
    }
  };
  handleColse = () => {
    this.setState({
      errorModle: {
        isShow: false,
        current: ""
      }
    });
  };
  getData = () => {
    this.props.dispatch({
      type: "record/errorTop5List",
      payload: {
        type: "more"
      }
    });
  };
  getSortData = json => {
    let gid = this.state.gid;
    this.props.dispatch({
      type: "record/sortList",
      payload: {
        gid,
        ...json
      }
    });
  };
  getGroup = () => {
    this.props.dispatch({
      type: "record/getGroup"
    });
  };
  handleChange = value => {
    this.setState(
      {
        gid: value
      },
      () => {
        this.getSortData();
      }
    );
  };
  formateTime = value => {
    if (!value) return;
    let hourse, miniter, second;
    if (value > 3600) {
      hourse = parseInt(value / 3600);
      miniter = parseInt((value - 3600 * hourse) / 60);
      second = parseInt((value - 3600 * hourse - 60 * miniter) / 1);
    } else if (value > 60) {
      miniter = parseInt(value / 60);
      second = parseInt((value - miniter * 60) / 1);
    } else {
      second = parseInt(value / 1);
    }

    return (
      (hourse ? `${hourse}h` : "") +
      (miniter ? `${miniter}min` : "") +
      `${second}s`
    );
  };
  downError = item => {
    console.log(item);
    this.props.dispatch({
      type: "record/downError",
      payload: {
        sid: item.subject.id
      }
    });
  };
  openErrorDetail = item => {
    const errorData = this.state.errorModle;
    console.log(item);
    this.setState({
      errorModle: {
        ...errorData,
        current: item,
        isShow: true
      }
    });
  };
  componentDidMount() {
    let id = this.props.location.query.id;
    if (id) {
      this.getSortData({ gid: id });
      this.setState({
        gid: id
      });
    } else {
      this.getSortData();
    }
    this.getData();
    this.getGroup();
  }

  render() {
    console.log(this.props);
    const sortData = this.props.record.sortData;
    let column = [
      {
        title: "编号",
        dataIndex: "id",
        key: "id",
        width: 80,
        render: (_, item) => <div>{item.subject.id}</div>
      },
      {
        title: "题目",
        dataIndex: "title",
        key: "title",
        width: 300,
        render: (_, item) => <div>{item.subject.title}</div>
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        width: 80,
        render: (_, item) => (
          <div>
            {item.subject.status == 1 ? (
              <Tag color="blue">开启</Tag>
            ) : (
              <Tag color="red">关闭</Tag>
            )}
          </div>
        )
      },
      {
        title: "错题率",
        dataIndex: "err",
        key: "err",
        width: 80,
        render: (_, item) => <div>{item.error_rate + "%"}</div>
      },
      {
        title: "被答次数",
        dataIndex: "second",
        key: "second",
        width: 120
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (_, item) => (
          <div>
            <span className="link" onClick={() => this.openErrorDetail(item)}>
              错题记录
            </span>
            <span className="link" onClick={() => this.downError(item)}>
              单题错误记录导出
            </span>
          </div>
        )
      }
    ];
    console.log(sortData);
    return (
      <PageHeaderWrapper>
        <Row type="flex" justify="space-between">
          <Col span={13}>
            <Col span={18}>
              <Select
                placeholder="请选择期数"
                onChange={this.handleChange}
                value={this.state.gid}
                defaultValue={0}
              >
                <Select.Option value={0}>全部</Select.Option>
                {this.props.record.groupList.map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.gname}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={10} style={{ marginTop: "20px" }}>
              <Statistic
                title="参加人数"
                value={sortData.participants}
                prefix={<Icon type="user" />}
              />
            </Col>
            <Col span={10} style={{ marginTop: "20px" }}>
              <Statistic
                title="平均成绩"
                value={sortData.average}
                prefix={<Icon type="smile" />}
              />
            </Col>
            <Col span={10} style={{ marginTop: "20px" }}>
              <Statistic
                title="已完成人数"
                value={sortData.allparticipants}
                prefix={<Icon type="check-square" />}
              />
            </Col>
            <Col span={10} style={{ marginTop: "20px" }}>
              <Statistic
                title="平均用时"
                value={this.formateTime(sortData.averageTime)}
                prefix={<Icon type="clock-circle" />}
              />
            </Col>
            <Col span={10} style={{ marginTop: "20px" }}>
              <Statistic
                title="最短用时"
                value={
                  sortData ? this.formateTime(sortData.alltime.timepoor) : ""
                }
                prefix={<Icon type="clock-circle" />}
              />
            </Col>
            <Col span={10} style={{ marginTop: "20px" }}>
              <Statistic
                title="小组正确率"
                value={sortData ? `${sortData.cate.group_accuracy}%` : ""}
                prefix={<Icon type="check" />}
              />
            </Col>
            {sortData ? (
              <div>
                {sortData.cate ? (
                  <div>
                    {sortData.cate.catelist.map(item => (
                      <Col span={10} style={{ marginTop: "20px" }}>
                        <Statistic
                          title={`${item.title}正确率`}
                          value={`${item.accuracy}%`}
                          key={item.id}
                          prefix={<Icon type="check" />}
                        />
                      </Col>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : null}
            
          </Col>
          <Col span={11}>
            <List
              title="分数排行榜"
              style={{
                height: "280px",
                overflow: "hidden",
                overflowY: "scroll",
                width: "400px"
              }}
              bordered={true}
              header={<div style={{ textAlign: "center" }}>分数排行榜</div>}
              dataSource={this.props.record.sortList}
              renderItem={(item, index) => (
                <List.Item key={item.index}>
                  <List.Item.Meta title={item.username} />
                  <div>{item.total}</div>
                </List.Item>
              )}
            />
          </Col>
          <Divider />
        </Row>
        <Table
          title={() => <h3>错题排行榜</h3>}
          columns={column}
          rowKey={item => item.subject.id}
          dataSource={this.props.record.top5List}
          pagination={false}
          scroll={{ y: 300, x: 1100 }}
        />
        {this.state.errorModle.isShow && (
          <ErrorModle
            isShow={this.state.errorModle.isShow}
            handleColse={this.handleColse}
            current={this.state.errorModle.current}
          />
        )}
      </PageHeaderWrapper>
    );
  }
}
