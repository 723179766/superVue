<template>
  <div class="hello">
    <div class="top">
      <img src='../assets/zfy_logo.png'>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userName}}，欢迎你
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- <div v-bind:class="{'icon-open':openFlag,'icon-close':!openFlag}" class="menu-icon" @click="openMenu">
          <i v-show="!openFlag" class="el-icon-caret-right"></i>
          <i v-show="openFlag" class="el-icon-caret-left"></i>
        </div> -->
    <el-menu unique-opened default-active="1" v-bind:class="{'menu-width-open':openFlag,'menu-width-close':!openFlag}" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
      <!-- <el-menu-item index="-1" class="logo">智能设备云平台</el-menu-item> -->
      <el-menu-item index="0">
        <!-- <i class="el-icon-document"></i> -->
        <img class="sys-icon" src="../assets/nav_icon_home.png" alt="">
        <router-link to="/Gzt" tag="span">首页</router-link>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <!-- <i class="el-icon-setting"></i> -->
          <img class="sys-icon" src="../assets/nav_icon_sys.png" alt="">
          系统设置</template>
        <el-menu-item index="51">
          <router-link to="/Org" tag="span">机构管理</router-link>
        </el-menu-item>
        <el-menu-item index="52">
          <router-link to="/Menu" tag="span">菜单管理</router-link>
        </el-menu-item>
        <el-menu-item index="53">
          <router-link to="/Role" tag="span">角色管理</router-link>
        </el-menu-item>
        <el-menu-item index="54">
          <router-link to="/Staff" tag="span">人员管理</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <!-- <i class="el-icon-menu"></i> -->
          <img class="sys-icon" src="../assets/nav_icon_device.png" alt="">
          设备管理</template>
        <el-menu-item index="61">
          <router-link to="/ManModel" tag="span">厂商型号</router-link>
        </el-menu-item>
        <el-menu-item index="62">
          <router-link to="/DeviceInfo" tag="span">设备信息</router-link>
        </el-menu-item>
        <el-menu-item index="63">
          <router-link to="/DeviceTip" tag="span">设备标签</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <!-- <i class="el-icon-menu"></i> -->
          <img class="sys-icon" src="../assets/nav_icon_appstore.png" alt="">
          应用管理</template>
        <el-menu-item index="71">
          <router-link to="/AppList" tag="span">应用列表</router-link>
        </el-menu-item>
        <el-menu-item index="72">
          <router-link to="/AppAudit" tag="span">应用审核</router-link>
        </el-menu-item>
        <el-menu-item index="73">
          <router-link to="/AppClassify" tag="span">应用分类</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <img class="sys-icon" src="../assets/nav_icon_sys.png" alt="">
          组件系统</template>
        <el-menu-item index="80">
          <router-link to="/LabelEdit" tag="span">标签编辑</router-link>
        </el-menu-item>
        <el-menu-item index="81">
          <router-link to="/AddBox" tag="span">容器</router-link>
        </el-menu-item>
        <el-menu-item index="82">
          <router-link to="/FileUpload" tag="span">文件上传组件</router-link>
        </el-menu-item>
        <el-menu-item index="83">
          <router-link to="/ShanGe" tag="span">栅格系统</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>

    <div v-bind:class="{'right-no-full':openFlag,'right-full':!openFlag}" class="right">
      <!-- <div class="head">
            <span class="title"> {{$root.title}}</span>
            <el-button type="text" icon="upload2" @click="loginOut"> 退出</el-button>
            <el-dropdown trigger="click" @command="menuClick">
              <el-button type="text" icon="star-on"> {{userName}}</el-button>
              <el-dropdown-menu slot="dropdown" style="margin-top: -1px;">
                <el-dropdown-item command="A">个人信息</el-dropdown-item>
                <el-dropdown-item command="B">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div> -->
      <transition name="fade">
        <router-view class="content"></router-view>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Layout',
    created() {
      this.userName = JSON.parse(sessionStorage.getItem('userInfo')).user_name;
    },
    data() {
      return {
        openFlag: true,
        userName: ''
      }
    },
    methods: {
      // openMenu(){
      //   this.openFlag = !this.openFlag;
      // },
      menuClick(command) {
        this.$message('暂时不提供此功能' + command);
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      loginOut() {
        this.$confirm('确定退出, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.clear();
          this.$router.push({ name: 'Login' });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello .fade-enter-active{
    transition: opacity .7s
  }
  .hello .fade-leave-active {
    transition: opacity 0s
  }
  .hello .fade-enter, .fade-leave-to{
    opacity: 0
  }
  .top {
    position: relative;
    height: 58px;
    line-height: 58px;
    background-color: #31a2ff;
  }
  .sys-icon{
    display: inline-block;
    padding-right: 2px;
    position: relative;
    top: 2px;
    width: auto;
    height: 16px;
    opacity: .8;
  }

  .top>.el-dropdown {
    position: absolute;
    color: #fff;
    right: 40px;
  }

  .top>img {
    vertical-align: middle;
    margin-left: 20px;
  }

  .hello {
    height: 100%;
  }

  .el-menu--dark {
    background: #1F252B;
  }

  .el-submenu .is-active {
    color: #bfcbd9;
    border-left: 3px solid #ffA500;
  }

  .el-menu {
    position: absolute;
    height: calc(100% - 58px);
    border-radius: 0;
    overflow-y: auto;
    overflow-x: hidden;
    transition: width 1s;
    -moz-transition: width 1s;
    -webkit-transition: width 1s;
    -o-transition: width 1s;
  }

  .el-menu>.el-menu-item.logo:first-child {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }

  .el-menu>.el-menu-item>span {
    display: inline-block;
    width: 146px;
  }

  .right {
    position: absolute;
    right: 0;
    height: calc(100% - 58px);
    background-color: #F5F5F5;
    overflow-y: auto;
  }

  .content {
    padding: 20px;
  }

  .head {
    height: 56px;
    padding-right: 20px;
    line-height: 56px;
    background-color: #fff;
    text-align: right;
  }

  .head .title {
    float: left;
    margin-left: 20px;
    font-weight: 600;
  }

  .menu-icon {
    z-index: 2;
    position: absolute;
    top: 0;
    width: 15px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    color: #fff;
    background: #1F252B;
    border-top-right-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    cursor: pointer;
  }

  .menu-width-open {
    width: 176px;
  }

  .menu-width-close {
    width: 0;
  }

  .icon-open {
    left: 176px;
    /*可以去除*/
    animation: iconopen 1s;
    -moz-animation: iconopen 1s;
    -webkit-animation: iconopen 1s;
    -o-animation: iconopen 1s;
    animation-fill-mode: forwards;
  }

  .icon-close {
    left: 0;
    /*可以去除*/
    animation: iconclose 1s;
    -moz-animation: iconclose 1s;
    -webkit-animation: iconclose 1s;
    -o-animation: iconclose 1s;
    animation-fill-mode: forwards;
  }

  @keyframes iconclose {
    from {
      left: 176px;
    }
    to {
      left: 0;
    }
  }

  @keyframes iconopen {
    from {
      left: 0;
    }
    to {
      left: 176px;
    }
  }

  .right-no-full {
    left: 176px;
    animation: iconopen 1s;
    -moz-animation: iconopen 1s;
    -webkit-animation: iconopen 1s;
    -o-animation: iconopen 1s;
    animation-fill-mode: forwards;
  }

  .right-full {
    left: 0;
    animation: iconclose 1s;
    -moz-animation: iconclose 1s;
    -webkit-animation: iconclose 1s;
    -o-animation: iconclose 1s;
    animation-fill-mode: forwards;
  }
</style>
