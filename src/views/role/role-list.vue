<template>
    <div class="user-list">
        <el-form :inline="true" class="demo-form-inline" :loading="loading" size="mini">
            <el-form-item>
                <el-input v-model="search" placeholder="输入名字查询" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" @click="fetch" size="mini">查询</el-button>
                    <el-button @click="add_form.visible=true" size="mini">增加</el-button>
                    <el-button @click="exports">导出</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>

        <el-table :data="list" size="mini">

        <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" label-width="80px" >
                <el-form-item label="角色名">
                  <el-input v-model="props.row.roleName" size="mini"/>
                </el-form-item>

               

                <el-form-item label="权限">
                  <el-transfer :titles="['权限列表', '已有权限']" v-model="props.row.perm" :data="pers"></el-transfer>
                </el-form-item>
                <el-form-item>
                  <el-button @click="update(props.row)" size="mini" type="primary">更新</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="roleName" label="角色名" width="150px"></el-table-column>

          <el-table-column  label="权限">
            <template scope="scope">
              <span v-for="item in scope.row.permissions" style="padding:5px;display:inline-block"> <el-tag size="small">{{item.name}}</el-tag></span>
            </template>
          </el-table-column>

            <el-table-column width="80px">
                <template scope="scope">
                    <el-button-group size="mini" label="操作">
                      <el-button size="mini" type="danger">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
  import request from '../request'
  import map from '../../datamap'

  const list = "/sysRole/listRoleWithPerm"

  import api from '../api'
  let {role,per} = api

  console.log(role,per,'role-per')

  export default {
    name: 'role-list',
    data() {
      return {
        loading: true,
        search: '',
        list: [],
        pers:[],
        user_map:map.user
      }
    },
    methods: {

      async fetch_perms() {
   
        let res = await per.list();
        res = res.data.data.map(function(i){
          i.key=i.id 
          i.label = i.name
          return i
        })
        this.pers = res;
        
      },
      async fetch() {
        let res = await role.list()
        res=res.data.data.map(function(item){
          item.permissions = item.permissions || []
          item.perm = item.permissions.map(function(o){
            return o.id 
          })
          return item
        })
        this.list = res
      },
      exports() {

      }
    },
    mounted() {
      this.fetch()
      this.fetch_perms()
    }
  }
</script>

<style>
    .user-list {

    }
</style>
