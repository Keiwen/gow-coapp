<template>
  <div id="app">
    <GowMenu></GowMenu>
    <div class="container-fluid">
      <router-view />
    </div>

    <cookie-law theme="dark-lime"
                v-for="(otm, key) in oneTimeMessages"
                :key="key"
                :storageName="'gowotm:'+key"
                :message="otm">
    </cookie-law>
  </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
import { mapGetters } from 'vuex'
import GowMenu from '@/components/Menu'

export default {
  components: {
    CookieLaw, GowMenu
  },
  computed: {
    ...mapGetters(['oneTimeMessages'])
  }
}
</script>
