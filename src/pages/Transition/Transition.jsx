import React from 'react'
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Tree, Tag, Tabs, Popconfirm, Card, Radio, Input, Row, Col, Form, Button, Modal, notification, Select } from 'antd'
import cookie from 'react-cookies'
import LookTransitionStudentList from '@/components/Module/LookTransitionStudentList/LookTransitionStudentList'
import styles from  './index.less'

const { TabPane } = Tabs;
const { TreeNode } = Tree;
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
};

@connect(({ stageManage, loading }) => ({
    stageManage: stageManage,
}))
@Form.create()
export default class Transition extends React.Component{
    state = {
        tabKey : '1',
        lookStudent: {
            isShow: false
        },
        renameOrStatus: {
            isShow: false
        },
        current: '',
        currentUser: '',
        checkedKeys: [],
        addGroup: {
            isShow: false
        },
        groupName: '',
        currentStatus: '',
    }
    handleColse = () => {
        this.setState({
            lookStudent: {
                isShow: false,
                current: '',
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
            
        })
    }
    addGroup = () => {
        this.setState({
            addGroup: {
                isShow: true
            }
        })
    }
    getData = () => {
        this.props.dispatch({
            type: 'stageManage/getTransitionList',
        })
    }
    getTransitionUserData = () => {
        this.props.dispatch({
            type: 'stageManage/noTransitionGroup',
            payload: {
                username: cookie.load('currentUser').admin
            }
        })
    }
    openStudentList = (item) => {
        this.setState({
            lookStudent: {
                isShow: true,
            },
            current: item
        })
    }
    callback = (value) => {
        this.setState({
            tabKey: value,
            currentUser: ''
        })
        if(value === '1'){
            this.getData()
        }
    }
    addUser = (item) => {
        this.setState({
            tabKey: '2',
            currentUser: item.id
        })
    }
    nameChange = (e) => {
        this.setState({
            groupName: e.target.value
        })
    }
    addGroupSubmit = () => {
        const {checkedKeys, currentUser, groupName} = this.state;
        const username = cookie.load('currentUser').admin;
        let obj = {}
        if(checkedKeys.length > 0){
            checkedKeys.forEach((item, index) => {
                if(item > 0){
                    obj[`id[${index}]`] = item
                }
                
            })
        }else{
            notification.info({
                message: '请选择学员',
                duration: 1.5
            })
        }
        

        this.props.dispatch({
            type: 'stageManage/addTransitionGroup',
            payload: {
                groupid: currentUser ? currentUser : 'create',
                username,
                gname: groupName,
                ...obj
            },
            callback:(res) => {
                if(res.status === 1){
                    notification.success({
                        message: currentUser ? '添加学员成功' : '新建并添加成功',
                        duration: 1.5
                    })
                    this.setState({
                        checkedKeys: []
                    })
                    this.getTransitionUserData()
                    this.handleColse()

                }
            }
        })
    }
    groupUser = (item) => {
        this.props.dispatch({
            type: 'stageManage/downTransition',
            payload: {
                group_id: item.id
            }
        })
    }
    onSelect = (selectedKeys) => {
        console.log(selectedKeys)
    }
    openRenameOrStatus = (item) => {
        console.log(item)
        this.setState({
            renameOrStatus: {
                isShow: true,
            },
            currentStatus: item
        })
        this.props.form.setFieldsValue({
            gname: item.gname,
            status: item.status,
            
        })
       
    }
    delete = (item) => {
        this.props.dispatch({
            type: 'stageManage/delTransitionGroup',
            payload: {
                id: item.id,
                username: cookie.load('currentUser').admin
            },
            callback: (res) => {
                if(res.status === 1){
                    notification.success({
                        message: '解散成功',
                        duration: 1.6
                    })
                    this.getData()
                }
            }
        })
    }
    updateGroupNameOrStatus = () => {
        const { currentStatus } = this.state;
        console.log(currentStatus)
        this.props.form.validateFields((err, values) => {
            console.log(values)
            this.props.dispatch({
                type: 'stageManage/addTransitionStatus',
                payload: {
                    stage: currentStatus.stage,
                    id: currentStatus.id,
                    username: cookie.load('currentUser').admin,
                    ...values
                },
                callback: (res) => {
                    if(res.status === 1){
                        notification.success({
                            message: '修改成功',
                            duration: 1.5
                        })
                        this.handleColse()
                        this.getData()
                    }
                }
            })
        })
    }
    onCheck = (checkedKeys) => {
        console.log(checkedKeys)
        this.setState({
            checkedKeys
        })
    }
    componentDidMount() {
        this.getData()
        this.getTransitionUserData()
    }
    render() {
        const column = [
            {
                title: '分组名称',
                dataIndex: 'gname',
                key: 'gname'
            },
            {
                title: '小组老师',
                dataIndex: 'teacher',
                key: 'teacher',
            },
            {
                title: '所属阶段',
                dataIndex: 'stage',
                key: 'stage',
            },
            {
                title: '创建日期',
                dataIndex: 'createtime',
                key: 'createtime',
            },
            {
                title: '当前状态',
                dataIndex: 'status',
                key: 'status',
                render: value => (
                    <div>
                        {
                            value === '2' && <Tag color="blue">已完成</Tag> 
                        }
                        {
                            value === '1' && <Tag color="gold">培训中</Tag>
                        }
                        {
                            value === '0' && <Tag color="red">未开始</Tag>
                        }
                    </div>
                )
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (_, item, index) => (
                    <div>
                        <span className='link' onClick={() => this.openStudentList(item)}>查看学员</span>
                        <span className='link' onClick={() => this.addUser(item)} >添加学员</span>
                        <span className='link' onClick={() => this.openRenameOrStatus(item)}>状态及名称编辑</span>
                        <Popconfirm
                            title="确认解散?"
                            onConfirm={() => this.delete(item)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <span className='link'>解散</span>
                        </Popconfirm>
                        
                        <span className='link' onClick={() => this.groupUser(item)}>导出学员信息</span>
                    </div>
                )
            }
        ]
        const { tabKey, checkedKeys, currentUser } = this.state
        console.log(checkedKeys)
        const { getFieldDecorator,setFieldsValue, validateFields } = this.props.form
        const allData = this.props.stageManage.noTransitionGroup;
        console.log(allData)
        return (
            <PageHeaderWrapper className={styles.transition}>
                <Tabs activeKey={tabKey} onChange={this.callback}>
                    <TabPane tab="分组列表" key="1">
                        <Table 
                            columns={column}
                            rowKey={item => item.id}
                            dataSource={this.props.stageManage.transitionList}
                        />
                    </TabPane>
                    <TabPane tab="用户添加" key="2">
                        {/* <Table 
                            columns={column}
                        /> */}
                        <Button onClick={this.addGroup} disabled={checkedKeys.length > 0 ? false : true} type='primary'>{currentUser ? '添加到分组' : '分组'}</Button>
                        <div className='h10'></div>
                        <div style={{width:'100%',borderBottom:'1px solid #eaeaea'}}>
                            <Row style={{flex:1,marginLeft:'60px',padding:'15px 0px'}}>
                                <Col span={4}>学员姓名</Col>
                                <Col span={4}>手机号</Col>
                                <Col span={4}>期数</Col>
                                <Col span={4}>入职时间</Col>
                                <Col span={4}>工号</Col>
                                <Col span={4}>柜台</Col>
                            </Row>
                        </div>
                        <Tree checkable
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                            style={{width:'100%'}}
                            checkedKeys={checkedKeys}
                        >
                            {allData ? 
                            allData.map((v,i) => (
                                <TreeNode key={-i} title={v.group.gname} style={{borderBottom:'1px solid #eaeaea',padding:'10px 0px'}} >
                                {v.member ? 
                                    v.member.map((k,j) => (
                                    <TreeNode 
                                    style={{flex:1,display:'flex',flexDirection:'row'}}
                                    title={
                                        <Row className='tree-box'>
                                            <Col span={4}>{k.username}</Col>
                                            <Col span={4}>{k.phone}</Col>
                                            <Col span={4}>{k.batch}</Col>
                                            <Col span={4}>{k.date}</Col>
                                            <Col span={4}>{k.Worknumber}</Col>
                                            <Col span={4}>{k.counter}</Col>
                                        </Row>
                                    } 
                                    key={k.id}>
                                    </TreeNode>
                                    )) : null
                                }
                                </TreeNode>
                            )) : null
                            }
                        </Tree>
                    </TabPane>
                </Tabs>
                <Modal 
                    visible={this.state.addGroup.isShow}
                    onCancel={this.handleColse}
                    title={'新建分组'}
                    onOk={this.addGroupSubmit}
                >
                    <Row>
                        {
                            currentUser ? '确认添加到该分组吗?' : (
                                <Col span={15}>
                                    <Col style={{lineHeight: '32px'}} span={6}>分组名称：</Col>
                                    <Col span={18}><Input onChange={this.nameChange} /></Col>
                                </Col>
                            )
                        }
                    </Row>
                </Modal>
                <Modal
                    title='编辑'
                    visible={this.state.renameOrStatus.isShow}
                    onCancel={this.handleColse}
                    onOk={this.updateGroupNameOrStatus}
                >
                    <Form.Item {...formItemLayout} label='分组名称'>
                        {getFieldDecorator('gname', {
                            rules: [{ required: true, message: '请输入组名' }],
                        })(
                            <Input
                                placeholder="组名"
                                autoComplete="off"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='状态'>
                        {getFieldDecorator('status', {
                            rules: [{ required: true, message: '请输入组名' }],
                        })(
                            <Select>
                                <Select.Option value={'0'}>未开始</Select.Option>
                                <Select.Option value={'1'}>进行中</Select.Option>
                                <Select.Option value={'2'}>已完成</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                </Modal>
                {this.state.lookStudent.isShow && <LookTransitionStudentList 
                    isShow={this.state.lookStudent.isShow}
                    handleColse={this.handleColse}
                    current={this.state.current}
                />}
            </PageHeaderWrapper>
        )
    }
}