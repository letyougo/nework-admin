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
            <el-table-column prop="userId" label="userId"></el-table-column>

          <el-table-column prop="avatar" label="头像">
            <template scope="scope">
              <img :src="scope.row.avatar" width="50" height="50" />
            </template>
          </el-table-column>

          <el-table-column prop="nickname" label="昵称">
            <template scope="scope">
              {{scope.row.nickname || '空'}}
            </template>
          </el-table-column>

          <el-table-column prop="phoneNumber" label="电话">
              <template scope="scope">
                {{scope.row.phoneNumber || '空'}}
              </template>
          </el-table-column>


          <el-table-column prop="email" label="邮箱">
            <template scope="scope">
              {{scope.row.email || '空'}}
            </template>
          </el-table-column>

          <el-table-column label="审核状态">
            <template scope="scope">
               <el-tag v-if="scope.row.checkStatus == 0 " size="mini" type="warning">未认证</el-tag>
              <el-tag v-if="scope.row.checkStatus == 1 " size="mini" type="warning">未审核</el-tag>
              <el-tag v-if="scope.row.checkStatus == 2 " size="mini" type="primary">已认证</el-tag>
              <el-tag v-if="scope.row.checkStatus == -1 " size="mini" type="danger">审核未通过</el-tag>
            </template>
          </el-table-column>



            <el-table-column>
                <template scope="scope">
                    <el-button-group size="mini" label="操作">
                        <el-button size="mini"  @click="$router.push('/user_item?id='+scope.row.userId) ">详情</el-button>
                      <el-button size="mini" type="danger">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
  import request from 'axios'
  import map from '../../datamap'

  const url = "http://localhost:8080/user/listUserByParam"
  export default {
    name: 'user-list',
    data() {
      return {
        loading: true,
        search: '',
        list: [],
        user_map:map.user
      }
    },
    methods: {
      async fetch() {
        let res = await request.get(url)
        console.log(res.data)
        this.list = res.data.data
      },
      exports() {

      }
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style>
    .user-list {

    }
</style>
