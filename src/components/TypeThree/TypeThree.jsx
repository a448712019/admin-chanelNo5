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
export default class TypeTwo extends React.Component{
    state = {
        tabKey: '1',
        previewImage: '',
        previewVisible: false,
        fileList: [],
        current: '',
        video: [
            {
                detail: '',
                pic: '',
                time: '',
                judge: '',
            }
        ]
    }
    getData = () => {
        this.props.dispatch({
            type: 'theme/typeThreeList',
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
            video: [{
                detail: '',
                pic: '',
                time: '',
                judge: '',
            }]
        })
        this.props.form.resetFields()
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
    delItem = (index) => {
        const video = this.state.video;
        if(video.length === 1){
            notification.info({
                message: '至少保留一项',
                duration: 1.5
            })
        }
        let newArr = video.filter((item, i) => i !== index)
        this.setState({
            video: newArr
        })
    }
    addItem = () => {
        const video = this.state.video;
        video.push({
            detail: '',
            pic: '',
            time: '',
            judge: '',
        })
        this.setState({
            video
        })
    }
    reset = () => {
        this.props.form.resetFields()
        this.setState({
            fileList: [],
            video: [{
                detail: '',
                pic: '',
                time: '',
                judge: '',
            }]
        })
    }
    itmeChange = (type, index, e) => {
        const video = this.state.video
        video[index][type] = e.target.value
        this.setState({
            video
        })
    }
    submit = () => {
        const {current, fileList, video} = this.state
        let obj = {}
        video.forEach((item, index) => {
            obj[`items[${index}][pic]`] = item.pic
            obj[`items[${index}][time]`] = item.time
            obj[`items[${index}][judge]`] = item.judge
            obj[`items[${index}][detail]`] = item.detail
        })
        this.props.form.validateFields((err, values) => {
            if(err)return;
            toUndefind(values)
            if(fileList.length > 0){
                values.banner = fileList[0].url
            }

            this.props.dispatch({
                type: 'theme/typeThreeSave',
                payload: {
                    id: current ? current.id : 'create',
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
    edit = (item) => {
        this.props.dispatch({
            type: 'theme/typeThreeDetail',
            payload: {
                id: item.id
            },
            callback: (res) => {
                const data = this.props.theme.typeThreeDetail
                if(res.status == 1){
                    this.props.form.setFieldsValue({
                        title: data.title,
                        banner: data.banner,
                        status: data.status == '1' ? true : false
                    })
                    this.setState({
                        tabKey: '2',
                        current: item,
                        video: data.video ? data.video : [ {
                            detail: '',
                            pic: '',
                            time: '',
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
    delete = (item) => {
        this.props.dispatch({
            type: 'theme/delTypeThree',
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
    componentDidMount() {
        this.getData()
    }
    render() {
        console.log(this.props)
        const { getFieldDecorator,setFieldsValue, validateFields } = this.props.form
        const column = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '题目',
                dataIndex: 'title',
                key: 'title',
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
                dataIndex: 'action',
                key: 'action',
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
        const { tabKey, fileList, previewVisible, previewImage, current } = this.state;
        return (
            <Tabs activeKey={tabKey} onChange={this.tabChange}>
                <TabPane tab="观看视频链接列表" key="1">
                    <Table columns={column} dataSource={this.props.theme.typeThreeList} rowKey={item => item.id} />
                </TabPane>
                <TabPane tab="添加观看视频" key="2">
                    <Row>
                        <Col span={24}>
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
                            <Form.Item {...formItemLayout} label='状态'>
                                {getFieldDecorator('status', 
                                {
                                    valuePropName: 'checked',
                                    // rules: [{ required: true, message: '培训说明' }],
                                })(
                                    <Switch />
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
                            <Form.Item {...formItemLayout} colon={false} label=' '>
                                <Button type='primary' onClick={this.addItem}>添加选项</Button>
                            </Form.Item>
                            {this.state.video.map((item, index) => (
                                <Row key={index}>
                                    <Col>
                                        <Col span={5}></Col>
                                        <Col span={19}  style={{display: 'flex', alignItems: 'center' }}>
                                            <Col span={5}>
                                                <Col span={22} style={{textAlign: 'center'}}>视频跳转:</Col>
                                                <Col span={22}><TextArea onChange={(e) => this.itmeChange('judge', index, e)} value={item.judge}/></Col>
                                            </Col>
                                            <Col span={5}>
                                                <Col span={22} style={{textAlign: 'center'}}>视频名称:</Col>
                                                <Col span={22}><TextArea onChange={(e) => this.itmeChange('detail', index, e)}  value={item.detail}/></Col>
                                            </Col>
                                            <Col span={5}>
                                                <Col span={22} style={{textAlign: 'center'}}>视频图片地址:</Col>
                                                <Col span={22}><TextArea onChange={(e) => this.itmeChange('pic', index, e)} value={item.pic}/></Col>
                                            </Col>
                                            <Col span={5}>
                                                <Col span={22} style={{textAlign: 'center'}}>视频时长:</Col>
                                                <Col span={22}><TextArea onChange={(e) => this.itmeChange('time', index, e)} value={item.time}/></Col>
                                            </Col>
                                            <Col span={4}>
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