<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <section>
    <form @submit.prevent="setUser">
      <div>
        <label for="userId">Name:</label>
        <input type="text" id="name" v-model="user.name">
      </div>
      <div>
        <label for="title">Accessibility: </label>
        <input type="text" id="accessibility" v-model="user.accessibility">
      </div>
      <div>
        <label for="body">Price: </label>
        <input type="text" id="price" v-model="user.price">
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
      user: {
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
        body: JSON.stringify({
          name:           this.name,
          accessibility:  this.accessibility,
          price:          this.price
        })
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
