<template>
  <div class="log-list">
    <el-form :inline="true" class="demo-form-inline" v-loading="loading" size="mini">
      <el-form-item>
        <el-input v-model="search" placeholder="输入模块名查询" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="fetch" size="mini">查询</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <el-table :data="list" size="mini">

      <el-table-column prop="module" label="模块"></el-table-column>
      <el-table-column prop="optType" label="操作"></el-table-column>
      <el-table-column prop="optValue" label="描述"></el-table-column>
      <el-table-column prop="operator" label="操作人"></el-table-column>
      <el-table-column prop="optTime" label="操作时间"></el-table-column>

    </el-table>


  </div>
</template>

<script>

  import api from '../api'
  const {log} = api



  export default {
    name: "log-list",
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



        let res = await log.list({module:this.search});

        this.list = res.data.data ;
        this.loading = false;
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
