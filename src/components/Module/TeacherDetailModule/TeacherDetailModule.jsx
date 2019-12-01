import React from 'react'
import { Modal, Form, Input, notification, Select } from 'antd'
import { connect } from 'dva'

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
};

@connect(({ teacher, loading }) => ({
    teacher: teacher,
}))
@Form.create()
export default class TeacherDetailMoudle extends React.Component{
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            console.log(this.props.current)
            if(err)return
            console.log(values)
            values.aid = this.props.current.id
            this.props.dispatch({
                type: 'teacher/confirmEditUser',
                payload: values,
                callback: (res) => {
                    console.log(res)
                    if(res.status === 1){
                        notification.success({
                            message: '修改成功',
                            duration: 1.5
                        })
                    }else{
                        notification.error({
                            message: res.message,
                            duration: 1.5
                        })
                    }
                    this.props.handleColse()
                }
            })
        })
    }
    componentDidMount() {
        console.log(this.props.teacher.typeList)
        let data = this.props.teacher.teacherDetail
        console.log(data)
        console.log(data)
        this.props.form.setFieldsValue({
            name: data.name,
            sid: data.id
        })
    }
    render() {
        const { isShow, handleColse } = this.props;
        const { getFieldDecorator,setFieldsValue, validateFields } = this.props.form
    
        return (
            <Modal
                visible={isShow}
                onCancel={handleColse}
                onOk={this.handleSubmit}
                title='角色分配'
            >
                <Form.Item {...formItemLayout} label='账号'>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入账号' }],
                    })(
                        <Input
                            placeholder="账号"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label='角色选择'>
                    {getFieldDecorator('sid', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Select>
                            {this.props.teacher.typeList.map(item => <Select.Option value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    )}
                </Form.Item>
            </Modal>
        )
    }
}

