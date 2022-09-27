<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <section>
    <form @submit.prevent="setUser">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="userData.name">
      </div>
      <div>
        <label for="accessibility">Accessibility: </label>
        <input type="text" id="accessibility" v-model="userData.accessibility">
      </div>
      <div>
        <label for="price">Price: </label>
        <input type="text" id="price" v-model="userData.price">
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
      userData: {
        name: '',
        accessibility: '',
        price: ''
      }
    }
  },
  methods: {
    setUser() {
      fetch('http://localhost:3000/user',{
        method:  'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.userData)
      })
      .then(response => response.json())
      .then(data => console.log(data))
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
