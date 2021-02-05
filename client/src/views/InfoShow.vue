<!--
 * @Author: **
 * @Date: 2021-02-02 19:47:07
 * @LastEditTime: 2021-02-05 19:34:29
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\InfoShow.vue
-->
<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img src="" alt="">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{ user.name }}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{ user.role }}</span>
          </div>
          <div class="user-item">
            <Button @click="changePwdModal = true">修改密码</Button>
          </div>
        </div>
        <!-- <div class="change-pwd">
          
        </div> -->
      </el-col>
    </el-row>

    <el-dialog
      title="修改密码"
      :visible.sync="changePwdModal"
      width="30%">
      
      <el-form :model="cpwdForm" status-icon :rules="rules" ref="cpwdForm" label-width="100px">
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="cpwdForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="cpwdForm.newPass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="cpwdForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('cpwdForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('cpwdForm')">提交</el-button>
        </el-form-item>
      </el-form>
      
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="changePwdModal = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { putUserPass } from '@/http/login/login'
import Crypto from '@/assets/utils/cryptoAES'

export default {
  name: 'infoshow',
  components: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.cpwdForm.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      changePwdModal: false,
      cpwdForm: {
        newPass: '',
        oldPass: '',
        checkPass: ''
      },
      rules: {
        oldPass: [
          { required: true, message: '原密码不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6到18位', trigger: 'blur' },
        ],
        newPass: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6到18位', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            passwd: Crypto.encrypt(Crypto.encode(this.cpwdForm.oldPass)),
            newpasswd: Crypto.encrypt(Crypto.encode(this.cpwdForm.newPass))
          }
          putUserPass(this.user.id, params)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success('密码修改成功！')
              } else {
                this.$message.error(res.data.message);
              }
            }).catch(err => console.log(err))
        } else {
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>
