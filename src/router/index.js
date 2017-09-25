import Vue from 'vue'
import Router from 'vue-router'
import Gzt from '@/components/Gzt'
import Layout from '@/components/Layout'
import Login from '@/components/Login'
import NoMatch from '@/components/NoMatch'
import Org from '@/components/systemManage/Org'
import Menu from '@/components/systemManage/Menu'
import MenuTest from '@/components/systemManage/MenuTest'
import Role from '@/components/systemManage/Role'
import Staff from '@/components/systemManage/Staff'
import ManModel from '@/components/deviceManage/ManModel'
import MoreModel from '@/components/deviceManage/MoreModel'
import DeviceInfo from '@/components/deviceManage/DeviceInfo'
import DeviceInfoDetail from '@/components/deviceManage/DeviceInfoDetail'
import DeviceTip from '@/components/deviceManage/DeviceTip'
import DeviceTipNum from '@/components/deviceManage/DeviceTipNum'
import AddModel from '@/components/deviceManage/AddModel'
import AddMan from '@/components/deviceManage/AddMan'
import EditMan from '@/components/deviceManage/EditMan'
import ModelDetail from '@/components/deviceManage/ModelDetail'

import CssModel from '@/components/deviceManage/CssModel'

import AppList from '@/components/appManage/AppList'
import ApkUpload from '@/components/appManage/ApkUpload'
import AppAudit from '@/components/appManage/AppAudit'
import AppUploadExe from '@/components/appManage/AppUploadExe'
import AppDetailExe from '@/components/appManage/AppDetailExe'
import AppClassify from '@/components/appManage/AppClassify'

import AppDetail from '@/components/appManage/AppDetail'

//组件系统
import ComLabelEdit from '@/components/comSystem/ComLabelEdit'
import AddBox from '@/components/comSystem/AddBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/NoMatch',
      name: 'NoMatch',
      component: NoMatch
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/gzt',
      children: [
        {
          path: '/gzt',
          name: 'Gzt',
          component: Gzt,
          meta: {
            name: '工作台'
          }
        },
        {
          path: '/Org',
          name: 'Org',
          component: Org,
          meta: {
            name: '机构管理'
          }
        },
        {
          path: '/Menu',
          name: 'Menu',
          component: Menu,
          meta: {
            name: '菜单管理'
          }
        },
        {
          path: '/MenuTest',
          name: 'MenuTest',
          component: MenuTest,
          meta: {
            name: '菜单管理'
          }
        },
        {
          path: '/Role',
          name: 'Role',
          component: Role,
          meta: {
            name: '角色管理'
          }
        },
        {
          path: '/Staff',
          name: 'Staff',
          component: Staff,
          meta: {
            name: '人员管理'
          }
        },
        {
          path:'/ManModel',
          name:'ManModel',
          component:ManModel,
          meta:{
            name:'厂商型号'
          }
        },
        {
          path:'/MoreModel',
          name:'MoreModel',
          component:MoreModel,
          meta:{
            name:'更多型号'
          }
        },
        {
          path:'/ModelDetail/:id',
          name:'ModelDetail',
          component:ModelDetail,
          meta:{
            name:'型号详情'
          }
        },
        {
          path:'/AddModel',
          name:'AddModel',
          component:AddModel,
          meta:{
            name:'新增型号'
          }
        },
        {
          path:'/AddMan',
          name:'AddMan',
          component:AddMan,
          meta:{
            name:'新增厂商'
          }
        },
        {
          path:'/EditMan',
          name:'EditMan',
          component:EditMan,
          meta:{
            name:'修改厂商信息'
          }
        },
        {
          path:'/DeviceInfo',
          name:'DeviceInfo',
          component:DeviceInfo,
          meta:{
            name:'设备信息'
          }
        },
        {
          path:'/DeviceInfoDetail/:id',
          name:'DeviceInfoDetail',
          component:DeviceInfoDetail,
          meta:{
            name:'设备信息详情'
          }
        },
        {
          path:'/DeviceTip',
          name:'DeviceTip',
          component:DeviceTip,
          meta:{
            name:'设备标签'
          }
        },
        {
          path:'/DeviceTipNum/:id',
          name:'DeviceTipNum',
          component:DeviceTipNum,
          meta:{
            name:'标签设备数量'
          }
        },
        {
          path:'/CssModel',
          name:'CssModel',
          component:CssModel,
          meta:{
            name:'CSS模板'
          }
        },
        {
          path:'/AppList',
          name:'AppList',
          component:AppList,
          meta:{
            name:'应用列表'
          }
        },
        {
          path:'/ApkUpload',
          name:'ApkUpload',
          component:ApkUpload,
          meta:{
            name:'Apk上传'
          }
        },
        {
          path:'/AppAudit',
          name:'AppAudit',
          component:AppAudit,
          meta:{
            name:'应用审核'
          }
        },
        {
          path:'/AppUploadExe',
          name:'AppUploadExe',
          component:AppUploadExe,
          meta:{
            name:'应用上传审核，此需求被合并到应用详情审核'
          }
        },
        {
          path:'/AppDetailExe/:appId/:appState',
          name:'AppDetailExe',
          component:AppDetailExe,
          meta:{
            name:'应用详情审核'
          }
        },
        {
          path:'/AppClassify',
          name:'AppClassify',
          component:AppClassify,
          meta:{
            name:'应用分类'
          }
        },
        {
          path:'/AppDetail',
          name:'AppDetail',
          component:AppDetail,
          meta:{
            name:'应用详情'
          }
        },
        {
          path:'/ComLabelEdit',
          name:'ComLabelEdit',
          component:ComLabelEdit,
          meta:{
            name:'标签编辑'
          }
        },
        {
          path:'/AddBox',
          name:'AddBox',
          component:AddBox,
          meta:{
            name:'添加容器'
          }
        },
        {
          path: '/*',
          redirect: function(info){
            if(confirm("没有匹配到导航，是否进入登录页？")){
              sessionStorage.clear();
              return "/Login";
            }else{
              return "/NoMatch";
            }
          }
        }
      ]
    }
  ]
})
