import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(state => ({
  userInfoData : state.userManege.editData,
  submitting: state.userManege.regularFormSubmitting,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.uid = this.uid;
      if (!err) {
        this.props.dispatch({
          type: 'userManege/submitRegularForm',
          payload: values,
        });
      }
    });
  }

  componentDidMount() {
    this.uid = this.props.match.params.uid;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.dispatch({
      type: 'userManege/fetchUserInfo',
      payload: this.uid,
    });
  }
  render() {
    const { submitting } = this.props;
    const { userInfoData : {username,isAdmin,isWorking,avatar,motto,email,inTheTime,workNumber} } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title={`${username}基本信息`} content="用户信息编辑">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('username', {
                initialValue : username,
                rules: [{
                  required: true, message: '请输入姓名',
                }],
              })(
                <Input placeholder="请输入姓名" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="工号"
            >
              {getFieldDecorator('workNumber', {
                initialValue : workNumber,
                rules: [{
                  required: true, message: '请输入工号',
                }],
              })(
                <Input placeholder="请输入工号" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="邮箱"
            >
              {getFieldDecorator('email', {
                initialValue : email,
                rules: [{
                  required: true, message: '请输入邮箱',
                }],
              })(
                <Input placeholder="请输入邮箱" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="入职时间"
            >
              {getFieldDecorator('inTheTime', {
                initialValue : moment(inTheTime),
                rules: [{
                  required: true, message: '请选择起止日期',
                }],
              })(
                <DatePicker style={{ width: '40%' }} placeholder={['选择日期']} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="个性签名"
            >
              {getFieldDecorator('motto', {
                initialValue : motto,
                rule : {
                  length : 300
                }
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入个性签名" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="头像"
            >
              {getFieldDecorator('avatar',{
                initialValue : avatar
              })(
                <Input placeholder="头像地址" />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="是否管理员"
            >
              <div>
                {getFieldDecorator('isAdmin', {
                  initialValue: isAdmin ? "1" : "0",
                })(
                  <Radio.Group>
                    <Radio value="0">非管理员</Radio>
                    <Radio value="1">设为管理员</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否离职"
            >
              <div>
                {getFieldDecorator('isWorking', {
                  initialValue: isWorking ? "1" : "0",
                })(
                  <Radio.Group>
                    <Radio value="0">离职</Radio>
                    <Radio value="1">在职</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
