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
  list: state.docManage,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'docManage/all',
      payload: {
        count: 5,
      },
    });
  }

  render() {
    const { list: { list, loading } } = this.props;
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

    const ListContent = ({ data: { creator, date, percent, status } }) => (
      <div className={styles.listContent}>
        <div>
          <span>创建人</span>
          <p>{creator}</p>
        </div>
        <div>
          <span>创建时间</span>
          <p>{moment(date).format('YYYY-MM-DD hh:mm')}</p>
        </div>
        <div>
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const stackMenu = (data)=>{
        return   <Menu>
          <Menu.Item>
            <a onClick={jumpEdit.bind(this,data._id)}>编辑</a>
          </Menu.Item>
        </Menu>
    }

    const MoreBtn = (props) => (
      <Dropdown overlay={stackMenu(props.item)}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );
    const jumpEdit = (id) =>{
      location.hash = '/manage/edit/' + id;
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
            title="分类列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button type="dashed" onClick={()=>location.hash = '/manage/add'} style={{ width: '100%', marginBottom: 8 }} icon="plus">
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
/*              pagination={paginationProps}*/
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a onClick={jumpEdit.bind(this,item._id)}>进入</a>,
                    <a onClick={jumpEdit.bind(this,item._id)}>编辑</a>,
                    <MoreBtn item={item}/>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.cover} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
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
