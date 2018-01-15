import request from '../utils/request';

export async function fetchUsers() { //获取所有的用户
  return request('/admin/user/manage');
}

export async function fetchUserInfo(params) { //获取所有的用户
  return request('/admin/user/findOne?uid=' + params);
}

export async function saveEdit(params) { //保存编辑内容
  return request('/admin/user/edit',{
    method : 'POST',
    body :params
  });
}
export async function addUser(params) { //添加新用户
  return request('/admin/user/add',{
    method : 'POST',
    body :params
  });
}
export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/admin/userInfo');
}
