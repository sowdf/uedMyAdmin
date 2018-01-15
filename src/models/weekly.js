import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '../services/api';
import { submitWeeklyData,fetchWeekly,fetchWeeklyAll,fetchWeeklyList ,fetchWeeklySummary} from '../services/weekly';

export default {
  namespace: 'weekly',
  state: {
    weeklyData : {},
    weeklyListData : [],
    list: [],
    loading: false,
    step: {
    },
    item : {
    },
    weeklySummaryData : {

    },
    regularFormSubmitting: false,
    stepFormSubmitting: false,
    advancedFormSubmitting: false,

  },

  effects: {
    *fetchWeeklySummaryData({ payload }, { call, put }){
      let result = yield call(fetchWeeklySummary, payload);
      yield put({
        type : 'initWeeklySummaryData',
        payload : result.result
      });
    },
    *fetchWeeklyListData({ payload }, { call, put }){
      let result = yield call(fetchWeeklyList, payload);
      yield put({
        type : 'initWeeklyListData',
        payload : result.result
      });
    },
    *fetchWeeklyData({ payload }, { call, put }){
      let result = yield call(fetchWeekly, payload);
      yield put({
        type : 'initWeeklyData',
        payload : result.result
      });
    },
    *submitRegularForm({ payload }, { call, put }) {
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      let result = yield call(submitWeeklyData, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false,
      });
      if(result.code == 100){
        location.hash = '/weekly/my';
        return message.success('提交成功');
      }
      message.error(result.message);
    },

    *fetchItemData({payload},{call,put}){
      yield put({
        type : 'changeLoading',
        payload : true
      });
      let data = yield call(docManageFindOne,{id:payload});
      let {code,message,result} = data;
      yield put({
        type : 'getItem',
        payload : result
      });
      yield put({
        type : 'changeLoading',
        payload : false
      });
    },
    *all({payload},{call,put}){
      yield put({
        type : 'changeLoading',
        payload : true
      });
      const data = yield call(fetchWeeklyAll);
      let {code,result,message} = data;
      yield put({
        type : 'appendList',
        payload : Array.isArray(result) ? result : []
      });
      yield put({
        type : 'changeLoading',
        payload : false
      });
    }
  },

  reducers: {
    initWeeklySummaryData (state, { payload }){
      return {
        ...state,
        weeklySummaryData : payload
      }
    },
    initWeeklyData(state, { payload }){
      return {
          ...state,
          weeklyData : payload
        }
    },
    initWeeklyListData(state, { payload }){
      return {
        ...state,
        weeklyListData : payload
      }
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    changeRegularFormSubmitting(state, { payload }) {
      return {
        ...state,
        regularFormSubmitting: payload,
      };
    },
    changeStepFormSubmitting(state, { payload }) {
      return {
        ...state,
        stepFormSubmitting: payload,
      };
    },
    changeAdvancedFormSubmitting(state, { payload }) {
      return {
        ...state,
        advancedFormSubmitting: payload,
      };
    },
    appendList(state,action){
      return {
        ...state,
        list : action.payload
      }
    },
    getItem(state,action){
      return {
        ...state,
        item : action.payload
      }
    },
    changeLoading(state,action){
      return {
        ...state,
        loading : action.payload
      }
    }
  },

};
