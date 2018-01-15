import { stringify } from 'qs';
import request from '../utils/request';
export async function submitWeeklyData(params){
  return request('/admin/editWeekly',{
    method : 'POST',
    body :params
  })
}
export async function fetchWeekly(params){
  let data = {
    weekId : params
  };
  return request('/admin/oneWeekly?' + stringify(data));
}

export async function fetchWeeklyAll(){
  return request('/admin/allWeekly');
}

export async function fetchWeeklyList(params){
  return request('/admin/weeklyList',{
    method : 'get'
  })
}

//summary

export async function fetchWeeklySummary(params){
  let data = {weekId:params};
  return request('/admin/weeklySummary?' + stringify(data))
}


