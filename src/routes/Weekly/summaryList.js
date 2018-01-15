import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(state => ({
  list: state.weekly.weeklyListData,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'weekly/fetchWeeklyListData',
      payload: {
        count: 5,
      },
    });
  }

  render() {
    const { list } = this.props;
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: {  createdAt, writeNum, allNum } }) => (
      <div className={styles.listContent}>
        <div>
          <span>创建人</span>
          <p>{'admin'}</p>
        </div>
        <div>
          <span>创建时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD hh:mm')}</p>
        </div>
        <div>
          <span>已写周报数</span>
          <p>{writeNum}</p>
        </div>
        <div>
          <span>总周报数</span>
          <p>{allNum}</p>
        </div>
        <div>
          <Progress percent={writeNum/allNum * 100} strokeWidth={6} />
        </div>
      </div>
    );



    const jumpEdit = (id) =>{
      location.hash = '/weekly/summaryView/' + id;
    };

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="所有分类" value="8个分类" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="文档数" value="100个" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周新增" value="10个" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="周报汇总列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              /*              pagination={paginationProps}*/
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a onClick={jumpEdit.bind(this,item.weekId)}>进入</a>
                  ]}
                >
                  <List.Item.Meta
                    title={<a href={item.href}>{`周报：${item.startTimeText} - ${item.endTimeText}`}</a>}
                    description={item.desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
