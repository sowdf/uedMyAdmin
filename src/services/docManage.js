import { stringify } from 'qs';
import request from '../utils/request';
export async function docManageAdd(params){
    return request('/admin/docManage/add',{
        method : 'POST',
        body :params
    })
}
export async function docManageAll(params){
  return request('/admin/docManage/all');
}

export async function docManageFindOne(params){
  return request('/admin/docManage/findOne?' + stringify(params));
}

export async function docManageFindEdit(params){
  return request('/admin/docManage/edit',{
    method : 'POST',
    body :params
  })
}


