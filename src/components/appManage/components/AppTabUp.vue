<!-- 应用详情-上架管理tab -->
<template>	
	<div class="app-tab-up">
		<div class="up-btn-wrap" v-if="show.addTest||show.addOffice">	
			<el-button v-if="show.addTest" class="addUp" type="primary" @click.native="addTest">新增测试上架</el-button>
			<el-button v-if="show.addOffice" class="addUp" type="primary" @click.native="addOffice" :disabled="!show.addTest">新增正式上架</el-button>
		</div>	
		<!-- 测试上架区 -->
		<div class="base-wrap">
			<div class="header">
				<div class="w-title">
					<span class="w-icon"></span>
					<span class="label">测试上架</span>
				</div>
				<div>
					<el-button  class="addUp border-radius-4" type="primary">更新</el-button>
					<el-button  class="addUp border-radius-4" type="primary">更新为正式版本</el-button>
					<el-button  class="addUp border-radius-4" type="error">删除</el-button>
				</div>
			</div>
			<div class="info-wrap">
				<div class="first-line">
					<div class="cell">
						<span class="title">版本号</span>
						<span class="content">10.0.7</span>
					</div>
					<div class="cell">
						<span class="title">上架日期</span>
						<span class="content">暂未上架</span>
					</div>
					<div class="cell">
						<span class="title">已安装设备数量</span>
						<span class="content">0</span>
					</div>
				</div>
				<div class="second-line">	
					<span class="title">
						<span>版本说明</span>
					</span>
					<span class="content">	容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end</span>
				</div>
			</div>
		</div>
		<div class="content-wrap">
			<div class="up-status">上架情况|&nbsp;暂未上架，<span>点击上架</span></div>
			<div class="add-sn">
				<span>按SN号添加</span>
				<div class="add-sn-area">
					<input class="dj-input inputKey" placeholder="请输入SN号">
					<el-button :plain="true" type="success" class="successButton" >
			                    <div class="successText">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-plus"></i>&nbsp;&nbsp;添加&nbsp;&nbsp;&nbsp;&nbsp;
			                    </div>
			                </el-button>
				</div>
				<span>已选设备</span>
				<div class="table-area">
		                  <table class="dj-table">
		                    <thead>
		                    <tr>
		                      <th width="248">SN号</th>
		                      <th width="150">厂商简介</th>
		                      <th width="148">设备型号</th>
		                      <th width="94">操作</th>
		                    </tr>
		                    </thead>
		                    <tbody>
		                    <tr >
		                      <td>
		                        <span>0002004FF91600008</span>
		                      </td>
		                      <td>东集</td>
		                      <td>DJ-V90</td>
		                      <td><span class="icon iconfont icon-delete"></span></td>
		                    </tr>
		                    <tr >
		                      <td>
		                        <span>0002004FF91600008</span>
		                      </td>
		                      <td>东集</td>
		                      <td>DJ-V90</td>
		                      <td><span class="icon iconfont icon-delete"></span></td>
		                    </tr>
		                    </tbody>
		                  </table>
		                </div>
		                <button class="dj-btn dj-btn-primary  margin-right-5" @click="chooseTest">确定</button>
			        	<button class="dj-btn dj-btn-back" @click="show.addTestDio=false">取消</button>
			</div>
		</div>
		<div class="content-wrap">
			<div class="up-status">上架情况|&nbsp;已上架，<span>修改</span></div>
			<div class="table-area">
                  <table class="dj-table">
                    <thead>
                    <tr>
                      <th width="248">SN号</th>
                      <th width="150">厂商简介</th>
                      <th width="148">设备型号</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr >
                      <td>
                        <span>0002004FF91600008</span>
                      </td>
                      <td>东集</td>
                      <td>DJ-V90</td>
                    </tr>
                    <tr >
                      <td>
                        <span>0002004FF91600008</span>
                      </td>
                      <td>东集</td>
                      <td>DJ-V90</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
		</div>
		<!-- 正式上架区 -->
		<div class="base-wrap">
			<div class="header">
				<div class="w-title">
					<span class="w-icon"></span>
					<span class="label">正式上架</span>
				</div>
				<div>
					<span  class="addUp addUp-default border-radius-4">
						<i class="icon iconfont icon-shengji"></i>升级版本
					</span>
				</div>
			</div>
			<div class="info-wrap">
				<div class="first-line">
					<div class="cell">
						<span class="title">版本号</span>
						<span class="content">10.0.7</span>
					</div>
					<div class="cell">
						<span class="title">上架日期</span>
						<span class="content">暂未上架</span>
					</div>
					<div class="cell">
						<span class="title">已安装设备数量</span>
						<span class="content">0</span>
					</div>
				</div>
				<div class="second-line">	
					<span class="title">
						<span>版本说明</span>
					</span>
					<span class="content">	容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end</span>
				</div>
			</div>
		</div>
		<div class="content-wrap">
			<div class="up-status">上架情况|&nbsp;暂未上架，<span>点击上架</span></div>
			<div class="up-style">
				<span class="title">上架方式</span>
				<pixel-radio class="radio" :list=upList :selected=selected @chooseDot="chooseUpStyle"></pixel-radio>
			</div>
			<div class="tip-wrap">
				<div class="all-tip">
					<div class="up">
						<span>待选设备标签</span>
						<div class="s-tip-area">
							<input class="dj-input inputKey" placeholder="请输入搜索内容">
							<el-button type="warning">搜索</el-button>
						</div>
						<div class="tip-tool">
							<span class="tip" v-for="tip in leftTip">{{tip.key}}&nbsp;<span class="plus">+</span></span>
						</div>
					</div>
					<div class="down">
						<span>按SN号添加</span>
						<div class="add-sn-area">
							<input class="dj-input inputKey" placeholder="请输入SN号">
							<el-button :plain="true" type="success" class="successButton" >
					                    <div class="successText">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-plus"></i>&nbsp;&nbsp;添加&nbsp;&nbsp;&nbsp;&nbsp;
					                    </div>
					                </el-button>
						</div>
					</div>
				</div>
				<div class="device-wrap">
					<div>已选设备标签</div>
					<el-tag
					  v-for="tag in tags"
					  :key="tag.name"
					  :closable="true"
					  :type="tag.type"
					>
					{{tag.name}}
					</el-tag>
					<div class="line">已选设备</div>
					<div class="table-area">
		                  <table class="dj-table">
		                    <thead>
		                    <tr>
		                      <th width="248">SN号</th>
		                      <th width="150">厂商简介</th>
		                      <th width="148">设备型号</th>
		                      <th width="94">操作</th>
		                    </tr>
		                    </thead>
		                    <tbody>
		                    <tr >
		                      <td>
		                        <span>0002004FF91600008</span>
		                      </td>
		                      <td>东集</td>
		                      <td>DJ-V90</td>
		                      <td><span class="icon iconfont icon-delete"></span></td>
		                    </tr>
		                    <tr >
		                      <td>
		                        <span>0002004FF91600008</span>
		                      </td>
		                      <td>东集</td>
		                      <td>DJ-V90</td>
		                      <td><span class="icon iconfont icon-delete"></span></td>
		                    </tr>
		                    </tbody>
		                  </table>
		            </div>
		            <div style="text-align:center">
		            	<button class="dj-btn dj-btn-primary  margin-right-5" @click="chooseTest">确定</button>
			        	<button class="dj-btn dj-btn-back" @click="show.addTestDio=false">取消</button>
		            </div>
		            
				</div>
			</div>
		</div>
		<div class="content-wrap">
			<div class="up-status">上架情况|&nbsp;已上架，上架方式：部分上架<span>修改</span></div>
			<div class="res-wrap">
				<div class="up-status" style="margin-bottom:10px;">已选设备标签</div>
				<div class="save-tag">
					<el-tag style="margin:0 10px 10px 0" type="primary" v-for="item in tags">{{item.name}}</el-tag>
				</div>
				<div class="up-status" style="margin-top:10px;">已选设备</div>
				<div class="table-area">
                  <table class="dj-table">
                    <thead>
                    <tr>
                      <th width="248">SN号</th>
                      <th width="150">厂商简介</th>
                      <th width="148">设备型号</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr >
                      <td>
                        <span>0002004FF91600008</span>
                      </td>
                      <td>东集</td>
                      <td>DJ-V90</td>
                    </tr>
                    <tr >
                      <td>
                        <span>0002004FF91600008</span>
                      </td>
                      <td>东集</td>
                      <td>DJ-V90</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
			</div>
				
			</div>
		<!-- 弹窗区 -->
		<el-dialog title="新增" :visible.sync="show.addTestDio" class="el-dialog-primary">
	      <el-form label-width="100px">
	        <el-form-item label="设备测试版本" prop="label_name">
	          <el-select v-model="testVersion" placeholder="请选择测试版本">
		        <el-option label="1.0.9" value="1.0.9"></el-option>
		        <el-option label="1.0.10" value="1.0.10"></el-option>
		      </el-select>
	        </el-form-item>
	      </el-form>
	      <div slot="footer" class="dialog-footer">
	        <button class="dj-btn dj-btn-primary  margin-right-5" @click="chooseTest">确定</button>
	        <button class="dj-btn dj-btn-back" @click="show.addTestDio=false">取消</button>
	      </div>
	    </el-dialog>
	    <el-dialog title="新增" :visible.sync="show.addOfficeDio" class="el-dialog-primary">
	      <el-form label-width="100px">
	        <el-form-item label="设备正式版本" prop="label_name">
	          <el-select v-model="officeVersion" placeholder="请选择正式版本">
		        <el-option label="1.0.9" value="1.0.9"></el-option>
		        <el-option label="1.0.10" value="1.0.10"></el-option>
		      </el-select>
	        </el-form-item>
	      </el-form>
	      <div slot="footer" class="dialog-footer">
	        <button class="dj-btn dj-btn-primary  margin-right-5" @click="chooseOffice">确定</button>
	        <button class="dj-btn dj-btn-back" @click="show.addOfficeDio=false">取消</button>
	      </div>
	    </el-dialog>
	</div>
</template>
<script>	
	import PixelRadio from './PixelRadio'
	export default {
		data(){
			return {
				show:{
					addTest:true,
					addOffice:true,
					addTestDio:false,
					addOfficeDio:false
				},
				testVersion:'',
				officeVersion:'',
				selected:'1',
				upList:[{key:'全部上架',value:'1'},{key:'部分上架',value:'0'}],
				leftTip:[{key:'批发商户',value:'1'},{key:'零售行业',value:'2'},{key:'批发商户',value:'1'},{key:'零售行业',value:'2'},{key:'批发商户',value:'1'},{key:'零售行业',value:'2'},{key:'批发商户',value:'1'},{key:'零售行业',value:'2'},{key:'批发商户',value:'1'},{key:'零售行业',value:'2'},{key:'批发商户',value:'1'},{key:'零售行业',value:'2'},{key:'批发商户',value:'1'},{key:'零售行业',value:'2'},{key:'批发商户',value:'1'},{key:'零售行业',value:'2'}],
				tags: [
		          { name: '标签一', type: '' ,value:'1'},
		          { name: '标签二', type: '' ,value:'1'},
		          { name: '标签三', type: '' ,value:'1'},
		          { name: '标签四', type: '' ,value:'1'},
		          { name: '标签五', type: '' ,value:'1'},
		          { name: '标签六', type: '' ,value:'1'},
		          { name: '标签三', type: '' ,value:'1'},
		          { name: '标签四', type: '' ,value:'1'},
		          { name: '标签五', type: '' ,value:'1'},
		          { name: '标签六', type: '' ,value:'1'},
		          { name: '标签三', type: '' ,value:'1'},
		          { name: '标签四', type: '' ,value:'1'},
		          { name: '标签五', type: '' ,value:'1'},
		          { name: '标签六', type: '' ,value:'1'},
		          { name: '标签四', type: '' ,value:'1'},
		          { name: '标签五', type: '' ,value:'1'},
		          { name: '标签六', type: '' ,value:'1'},
		          { name: '标签三', type: '' ,value:'1'},
		          { name: '标签四', type: '' ,value:'1'},
		          { name: '标签五', type: '' ,value:'1'},
		          { name: '标签六', type: '' ,value:'1'},
		          { name: '标签四', type: '' ,value:'1'},
		          { name: '标签五', type: '' ,value:'1'},
		          { name: '标签六', type: '' ,value:'1'},
		          { name: '标签三', type: '' ,value:'1'},
		          { name: '标签四', type: '' ,value:'1'},
		          { name: '标签五', type: '' ,value:'1'},
		          { name: '标签六', type: '' ,value:'1'}
		        ]

			}
		},
		components:{PixelRadio},
		methods:{
			addTest(){
				let vm = this
				vm.show.addTestDio = true
			},
			addOffice(){
				let vm = this
				vm.show.addOfficeDio = true
			},
			chooseTest(){
				let vm = this
				vm.show.addTest = false
				vm.show.addTestDio = false
			},
			chooseOffice(){
				let vm = this
				vm.show.addOffice = false
				vm.show.addOfficeDio = false
			},
			chooseUpStyle(cell){
				console.log(cell)
			}
		}
	}
</script>
<style lang='scss'>
	.app-tab-up{
		padding: 20px;
		.el-dialog__body{
			padding-left: 80px;
		}
		.el-select{
			width: 250px;
		}
		.el-button--success.is-plain{
			border:1px solid #4caf51;
		}
		.successText{
		    color: #4caf51;
		}
		.inputKey{
	      width: 200px;
	      height: 36px;
	      margin: 0 10px 0 0;
	      font-family: "PingFang SC";
	      font-size: 14px;
	      color: #999;
	    }
		.base-wrap,.up-btn-wrap{
			.addUp{
				display: inline-block;
				font-size: 14px;
				width: 112px;
				text-align: center;
				height: 34px;

				font-size: 12px;
			}
			.addUp-default{
				border:1px solid #ccc;
				line-height: 33px;
				cursor: pointer;
			}
			.el-button--primary{
				background-color: #1d8be9;
		    	border-color: #1d8be9;
		    	&:hover{
		    		background-color:rgba(29,139,233,.9);
		    		border-color:rgba(29,139,233,.9);
		    	}
			}
			.el-button--error{
				background-color: #db4700;
				border-color: #db4700;
				color: #fff;
		    	&:hover{
		    		background-color:rgba(219,71,0,.9);
		    		border-color:rgba(219,71,0,.9);
		    	}
			}
			.el-button.is-disabled {
			    color: #bfcbd9;
			    cursor: not-allowed;
			    background-image: none;
			    background-color: #eef1f6;
			    border-color: #d1dbe5;
			}
		}
		
		.border-radius-4{
			border-radius: 4px !important;
		}
		.up-btn-wrap{
			margin-bottom: 20px;
		}
		.base-wrap{
			.header{
				display: flex;
				justify-content: space-between;
				margin-bottom: 16px;
				.w-title{
					height: 34px;
					line-height: 34px;
					position: relative;
					.w-icon{
						position: absolute;
						width: 5px;
						height: 16px;
						top: 9px;
						border-radius: 3px;
						background-color: #00a5ef;
					}
					.label{
						display: inline-block;
						padding-left: 13px;
					}
				}
				.icon-shengji{
					font-size: 13px;
					color: #444;
					padding-right: 6px;
				}
			}
			.info-wrap{
				border-top: 1px solid #d1dbe5;
				margin-bottom: 14px;
				.first-line{
					height: 44px;
					line-height: 44px;
					display: flex;
					border-left: 1px solid #d1dbe5;
					border-bottom: 1px solid #d1dbe5;
					.cell{
						flex: 1;
						display: flex;
						border-right: 1px solid #d1dbe5;
						.title{
							padding: 0 30px;
							text-align: center;
							border-right: 1px solid #d1dbe5;
							background-color: #e1effc;
							color: #333;
						}
						.content{
							flex: 1;
							padding: 0 24px;
							color: #999;
						}
					}
				}
				.second-line{
					display: flex;
					border: 1px solid #d1dbe5;
					border-top: none;
				    .title{
				    	width: 103px;
				    	text-align: center;
						border-right: 1px solid #d1dbe5;
						background-color: #e1effc;
						color: #333;
						position: relative;
						span{
							position: absolute;
							width: inherit;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
						}
				    }
				    .content{
				    	flex: 1;
						padding: 11px 24px;
						color: #999;
				    }
				}
			}
		}
		.table-area{
			border:1px solid #d1dbe5;
			margin: 10px 0 16px;
			width: 640px;
			.icon-delete{
				font-size: 20px;
				color: #fea200;
				cursor: pointer;
			}
		}
		.content-wrap{
			.up-status{
				color: #999;
				margin-bottom: 10px;
				span{
					color: #1d8be9;
					cursor: pointer;
				}
			}
			.add-sn{
				padding: 15px 25px;
				border: 1px solid #d1dbe5;
				color: #333;
				.add-sn-area{
					margin: 10px 0 10px;
				}	

			}
			.up-style{
				padding-left: 23px;
				margin-bottom: 14px;
				display: flex;
				.title{
					width: 78px;
				}
				.radio{
					flex: 1;
				}
			}
			.tip-wrap{
				display: flex;
				width: 1046px;
				border: 1px solid #d1dbe5;
				.all-tip{
					width: 358px;
					
					background-color: #f5f5f5;
					border-right: 1px solid #d1dbe5;
					.s-tip-area{
						margin: 10px 0 10px;
						.inputKey{
							width: 193px;
						}
						button{width:115px;}
					}
					.up{
						padding: 11px 16px 16px;
						border-bottom: 1px solid #d1dbe5;
						.tip-tool{
							min-height: 146px;
							background-color: #fff;
							border: 1px solid #d1dbe5;
							padding: 10px;
							.tip{
								font-size: 12px;
								color: #333;
								border:1px solid #ccc;
								padding: 4px 12px;
								margin-right: 10px;
								cursor: pointer;
								display: inline-block;
								margin-bottom: 10px;
								.plus{
									font-size: 14px;
								}
							}
						}
					}
					.down{
						padding: 11px 16px 16px;
						.add-sn-area{
							margin: 10px 0 0;
							.inputKey{
								width: 193px;
							}
						}	
					}
				}


				.device-wrap{
					width: 688px;
					padding: 11px 24px 16px;
					.el-tag{
						border-radius: 4px !important;
						margin-top: 6px;
						margin-right: 10px;
						color: #111;
						background-color: #f5f5f5;
						height: 31px;
						line-height: 29px;
						.el-icon-close{
							border-radius: 50% !important;
							&:hover {
							    color: #fff;
							    background-color: #8391a5;
							}
						}
					}
					.line{
						border-top: 1px solid #d1dbe5;
						margin-top: 10px;
						padding-top: 10px;
					}
				}
			}
			.res-wrap{
				padding-left: 58px;
				.save-tag{
					width: 638px;
				}
			}
		}
	}
</style>