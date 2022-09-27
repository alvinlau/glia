<template>
  <div>
    <div v-if="activity.activity">
      <h3>Activity</h3>
      <h4>{{activity.activity}}</h4>
      <ul>
        <li>Type: {{activity.type}}</li>
        <li>Participants: {{activity.participants}}</li>
        <li>Accessibility: {{activity.accessibility}}</li>
        <li>Price: {{activity.price}}</li>
        <li>Link: {{activity.link}}</li>
        <li>Key: {{activity.key}}</li>
      </ul>
    </div>
    <p v-else>Waiting for activity...</p>
    <button @click="getActivity">Get another activity</button>
  </div>
</template>

<script>
export default {
  name: 'ActivitySample',
  props: {
    user: String
  },
  data() {
    return {
      activity: {}
    }
  },
  methods: {
    getActivity() {
      fetch('http://localhost:3000/activity', {
        headers: {
          'BoredUser': this.$cookies.get('boredUser')
        }})
      .then(response => response.status >= 400 ? {} : response.json())
      .then(data => this.activity = data)
      .catch(error => console.log(error))
    }
  },
  mounted() {
    this.getActivity()
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
