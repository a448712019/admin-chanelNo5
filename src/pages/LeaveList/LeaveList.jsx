import React from 'react';
import { Card, Typography, Alert, Table, Popconfirm, notification } from 'antd';
import { connect } from 'dva'
import { PageHeaderWrapper } from '@ant-design/pro-layout';

@connect(({ leaveList, loading }) => ({
    leaveList: leaveList,
    loading: loading.effects['leaveList/fetch'],
}))
export default class LeaveList extends React.Component{
    getData = () => {
        this.props.dispatch({
            type: 'leaveList/fetch',
        })
    }
    delect = (item) => {
        this.props.dispatch({
            type: 'leaveList/delLeave',
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
    componentDidMount() {
        this.getData()
    }
    render() {
        let column = [
            { 
                title: '姓名',
                dataIndex: 'username',
                key: 'username',
            },
            { 
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '工号',
                dataIndex: 'Worknumber',
                key: 'Worknumber',
            },
            {
                title: '柜台',
                dataIndex: 'counter',
                key: 'counter',
            },
            {
                title: '期数',
                dataIndex: 'batch',
                key: 'batch',
            },
            {
                title: '入期时间',
                dataIndex: 'date',
                key: 'date'
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'action',
                render: (_, item, index) => (
                    <Popconfirm
                        title="确认删除?"
                        onConfirm={() => this.delect(item)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <span className='link'>删除</span>
                    </Popconfirm>
                )
            }
        ]
        return (
            <PageHeaderWrapper>
                <Table 
                    columns={column}
                    dataSource={this.props.leaveList.list}
                    rowKey={item => item.id}
                    loading={this.props.loading}
                />
            </PageHeaderWrapper>
        )
    }
}