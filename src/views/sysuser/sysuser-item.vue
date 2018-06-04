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
                <el-form-item label="昵称：">
                    <el-input v-model="item.nickname" placeholder="输入名字" size="small" v-if="edit"></el-input>
                    <span v-else>{{item.nickname}}</span>
                </el-form-item>

                <el-form-item label="性别：">
                    <el-input v-model="item.sex" placeholder="输入性别" size="small" v-if="edit"></el-input>
                    <span v-else>{{item.sex}}</span>
                </el-form-item>

              <el-form-item label="邮箱：">
                <el-input v-model="item.email" placeholder="输入邮箱" size="small" v-if="edit"></el-input>
                <span v-else>{{item.email}}</span>
              </el-form-item>

              <el-form-item label="手机：">
                <el-input v-model="item.phoneNumber" placeholder="输入手机" size="small" v-if="edit"></el-input>
                <span v-else>{{item.phoneNumber}}</span>
              </el-form-item>


              <el-form-item label="描述：">
                <el-input type="textarea" v-model="item.description" placeholder="输入描述" size="small" v-if="edit"></el-input>
                <span v-else>{{item.description}}</span>
              </el-form-item>
            </el-form>


        </el-card>


    </div>
</template>

<script>
  import request from 'axios'

  const url = "http://localhost:8080/user/getUserById"

  export default {
    name: 'aa',
    data() {
      return {

        item: {},
        edit: false,
        page_type: 'detail'
      }
    },
    methods: {
      async fetch() {
        let res = await request.get(url,{params:{userId:this.$route.query.id}})
        this.item = res.data.data
      },
      save() {
        this.edit = false
      },
      async post() {

      }
    },
    mounted() {


    },

  }
</script>

<style>

</style>
