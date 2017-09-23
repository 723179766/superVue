<template>
	<div class="app-detail">
		<div class="headRow">
	      	<div class="dev-logo">
	        	<img width="100%" src="../../assets/down-dis.png">
	      	</div>
	      	<div class="dev-title">
	        	<div class="headTitle">华夏天天加油</div>
	        	<div class="headP">
	        		<span style="padding-right:36px;">包名：alipay_wap_main</span>
	        		<span>版本：10.0.20.080124</span>
	        	</div>
	      	</div>
	    </div>
	    <el-tabs type="border-card" class="app-tabs" v-model="selected" @tab-click="changeTab">
		  	<el-tab-pane label="应用详情" name="detail">
          <app-tab-detail></app-tab-detail>
		  	</el-tab-pane>
		  	<el-tab-pane label="设备列表" name="dlist">
		  		<app-tab-dlist></app-tab-dlist>
		  	</el-tab-pane>
		  	<el-tab-pane label="版本管理" name="vmanage">
		  		<app-tab-vmanage></app-tab-vmanage>
		  	</el-tab-pane>
		  	<el-tab-pane label="上架管理" name="up">
		  		<app-tab-up></app-tab-up>
		  	</el-tab-pane>
		</el-tabs>
    <div class="text-center margin-top-20 margin-bottom-10">
      <button class="dj-btn dj-btn-default" style="background-color:#fff;" @click="goBack">返回</button>
    </div>
	</div>
</template>
<script>
	import AppTabDetail from './components/AppTabDetail'
	import AppTabDlist from './components/AppTabDlist'
	import AppTabVmanage from './components/AppTabVmanage'
	import AppTabUp from './components/AppTabUp'
	export default {
		data(){
			return {
				selected:'detail',

			}
		},
		components:{
			AppTabDetail,AppTabDlist,AppTabVmanage,AppTabUp
		},

		methods:{
      goBack() {
        this.$router.go(-1)
      },
			change(){
				this.selected = 'vmanage'
			},
			changeTab(tab,event){
				this.selected = tab.name
			}
		}

	}
</script>
<style lang='scss'>
	.app-detail{
		padding: 0 !important;
		.headRow{
		    min-width: 500px;
		    height: 98px;
		    background: #fff;
		    border-top: 1px solid #ccc;
		    border-bottom: 1px solid #ccc;
		    padding: 20px 32px;
		    margin-bottom: 10px;
		    .dev-logo{
			    float: left;
			    height: 48px;
			    width: 48px;
			    border-radius: 4px !important;
			    border: 1px solid rgb(213,221,231);
			}
			.dev-title{
			    float: left;
			    height: 60px;
			    margin-left: 16px;
			    .headTitle{
				    font-family: "PingFang SC";
				    font-size: 16px;
				    font-weight: bold;
				    color: #333;
				}
				.headP{
				    margin: 5px 0;
				    font-family: "PingFang SC";
				    font-size: 14px;
				    color: #666;
				}
			}
		}
		.app-tabs{
			margin: 0 20px;
		    box-shadow: none;
		    border:none;
		    .el-tabs__header{
      			border:1px solid #d1dbe5;
    		}
		    .el-tabs__content{
		        padding: 0px;
		        border:1px solid #d1dbe5;
		        border-top: none;
		    }
		}


	}
  .form-detail{
    .el-form-item__label{
      font-family: "PingFang SC";
      color: #999;
    }
    .el-form-item{
      margin-bottom: 10px;
      width: 90%;
      .dj-tag{
        line-height: 1.4;
      }
      .line{
        vertical-align: top;
        color: #999;
      }
      .form-item-right{
        display: inline-block;
        width: 96%;
        img{
          width: 136px;
          height: 200px;
          margin-left: 10px;
        }
      }
      .apk-img-icon{
        display: inline-block;
        width: 96%;
        img{
          border-radius: 5px !important;
          width: 100px;
          height: 100px;
          margin-left: 10px;
        }
      }
      .apk-img-box{
        margin-left: -7px;
      }
    }
  }
</style>
