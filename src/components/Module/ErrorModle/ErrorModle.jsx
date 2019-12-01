import React from 'react'
import { Modal, Divider } from 'antd'
import { connect } from 'dva'
import styles from  './index.less'
import { Button, Table, Icon } from 'antd'
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
  } from "bizcharts";
@connect(({ record, loading }) => ({
    record: record,
}))
export default class ErrorModle extends React.Component{
    componentDidMount() {
        let current = this.props.current;
        if(current){
            this.props.dispatch({
                type: 'record/errorSelData',
                payload: {
                    sid: current.subject.id
                }
            })
            this.props.dispatch({
                type: 'record/questionDetail',
                payload: {
                    id: current.subject.id
                }
            })
        }
    }
    downError = (item) => {
        console.log(item)
        this.props.dispatch({
            type: 'record/downError',
            payload: {
                sid: this.props.current.subject.id
            }
        })
    }
    render() {
        const eng = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
        const column = [
            {
                title: '11',
                dataIndex: 'status',
                key: 'status',
                render: (value, item, index) => (
                    <div style={{display: 'flex', alignItems: 'center'}}>{value === 'true' ? <img style={{width: '20px'}} src={require('../../../assets/success.png')} /> : <img style={{width: '20px'}} src={require('../../../assets/error.png')} />}{eng[index]}选项</div>
                )
            },
            {
                title: '2',
                dataIndex: 'judge',
                key: 'judge',
            },
            {
                title: '3',
                key: 'total',
                dataIndex: 'total'
            }
        ]
        const { isShow, handleColse, current, record } = this.props;
        const { questionDetail, errorSelData } = record
        const currentList = errorSelData ? errorSelData.data[0] : {}
        delete currentList.name
        console.log(currentList)
        let tabArr = [];
        let objArr = Object.keys(currentList)
        objArr.forEach(item => {
            tabArr.push({title: item, '选择次数': currentList[item]})
        })
        console.log(tabArr)
        const cols = {
            sales: {
              tickInterval: 1
            }
          };
        return (
            <Modal
                visible={isShow}
                onCancel={handleColse}
                footer={null}
                width={700}
                title='错题详情'
            >
                <div className={styles.errorModle}>
                    <div style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between'}}>
                        <h3>题目: {questionDetail.title}</h3>
                        <div>
                            <span className='mr20'>总答题次数：{errorSelData.total}</span>
                            <Button type='primary' onClick={this.downError}>导出</Button>
                        </div>
                    </div>
                    <Table 
                        columns={column}
                        rowKey={(item, index) => index}
                        dataSource={questionDetail ? questionDetail.content : []}
                        pagination={false}
                    />
                </div>
                <Divider/>
                <div>
                    <Chart height={300}  data={tabArr} scale={cols} forceFit>
                        <Axis name="title" />
                        <Axis name="选择次数" />
                        <Tooltip
                            crosshairs={{
                            type: "y"
                            }}
                        />
                        <Geom type="interval" position="title*选择次数" />
                    </Chart>
                </div>
            </Modal>
        )
    }
}