import React from 'react'
import { Modal, Form, Input, Icon, notification } from 'antd'
import { connect } from 'dva'


const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
};

@connect(({ userManage, loading }) => ({
    userManage: userManage,
}))
@Form.create()
export default class EditUser extends React.Component{
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            console.log(values)
            this.props.dispatch({
                type: 'userManage/update',
                payload: {
                    id: this.props.userManage.detail.id,
                    ...values
                },
                callback: (res) => {
                    if(res.status === 1) {
                        notification.success({
                            message: '更新成功',
                            duration: 1.5
                        })
                    }
                    this.props.handleColse()
                }
            })
        })
    }
    componentDidMount() {
        console.log(this.props)
        const data = this.props.userManage.detail
        // console.log(data)
        this.props.form.setFieldsValue({
            username: data.username,
            phone: data.phone,
            Worknumber: data.Worknumber,
            counter: data.counter,
            batch: data.batch,
            date: data.date,
        })
    }
    render() {
        const { getFieldDecorator,setFieldsValue, validateFields } = this.props.form
        const { isShow, handleColse} = this.props;
        return (
            <Modal
                visible={isShow}
                onCancel={handleColse}
                onOk={this.handleOk}
            >
                <Form.Item {...formItemLayout} label='姓名'>
                    {getFieldDecorator('username')(
                        <Input
                            placeholder="姓名"
                            autoComplete="off"
                            disabled={true}
                        />,
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label='手机号'>
                    {getFieldDecorator('phone')(
                        <Input
                            placeholder="手机号"
                            autoComplete="off"
                            disabled={true}
                        />,
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label='工号'>
                    {getFieldDecorator('Worknumber')(
                        <Input
                            placeholder="工号"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label='柜台'>
                    {getFieldDecorator('counter')(
                        <Input
                            placeholder="柜台"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label='期数'>
                    {getFieldDecorator('batch')(
                        <Input
                            placeholder="期数"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label='入职日期'>
                    {getFieldDecorator('date')(
                        <Input
                            placeholder="入职日期"
                            autoComplete="off"
                        />,
                    )}
                </Form.Item>
            </Modal>
        )
    }
} 