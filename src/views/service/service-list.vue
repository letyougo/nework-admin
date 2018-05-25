<template>
    <div class="service-list">
        <el-form :inline="true" class="demo-form-inline" :loading="loading" size="mini">
            <el-form-item>
                <el-input v-model="search" placeholder="输入名字查询" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" @click="fetch" size="mini">查询</el-button>
                    <el-button @click="" size="mini">增加</el-button>
                    <el-button @click="exports">导出</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>

        <el-table :data="list" size="mini">
            <el-table-column prop="serviceTypeId" label="id"></el-table-column>
            <el-table-column prop="serviceTypeName" label="类型"></el-table-column>
          <el-table-column prop="level" label="级别"></el-table-column>
          <el-table-column prop="weight" label="权重"></el-table-column>

          <el-table-column prop="age" label="age">
            <template scope="scope">
              <el-tag v-if="scope.row.isUsed" type="primary" size="mini">已使用</el-tag>
              <el-tag v-else type="danger" size="mini">已停用</el-tag>
            </template>
          </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button-group size="mini">
                        <el-button size="mini"   @click="$router.push('/service_item?id='+scope.row.serviceTypeId)">详情</el-button>
                        <el-button size="mini" type="danger" @click="$router.push('id='+scope.row.serviceTypeId)">删除</el-button>
                    </el-button-group>

                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
  import request from 'axios'

  const url = "http://localhost:8080/service/listServiceByParam"
  export default {
    name: 'service-list',
    data() {
      return {
        loading: true,
        search: '',
        list: []
      }
    },
    methods: {
      async fetch() {
        let res = await request.get(url)
        console.log(res.data.data)
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
    .service-list {

    }
</style>
