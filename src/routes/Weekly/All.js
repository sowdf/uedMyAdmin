import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './CardList.less';

@connect(state => ({
  list: state.weekly,
}))
export default class CardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'weekly/all',
      payload: {
        count: 8,
      },
    });
    this.jumpEdit = this.jumpEdit.bind(this);
  }
  jumpEdit(id){
    location.hash = `/weekly/add/${id}`;
  }
  jumpView(id){
    location.hash = `/weekly/view/${id}`;
  }
  render() {
    const { list: { list, loading } } = this.props;

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div>
    );

    return (
      <PageHeaderLayout
        title="我的周报"
        extraContent={extraContent}
      >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item => (item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a onClick={this.jumpEdit.bind(this,item.weekId)}>编辑</a>, <a  onClick={this.jumpView.bind(this,item.weekId)}>查看</a>]}>
                    <Card.Meta
                      title={<a onClick={this.jumpView.bind(this,item.weekId)}>{`周报：${item.week.startTimeText} - ${item.week.endTimeText}`}</a>}
                      description={(
                        <Ellipsis className={styles.item} lines={3}>{item.weekWork}</Ellipsis>
                      )}
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" onClick={this.jumpEdit.bind(this,'')} className={styles.newButton}>
                    <Icon type="plus" /> 编辑本周周报
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
