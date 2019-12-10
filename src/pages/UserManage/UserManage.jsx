import React from "react";
import { connect } from "dva";
import {
  Row,
  Col,
  Input,
  Select,
  Form,
  Table,
  Modal,
  Tag,
  Descriptions,
  Popconfirm,
  Button,
  notification,
  Upload,
  Transfer,
  Switch,
  Card
} from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import EditUser from "@/components/Module/EditUser/EditUser";
import styles from "./index.less";
import difference from "lodash/difference";

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 }
};
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection = {
        //   getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              onItemSelect(key, !listSelectedKeys.includes(key));
            }
          })}
        />
      );
    }}
  </Transfer>
);
const leftTableColumns = [
  {
    dataIndex: "username",
    title: "姓名",
    key: "username"
  },
  {
    dataIndex: "phone",
    title: "手机号",
    key: "phone"
  },
  {
    dataIndex: "Worknumber",
    title: "工号",
    key: "Worknumber"
  }
];
//   const rightTableColumns = [
//     {
//       dataIndex: 'title',
//       title: 'Name',
//     },
//   ];
@connect(({ userManage, loading }) => ({
  userManage: userManage
}))
@Form.create()
export default class UserManage extends React.Component {
  state = {
    search: {
      keyword: "",
      pageSize: 20,
      page: 1,
      sort: ""
    },
    editUserModle: {
      isShow: false
    },
    selUserModal: {
      isShow: false
    },

    targetKeys: [],
    disabled: false,
    showSearch: false,
    keyword: ""
  };
  onChange = (nextTargetKeys, direction) => {
    console.log(nextTargetKeys, direction);
    if (direction === "left") {
      this.setState({ targetKeys: nextTargetKeys });
      return;
    }
    const uploadUser = this.props.userManage.uploadUser;
    let selUser = [];
    uploadUser.forEach(item => {
      if (nextTargetKeys.indexOf(item.key) >= 0) {
        selUser.push(item);
      }
    });

    // selUser.forEach(item => {
    //   item.batch = keyword;
    //   delete item.key;
    // });
    console.log(selUser);
    const key = `open${Date.now()}`;
    let disableArr = selUser.filter(item => item.status);
    console.log(disableArr);
    if (disableArr.length > 0) {
      notification.open({
        message: "分期失败",
        duration: null,
        description: (
          <div className={styles.cardBox}>
            {disableArr.map((item, index) => (
              <Card key={index} bordered={false} key={index}>
                <div>
                  {item.username} {item.phone}
                </div>
                <div>已有期数 {item.batch}</div>
                {item.delete == "1" && <div>用户状态: 已离职</div>}
              </Card>
            ))}

            <div style={{ color: "red" }}>是否进行覆盖</div>
          </div>
        ),
        btn: (
          <Button
            type="primary"
            onClick={() => this.nextChange(nextTargetKeys, key)}
          >
            进行覆盖
          </Button>
        ),
        colse: <Button>取消</Button>,
        key
      });
    } else {
      this.setState({ targetKeys: nextTargetKeys });
    }
    // this.props.dispatch({
    //   type: "userManage/submitUser",
    //   payload: {
    //     screen: JSON.stringify(selUser)
    //   },
    //   callback: res => {
    //     if (res.status == 1) {
    //       this.handleColse();
    //       this.getData();
    //     }
    //     notification.info({
    //       message: res.message,
    //       duration: 1.5
    //     });
    //   }
    // });
    console.log(nextTargetKeys);
  };
  nextChange = (nextTargetKeys, key) => {
    this.setState({ targetKeys: nextTargetKeys });
    notification.close(key);
  };
  submitUser = () => {
    const { targetKeys, keyword } = this.state;
    const uploadUser = this.props.userManage.uploadUser;

    console.log(targetKeys, keyword);
    if (targetKeys.length <= 0) {
      notification.info({
        message: "请至少选择一个用户",
        duration: 1.5
      });
      return;
    }
    if (!keyword) {
      notification.info({
        message: "请输入期数",
        duration: 1.5
      });
      return;
    }
    let selUser = [];
    uploadUser.forEach(item => {
      if (targetKeys.indexOf(item.key) >= 0) {
        selUser.push(item);
      }
    });
    selUser.forEach(item => {
      item.batch = keyword;
      delete item.key;
    });
    console.log(selUser);
    const key = `open${Date.now()}`;
    let disableArr = selUser.filter(item => item.status);
    console.log(disableArr);

    let obj = {};
    let keyArr = Object.keys(selUser[0]);
    selUser.forEach((item, index) => {
      // obj[`[${0}][${}]`]
      keyArr.forEach(items => {
        obj[`screen[${index}][${items}]`] = item[items];
      });
    });
    console.log(obj);
    this.props.dispatch({
      type: "userManage/submitUser",
      payload: {
        ...obj
      },
      callback: res => {
        if (res.status == 1) {
          this.handleColse();
          this.getData();
          this.setState({ targetKeys: [] });
        }
        notification.info({
          message: res.message,
          duration: 1.5
        });
      }
    });
  };
  handleColse = () => {
    this.setState({
      editUserModle: {
        isShow: false
      },
      selUserModal: {
        isShow: false
      }
    });
  };
  getData = () => {
    const search = this.state.search;
    this.props.dispatch({
      type: "userManage/fetch",
      payload: {
        ...search
      }
    });
  };
  pageChange = json => {
    const search = this.state.search;
    this.setState(
      {
        search: {
          ...search,
          ...json
        }
      },
      () => {
        this.getData();
      }
    );
  };
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!values.sort) values.sort = "";
      if (!values.keyword) values.keyword = "";
      this.setState(
        {
          search: {
            ...this.state.search,
            ...values
          }
        },
        () => {
          this.getData();
        }
      );
    });
  };
  openUserDetail = item => {
    this.props.dispatch({
      type: "userManage/detail",
      payload: {
        id: item.id
      },
      callback: res => {
        console.log(res);
        if (res.status === 1) {
          this.setState({
            editUserModle: {
              isShow: true
            }
          });
        }
      }
    });
  };
  delect = item => {
    this.props.dispatch({
      type: "userManage/leaveUser",
      payload: {
        id: item.id
      },
      callback: res => {
        if (res.status === 1) {
          notification.success({
            message: "操作成功",
            duration: 1.5
          });
          this.getData();
        }
      }
    });
  };
  beforeUpload = file => {
    console.log(file);
    this.props.dispatch({
      type: "userManage/uploadUser",
      payload: {
        filename: file,
        name: file.name
      },
      callback: res => {
        console.log(res);
        if (res.code == 0) {
          this.setState({
            selUserModal: {
              isShow: true
            }
          });
        }
        // notification.success({
        //   message: res.message,
        //   duration: 1.5
        // });
      }
    });
  };
  numChange = e => {
    console.log(e);
    this.setState({
      keyword: e.target.value
    });
  };
  down = type => {
    if (type === "templete") {
      this.props.dispatch({
        type: "userManage/downTemplete"
      });
    } else if (type === "all") {
      this.props.dispatch({
        type: "userManage/downAll"
      });
    } else if (type === "stage1") {
      this.props.dispatch({
        type: "userManage/downStage1"
      });
    } else if (type === "stage2") {
      this.props.dispatch({
        type: "userManage/downStage2"
      });
    } else if (type === "stage3") {
      this.props.dispatch({
        type: "userManage/downStage3"
      });
    }
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const column = [
      {
        title: "姓名",
        key: "username",
        dataIndex: "username"
      },
      {
        title: "手机号",
        key: "phone",
        dataIndex: "phone"
      },
      {
        title: "工号",
        key: "userId",
        dataIndex: "userId"
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
        title: "入职时间",
        key: "date",
        dataIndex: "date"
      },
      {
        title: "操作",
        key: "action",
        dataIndex: "action",
        render: (_, item, index) => (
          <div>
            <span className="link" onClick={() => this.openUserDetail(item)}>
              查看或编辑
            </span>
            <Popconfirm
              title="确认离职?"
              onConfirm={() => this.delect(item)}
              okText="确认"
              cancelText="取消"
            >
              <span className="link">离职</span>
            </Popconfirm>
          </div>
        )
      },
      {
        title: "",
        key: "",
        dataIndex: ""
      },
      {
        title: "",
        key: "",
        dataIndex: ""
      }
    ];
    const {
      getFieldDecorator,
      setFieldsValue,
      validateFields
    } = this.props.form;
    const action = (
      <div className={styles.userManageAction}>
        <Button
          className="m10"
          onClick={() => this.down("templete")}
          type="primary"
        >
          模板下载
        </Button>
        <Button className="m10" onClick={() => this.down("all")} type="primary">
          导出
        </Button>
        <Upload name="file" beforeUpload={this.beforeUpload}>
          <Button className="m10" type="primary">
            上传文件
          </Button>
        </Upload>
        <Button
          className="m10"
          onClick={() => this.down("stage1")}
          type="primary"
        >
          导出第一阶段
        </Button>
        <Button
          className="m10"
          onClick={() => this.down("stage2")}
          type="primary"
        >
          导出第二阶段
        </Button>
        <Button
          className="m10"
          onClick={() => this.down("stage3")}
          type="primary"
        >
          导出第三阶段
        </Button>
      </div>
    );
    const allClassL = [
      {
        label: "入职时间/降序",
        value: "1"
      },
      {
        label: "入职时间/升序",
        value: "2"
      },
      {
        label: "期数/降序",
        value: "3"
      },
      {
        label: "期数/升序",
        value: "4"
      }
    ];
    const { targetKeys, disabled, showSearch } = this.state;
    return (
      <PageHeaderWrapper extra={action}>
        <Row>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="搜索内容">
              {getFieldDecorator("keyword")(<Input autoComplete="off" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} label="筛选">
              {getFieldDecorator("sort")(
                <Select>
                  <Select.Option value="">全部</Select.Option>
                  {allClassL.map((item, index) => (
                    <Select.Option key={index} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item>
              <Button
                style={{ marginLeft: "20px" }}
                onClick={this.handleSubmit}
                type="primary"
              >
                搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Table
          columns={column}
          rowKey={item => item.id}
          dataSource={this.props.userManage.list}
          pagination={{
            pageSize: 20,
            total: parseInt(this.props.userManage.total),
            hideOnSinglePage: true,
            onChange: value => this.pageChange({ page: value })
          }}
        />
        {this.state.selUserModal.isShow && (
          <Modal
            width={1000}
            visible={this.state.selUserModal.isShow}
            onCancel={this.handleColse}
            onOk={this.submitUser}
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>用户分期</div>
                <Input
                  value={this.state.keyword}
                  onChange={this.numChange}
                  placeholder="请填写期数"
                  style={{ width: "200px", marginRight: "20px" }}
                />
              </div>
            }
          >
            <div>
              <TableTransfer
                dataSource={this.props.userManage.uploadUser}
                targetKeys={targetKeys}
                showSearch={true}
                filterOption={(inputValue, item) =>
                  item.username.indexOf(inputValue) !== -1 ||
                  item.Worknumber.indexOf(inputValue) !== -1 ||
                  item.phone.indexOf(inputValue) !== -1
                }
                onChange={this.onChange}
                leftColumns={leftTableColumns}
                rightColumns={leftTableColumns}
              />
            </div>
          </Modal>
        )}
        {this.state.editUserModle.isShow && (
          <EditUser
            isShow={this.state.editUserModle.isShow}
            handleColse={this.handleColse}
          />
        )}
      </PageHeaderWrapper>
    );
  }
}
