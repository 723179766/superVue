import axios from 'axios'

/* ajax-get */
export const fetch = (url,data={}) =>{
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:url,
			params:data
		}).then(resp=>{
			resolve(resp)
		},reject)
	})
}

/* ajax-post */
export const postData = (url,data={}) =>{
	return new Promise((resolve,reject)=>{
		axios({
			method:'post',
			url:url,
			data:data
		}).then(resp=>{
			resolve(resp)
		},reject)
	})
}

/* delete-post */
export const deleteData = (url,data={}) =>{
	return new Promise((resolve,reject)=>{
		axios({
			method:'delete',
			url:url,
			data:data
		}).then(resp=>{
			resolve(resp)
		},reject)
	})
}

/* put-post */
export const putData = (url,data={}) =>{
  return new Promise((resolve,reject)=>{
    axios({
      method:'put',
      url:url,
      data:data
    }).then(resp=>{
      resolve(resp)
    },reject)
  })
}
