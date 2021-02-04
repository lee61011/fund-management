<!--
 * @Author: **
 * @Date: 2021-01-31 16:05:21
 * @LastEditTime: 2021-02-04 16:31:55
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\App.vue
-->
<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'app',
  components: {},
  created() {
    const token = sessionStorage.getItem('token')
    if (token) {
      const decoded = jwt_decode(token)
      console.log(decoded)
      this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
      this.$store.dispatch('setUser', decoded)
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style>
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
