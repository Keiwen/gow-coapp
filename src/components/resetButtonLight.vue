<template>
  <div>
    <button class="btn btn-warning" @click="resetData">Refresh app</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['resetStorageLight']),
    resetData () {
      this.resetStorageLight()
    }
  }
}
</script>
