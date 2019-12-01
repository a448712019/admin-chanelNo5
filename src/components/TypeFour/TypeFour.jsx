import React from 'react'
import { connect } from 'dva'
import { toUndefind } from '@/utils/utils'
import {
    Tabs,
    Form,
    Tag,
    Table,
    Row,
    Col,
    Input,
    Upload,
    Icon,
    Modal,
    Switch,
    Button,
    notification,
    Popconfirm,
    Select,
} from 'antd'

const { TextArea } = Input;
const { TabPane } = Tabs;
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
};

@connect(({ theme, loading }) => ({
    theme: theme,
}))
@Form.create()
export default class TypeFour extends React.Component{
    state = {
        tabKey: '1',
        content: [
            {
                judge: '',
                status: 0
            }
        ],
        current: ''
    }
    getData = () => {
        this.props.dispatch({
            type: 'theme/typeFourList',
            payload: {
                cid: this.props.sid
            }
        })
    }
    addItem = () => {
        const content = this.state.content;
        content.push({
            status: 'false',
            judge: '',
        })
        this.setState({
            content
        })
    }
    tabChange = (value) => {
        this.setState({
            tabKey: value,
            current: '',
            content: [{
                judge: '',
                status: 'false',
            }]
        })
        this.props.form.resetFields()
    }
    reset = () => {
        this.props.form.resetFields()
        this.setState({
            content: [{
                judge: '',
                status: 'false',
            }]
        })
    }
    edit = (item) => {
        this.props.dispatch({
            type: 'theme/fourDetail',
            payload: {
                id: item.id
            },
            callback: (res) => {
                const data = this.props.theme.fourDetail
                if(res.status == 1){
                    this.props.form.setFieldsValue({
                        title: data.title,
                        status: data.status == '1' ? true : false,
                        type: data.type,
                        sel_type: data.sel_type,
                        sort: data.sort
                    })
                    this.setState({
                        tabKey: '2',
                        current: item,
                        content: data.content ? data.content : [ {
                            status: 'false',
                            judge: '',
                        } ]
                    })
                    if(data.banner){
                        this.setState({
                            fileList: [ {uid: 1, url: data.banner} ]
                        })
                    }
                }
            }
        })
    }
    submit = () => {
        const {current, content} = this.state
        let obj = {}
        content.forEach((item, index) => {
            obj[`items[${index}][status]`] = item.status
            obj[`items[${index}][judge]`] = item.judge
        })
        this.props.form.validateFields((err, values) => {
            if(err)return;
            toUndefind(values)
            this.props.dispatch({
                type: `theme/${current ? 'updateFour' : 'current'}`,
                payload: {
                    id: current ? current.id : '',
                    ...values,
                    sid: this.props.sid,
                    ...obj,
                },
                callback: res => {
                    if(res.status == 1){
                        notification.success({
                            message: res.message,
                            duration: 1.5
                        })
                        this.setState({
                            tabKey: '1',
                            current: '',
                        })
                        this.getData()
                    }
                }
            })
        })
    }
    delItem = (index) => {
        const content = this.state.content;
        if(content.length === 1){
            notification.info({
                message: '至少保留一项',
                duration: 1.5
            })
            return
        }
        let newArr = content.filter((item, i) => i !== index)
        this.setState({
            content: newArr
        })
    }
    componentDidMount() {
        this.getData()
    }
    itmeChange = (type, index, e) => {
        const content = this.state.content
        if(type === 'status'){
            content[index][type] = e + ''
        }else{
            content[index][type] = e.target.value
        }
        
        this.setState({
            content
        })
    }
    render() {
        const { tabKey, content, current } = this.state;
        const { getFieldDecorator,setFieldsValue, validateFields } = this.props.form
        const column = [
            {
                title: '编号',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '题目',
                key: 'title',
                dataIndex: 'title',
            },
            {
                title: '排序',
                key: 'sort',
                dataIndex: 'sort',
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render: value => (
                    <div>
                        {value == '1' ? <Tag color='green'>开启</Tag> : <Tag color='red'>关闭</Tag>}
                    </div>
                )
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'action',
                render: (_, item, index) => (
                    <div>
                        <span className="link" onClick={() => this.edit(item)}>编辑</span>
                        <Popconfirm title='确认删除吗？' onConfirm={() => this.delete(item)}>
                            <span className="link">删除</span>
                        </Popconfirm>
                    </div>
                )
            },
        ]
        return (
            <Tabs activeKey={tabKey} onChange={this.tabChange}>
                <TabPane tab="题库管理" key="1">
                    <Table columns={column} rowKey={item => item.id}  dataSource={this.props.theme.typeFourList}/>
                </TabPane>
                <TabPane tab="添加题目" key="2">
                    <Row>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label='题目'>
                                {getFieldDecorator('title', 
                                {
                                    rules: [{ required: true, message: '请输入题目' }],
                                })(
                                    <Input
                                        placeholder="题目"
                                        autoComplete="off"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label='题目类型'>
                                {getFieldDecorator('type', 
                                {
                                    initialValue: '0'
                                })(
                                    <Select>
                                        <Select.Option value='0'>图片</Select.Option>
                                        <Select.Option value='1'>文字</Select.Option>
                                        <Select.Option value='2'>多图片</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label='单选/多选'>
                                {getFieldDecorator('sel_type', 
                                {
                                    initialValue: 'radio'
                                })(
                                    <Select>
                                        <Select.Option value='radio'>单选</Select.Option>
                                        <Select.Option value='checkbox'>多选</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label='排序'>
                                {getFieldDecorator('sort', 
                                {
                                    // rules: [{ required: true, message: '排序' }],
                                })(
                                    <Input
                                        placeholder="排序"
                                        autoComplete="off"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label='状态'>
                                {getFieldDecorator('status', 
                                {
                                    valuePropName: 'checked',
                                    // rules: [{ required: true, message: '培训说明' }],
                                })(
                                    <Switch />
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} colon={false} label=' '>
                                <Button type='primary' onClick={this.addItem}>添加选项</Button>
                            </Form.Item>
                            {content.map((item, index) => (
                                <Row key={index} style={{marginBottom: '10px'}}>
                                    <Col>
                                        <Col span={5}></Col>
                                        <Col span={19}  style={{display: 'flex', alignItems: 'center' }}>
                                            <Col span={8}>
                                                <Col span={22} style={{textAlign: 'center'}}>视频跳转:</Col>
                                                <Col span={22}><TextArea onChange={(e) => this.itmeChange('judge', index, e)} value={item.judge}/></Col>
                                            </Col>
                                            <Col span={8}>
                                                <Col span={22} style={{textAlign: 'center'}}>正误:</Col>
                                                <Col span={22} style={{display: 'flex', justifyContent: 'center', alignItems: 'center' ,height: '52px'}}>
                                                    <Switch onChange={(e) => this.itmeChange('status', index, e)}   checked={item.status == 'true' ? true : false}/>
                                                </Col>
                                            </Col>
                                            <Col span={8}>
                                                <Col span={22} style={{textAlign: 'center'}}></Col>
                                                <Col span={22}><Button onClick={() => this.delItem(index)}>删除</Button></Col>
                                            </Col>
                                        </Col>
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item style={{marginTop: '30px'}} {...formItemLayout} colon={false} label=' '>
                                <Button type='primary' className='mr20' onClick={this.submit}>{current ? '保存' : '创建'}</Button>
                                <Button type='primary' onClick={this.reset}>重置</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        )
    }
}