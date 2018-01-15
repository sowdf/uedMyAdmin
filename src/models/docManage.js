import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '../services/api';
import { docManageAdd,docManageAll,docManageFindOne,docManageFindEdit } from '../services/docManage';

export default {
  namespace: 'docManage',
  state: {
    list: [],
    loading: false,
    step: {
    },
    item : {
    },
    regularFormSubmitting: false,
    stepFormSubmitting: false,
    advancedFormSubmitting: false,

  },

  effects: {
    *submitEditForm({ payload }, { call, put }){
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      let result = yield call(docManageFindEdit, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false,
      });
      if(result.code == 100){
        location.hash = '/manage/all';
        return message.success('提交成功');
      }
      message.error(result.message);
    },
    *submitRegularForm({ payload }, { call, put }) {
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      let result = yield call(docManageAdd, payload);
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: false,
      });
      if(result.code == 100){
        location.hash = '/manage/all';
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
      const data = yield call(docManageAll);
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
