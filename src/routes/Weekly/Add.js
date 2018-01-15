import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {docManageAdd} from '../../services/weekly';
import styles from './style.less';
import {queryProjectNotice} from "../../services/api";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(state => ({
  submitting: state.weekly.regularFormSubmitting,
  weeklyData : state.weekly.weeklyData
}))
@Form.create()
export default class BasicForms extends PureComponent {
  componentDidMount() {
    this.weekId = this.props.match.params.weekId || '';
    this.props.dispatch({
      type: 'weekly/fetchWeeklyData',
      payload:  this.weekId,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.weekId = this.props.weeklyData.weekId;
      if (!err) {
        this.props.dispatch({
          type: 'weekly/submitRegularForm',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {startTimeText,endTimeText,weekWork,nextWork,conclusion} = this.props.weeklyData;
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
      <PageHeaderLayout title="周报编辑" content={`周报:${startTimeText} - ${endTimeText}`}>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit.bind(this)}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="本周工作"
            >
              {getFieldDecorator('weekWork', {
                initialValue : weekWork,
                rules: [{
                  required: true, message: '请填写本周工作内容',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="本周工作，进度" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="下周工作"
            >
              {getFieldDecorator('nextWork', {
                initialValue : nextWork,
                rules: [{
                  required: true, message: '请填写下周工作',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="下周工作内容" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="本周工作总结"
            >
              {getFieldDecorator('conclusion', {
                initialValue : conclusion,
                rules: [{
                  required: true, message: '请填本周工作遇到的问题或总结',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="本周工作遇到的问题或总结" rows={4} />
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
