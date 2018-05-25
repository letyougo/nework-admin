<template>
    <div class="aa">
        <el-card>
            <el-form class="demo-form-inline" size="mini" label-width="100px">
                <el-form-item>
                    <el-button-group v-if="page_type=='detail'">
                        <el-button type="primary" @click="save" size="mini" v-if="edit">保存</el-button>
                        <el-button type="primary" @click="edit=true" size="mini" v-else>编辑</el-button>
                        <el-button @click="add_form.visible=true" size="mini">删除</el-button>
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
  export default {
    name: 'aa',
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
        let res = await request.get(detail_url ,{params:{districtId:this.$route.query.id}})
        this.parent = res.data.data
      },
      save() {
        this.edit = false
      },
      async post() {
        var data = {
          name:this.item.name,
          chinese:this.item.chinese,
          level:this.parent.level,
          parentId:this.$route.query.id
        }
        let res = await request.post(post_url,{

          data:data
        })
        this.$router.back()
      },
      async update(){

      }
    },
    mounted() {
      if(this.$route.query.action == 'create'){
        this.page_type = 'create'
        this.edit = true
        this.fetch_parent()
      }else {
        let id = this.$route.query.id
        this.fetch()
      }
    },

  }
</script>

<style>

</style>
