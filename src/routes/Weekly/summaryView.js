import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './BasicProfile.less';

const { Description } = DescriptionList;

const progressColumns = [{
  title: '时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '当前进度',
  dataIndex: 'rate',
  key: 'rate',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'success' ? <Badge status="success" text="成功" /> : <Badge status="processing" text="进行中" />
  ),
}, {
  title: '操作员ID',
  dataIndex: 'operator',
  key: 'operator',
}, {
  title: '耗时',
  dataIndex: 'cost',
  key: 'cost',
}];

@connect(state => ({
  weeklyData : state.weekly.weeklySummaryData
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    this.weekId = this.props.match.params.weekId || '';
    this.props.dispatch({
      type: 'weekly/fetchWeeklySummaryData',
      payload:  this.weekId,
    });
  }
  render() {
    const {startTimeText,endTimeText,weeklies,noWriteAry} = this.props.weeklyData;
    const Summary = (props)=>(
      <DescriptionList size="large" key={props.index} title={props.username + ' 同学：'} style={{ marginBottom: 32 }}>
        <Description  style={{ paddingLeft: 32 }}>
          <DescriptionList size="large" title="本周工作" style={{ marginBottom: 32 }}>
            <Description>{props.weekWork}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="下周工作" style={{ marginBottom: 32 }}>
            <Description>{props.nextWork}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="工作总结" style={{ marginBottom: 32 }}>
            <Description>{props.conclusion}</Description>
          </DescriptionList>
        </Description>
      </DescriptionList>
    );
    return (
      <PageHeaderLayout title={`周报:${startTimeText} - ${endTimeText}汇总`}>
        <Card bordered={true}>
          <DescriptionList size="large" title="周报情况" style={{ marginBottom: 32 }}>
            <Description>{noWriteAry && (noWriteAry.length == 0 ? '周报已全部写完'  : `周报还有${noWriteAry.length}人没有写`)}</Description>
            <Description>
              <span>
                 {
                   noWriteAry && (noWriteAry.length !== 0 ? `分别是：` : '')
                 } <br/>
              </span>

            </Description>
            <Description>
              {
                noWriteAry && noWriteAry.map((item,index)=>{
                    return item + ','
                })
              }
            </Description>
          </DescriptionList>
        </Card>
        <Card bordered={false}>
          {
            weeklies && weeklies.map((item,index)=>{
              let {weekWork,nextWork,conclusion,username} = item;
                return <Summary {...item} key={index}/>
            })
          }
        </Card>
      </PageHeaderLayout>
    );
  }
}
