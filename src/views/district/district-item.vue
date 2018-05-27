<template>
    <div class="aa">
        <el-card>
            <el-form class="demo-form-inline" size="mini" label-width="100px">
                <el-form-item>
                    <el-button-group v-if="page_type=='detail'">
                        <el-button type="primary" @click="update" size="mini" v-if="edit">保存</el-button>
                        <el-button type="primary" @click="edit=true" size="mini" v-else>编辑</el-button>
                        <el-button @click="remove" size="mini">删除</el-button>
                    </el-button-group>
                    <el-button-group v-else>
                        <el-button type="primary" @click="post" size="mini" v-if="edit">提交</el-button>
                    </el-button-group>
                </el-form-item>

                <el-form-item label="父级区域：" v-if="page_type=='create'">
                  <span >{{parent.chinese}}</span>
                </el-form-item>

                <el-form-item label="英文名：">

                    <el-input v-model="item.name" placeholder="英文名" size="small" v-if="edit"></el-input>
                    <span v-else>{{item.name}}</span>
                </el-form-item>

                <el-form-item label="中文名：">
                    <el-input v-model="item.chinese" placeholder="中文名" size="small" v-if="edit"></el-input>
                    <span v-else>{{item.chinese}}</span>
                </el-form-item>
            </el-form>


        </el-card>


    </div>
</template>

<script>
  import request from '../request'

  const detail_url = "/district/getDistrictById"
  const post_url ='/district/addDistrict/'
  const update_url = '/district/updateDistrict'
  const remove_url = '/district/deleteDistrict'
  import qs from 'qs'
  export default {
    name: 'district-item',
    data() {
      return {

        item: {},
        parent:{},
        edit: false,
        page_type: 'detail'
      }
    },
    methods: {
      async fetch() {
        let res = await request.get(detail_url ,{params:{districtId:this.$route.query.id}})
        this.item = res.data.data
      },
      async fetch_parent() {
        try{
          let res = await request.get(detail_url ,{params:{districtId:this.$route.query.id}})
          this.parent = res.data.data
        }catch(e){
          this.parent = {name:'地球',level:'earch'}
        }
     
      },
      save() {
        this.edit = false
      },
      async post() {
        let level 
        if(this.parent.level == 'earth'){
          level = 'n'
        }

        if(this.parent.level == 'n'){
          level = 'p'
        }
        if(this.parent.level == 'p'){
          level ='c'
        }
        var data = {
          name:this.item.name,
          chinese:this.item.chinese,
          level:level,
          parent:parseInt(this.$route.query.id)
        }
        console.log(new FormData(data))
        let res = await request.post(post_url,data)
        this.$router.back()
        this.$message.success('提交数据成功')
      },
      async update(){
        var data = {
          name:this.item.name,
          chinese:this.item.chinese,
          districtId:parseInt(this.$route.query.id)
        }
        console.log(new FormData(data))
        let res = await request.post(update_url,data)
        this.reload()
        this.$message.success('更新数据成功')
      },
      async remove(){
        let res = await request.get(remove_url,{params:{districtId:parseInt(this.$route.query.id)}})
        this.$router.back()
        this.$message.success('删除数据成功')
      },
      reload(){
        if(this.$route.query.action == 'create'){
          this.page_type = 'create'
          this.edit = true
          this.fetch_parent()
        }else {
          let id = this.$route.query.id
          this.fetch()
          this.edit = false
        }
      }
    },
    mounted() {
      this.reload()
    },

  }
</script>

<style>

</style>
