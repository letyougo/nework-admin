<template>
    <div class="aa">
        <el-card>

        
            <el-form class="demo-form-inline" size="mini" label-width="100px">
                <el-form-item>
                    <el-button-group v-if="page_type=='detail'">
                        <el-button type="primary" @click="save" size="mini" v-if="edit">保存</el-button>
                        <el-button type="primary" @click="edit=true" size="mini" v-else>编辑</el-button>                     
                    </el-button-group>
                    <el-button-group v-else>
                        <el-button type="primary" @click="post" size="mini" v-if="edit">提交</el-button>
                    </el-button-group>
                </el-form-item>

              <el-form-item label="用户状态">
                <el-radio-group @change="check" v-model="item.checkStatus">
                   <el-radio-button label="-1">审核未通过</el-radio-button>
                  <el-radio-button label="0">未认证</el-radio-button>
                  <el-radio-button label="1">未审核</el-radio-button>
                  <el-radio-button label="2">已认证</el-radio-button>
                </el-radio-group>
              </el-form-item>


                <el-form-item label="昵称：">
                    <el-input v-model="item.nickname" placeholder="输入名字" size="small" v-if="edit"></el-input>
                    <span v-else>{{item.nickname}}</span>
                </el-form-item>

              

              <el-form-item label="手机：">
                <el-input v-model="item.phoneNumber" placeholder="输入手机" size="small" v-if="edit"></el-input>
                <span v-else>{{item.phoneNumber}}</span>
              </el-form-item>


              <el-form-item label="头像：">
              
                <img :src="item.avatar" height="100px"/>
              </el-form-item>

               <el-form-item label="身份证正面：">
                 <el-row >
                   <el-col :span="12">
                     <h3>正面</h3>
                      <img :src="item.idCardPositive" height="150px"/>
                      
                   </el-col >
                    <el-col :span="12">
                     <h3>反面</h3>
                    <img :src="item.idCardNegative" height="150px"/>
                   </el-col>
                 </el-row>
               
              
              </el-form-item>
           
            </el-form>


        </el-card>


    </div>
</template>

<script>

  import request from '../request'
  const url = "/user/getUserById"
  const check = '/user/checkUser'
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
      async check(a){
        console.log(a)
          await request.get(check,{params:{checkStatus:a,userId:this.$route.query.id}})
          this.fetch()
      },
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
      this.fetch()
    },

  }
</script>

<style>

</style>
