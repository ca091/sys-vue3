<template>
  <el-form class="form" :model="formData" label-width="130px">
    <el-form-item label="nick name">
      <el-autocomplete
        v-model="formData.nick_name"
        :fetch-suggestions="userList.map(v=>Object.assign({value:v.nick_name},v))"
        clearable
        class="inline-input w-50"
        @select="handleNicknameSelected"
      />
    </el-form-item>

    <el-form-item label="phone">
      <el-input v-model="formData.phone"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="login">login</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Cache from '@shared/Cache'
import { useRouter } from 'vue-router'

interface UserModel {
  phone: string;
  nick_name:string
}

const userList: UserModel[] = [
  {phone:'18801013774',nick_name:'cq'},
  {phone:'17761061071',nick_name:'chin'},
]

const formData = reactive({
  phone: '18801013774',
  nick_name: 'cq',
  username: '',
  password: '',
  code: 111111,
  type: 1,
  login_type: 1,
})

const router = useRouter()

async function login() {
  // const Account = {
  //   phone: '15001394829',
  //   password: '123456'
  // }
  // let check = await checkAccount(Account.phone)
  // if (!check) return
  // let data = await getLoginKey()
  // let res = await $fetch('/v4/ucenter-login-reg/business/login', {
  //   way: 1,
  //   uuid: data.uuid,
  //   account: Account.phone,
  //   password: cmdRSAEncrypt(data.public_key, Account.password),
  //   channel: 'b'
  // })

  formData.username = formData.nick_name
  formData.password = formData.phone

  // let res = await $fetch('login', formData)

  // todo delete mock
  let res = {
    data: {
      token: '89e75d92236c3822',
      channel_id: '1',
      sso_token: '1'
    }
  }

  Cache.local.set(Cache.Key.Token, res.data.token)
  // Cache.local.set(Cache.Key.TokenExpiredTime, res.data.exp_time)
  // Cache.local.set(Cache.Key.CHANNEL_ID, res.data.channel_id)
  // Cache.local.set(Cache.Key.SSO_TOKEN, res.data.sso_token)
  await router.replace({name: 'home'})
}

function handleNicknameSelected(val: UserModel) {
  formData.nick_name = val.nick_name
  formData.phone = val.phone
}
</script>

<style lang="less">
.form {
  width: 800px;
  margin: 30vh auto 0;
}
</style>
