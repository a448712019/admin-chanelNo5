import React from 'react';
import { connect } from 'dva'
import { Row, Col, Input, Select, Form,  Table, Tag, Descriptions, Popconfirm, Button, notification } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import EditUser from '@/components/Module/EditUser/EditUser'

const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
};

@connect(({ userManage, loading }) => ({
    userManage: userManage,
}))
@Form.create()
export default class UserManage extends React.Component{
    state = {
        search: {
            keyword: '',
            pageSize: 20,
            page: 1,
            sort: '',
        },
        editUserModle: {
            isShow: false,
        }
    }
    handleColse = () => {
        this.setState({
            editUserModle: {
                isShow: false,
            } 
        })
    }
    getData = () => {
        const search = this.state.search
        this.props.dispatch({
            type: 'userManage/fetch',
            payload: {
                ...search
            }
        })
    }
    pageChange = (json) => {
        const search = this.state.search
        this.setState({
            search: {
                ...search,
                ...json,
            }
        }, () => {
            this.getData()
        })
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if(!values.sort)values.sort = '';
            if(!values.keyword)values.keyword = '';
            this.setState({
                search: {
                    ...this.state.search,
                    ...values
                }
            }, () => {
                this.getData()
            })
        })
    }
    openUserDetail = (item) => {
        this.props.dispatch({
            type: 'userManage/detail',
            payload: {
                id: item.id
            },
            callback: (res) => {
                console.log(res)
                if(res.status === 1){
                    this.setState({
                        editUserModle: {
                            isShow: true
                        }
                    })
                }
            }
        })
    }
    delect = (item) => {
        this.props.dispatch({
            type: 'userManage/leaveUser',
            payload: {
                id: item.id
            },
            callback: (res) => {
                if(res.status === 1) {
                    notification.success({
                        message: '操作成功',
                        duration: 1.5
                    })
                    this.getData()
                }
            }
        })
    }
    down = (type) => {
        if(type === 'templete'){
            this.props.dispatch({
                type: 'userManage/downTemplete'
            })
        }else if(type === 'all'){
            this.props.dispatch({
                type: 'userManage/downAll'
            })
        }else if(type === 'stage1'){
            this.props.dispatch({
                type: 'userManage/downStage1'
            })
        }else if(type === 'stage2'){
            this.props.dispatch({
                type: 'userManage/downStage2'
            })
        }else if(type === 'stage3'){
            this.props.dispatch({
                type: 'userManage/downStage3'
            })
        }
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        const column = [
            {
                title: '姓名',
                key: 'username',
                dataIndex: 'username',
            },
            {
                title: '手机号',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '工号',
                key: 'userId',
                dataIndex: 'userId',
            },
            {
                title: '柜台',
                key: 'counter',
                dataIndex: 'counter',
            },
            {
                title: '期数',
                key: 'batch',
                dataIndex: 'batch',
            },
            {
                title: '入职时间',
                key: 'date',
                dataIndex: 'date',
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'action',
                render: (_, item, index) => (
                    <div>
                        <span className='link' onClick={() => this.openUserDetail(item)}>查看或编辑</span>
                        <Popconfirm
                            title="确认离职?"
                            onConfirm={() => this.delect(item)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <span className='link'>离职</span>
                        </Popconfirm>
                    </div>
                )
            },
            {
                title: '',
                key: '',
                dataIndex: '',
            },
            {
                title: '',
                key: '',
                dataIndex: '',
            },
        ]
        const { getFieldDecorator,setFieldsValue, validateFields } = this.props.form
        const action = (
            <div>
                <Button className='m10' onClick={() => this.down('templete')} type='primary'>模板下载</Button>
                <Button className='m10' onClick={() => this.down('all')} type='primary'>导出</Button>
                <Button className='m10' type='primary'>上传文件</Button>
                <Button className='m10' onClick={() => this.down('stage1')} type='primary'>导出第一阶段</Button>
                <Button className='m10' onClick={() => this.down('stage2')} type='primary'>导出第二阶段</Button>
                <Button className='m10' onClick={() => this.down('stage3')} type='primary'>导出第三阶段</Button>
            </div>
        )
        const allClassL = [
            {
              label: "入职时间/降序",
              value: "1",
            },
            {
              label: "入职时间/升序",
              value: "2",
            },
            {
              label: "期数/降序",
              value: "3",
            },
            {
              label: "期数/升序",
              value: "4",
            },
        ];
        return (
            <PageHeaderWrapper extra={action}>
                <Row>
                    <Col span={8}>
                        <Form.Item {...formItemLayout} label='搜索内容'>
                            {getFieldDecorator('keyword')(
                                <Input
                                autoComplete="off"
                                />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item {...formItemLayout} label='筛选'>
                            {getFieldDecorator('sort')(
                                <Select>
                                    <Select.Option value=''>全部</Select.Option>
                                    {allClassL.map(item => <Select.Option value={item.value}>{item.label}</Select.Option>)}
                                </Select>,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Button style={{marginLeft: '20px'}} onClick={this.handleSubmit} type='primary'>搜索</Button>
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
                        onChange: (value) => this.pageChange({page: value})
                    }}
                />
                {this.state.editUserModle.isShow && (
                    <EditUser 
                        isShow={this.state.editUserModle.isShow}
                        handleColse={this.handleColse}
                    />
                )}
            </PageHeaderWrapper>
        )
    }
}