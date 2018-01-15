import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {docManageAdd} from '../../services/docManage';
import styles from './style.less';
import {queryProjectNotice} from "../../services/api";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  submitting: state.docManage.regularFormSubmitting,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'docManage/submitRegularForm',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting } = this.props;
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
      <PageHeaderLayout title="文档分类添加" content="将文档进行分类整理">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="分类标题"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入分类名字',
                }],
              })(
                <Input placeholder="给分类起个名字" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="分类描述"
            >
              {getFieldDecorator('desc', {
                rules: [{
                  required: true, message: '请输入目标描述',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入这个文档分类是做什么" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="分类封面"
            >
              {getFieldDecorator('cover', {
                rules: [{
                  required: true, message: '请输封面src',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入这个文档分类的封面src" rows={4} />
              )}
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
