import React from 'react';
import { connect } from 'dva'
import {
    Form,
    Button,
    Table,
    Tag,
    Modal,
    Input,
    Switch,
    notification,
    Tree,
    Popconfirm,

} from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { toUndefind } from '@/utils/utils'

const { TreeNode } = Tree;
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
};

@connect(({ author }) => ({
    author: author,
}))
@Form.create()
export default class AuthorManage extends React.Component{
    state = {
        saveModal: {
            isShow: false,
            current: '',
        },
        role: [],
    }
    handleColse = () => {
        this.setState({
            saveModal: {
                isShow: false,
                current: '',
            },
            role: []
        })
        this.props.form.resetFields()
    }
    openModal = () => {
        this.setState({
            saveModal: {
                isShow: true,
                current: '',
            }
        })
    }
    getData = () => {
        this.props.dispatch({
            type: 'author/fetch',
        })
    }
    submit = () => {
        this.props.form.validateFields((err, values) => {
            if(err)return
            toUndefind(values)
            console.log(values)
            const { role, saveModal } = this.state
            let obj ={}
            if(role.length > 0){
                role.forEach((item, index) => {
                    obj[`node[${index}][aname]`] = item
                    obj[`node[${index}][mname]`] = item
                })
            }
            if(saveModal.current){
                values.id = saveModal.current.id
            }
            this.props.dispatch({
                type: `author/${saveModal.current ? 'updateAuthor' : 'addAuthor'}`,
                payload: {
                    ...values,
                    ...obj,
                    status: values.status ? 1 : 0
                },
                callback: res => {
                    if(res.status == 1){
                        this.handleColse()
                        this.getData()
                        notification.success({
                            message: res.message,
                            duration: 1.5
                        })
                        return
                    }
                    notification.error({
                        message: res.message,
                        duration: 1.5
                    })
                }
            })
        })
    }
    onCheck = (value) => {
        console.log(value)
        this.setState({
            role: value
        })
    }
    componentDidMount() {
        this.getData()
    }
    renderItem = (nav) => {
        return nav.map((item, index) => <TreeNode key={index} title={item.name} key={item.value}>{item.children && this.renderItem(item.children)}</TreeNode>)
    }
    delete = item => {
        this.props.dispatch({
            type: 'author/delAuthor',
            payload: {
                id: item.id
            },
            callback: res => {
                if(res.status === 1){
                    notification.success({
                        message: '删除成功',
                        duration: 1.5
                    })
                    this.getData()
                }
            }
        })
    }
    eidtOpenModal = (item) => {
        this.props.dispatch({
            type: 'author/authorDetail',
            payload: {
                id: item.id,
            },
            callback: res => {
                if(res.status == 1){
                    console.log(1213)
                    const data = this.props.author.detail
                    console.log(data);
                    if(data.detail){
                        this.props.form.setFieldsValue({
                            name: data.detail.name,
                            remark: data.detail.remark,
                            status: data.detail.status == '1' ? true : false,
                        })
                    }
                    console.log(Object.prototype.toString.call(data.node))
                    let newRole = []
                    if(data.node && data.node.length > 0){

                        if(Object.prototype.toString.call(data.node[0]) === '[object Object]'){
                            newRole = data.node.map(item => item.aname)
                        }else{
                            newRole = data.node
                        }
                    }
                    console.log(newRole)
                    this.setState({
                        role: newRole,
                        saveModal: {
                            isShow: true,
                            current: item,
                        }
                    })
                }
            }
        })
    }
    render() {
        const nav = [
            {
                name: '首页',
                value: 'home'
            },
            {
                name: '权限设置',
                value: 'rolelistpage'
            },
            {
                name: '教师管理',
                value: 'administrators',
            },
            {
                name: '阶段培训管理',
                value: 'fenzuguanli',
                children: [
                    {
                        name: '阶段一',
                        value: 'fenzuguanli1'
                    },
                    {
                        name: '过渡期',
                        value: 'fenzuguanli2'
                    },
                ]
            },
            {
                name: '阶段内容更改',
                value: 'jieduanguanli'
            },
            {
                name: '主题内容更改',
                value: 'zhutiguanli'
            },
            {
                name: '步骤内容更改',
                value: 'buzhouguanli',
                children: [
                    {
                        name: '内容列表',
                        value: 'buzhouguanli2',
                    }
                ]
            },
            {   
                name: '用户管理',
                value: 'yonghuguanli'
            },
            {   
                name: '统计记录',
                value: 'tongji',
                children: [
                    {
                        name: '每日统计',
                        value: 'record'
                    },
                    {
                        name: '阶段测试统计',
                        value: 'statistics'
                    },
                ]
            },
            {
                name: '离职列表',
                value: 'lizhiliebiao'
            }
        ]
        const column = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '角色名',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: '备注',
                key: 'remark',
                dataIndex: 'remark'
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'action',
                render: (_, item, index) => (
                    <div>
                        <span className='link' onClick={() => this.eidtOpenModal(item)}>编辑</span>
                        <Popconfirm 
                            title='确认删除该阶段？' 
                            onConfirm={() => this.delete(item)} 
                            okText="确认"
                            cancelText="取消"
                        >
                            <span className='link'>删除</span>
                        </Popconfirm>
                    </div>
                )
            },
        ]
        const { getFieldDecorator,setFieldsValue, validateFields } = this.props.form
        return (
            <PageHeaderWrapper extra={<Button type='primary' onClick={this.openModal}>角色权限添加</Button>}>
                <Table 
                    columns={column}
                    dataSource={this.props.author.list}
                    rowKey={ item => item.id}
                />
                <Modal
                    visible={this.state.saveModal.isShow}
                    onCancel={this.handleColse}
                    title={this.state.saveModal.curent ? '编辑阶段' : '新增阶段'}
                    onOk={this.submit}
                >
                    <Form.Item {...formItemLayout} label='角色名'>
                        {getFieldDecorator('name', 
                        {
                            rules: [{ required: true, message: '角色名' }],
                        })(
                            <Input
                                placeholder="角色名"
                                autoComplete="off"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='权限设置'>
                        {getFieldDecorator('role', 
                        {
                            // rules: [{ required: true, message: '权限设置' }],
                        })(
                            <Tree
                            checkable
                            onCheck={this.onCheck}
                            checkedKeys={this.state.role}
                          >
                            <TreeNode  title="权限管理" key="hiden">
                                {this.renderItem(nav)}
                            </TreeNode>
                          </Tree>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='备注'>
                        {getFieldDecorator('remark', 
                        {
                            // rules: [{ required: true, message: '备注' }],
                        })(
                            <Input
                                placeholder="备注"
                                autoComplete="off"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='显示/隐藏'>
                        {getFieldDecorator('status', 
                        {
                            valuePropName: 'checked',
                            // rules: [{ required: true, message: '培训说明' }],
                        })(
                            <Switch />
                        )}
                    </Form.Item>
                </Modal>
            </PageHeaderWrapper>
        )
    }
}