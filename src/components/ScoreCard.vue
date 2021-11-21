<template>
  <v-card>
    <v-card-text>{{ $store.state.user.point }}</v-card-text>
    <v-card-actions>
      <v-btn @click="$store.commit('user/increment')">インクリメント</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  computed: {
    point() {
      return this.$store.getters.user.point
    },
  },
}
</script>
