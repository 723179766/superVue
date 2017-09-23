<template>
	<div class="pixel-radio">
		<div class="cell" v-for="cell in list" :key="cell.key" @click="chooseDot(cell)">
			<span class="dot" :class="{selected:cell.value==valueId}"></span>
			<span class="text">{{cell.key}}</span>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				valueId:''
			}
		},
		props:{
			list:Array,
			selected:String
		},
		methods:{
			chooseDot(cell){
				let vm = this
				vm.valueId = cell.value
				this.$emit('chooseDot',cell)
			}
		},
		mounted(){
			setTimeout(()=>{
				this.valueId = this.selected
				console.log(this.valueId)
			},0)	
		}
	}
</script>
<style lang='scss'>
	.pixel-radio{
		.cell{
			display: inline-block;
			cursor: pointer;
			margin-right: 20px;
			position: relative;
			height:21px;
			line-height: 21px;
			.dot{
				width: 21px;
				height: 21px;
				display: inline-block;
				border:1px solid #ddd;
				position: absolute;
				top: 0;
				left: 0;
			}
			.text{
				padding-left: 30px;
			}
			.selected{
				&:before{
					content:'';
					width: 9px;
					height: 9px;
					background-color: #1d8be9;
					display: inline-block;
					position: absolute;
					top: 5px;
					left: 5px;
				}
			}
		}
	}
</style>