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
    Popconfirm
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
export default class TypeOne extends React.Component{
    state = {
        tabKey: '1',
        previewImage: '',
        previewVisible: false,
        fileList: [],
    }
    getData = () => {
        this.props.dispatch({
            type: 'theme/tyepOneList',
            payload: {
                sid: this.props.sid
            }
        })
    }
    tabChange = (value) => {
        this.setState({
            tabKey: value,
            current: '',
            fileList: [],
        })
        this.props.form.resetFields()
    }
    reset = () => {
        this.props.form.resetFields()
        this.setState({
            fileList: []
        })
    }
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    }
    beforeUpload = (file) => {
        console.log(file)
        this.props.dispatch({
            type: 'theme/uploadImage',
            payload: {
                name: file.name,
                filename: file
            },
            callback: (res) => {
                this.setState({
                    fileList: [{uid: 1, url: 'https://' + res.imgURL}]
                })
            }
        })
    }
    onRemove = () => {
        this.setState({
            fileList: []
        })
    }
    componentDidMount() {
        this.getData()
    }
    edit = (item) => {
        this.props.dispatch({
            type: 'theme/typeOneDetail',
            payload: {
                id: item.id
            },
            callback: (res) => {
                const data = this.props.theme.typeOneDetail
                if(res.status == 1){
                    this.props.form.setFieldsValue({
                        title: data.title,
                        banner: data.banner,
                        describe: data.describe,
                        describes: data.describes,
                        status: data.status == '1' ? true : false
                    })
                    this.setState({
                        tabKey: '2',
                        current: item
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
    delete = (item) => {
        this.props.dispatch({
            type: 'theme/delTypeOne',
            payload: {
                id: item.id
            },
            callback: res => {
                notification.success({
                    message: res.message,
                    duration: 1.5
                })
                this.getData()
            }
        })
    }
    submit = () => {
        const {current, fileList} = this.state
        this.props.form.validateFields((err, values) => {
            if(err)return;
            toUndefind(values)
            if(fileList.length > 0){
                values.banner = fileList[0].url
            }
            this.props.dispatch({
                type: 'theme/saveTypeOne',
                payload: {
                    id: current ? current.id : 'create',
                    ...values,
                    sid: this.props.sid,
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
    render() {
        const { tabKey, fileList, previewVisible, previewImage, current } = this.state;
        const { getFieldDecorator,setFieldsValue, validateFields } = this.props.form
        const column = [
            {
                title: '产品名称',
                key: 'title',
                dataIndex: 'title',
            },
            {
                title: 'banner',
                key: 'banner',
                dataIndex: 'banner',
                render: value => (
                    <img className='iimg' src={value} alt=""/>
                )
            },
            {
                title: '所属主题',
                key: 'setptitle',
                dataIndex: 'setptitle',
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render: value => (
                    <div>
                        {value == '1' ? <Tag color='green'>显示</Tag> : <Tag color='red'>隐藏</Tag>}
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
        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Tabs activeKey={tabKey} onChange={this.tabChange}>
                <TabPane tab="体验产品列表" key="1">
                    <Table 
                        columns={column}
                        rowKey={item => item.id}
                        dataSource={this.props.theme.tyepOneList}
                    />
                </TabPane>
                <TabPane tab="添加体验产品" key="2">
                    <Row>
                        <Col span={13}>
                            <Form.Item {...formItemLayout} label='步骤标题'>
                                {getFieldDecorator('title', 
                                {
                                    rules: [{ required: true, message: '请输入步骤名称' }],
                                })(
                                    <Input
                                        placeholder="步骤名称"
                                        autoComplete="off"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label='主题封面'>
                                {getFieldDecorator('banner', 
                                {
                                    // rules: [{ required: true, message: '培训说明' }],
                                })(
                                    <div>
                                        <Upload
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={this.handlePreview}
                                            beforeUpload={this.beforeUpload}
                                            onRemove={this.onRemove}
                                            >
                                            {fileList.length > 0 ? null : uploadButton}
                                        </Upload>
                                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                        </Modal>
                                    </div>
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label='步骤描述1'>
                                {getFieldDecorator('describe', 
                                {
                                    // rules: [{ required: true, message: '步骤描述1' }],
                                })(
                                    <TextArea
                                        rows={5}
                                        placeholder="步骤描述1"
                                        autoComplete="off"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label='步骤描述2'>
                                {getFieldDecorator('describes', 
                                {
                                    // rules: [{ required: true, message: '步骤描述2' }],
                                })(
                                    <TextArea
                                        rows={5}
                                        placeholder="步骤描述2"
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