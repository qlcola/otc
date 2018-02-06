<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex';

export default {
  name: 'app',
  methods: {
    ...mapActions([
        'resize',
        'getUserInfo',
        'getMyFinancial',
    ]),
  },
  created() {
    this.resize(window.innerHeight);
  },
  mounted: function () {
      window.onresize = _.debounce(() => {
        this.resize(window.innerHeight);
      }, 400);
      this.getUserInfo();
      this.getMyFinancial();
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
