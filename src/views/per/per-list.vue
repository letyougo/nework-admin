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
                <el-form-item label="权限名">
                  <el-input v-model="props.row.name" size="mini"/>
                </el-form-item>

                <el-form-item label="权限码">
                  <el-input v-model="props.row.percode" size="mini"/>
                </el-form-item>

                <el-form-item label="url">
                  <el-input v-model="props.row.url" size="mini"/>
                </el-form-item>

                <el-form-item label="是否应用">
                  <el-radio-group v-model="props.row.available" size="mini">
                    <el-radio-button label="1" size="mini" >是</el-radio-button>
                    <el-radio-button label="0"  size="mini">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="类型">
                  <el-radio-group v-model="props.row.type" size="mini">
                    <el-radio-button label="permission" size="mini" >权限</el-radio-button>
                    <el-radio-button label="menu"  size="mini">菜单</el-radio-button>
                  </el-radio-group>
                </el-form-item>
            
                <el-form-item>
                  <el-button @click="update(props.row)" size="mini" type="primary">更新</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
           <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="name" label="权限名"></el-table-column>
          <el-table-column prop="percode" label="权限码"></el-table-column>
          <el-table-column prop="url" label="url"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column label="是否应用">
              <template scope="scope">
                  <el-tag v-if="scope.row.available==1">是</el-tag>
                  <el-tag v-else >否</el-tag>
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

const list = "/sysPermission/listPermissionByParam";
const update = "/sysPermission/updatePermission";
const post = '/sysPermission/addPermission'
const remove = '/sysPermission/deletePermission'
export default {
  name: "user-list",
  data() {
    return {
      loading: true,
      search: "",
      list: [],
     
    };
  },
  methods: {
    async fetch() {
      this.loading = true;
      let res = await request.get(list);
      console.log(res.data);
      this.list = res.data.data;
      this.loading = false;
    },

    async add(){
      try{
        let {value} = await this.$prompt('请输入权限名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        let res = await request.post(post, {
          name:value,
        });
        this.fetch()
        }catch(e){
         this.$message({
            type: 'info',
            message: '取消输入'
          });             
        }
    },

    async update(obj) {
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
  }
};
</script>

<style>
.user-list {
}
</style>
