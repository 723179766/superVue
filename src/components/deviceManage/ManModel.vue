<!-- 厂商型号 -->
<template>
	<div class="man-model">
		<div class="addMan" @click="addMan">+新增厂商</div>
		<mon-info v-for="item in modelList" :cell="item" style="margin-bottom: 10px;" @deleteProvider="deleteProvider" :key="item.id"></mon-info>
	</div>
</template>
<script>
	import {MonInfo} from './components'
	import * as api from '../../api/deviceApi'
	export default {
		components:{
			MonInfo
		},
	    data(){
	      return {
	        modelList:[]
	      }
	    },
		methods:{
			addMan(){
				this.$router.push({path:'/AddMan'})
			},
			loadInfo(){
				let vm = this
				api.getProvider().then(resp=>{
					if(resp.data.code == '00000'){
						vm.modelList = resp.data.data
					}
				})
			},
			deleteProvider(id){
				let vm = this,body = {
		          provider_id:id
		        }
		        api.deletaMan(body).then(resp=>{
		        	if(resp.data.code=='00000'){
		        		vm.$message.success('删除厂商成功')
		        		vm.loadInfo()
		        	}
		        })
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.man-model{
		background: #eff3f7;
		.addMan{
			width: 100%;
			height: 36px;
			background-color: #fff;
			border: 1px solid #ddd;
			text-align: center;
			line-height: 36px;
			margin-bottom: 10px;
			cursor: pointer;
		}
	}
</style>
