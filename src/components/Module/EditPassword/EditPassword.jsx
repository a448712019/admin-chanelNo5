import React from 'react'
import { Modal, Form, Input, Icon, notification } from 'antd'
import { connect } from 'dva'

@connect(({ teacher, loading }) => ({
    teacher: teacher,
}))
@Form.create()
export default class EditPassword extends React.Component{
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(err)return
            console.log(values)
            values.id = this.props.teacher.editPasswordDetail.id
            this.props.dispatch({
                type: 'teacher/confirm',
                payload: values,
                callback: (res) => {
                    console.log(res)
                    if(res.status === 1){
                        notification.success({
                            message: '修改成功',
                            duration: 1.5
                        })
                    }
                    this.props.handleColse()
                }
            })
        })
    }
    componentDidMount() {
        let data = this.props.teacher.editPasswordDetail
        console.log(data)
        this.props.form.setFieldsValue({
            name: data.name,
            password: ''
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
                title='修改密码'
            >
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入账号' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="账号"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('newpassword', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="修改后的密码"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
            </Modal>
        )
    }
}

