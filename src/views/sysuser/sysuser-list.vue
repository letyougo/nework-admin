<template>
    <div class="user-list">
        <el-form :inline="true" class="demo-form-inline" v-loading="loading" size="mini">
            <el-form-item>
                <el-input v-model="search" placeholder="输入名字查询" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" @click="fetch" size="mini">查询</el-button>
                    <el-button @click="add" size="mini">增加</el-button>
              
                </el-button-group>
            </el-form-item>
        </el-form>

        <el-table :data="list" size="mini">
            <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" label-width="80px" >
                <el-form-item label="用户名">
                  <el-input v-model="props.row.username" size="mini"/>
                </el-form-item>
                <el-form-item label="lock">
                  <el-radio-group v-model="props.row.locked" size="mini">
                    <el-radio-button label="1" size="mini" >lock</el-radio-button>
                    <el-radio-button label="0"  size="mini">unlock</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="角色">
                  <el-transfer :titles="['角色列表', '已有角色']" v-model="props.row.r" :data="roles"></el-transfer>
                </el-form-item>
                <el-form-item>
                  <el-button @click="update(props.row)" size="mini" type="primary">更新</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="locked" label="locked">
            <template scope="scope">
              {{scope.row.locked==1 ? '是' : '否'}}
            </template>
          </el-table-column>
            <el-table-column>
                <template scope="scope">
                    <el-button-group size="mini" label="操作">
                      <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
      </el-table>
      
     
  </div>
</template>

<script>
import request from "../request";
import map from "../../datamap";
import api from '../api'
const {sysuser,role,per} = api

const update = "/sysUser/updateUser";
const post = '/sysUser/addUser'
const remove = '/sysUser/deleteUser'


export default {
  name: "user-list",
  data() {
    return {
      loading: true,
      search: "",
      list: [],
      roles:[]
    };
  },
  methods: {
    async fetch() {
      this.loading = true;
      let res = await sysuser.list();
      console.log(res,'----user-')
      res = res.data.data.map((item) => {
        console.log(item)
        item.roles = item.roles || []
        item.r = item.roles.map((i) => {
          return i.roleId 
        })
        return item
      })
      this.list = res;
      this.loading = false;
    },

    async add(){
      try{
        let {value} = await this.$prompt('请输入用户名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        let res = await request.post(post, {
          username:value,
          password:'123456',
          locked:0,
        });
        this.fetch()
        }catch(e){
         this.$message({
            type: 'info',
            message: '取消输入'
          });             
        }
    },

    async fetch_role(){
      let res = await role.list()
      res = res.data.data.map((item) => {
        item.key = item.roleId
        item.label = item.roleName
        return item
      })
      this.roles = res
    },

    async update(obj) {
      console.log(obj,'obj')
      obj.roleIds = obj.r 
      let res = await request.post(update, obj);
      this.fetch();
    },

    async remove(obj){
      try{
        await this.$confirm(' 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        let res = await request.post(remove,obj)
        this.fetch()
      }catch(e){
        this.$message({
            type: 'info',
            message: '已取消删除'
        });         
      }
     
    },

  },
  mounted() {
    this.fetch();
    this.fetch_role()
  }
};
</script>

<style>
.user-list {
}
</style>
