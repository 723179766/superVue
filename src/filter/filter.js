module.exports.install = function(Vue,options){
  Vue.filter('sex',(value)=>{
    let result = '';
    if(value==0){
      result = '男'
    }else if(value==1){
      result = '女'
    }
    return result;
  })
};
