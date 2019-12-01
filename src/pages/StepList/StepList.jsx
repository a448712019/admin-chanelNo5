import React from 'react'
import { connect } from 'dva'
import {
    Table,
    Tag,
    Button,
    Popconfirm,
    notification
} from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import StepSave from '@/components/Module/StepSave/StepSave'
@connect(({ theme, loading }) => ({
    theme: theme,
}))
export default class StepList extends React.Component{
    state = {
        stepModal: {
            isShow: false,
            current: '',
        }
    }
    handleColse = () => {
        this.setState({
            stepModal: {
                isShow: false,
                current: '',
            }
        })
    }
    getData = () => {
        this.props.dispatch({
            type: 'theme/stepList',
        })
        this.props.dispatch({
            type: 'theme/allTheme'
        })
    }
    openEditStepModal = (item) => {
        this.setState({
            stepModal: {
                isShow: true,
                current: item,
            }
        })
    }
    onAdd = () => {
        this.setState({
            stepModal: {
                isShow: true,
                current: '',
            }
        })
    }
    delete = (item) => {
        this.props.dispatch({
            type: 'theme/delStep',
            payload: {
                id: item.id
            },
            callback: res => {
                if(res.status == 1){
                    notification.success({
                        message: res.message,
                        duration: 1.5
                    })
                    this.getData()
                }
            }
        })
    }
    goStepcontent = (item) => {
        console.log(item)
        this.props.history.push(`/step/stepcontent/${item.type}/${item.id}`)
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        const column = [
            {
                title: '所属主题',
                key: 'daytitle',
                dataIndex: 'daytitle',
            },
            {
                title: '步骤名称',
                key: 'title',
                dataIndex: 'title',
            },
            {
                title: '步骤类型',
                key: 'type',
                dataIndex: 'type',
                render: value => (
                    <div>
                        {value == '0' && '体验产品'}
                        {value == '1' && '浏览产品网页'}
                        {value == '2' && '观看产品视频'}
                        {value == '3' && '小测试'}
                    </div>
                )
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render: value => (
                    <div>
                        {
                            value == '1' ?
                            <Tag color='green'>开启</Tag>
                            :
                            <Tag color='red'>关闭</Tag>
                        }
                    </div>
                )
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'action',
                render: (_, item, index) => (
                    <div>
                        <span className='link' onClick={() => this.openEditStepModal(item)}>编辑</span>
                        <Popconfirm onConfirm={() => this.delete(item)} okText='确定' title='确认删除？' cancelText='取消'>
                            <span className='link'>删除</span>
                        </Popconfirm>
                        
                        <span className='link' onClick={() => this.goStepcontent(item)}>步骤内容编辑</span>
                    </div>
                )
            },
        ]
        console.log(this.props)
        return (
            <PageHeaderWrapper extra={<Button type='primary' onClick={this.onAdd}>步骤添加</Button>}>
                <Table 
                    columns={column}
                    dataSource={this.props.theme.stepList}
                    rowKey={item => item.id}
                />
                {this.state.stepModal.isShow && (
                    <StepSave 
                        isShow={this.state.stepModal.isShow}
                        handleColse={this.handleColse}
                        current={this.state.stepModal.current}
                        getData={this.getData}
                    />
                )}
            </PageHeaderWrapper>
        )
    }
}