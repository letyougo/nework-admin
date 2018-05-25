<template>
    <div class="template-list">
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
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="name"></el-table-column>
            <el-table-column prop="age" label="age"></el-table-column>
            <el-table-column>
                <template scope="scope">
                    <el-button-group size="mini">
                        <el-button size="mini" @click="router.push">详情</el-button>
                    </el-button-group>

                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
  import request from 'axios'

  const url = "http://localhost:8080/template/get"
  export default {
    name: 'template-list',
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
        console.log(res.data.list)
        this.list = res.data.list
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
    .template-list {

    }
</style>
