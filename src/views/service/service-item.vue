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

                <el-form-item label="父级服务：">
                  <span >{{parent.serviceTypeName}}</span>
                </el-form-item>

                <el-form-item label="服务名：">

                    <el-input v-model="item.serviceTypeName" placeholder="服务名" size="small" v-if="edit"></el-input>
                    <span v-else>{{item.serviceTypeName}}</span>
                </el-form-item>

                <el-form-item label="权重：">
                    <el-input v-model="item.weight" placeholder="权重" size="small" v-if="edit"></el-input>
                    <span v-else>{{item.weight}}</span>
                </el-form-item>
            </el-form>


        </el-card>


    </div>
</template>

<script>
  import request from '../request'

  const detail_url = "/service/getServiceById"
  const post_url ='/service/addService/'
  const update_url = '/service/updateService'
  const remove_url = '/service/deleteService'
  import qs from 'qs'
  export default {
    name: 'service-item',
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
        let res = await request.get(detail_url ,{params:{serviceTypeId:this.$route.query.id}})
        this.item = res.data.data
        return this.item
      },
      async fetch_parent(id) {
        try{
          let res = await request.get(detail_url ,{params:{serviceTypeId:id}})
          this.parent = res.data.data
        }catch(e){
          this.parent = {name:'全部',level:'all'}
        }
     
      },
      save() {
        this.edit = false
      },
      async post() {
        let level 
        if(this.parent.level == 'all'){
          level = 'f'
        }

        if(this.parent.level == 'f'){
          level = 's'
        }
     
        var data = {
          weight:this.item.weight,
          serviceTypeName:this.item.serviceTypeName,
       
          level:level,
          weight:this.item.weight,
          parentId:parseInt(this.$route.query.id)
        }
        console.log(new FormData(data))
        let res = await request.post(post_url,data)
        this.$router.back()
        this.$message.success('提交数据成功')
      },
      async update(){
        var data = {
          weight:this.item.weight,
          serviceTypeName:this.item.serviceTypeName,
          serviceTypeId:parseInt(this.$route.query.id)
        }
      
        let res = await request.post(update_url,data)
        this.reload()
        this.$message.success('更新数据成功')
      },
      async remove(){
        let res = await request.get(remove_url,{params:{serviceTypeId:parseInt(this.$route.query.id)}})
        this.$router.back()
        this.$message.success('删除数据成功')
      },
      async reload(){
        if(this.$route.query.action == 'create'){
          this.page_type = 'create'
          this.edit = true
          this.fetch_parent(this.$route.query.id)
        }else {
          let id = this.$route.query.id
          let item = await this.fetch()
          this.fetch_parent(item.parentId)
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
