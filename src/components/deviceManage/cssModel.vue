<!-- 设备标签 -->
<template>
  <div class="css-model">
    <h2 class="margin-bottom-20">CSS模板，部分样式可从此页面copy</h2>
    <div style="margin-bottom: 20px">
      <button class="dj-btn dj-btn-primary">搜索</button>
      <button class="dj-btn dj-btn-primary" disabled>搜索</button>
      <button class="dj-btn dj-btn-info">查询</button>
      <button class="dj-btn dj-btn-info" disabled>查询</button>
    </div>

    <div style="margin-bottom: 20px">
      <button class="dj-btn dj-btn-success">添加</button>
      <button class="dj-btn dj-btn-success" disabled>添加</button>
      <button class="dj-btn dj-btn-warning">修改</button>
      <button class="dj-btn dj-btn-warning" disabled>修改</button>
    </div>

    <div style="margin-bottom: 20px">
      <button class="dj-btn dj-btn-danger">删除</button>
      <button class="dj-btn dj-btn-danger" disabled>删除</button>
      <button class="dj-btn dj-btn-default">导入</button>
      <button class="dj-btn dj-btn-default" disabled>导入</button>
      <button class="dj-btn dj-btn-back">取消</button>
      <button class="dj-btn dj-btn-back" disabled>取消</button>
    </div>

    <div style="margin-bottom: 20px">
      <button class="dj-btn dj-btn-icon-success"><i class="el-icon-plus icon-left"></i>添加</button>
      <button class="dj-btn dj-btn-icon-success" disabled><i class="el-icon-plus icon-left"></i>添加</button>
      <button class="dj-btn dj-btn-icon-info"><i class="el-icon-plus icon-left"></i>信息</button>
      <button class="dj-btn dj-btn-icon-info" disabled><i class="el-icon-plus icon-left"></i>信息</button>
      <button class="dj-btn dj-btn-icon-danger">删除<i class="el-icon-minus icon-right"></i></button>
      <button class="dj-btn dj-btn-icon-danger" disabled>删除<i class="el-icon-minus icon-right"></i></button>
    </div>

    <div style="margin-bottom: 20px">
      <button class="dj-btn dj-btn-icon-warning">修改<i class="el-icon-minus icon-right"></i></button>
      <button class="dj-btn dj-btn-icon-warning" disabled>修改<i class="el-icon-minus icon-right"></i></button>
      <button class="dj-btn dj-btn-icon-primary">搜索<i class="el-icon-minus icon-right"></i></button>
      <button class="dj-btn dj-btn-icon-primary" disabled>搜索<i class="el-icon-minus icon-right"></i></button>
    </div>

    <div style="margin-bottom: 20px">
      <div v-show="allData.length!=0" class="table-area">
        <table class="dj-table">
          <thead>
          <tr>
            <th>姓名</th>
            <th>联系方式</th>
            <th>工号</th>
            <th>所属机构</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in allData" @click="trClick(item,index)" v-bind:class="{'border-orange':selectd==index}">
            <td>
              <span class="a-link">{{item.user_phone}}</span>
            </td>
            <td class="font-arial">{{item.user_phone}}</td>
            <td class="font-arial">{{item.job_number}}</td>
            <td class="font-pfsc">{{item.org_name}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-show="allData.length!=0" class="dj-page text-right">
        <span class="prev-page" @click="pageChanged('prev')">&lt;&nbsp;上一页</span>
        <span>第</span>
        <input type="number" class="dj-page-input" v-model="currentPage" v-on:keyup.enter="jumpPage">
        <span>页</span>
        <span class="total-page">共{{totalPage}}页</span>
        <span class="next-page" @click="pageChanged('next')">下一页&nbsp;&gt;</span>
        <span class="total-num">共{{total}}条记录</span>
      </div>
      <div v-show="allData.length==0" class="text-center">
        <img class="margin-top-20" src="../../assets/noSearch.png" alt="">
      </div>
    </div>

    <div class="card-area" style="margin-bottom: 20px">
      <div class="card-box">
        <div class="img-box">
          <img src="../../assets/down-dis.png" alt="">
          <div class="card-icon">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="icon iconfont icon-gengduo"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="content-box">
          <div class="descr-font">点击&拖拽安装包到此处上传应用</div>
        </div>
      </div>

      <div class="card-box">
        <div class="img-box">
          <img src="../../assets/down-dis.png" alt="">
          <div class="card-icon">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="icon iconfont icon-gengduo"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="content-box">
          <div class="apk-name">华夏天天加油</div>
          <div class="apk-tag-primary">已签名</div>
        </div>
        <div class="footer-box">
          <div class="opt-sign">
            <i class="el-icon-information"></i>
            <span>查看</span>
          </div>
        </div>
      </div>

      <div class="card-box">
        <div class="img-box">
          <img src="../../assets/down-dis.png" alt="">
          <div class="card-icon">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="icon iconfont icon-gengduo"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="content-box">
          <div class="apk-name">华夏银行APOS</div>
          <div class="apk-tag-danger">有未签名版本</div>
        </div>
        <div class="footer-box">
          <div class="opt-double">
            <i class="el-icon-information"></i>
            <span>更新</span>
          </div>
          <div class="opt-double">
            <i class="el-icon-information"></i>
            <span>下架</span>
          </div>
        </div>
      </div>

      <div class="card-box">
        <div class="img-box">
          <img src="../../assets/down-dis.png" alt="">
          <div class="card-icon">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="icon iconfont icon-gengduo"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="content-box">
          <div class="apk-name">五粮集团产品</div>
        </div>
        <div class="footer-box">
          <div class="state-font">待审核...</div>
        </div>
      </div>

      <div class="card-box">
        <div class="img-box">
          <img src="../../assets/down-dis.png" alt="">
          <div class="card-icon">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="icon iconfont icon-gengduo"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="content-box">
          <div class="apk-name">海豚开单</div>
        </div>
        <div class="footer-box">
          <div class="state-font">审核未通过</div>
        </div>
      </div>

      <div class="card-box">
        <div class="img-box">
          <img src="../../assets/down-dis.png" alt="">
          <div class="card-icon">
            <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="icon iconfont icon-gengduo"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="tool-box">
            <img src="../../assets/danger.png" alt="">
            <div class="tool-font">版本审核未通过</div>
          </div>
        </div>
        <div class="content-box">
          <div class="apk-name">华夏银行APOS</div>
          <div class="apk-tag-danger">有未签名版本</div>
        </div>
        <div class="footer-box">
          <div class="opt-double">
            <i class="el-icon-information"></i>
            <span>更新</span>
          </div>
          <div class="opt-double">
            <i class="el-icon-information"></i>
            <span>下架</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'DeviceTip',
    created(){},
    data(){
      return {
        selectd: -1,
        totalPage: '127',
        total: '1000',
        currentPage: '',
        allData:[
          {
            user_name: '七七小鱼',
            user_phone: '8135199123',
            job_number: '1239901',
            org_name: '天际银行'
          },
          {
            user_name: '七七小鱼',
            user_phone: '8135199123',
            job_number: '1239901',
            org_name: '天际银行'
          },
          {
            user_name: '七七小鱼',
            user_phone: '8135199123',
            job_number: '1239901',
            org_name: '天际银行'
          }
        ]
      }
    },
    methods:{
      pageChanged(){
      },
      pageChanged(){
        console.log(1)
      },
      trClick(item,index){
        this.selectd = index;
      }
    }
  }
</script>
<style lang='scss'>
  .css-model{
  .card-area{
    margin-left: -27px;
    white-space: nowrap;
    .card-box{
      white-space: normal;
    }
  }
  }
</style>
