<!-- 修改厂商信息 -->
<template>
	<div class="edit-man">	
		<el-form :model="providerInfo" class="container" :rules="rules" ref="ruleForm">
			<div class="header">
				<span class="tip"></span>
				<span class="edit-title">修改厂商</span>
			</div>
			<el-row class="info-wrap">
				<span class="edit-title" >
					厂商名称
				</span>
				<el-form-item prop="provider_name">
					<el-input v-model="providerInfo.provider_name" placeholder="请输入厂商名称"></el-input>
				</el-form-item>
			</el-row>
			<el-row class="info-wrap">
				<span class="edit-title">
					厂商简称
				</span>
				<el-form-item prop="provider_abbr">
					<el-input v-model="providerInfo.provider_abbr" placeholder="请输入厂商简称"></el-input>
				</el-form-item>
			</el-row>
			<el-row class="info-wrap">
				<span class="edit-title">
					LOGO
				</span>
				<span class="content show-ellipsis">
					(大小：不大于200KB，建议尺寸：144像素*144像素，图片格式：PNG/JPG)
				</span>
			</el-row>
			
				<div class="pic-content">
					<el-upload class="avatar-uploader"
		  				:action="upLoadUrl"
		  				:on-success="upSucc"
		  				name="term_model_pic"
		  				:show-file-list="false"
		  				:before-upload="beforeAvatarUpload">
		  				<img v-if="providerInfo.provider_logo" :src="imageUrl" class="avatar">
  						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			<el-row class="info-wrap">
				<span class="edit-title">
					地址
				</span>
				<el-form-item prop="provider_addr">
					<el-input v-model="providerInfo.provider_addr" placeholder="请输入厂商地址"></el-input>
				</el-form-item>
			</el-row>
			<el-row class="info-wrap">
				<span class="edit-title">
					联系人
				</span>
				<el-form-item prop="provider_user">
					<el-input v-model="providerInfo.provider_user" placeholder="请输入联系人"></el-input>
				</el-form-item>
			</el-row>
			<el-row class="info-wrap">
				<span class="edit-title">
					电话
				</span>
				<el-form-item prop="provider_tel">
					<el-input v-model="providerInfo.provider_tel" placeholder="请输入电话"></el-input>
				</el-form-item>
			</el-row>
			<el-row class="info-wrap">
				<span class="edit-title">
					备注
				</span>
				<el-form-item prop="provider_note">
					<el-input class="note" v-model="providerInfo.provider_note" type="textarea" :rows="3" placeholder="请输入备注"></el-input>
				</el-form-item>
			</el-row>
		</el-form>
		<div class="text-center margin-top-15">
			<button class="dj-btn dj-btn-primary" style="margin-right:8px;" @click="submitForm('ruleForm')">确定</button>	
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
        		imageUrl: '',
        		upLoadUrl:API+'/term_model/upload',
        		providerInfo: {
        		  provider_id:'',
		          provider_name: '',
		          provider_abbr: '',
		          provider_addr: '',
		          provider_user: '',
		          provider_tel: '',
		          provider_logo: '',
		          provider_note: '',
		          provider_sort: ''
		        },
		        rules:{
		        	provider_name: [
			            { required: true, message: '请输入厂商名称', trigger: 'change' }
			        ],
			        provider_abbr: [
			        	{ required: true, message: '请输入厂商简称', trigger: 'change' }
			        ],
			        provider_addr: [
			        	{ required: true, message: '请输入厂商地址', trigger: 'change' }
			        ],
			        provider_user: [
			        	{ required: true, message: '请输入联系人', trigger: 'change' }
			        ],
			        provider_tel: [
			        	{ required: true, message: '请输入电话', trigger: 'change' }
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
	        	this.providerInfo.provider_logo = resp.data
	        	this.imageUrl = URL.createObjectURL(file.raw)
	        },
	        submitForm(formName) {
	        	let vm = this
	        	if(vm.providerInfo.provider_logo==''){
	        		vm.$message.error('请上传LOGO图片');
	        	}else{
	        		this.$refs[formName].validate((valid) => {
			          if (valid) {
			          	vm.providerInfo.provider_logo = 'tmp/'+_.last(vm.providerInfo.provider_logo.split('/'))
			            api.editMan(vm.providerInfo).then(resp=>{
			            	if(resp.data.code=='00000'){
			            		vm.$message.success('修改厂商成功')
			            		vm.$router.push({name:'ManModel'})
			            	}
			            })
			          } else {
			            return false;
			          }
			        });
	        	}
		    },
		    loadInfo(){
		    	this.providerInfo.provider_id = this.$route.query.providerId
		    	let vm = this , body = {
		    		provider_id:this.providerInfo.provider_id
		    	}
		    	api.getManData(body).then(resp=>{
		    		if(resp.data.code=='00000'){
		    			vm.render(resp.data.data[0])
		    		}
		    	})
		    },
		    render(data){
		    	let vm = this
		    	vm.providerInfo.provider_id = data.id
		    	vm.providerInfo.provider_name = data.provider_name
		    	vm.providerInfo.provider_abbr = data.abbreviation
		    	vm.providerInfo.provider_addr = data.provider_address
		    	vm.providerInfo.provider_user = data.provider_user
		    	vm.providerInfo.provider_tel = data.provider_phone
		    	vm.providerInfo.provider_logo = data.provider_logo
		    	vm.imageUrl = data.provider_logo
		    	vm.providerInfo.provider_note = data.provider_note
		    	vm.providerInfo.provider_sort = data.provider_sort
		    }
	    },
	    mounted(){
	    	this.loadInfo()
	    }
	}
</script>
<style lang='scss'>
	.edit-man{
		padding: 10px;
		.el-form-item{
			margin-bottom: 0;
			display: inline-block;
			width: 298px;
		}
		.avatar-uploader .el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		  }
		  .avatar-uploader .el-upload:hover {
		    border-color: #20a0ff;
		  }
		  .avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 178px;
		    height: 178px;
		    line-height: 178px;
		    text-align: center;
		  }
		  .avatar {
		    width: 178px;
		    height: 178px;
		    display: block;
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
				.edit-title{
					padding-left: 15px;
					font-size: 16px;
					color: #333;
				}
			}
			.info-wrap{
				margin-top: 22px;
				min-width: 500px;
				display: flex;
				.edit-title{
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
				.note{
					width: 876px;
					height: 80px;
				}
			}
			.pic-content{
				margin-left: 100px;
			}
		}
	}
</style>