import { fetch,postData,deleteData } from '../service/httpService'
import { API } from '../config.js'

let tempAPI = 'http://192.168.10.179:9500/api'

/* 获取厂商型号列表 */
export function getProvider(body){
	return fetch(API+'/provider/get',body)
}

/* 新增厂商 */
export function addProvider(body){
	return postData(API+'/provider/add',body)
}

/* 获取厂商信息 */
export function getManData(body){
	return fetch(API+'/provider/getProviderById',body)
}

/* 编辑厂商信息 */
export function editMan(body){
	return postData(API+'/provider/edit',body)
}

/* 删除厂商 */
export function deletaMan(body){
	return deleteData(API+'/provider/del',body)
}

/* 新增设备 */
export function addModel(body){
	return postData(API+'/term_model/add',body)
}

/* 删除设备 */
export function deleteModel(body){
	return deleteData(API+'/term_model/del',body)
}

/* 查看更多 */
export function getMoreModel(body){
	return fetch(API+'/provider/getTermModel/'+body.provider_id)
}

