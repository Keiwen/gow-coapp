<template>
  <div>
    <div class="container">
      Can I delve
      <SearchBy id="delve" :dataList="getDelves()" v-model="delve" class="delveSearch"></SearchBy>
      with
    </div>

    <div class="row">
      <div v-for="delvingTroop in delvingTroops" :key="delvingTroop.name" class="col-4">
        <div class="delvingTroop" :class="delvingTroop.canDelve ? 'canDelve' : 'cannotDelve'">
          {{ delvingTroop.name | capitalize }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBy from '@/components/SearchBy'

export default {
  components: {
    SearchBy
  },
  data () {
    return {
      delve: '',
      delvingTroops: []
    }
  },
  computed: {
    ...mapGetters(['getDelves', 'getTroopsForDelve'])
  },
  watch: {
    delve () {
      this.searchTroopsForDelve()
    }
  },
  mounted () {
    this.searchTroopsForDelve()
  },
  methods: {
    searchTroopsForDelve () {
      this.delvingTroops = this.getTroopsForDelve(this.delve)
    }
  }
}
</script>

<style lang="scss">
  .delveSearch {
    padding-right: 1em;
    padding-left: 1em;
  }
  .delvingTroop {
    margin: 2px;

    &.canDelve {
      background-color: rgba(26, 201, 34, 0.5);
    }

    &.cannotDelve {
      background-color: rgba(228, 25, 43, 0.5);
    }
  }
</style>
