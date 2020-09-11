<template>
  <div class="app">
    <router-view v-if="ready" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['ready']),
  },
  async created() {
    this.$store.dispatch('initializeStore')
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

*:focus {
  outline: 3px solid #ff8c1a;
}

input,
button {
  font-family: 'Poppins', sans-serif;
}

.app {
  background: #ffc408;
  min-height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #121212;
}
</style>
