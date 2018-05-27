<template>
    <div class="service-list">
        <h3>{{item.serviceTypeName}}</h3>
        <el-form :inline="true" class="demo-form-inline" :loading="loading" size="mini">
          
            <el-form-item>
                <el-select placeholder="选择国家" v-model="filter.n_value" @change="fetch_p">
                    <el-option v-for="item in filter.n_options" :value="item.districtId" :label="item.chinese">{{item.chinese}}</el-option>
                </el-select>
                 <el-select placeholder="选择省/州" v-model="filter.p_value" @change="fetch_c">
                  <el-option v-for="item in filter.p_options" :value="item.districtId" :label="item.chinese">{{item.chinese}}</el-option>
                 </el-select>
                  <el-select placeholder="选择城市" v-model="filter.c_value" @change="fetch">
                       <el-option v-for="item in filter.c_options" :value="item.districtId" :label="item.chinese">{{item.chinese}}</el-option>
                  </el-select>
            </el-form-item>
        </el-form>

        <el-table :data="list" size="mini" v-loading="loading">
            <el-table-column prop="serviceTypeId" label="id"></el-table-column>
            <el-table-column prop="serviceTypeName" label="类型">
                <template scope="scope">
                <span class="a"  @click="$router.push('/service/'+scope.row.serviceTypeId)">{{scope.row.serviceTypeName}}</span>
              </template>

            </el-table-column>
          <el-table-column prop="level" label="级别">
            <template scope="scope">
                <span v-if="scope.row.level=='f'" type="primary" size="mini">一级类目</span>
                <span v-if="scope.row.level=='s'" type="danger" size="mini">二级类目</span>
            </template>
          </el-table-column>
          <el-table-column prop="weight" label="权重"></el-table-column>

          <el-table-column  label="已使用">
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
  import request from '../request'

  const list_url = "/service/listServiceByParam"
  const detail_url = "/service/getServiceById"

  const district_list_url = "/district/listDistrictByParam"
  export default {
    name: 'service-list',
    data() {
      return {
        loading: true,
        search: '',
        list: [],
        item:{},
        loading:false,
        filter:{
            n_options:[],
            n_value:'',
            p_options:[],
            p_value:'',
            c_options:[],
            c_value:''
        }
      }
    },
    methods: {
      async fetch_n(){
        let res = await request.get(district_list_url,{params:{parentId:0,isDeleted:0}})
        this.loading = false
        this.filter.n_options = res.data.data
      },
      async fetch_p(){
        let res = await request.get(district_list_url,{params:{parentId:this.filter.n_value,isDeleted:0}})
        this.loading = false
        this.filter.p_options = res.data.data
      },
      async fetch_c(){
        let res = await request.get(district_list_url,{params:{parentId:this.filter.p_value,isDeleted:0}})
        this.loading = false
        this.filter.c_options = res.data.data
      },

      async fetch() {
        this.loading = true 
        let id = this.$route.params.id
        let res = await request.get(list_url,{params:{parentId:id,isDeleted:false,districtId:this.filter.c_value}})
        this.loading = false
        this.list = res.data.data
        this.fetch_item()
      },
     async fetch_item(){
        var id = this.$route.params.id
        let res = await request.get(detail_url,{params:{serviceTypeId:id}})
        let item = res.data.data
        
        if(item.level == "s"){
            alert(1)
            this.$message.error('没有下级类目')
            this.$router.back()
            
        }else{
            this.item = item
        }

      },
    
    reload(){
        // this.fetch()
        // 
        this.fetch_n()
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
    .service-list {

    }
</style>
