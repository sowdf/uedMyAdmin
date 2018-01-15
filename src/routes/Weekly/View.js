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
  weeklyData : state.weekly.weeklyData
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    this.weekId = this.props.match.params.weekId || '';
    this.props.dispatch({
      type: 'weekly/fetchWeeklyData',
      payload:  this.weekId,
    });
  }

  render() {
    const {startTimeText,endTimeText,weekWork,nextWork,conclusion} = this.props.weeklyData;
    return (
      <PageHeaderLayout title={`周报:${startTimeText} - ${endTimeText}`}>
        <Card bordered={false}>
          <DescriptionList size="large" title="本周工作" style={{ marginBottom: 32 }}>
            <Description>{weekWork}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="下周工作" style={{ marginBottom: 32 }}>
            <Description>{nextWork}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="工作总结" style={{ marginBottom: 32 }}>
            <Description>{conclusion}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
