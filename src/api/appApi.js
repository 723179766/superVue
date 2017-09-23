import { fetch,postData,deleteData,putData } from '../service/httpService'
import { API } from '../config.js'


/* 应用管理-->应用分类
  首页、增加、删除、修改、排序 */
export function getAppClassList(body){
	return postData(API+'/category/index',body)
}
export function appClassAdd(body){
  return postData(API+'/category/add',body)
}
export function appClassDel(body){
  return deleteData(API+'/category/del',body)
}
export function appClassMod(body){
  return putData(API+'/category/update',body)
}
export function appClassSort(body){
  return postData(API+'/category/move',body)
}

/* 应用管理-->应用审核
  应用审核列表、应用具体信息、详情审核、版本审核、头部信息 */
export function getAppAuditList(body){
  return postData(API+'/appcheck/index?page='+body.currentPage,body)
}
export function getAppAuditDetail(body){
  return fetch(API+'/appcheck/version_index/'+body.appId+'?status='+body.appState)
}
export function appDetailExe(body){
  return postData(API+'/appcheck/app_save',body)
}
export function appVersionExe(body){
  return postData(API+'/appcheck/version_save',body)
}
export function getAppDetailData(body){
  return fetch(API+'/app/'+body.appId)
}

/* 应用管理-->应用列表
  首页、删除应用、APP下架 */
export function getAppList(body){
  return postData(API+'/app?page='+body.currentPage,body)
}
export function appDel(body){
  return deleteData(API+'/app',body)
}
export function appDown(body){
  return postData(API+'/app/down_shelf',body)
}

/* 应用管理-->上传应用
  获取APK图标、上传应用 */
export function getApkIcon(body){
  return postData(API+'/app/getApkIcon',body)
}
export function appUpload(body){
  return postData(API+'/app/store',body)
}
