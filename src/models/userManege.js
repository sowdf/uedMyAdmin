import { fetchUserInfo,fetchUsers,saveEdit,addUser } from '../services/user';
import { message } from 'antd';
export default {
  namespace: 'userManege',

  state: {
    list: [],
    loading: false,
    currentUser: {},
    editData : {},
    regularFormSubmitting : false
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(fetchUsers);
      yield put({
        type: 'save',
        payload: response.result,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchUserInfo({payload}, { call, put }) {
      const response = yield call(fetchUserInfo,payload);
      yield put({
        type: 'userInfo',
        payload: response.result,
      });
    },
    *addUserFrom({payload},{call,put}){
      const response = yield call(addUser,payload);
      if(response.code == 100){
        message.success(response.message);
        return location.hash = '/userManage/allUser';
      }
      message.error(response.message);
    },
    *submitRegularForm({payload},{call,put}){
      const response = yield call(saveEdit,payload);
      if(response.code == 100){
        message.success(response.message);
        return location.hash = '/userManage/allUser';
      }
      message.error(response.message);
    }
  },

  reducers: {
    userInfo(state, action){
      return {
        ...state,
        editData: action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
