<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <ActivitySample user=''/>
    <hr/>
    <UserProfile msg="Bored Activities"/>
  </div>
</template>

<script>
import UserProfile from './components/UserProfile.vue'
import ActivitySample from './components/ActivitySample.vue'

export default {
  name: 'App',
  components: {
    UserProfile,
    ActivitySample
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
