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
        <el-col :span="3" >
          <el-menu
            default-active="user"
            class="el-menu-vertical-demo"
          >

           <el-submenu index="1">
              <template slot="title">

                <span>权限管理</span>
              </template>
              <el-menu-item-group>

                <el-menu-item index="/sysuser"  @click="$router.push('/sysuser')">系统用户</el-menu-item>
                <el-menu-item index="/role" @click="$router.push('/role')">角色管理</el-menu-item>
                <el-menu-item index="/per" @click="$router.push('/per')">权限管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">

                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user" @click="$router.push('/user')">
                  <span slot="title">用户管理</span>
                </el-menu-item>

              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">

                <span>业务管理</span>
              </template>
              <el-menu-item-group>


                <el-menu-item index="/service" @click="$router.push('/service/0')">
                  <span slot="title">服务管理</span>
                </el-menu-item>

                <el-menu-item index="/district" @click="$router.push('/district/0')">
                  <span slot="title">区域管理</span>
                </el-menu-item>

                <el-menu-item index="/template" @click="$router.push('/template')">
                  <span slot="title">模板管理</span>
            </el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="4">
              <template slot="title">

                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/order" @click="$router.push('/user')">
                  <span slot="title">订单列表</span>
                </el-menu-item>


              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="5">
              <template slot="title">

                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/order" @click="$router.push('/user')">
                  <span slot="title">订单列表</span>
                </el-menu-item>


              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="6">
              <template slot="title">

                <span>财务管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/order" @click="$router.push('/user')">
                  <span slot="title">交易记录</span>
                </el-menu-item>

                <el-menu-item index="/order" @click="$router.push('/user')">
                  <span slot="title">体现审核</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="7">
              <template slot="title">

                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/log" @click="$router.push('/log')">
                  <span slot="title">系统日志</span>
                </el-menu-item>

              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-col>
        <el-col :span="21">
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
  name: "App"
};
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
}
div {
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

.top-bar {
  background: #1ab394;

  text-align: center;
  color: #ffffff;
  font-size: 30px;
  text-shadow: 10px 10px 4px 4px rgba(0, 0, 0, 0.8);
  position: relative;
  height: 44px;
}
.el-submenu .el-menu-item {
  min-width: inherit;
}

.right {
  position: absolute;
  right: 20px;

  top: 0;
  bottom: 0;
  font-size: 14px;
}
.logout {
  color: #ffffff;
  font-size: 25px;
  display: inline-block;
  margin-left: 5px;
  text-decoration: none;
}
.left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  font-size: 14px;
}
.left a {
  display: block;
  height: 44px;
}
.left span {
  display: block;
  line-height: 22px;
  height: 22px;
  text-align: left;
}

.content {
  padding: 20px;
  box-sizing: border-box;
}
</style>

