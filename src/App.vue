<template>
  <div id="app">
    <div>
      <div class="top-bar">
        <div class="right">
          <span>欢迎：xiaoxiaosu</span>
          <a href="/logout/" class="logout">
            <i class="icon iconfont icon-web-quit "></i>
          </a>
        </div>
      </div>
      <el-row>
        <el-col :span="2">
          <el-menu
            default-active="user"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="/user" @click="$router.push('/user')">
              <span slot="title">用户管理</span>
            </el-menu-item>

            <el-menu-item index="/service" @click="$router.push('/service/0')">
              <span slot="title">服务管理</span>
            </el-menu-item>

            <el-menu-item index="/district" @click="$router.push('/district/0')">
              <span slot="title">区域管理</span>
            </el-menu-item>

            <el-menu-item index="/template" @click="$router.push('/template')">
              <span slot="title">模板管理</span>
            </el-menu-item>

          </el-menu>
        </el-col>
        <el-col :span="22">
          <div class="content">
            <router-view/>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body,html{
    width: 100%;
    height: 100%;

  }
  div{
    margin: 0;
    padding: 0;
  }
  #app {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    min-width: 1280px;

  }



  .top-bar{
    background:#1ab394 ;

    text-align: center;
    color: #ffffff;
    font-size: 30px;
    text-shadow: 10px 10px 4px 4px rgba(0,0,0,0.8);
    position: relative;
    height: 44px;
  }

  .right{
    position: absolute;
    right: 20px;

    top: 0;
    bottom: 0;
    font-size: 14px;
  }
  .logout{
    color: #ffffff;
    font-size: 25px;
    display: inline-block;
    margin-left: 5px;
    text-decoration: none;
  }
  .left{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    font-size: 14px;
  }
  .left a{
    display: block;
    height: 44px;
  }
  .left span{
    display: block;
    line-height: 22px;
    height: 22px;
    text-align: left;
  }
  .el-menu-item i{
    color: #ffffff
  }
  i{
    font-size: 16px;
    color: #ffffff;
  }
  .content{
    padding: 20px;
    box-sizing: border-box;
  }
</style>

