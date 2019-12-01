import React from 'react';
import { Card, Typography, Alert, Table, Popconfirm, notification } from 'antd';
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import EditPassword from '@/components/Module/EditPassword/EditPassword'
import TeacherDetailModule from '@/components/Module/TeacherDetailModule/TeacherDetailModule'
import styles from  './index.less'

@connect(({ teacher, loading }) => ({
    teacher: teacher,
    loading: loading.effects['teacher/fetch'],
}))

export default class TeacherManage extends React.Component{
    state = {
        editPasswordModule: {
            isShow: false,

        },
        teacheDetailModule: {
            isShow: false,
            current: ''
            
        }
    }
    componentDidMount() {
        console.log(this.props)
        this.getData()
        this.props.dispatch({
            type: 'teacher/getTypeList'
        })
    }
    handleColse = () => {
        this.setState({
            editPasswordModule: {
                isShow: false,
    
            },
            teacheDetailModule: {
                isShow: false
                
            }
        })
    }
    getData = () => {
        this.props.dispatch({
            type: 'teacher/fetch',
            payload: {

            }
        })
    }
    delect = (item) => {
        console.log(item.id)
        this.props.dispatch({
            type: 'teacher/del',
            payload: {
                id: item.id
            },
            callback: (res) => {
                if(res.status === 1){
                    notification.success({
                        message: '删除成功',
                        duration: 1.5
                    })
                }
            }
        })
    }
    openRule = (item) => {
        this.props.dispatch({
            type: 'teacher/getTeacherDetail',
            payload: {
                aid: item.id
            },
            callback:(res) => {
                console.log(res)
                if(res.status === 1){
                    this.setState({
                        teacheDetailModule: {
                            isShow: true,
                            current: item
                        }
                    })
                }
            }
        })
    }
    openEditPasswordModule = (item) => {
        this.props.dispatch({
            type: 'teacher/editPassword',
            payload: {
                id: item.id
            },
            callback: (res) => {
                console.log(res)
                if(res.status === 1){
                    this.setState({
                        editPasswordModule: {
                            isShow: true
                        }
                    })
                }
            }
        })
       
    }
    render() {
        let column = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '账号',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (_, item, index) => (
                    <div>
                        <span className='link' onClick={() => this.openRule(item)}>角色分配</span>
                        <Popconfirm
                            title="确认删除?"
                            onConfirm={() => this.delect(item)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <span className='link'>删除</span>
                        </Popconfirm>
                        <span className='link' onClick={() => this.openEditPasswordModule(item)}>修改密码</span>
                    </div>
                )
            }
        ]
        return <PageHeaderWrapper extra={<div></div>} className='teacherManage'>
            <Table 
                columns={column}
                dataSource={this.props.teacher.list}
                rowKey={item => item.id}
                loading={this.props.loading}
            />
            {this.state.editPasswordModule.isShow && <EditPassword 
                isShow={this.state.editPasswordModule.isShow}
                handleColse={this.handleColse}
            />}
            {this.state.teacheDetailModule.isShow && <TeacherDetailModule 
                isShow={this.state.teacheDetailModule.isShow}
                handleColse={this.handleColse}
                current={this.state.teacheDetailModule.current}
            />}
        </PageHeaderWrapper>
    }
}