import React from 'react';
import { connect } from 'dva'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { Form, Row, Col, Select, Button, Statistic, Divider, notification, Card } from 'antd'
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

@connect(({ record }) => ({
    record: record,
}))
@Form.create()
export default class TransitionRecord extends React.Component{
    state = {
        current: '',
    }
    getData = (obj) => {
        this.props.dispatch({
            type: 'record/transitionFetch',
            payload: {
                ...obj,
                stage: 2
            },
            callback: (res) => {
                if(res.status !== 1){
                    notification.error({
                        message: res.message,
                        duration: 1.5
                    })
                }
            }
        })
    }
    getTime = () => {
        this.props.dispatch({
            type: 'record/getTime',
        })
    }
    getCity = () => {
        this.props.dispatch({
            type: 'record/getCity',
        })
    }
    getYear = () => {
        this.props.dispatch({
            type: 'record/getYear',
        })
    }
    toUndefind = (obj) => {
        let newObj = obj;
        let arr = Object.keys(obj);
        arr.forEach(item => {
            if(!newObj[item]){
                newObj[item] = 0
            }
        })
        return newObj
    }
    chartChange = (e) => {
        console.log('123')
        console.log(e)
        if(!e.data) return
        const data = e.data._origin;
        console.log(data['比例'].substr(data['比例'].length - 1))
        let index = data['比例'].substr(data['比例'].length - 1);
        let currentItem = this.props.record.transitionRecordData.day[index - 1]
        console.log(currentItem)
        notification.info({
            style: {
                width: 600,
                marginLeft: 335 - 600,
            },
            message: <div>{data['比例']}{data.name}</div>,
            description: (
                <Row>
                    {
                        data.name === '预习完成率' 
                        ?
                        (
                            <Col>
                                <Col span={6}>
                                    <Statistic title="预习完成率" value={`${currentItem.finish}%`} />
                                </Col>
                                <Col span={6}>
                                    <Statistic title="完成人数" value={`${currentItem.number}`} />
                                </Col>
                                <Col span={6}>
                                    <Statistic title="未完成人数" value={`${currentItem.absent}`} />
                                </Col>
                            </Col>
                        )
                        :
                        (
                            <Col>
                                <Col span={6}>
                                    <Statistic title="满分比例" value={currentItem.average} />
                                </Col>
                                <Col span={6}>
                                    <Statistic title="平均分" value={currentItem.full} />
                                </Col>
                                <Col span={6}>
                                    <Statistic title="满分人数" value={currentItem.marks} />
                                </Col>
                            </Col>
                        )
                    }
                </Row>
            ),
            duration: 10
        })
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            console.log(values)
            this.toUndefind(values)
            console.log(values)
            this.getData(values)
        })
    }
    exportData = () => {
        console.log('123')
        this.props.form.validateFields((err, values) => {
            
            this.toUndefind(values)
            this.props.dispatch({
                type: 'record/getStatus',
                payload: values,
                callback: (res) => {
                    console.log(res)
                    console.log(res)
                    if(res.status !== 1){
                        notification.error({
                            message: res.message,
                            duration: 1.5
                        })
                    }else{
                        console.log(123)
                        this.props.dispatch({
                            type: 'record/exportDayData',
                            payload: values
                        })
                    }
                }
            })
        })
        
        
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'record/defaulltTransitionRecordData',
            payload: {}
        })
        this.getCity()
        this.getYear()
        this.getTime()
    }
    render() {
        const { getFieldDecorator } = this.props.form
        console.log(this.props)
        const { DataView } = DataSet;
        let data = this.props.record.transitionRecordData
        let obj1 = { name: '预习完成率' }, 
            obj2 = { name: '满分比例' },
            list = [];
        if(data.day){
            data.day.forEach((item, index) => {
                obj1[`DAY${index + 1}`] = item.finish
                obj2[`DAY${index + 1}`] = item.full
                list.push(`DAY${index + 1}`)
            })
        }
        const ds = new DataSet();
        const dv = ds.createView().source([obj1, obj2]);
        dv.transform({
          type: "fold",
          fields: list,
          // 展开字段集
          key: "比例",
          // key字段
          value: "天数" // value字段
        });
        const colorMap = {
            "预习完成率": "#fae3d6",
            "满分比例": "#ef8481",
        };
        return (
            <PageHeaderWrapper>
                <Row>
                    <Col span={6}>
                        <Form.Item {...formItemLayout}>
                            {getFieldDecorator('batch')(
                                <Select placeholder='请选择期数'>
                                    <Select.Option value={0}>全部</Select.Option>
                                    {this.props.record.timeList.map(item => <Select.Option key={item.batch} value={item.batch}>{item.batch}</Select.Option>)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item {...formItemLayout}>
                            {getFieldDecorator('year')(
                                <Select placeholder='请选择年份'>
                                    <Select.Option value={0}>全部</Select.Option>
                                    {this.props.record.yearList.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item {...formItemLayout}>
                            {getFieldDecorator('city')(
                                <Select placeholder='请选择城市'>
                                    <Select.Option value={0}>全部</Select.Option>
                                    {this.props.record.cityList.map(item => <Select.Option key={item.city} value={item.city}>{item.city}</Select.Option>)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item {...formItemLayout}>
                            <Button type='primary' onClick={this.handleSubmit} className='m10'>筛选</Button>
                            <Button type='primary' onClick={this.exportData}>导出</Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Statistic title="平均分" value={data ? data.average : 0} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="完成率" value={`${data ? data.full : 0}%`} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="培训人数" value={`${data ? data.allmon : 0}人`} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="培训天数" value={`${data ? data.day.length : 0}天`} />
                    </Col>
                </Row>
                <Divider />
                {data.day && <Chart height={300}  onClick={this.chartChange} data={dv} forceFit>
                    <Axis name="比例" />
                    <Axis name="天数" />
                    <Legend/>
                    <Tooltip
                        crosshairs={{
                        type: "y"
                        }}
                    />
                    <Geom
                        type="interval"
                        position="比例*天数"
                        color={["name", function (age) { return colorMap[age] }]}
                        adjust={[
                            {
                                type: "dodge",
                                marginRatio: 1 / 32
                            }
                        ]}
                    />
                </Chart>}
            </PageHeaderWrapper>
        )
    }
}