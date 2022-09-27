<template>
  <div class="hello">
    <div v-if="this.$cookies.get('boredUser')">
      <p>Logged in as: {{this.$cookies.get('boredUser')}}</p>
      <p>Preferences</p>
      <p>Accessibility: {{this.$cookies.get('boredUserAccessibility')}}</p>
      <p>Price: {{this.$cookies.get('boredUserPrice')}}</p>
    </div>

    <section>
    <form @submit.prevent="setUser">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="userForm.name">
      </div>
      <div>
        <label for="accessibility">Accessibility: </label>
        <input type="text" id="accessibility" v-model="userForm.accessibility">
      </div>
      <div>
        <label for="price">Price: </label>
        <input type="text" id="price" v-model="userForm.price">
      </div>
      <button>Create New User</button>
    </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  props: {
    msg: String
  },
  data() {
    return {
      userForm: {
        name: '',
        accessibility: '',
        price: ''
      },
    }
  },
  methods: {
    setUser() {
      fetch('http://localhost:3000/user',{
        method:  'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.userForm)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.$cookies.set('boredUser', data.name)
        this.$cookies.set('boredUserAccessibility', data.accessibility)
        this.$cookies.set('boredUserPrice', data.price)
        this.userForm.name = ''
        this.userForm.accessibility = ''
        this.userForm.price = ''
        this.$forceUpdate();
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
