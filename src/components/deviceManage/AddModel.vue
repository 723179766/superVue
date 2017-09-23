<!-- 新增型号 -->
<template>
	<div class="add-model">
		<el-form :model="modelInfo" class="container" :rules="rules" ref="ruleForm">
			<div class="header">
				<span class="tip"></span>
				<span class="add-title">新增型号</span>
			</div>
			<el-row class="info-wrap">
				<span class="add-title">
					所属厂商
				</span>
				<el-form-item prop="provider_name">
					<el-input v-model="provider_name" :disabled="true"></el-input>
				</el-form-item>
			</el-row>
			<el-row class="info-wrap">
				<span class="add-title">
					设备型号
				</span>
				<el-form-item prop="term_model_name">
					<el-input v-model="modelInfo.term_model_name" placeholder="请输入设备型号"></el-input>
				</el-form-item>
			</el-row>
			<el-row class="info-wrap">
				<span class="add-title">
					型号名称
				</span>
				<el-form-item prop="term_model_nickname">
					<el-input v-model="modelInfo.term_model_nickname" placeholder="请输入型号名称"></el-input>
				</el-form-item>
			</el-row>
			<el-row class="info-wrap">
				<span class="add-title">
					设备图
				</span>
				<span class="content show-ellipsis">
					(大小：不大于200KB，建议尺寸：480像素*480像素，图片格式：PNG/JPG，上传数量未2~5张，第一张上传图片默认为型号LOGO)
				</span>
			</el-row>
			<div class="pic-content">
				<el-upload class="avatar-uploader"
					list-type="picture-card"
		  			:action="upLoadUrl"
		  			:on-success="upSucc"
		  			:on-remove="remove"
		  			name="term_model_pic"
		  			:disabled="modelInfo.pic_array.length>4"
		  			:before-upload="beforeAvatarUpload">
  					<i class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>
		</el-form>
		<div class="text-center margin-top-15">
			<button class="dj-btn dj-btn-primary" @click="submitForm('ruleForm')">确定</button>
			<button class="dj-btn dj-btn-back" @click="back">取消</button>	
		</div>
	</div>
</template>
<script>
	import * as api from '../../api/deviceApi'
	import {API} from '../../config'
	export default {
		data() {
      		return {
        		upLoadUrl:API+'/term_model/upload',
        		provider_name:'',
        		modelInfo:{
        			provider_id:'',
        			term_model_name:'',
        			term_model_nickname:'',
        			term_model_sort:'-1',
        			pic_array:[]
        		},
        		rules:{
        			term_model_name: [
			            { required: true, message: '请输入设备型号', trigger: 'change' }
			        ],
			        term_model_nickname: [
			        	{ required: true, message: '请输入型号名称', trigger: 'change' }
			        ]
        		}
      		}
    	},
	    methods: {
	        beforeAvatarUpload(file) {
		        const isImgType = file.type === 'image/jpeg' || file.type === 'image/png'
		        const isLt200K = file.size / 1024 / 1024 < 0.196;

		        if (!isImgType) {
		          this.$message.error('上传LOGO图片只能是 JPG或者PNG 格式!');
		        }
		        if (!isLt200K) {
		          this.$message.error('上传头像图片大小不能超过 200KB!');
		        }
		        return isImgType && isLt200K;
		    },
	        upSucc(resp, file, fileList){
	        	this.modelInfo.pic_array.push(resp.data)
	        },
	        remove(file, fileList){
	        	let vm = this
	        	_.pull(vm.modelInfo.pic_array,file.response.data)
	        },
	        loadInfo(){
	        	this.modelInfo.provider_id = this.$route.query.providerId
		    	let vm = this , body = {
		    		provider_id:this.modelInfo.provider_id
		    	}
		    	api.getManData(body).then(resp=>{
		    		if(resp.data.code=='00000'){
		    			vm.render(resp.data.data[0])
		    		}
		    	})
	        },
	        render(data){
	        	let vm = this
	        	vm.modelInfo.provider_id = data.id
	        	vm.provider_name = data.provider_name
	        },
	        submitForm(formName) {
	        	let vm = this
	        	console.log(vm.modelInfo.pic_array.length)
	        	if(vm.modelInfo.pic_array.length<1||vm.modelInfo.pic_array.length>6){
	        		vm.$message.error('请2~5张设备图片');
	        	}else{
	        		this.$refs[formName].validate((valid) => {
			          if (valid) {
			            api.addModel(vm.modelInfo).then(resp=>{
			            	if(resp.data.code=='00000'){
			            		vm.$message.success('新增设备成功')
			            		vm.$router.push({name:'ManModel'})
			            	}
			            })
			          } else {
			            return false;
			          }
			        });
	        	}
		    }
	    },
	    mounted(){
	    	this.loadInfo()
	    }
	}
</script>
<style lang='scss'>
	.add-model{
		.el-form-item{
			margin-bottom: 0;
			display: inline-block;
			width: 298px;
		}
		.container{
			background-color: #fff;
			border: 1px solid #ddd;
			padding: 20px 30px 35px;
			.header{
				position: relative;
				.tip{
					position: absolute;
					display: inline-block;
					width: 5px;
					height: 24px;
					background-color: #3aa5ff;
				}
				.add-title{
					padding-left: 15px;
					font-size: 16px;
					color: #333;
				}
			}
			.info-wrap{
				margin-top: 22px;
				min-width: 500px;
				display: flex;
				.add-title{
					line-height: 36px;
					text-align: right;
					padding-left: 18px;
					padding-right: 20px;
					width: 98px;
					display: inline-block;
				}
				.content{
					line-height: 36px;
					font-size: 14px;
					color: #aaa;
					min-width: 400px;
					flex: 1;
				}
			}
			.pic-content{
				margin-left: 99px;
			}
			.pic-wrap{
				margin-top: 6px;
				margin-bottom: 30px; 
			}
		}
	}
</style>