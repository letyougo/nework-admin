<template>
    <div class="district-list">

        <h3>{{item.chinese}}</h3>

        <el-form :inline="true" class="demo-form-inline" :loading="loading" size="mini">
            <el-form-item>
                <el-input v-model="search" placeholder="输入名字查询" size="small"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" @click="fetch" size="mini">查询</el-button>
                    <el-button @click="$router.push('/district_item?action=create&id='+$route.params.id)" size="mini">增加</el-button>

                </el-button-group>
            </el-form-item>
        </el-form>


        <el-table :data="list" size="mini"

        >
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="name" label="英文名">
              <template scope="scope">
                <span class="a"  @click="$router.push('/district/'+scope.row.districtId)">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="chinese" label="中文名"></el-table-column>

          <el-table-column prop="isUsed" label="是否使用">
            <template scope="scope">
              <el-tag v-if="scope.row.isUsed" type="primary">是</el-tag>
              <el-tag v-else type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="level" label="级别"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button-group size="mini">
                        <el-button size="mini" @click="$router.push('/district_item?id='+scope.row.districtId)">详情</el-button>
                      <el-button size="mini" @click="$router.push('/district_item?id=scope.row.id')" type="danger">删除</el-button>
                    </el-button-group>

                </template>
            </el-table-column>

        </el-table>

    </div>
</template>

<script>
  import request from '../request'

  const list_url = "/district/listDistrictByParam"
  const item_url = "/district/getDistrictById"
  export default {
    name: 'district-list',
    data() {
      return {
        loading: true,
        search: '',
        list: [],
        item:{},
      }
    },
    methods: {


      async fetch() {
        var id = this.$route.params.id
        let res = await request.get(list_url,{params:{parentId:id}})
        let list = res.data.data

        if(list.length){
          this.list = res.data.data
        }else {
          this.$message.error('数据为空')
          this.$router.back()
        }
      },
      async fetch_item(){
        var id = this.$route.params.id
        if(id==0){
          this.item.chinese = '全世界'
          return
        }

        let res = await request.get(item_url,{params:{districtId:id}})
        this.item = res.data.data
      },
      reload(){
        this.fetch()
        this.fetch_item()
      }
    },
    mounted() {
      this.reload()

    },
    watch:{
      $route(){
        this.reload()
      }
    }
  }
</script>

<style>
    .district-list {

    }
</style>
