<template>
  <div>
    <button class="btn btn-warning" @click="resetData">Reset all data</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['resetStorage']),
    resetData () {
      this.resetStorage()
    }
  }
}
</script>
