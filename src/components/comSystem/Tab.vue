<template>
  <div class="">
    <tabs :active="activeName">
      <tabs-child :name="first">
        <div>
          <button class="dj-btn dj-btn-primary">搜索</button>
          <button class="dj-btn dj-btn-primary" disabled>搜索</button>
          <button class="dj-btn dj-btn-info">查询</button>
          <button class="dj-btn dj-btn-info" disabled>查询</button>
        </div>
        <div>
          <button class="dj-btn dj-btn-success">添加</button>
          <button class="dj-btn dj-btn-success" disabled>添加</button>
          <button class="dj-btn dj-btn-warning">修改</button>
          <button class="dj-btn dj-btn-warning" disabled>修改</button>
          <button class="dj-btn dj-btn-fff">白色</button>
          <button class="dj-btn dj-btn-fff" disabled>白色</button>
        </div>
        <div>
          <button class="dj-btn dj-btn-danger">删除</button>
          <button class="dj-btn dj-btn-danger" disabled>删除</button>
          <button class="dj-btn dj-btn-default">导入</button>
          <button class="dj-btn dj-btn-default" disabled>导入</button>
          <button class="dj-btn dj-btn-back">取消</button>
          <button class="dj-btn dj-btn-back" disabled>取消</button>
        </div>
      </tabs-child>
      <tabs-child :name="second">
        <div>
          <div class="tool-primary margin-top-10">段落情景</div>
          <div class="tool-info margin-top-10">段落情景</div>
          <div class="tool-success margin-top-10">段落情景</div>
          <div class="tool-warning margin-top-10">段落情景</div>
          <div class="tool-danger margin-top-10">段落情景</div>
          <div class="tool-pink margin-top-10">段落情景</div>
        </div>
      </tabs-child>
      <tabs-child :name="third">
        <div class="card-area">
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
        </div>
      </tabs-child>
    </tabs>
  </div>
</template>
<script type="text/ecmascript-6">
  import tabs from './components/ComTab.vue'
  import tabsChild from './components/ComTabChild.vue'
  export default {
    components: {
      tabs,
      tabsChild
    },
    methods: {

    },
    data() {
      return {
        activeName: 'first',
        first: 'first',
        second: 'second',
        third: 'third'
      }
    }
  }
</script>
<style>
</style>
