<template>
    <div class="aa">
        <el-card>
            <el-form class="demo-form-inline" size="mini" label-width="80px">
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
                <el-form-item label="名字：">
                    <el-input v-model="item.serviceTypeName" placeholder="输入名字" size="small" v-if="edit"></el-input>
                    <span v-else>{{item.serviceTypeName}}</span>
                </el-form-item>

                <el-form-item label="级别：">
                    <el-input v-model="item.level" placeholder="输入年龄" size="small" v-if="edit"></el-input>
                    <span v-else>{{item.level}}</span>
                </el-form-item>

              <el-form-item label="权重：">
                <el-input v-model="item.weight" placeholder="输入年龄" size="small" v-if="edit"></el-input>
                <span v-else>{{item.weight}}</span>
              </el-form-item>
            </el-form>


        </el-card>


    </div>
</template>

<script>
  import request from 'axios'

  const url = "http://localhost:8080/service/getServiceById"


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
        let res = await request.get(url + '/' ,{params:{serviceTypeId:this.$route.query.id}})
        this.item = res.data.data
      },
      async fetch_parent(){
        let res = await request.get(url + '/' ,{params:{serviceTypeId:this.$route.query.id}})
        this.parent= res.data.data
      },

      save() {
        this.edit = false
      },
      async post() {

      }
    },
    mounted() {
      let id = this.$route.query.id

      if (this.$route.query.id) {
        this.page_type = 'detail'
        this.fetch()
      } else {
        this.page_type = 'create'
        this.edit = true
        this.fetch_parent()
      }
    },

  }
</script>

<style>

</style>
