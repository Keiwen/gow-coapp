<template>
  <div>
    <form>
      <div class="row">
        <div class="col">
          <SearchBy id="delve_by_color1" label="Color 1" :dataList="getColors()" v-model="color1"></SearchBy>
        </div>
        <div class="col">
          <SearchBy id="delve_by_color2" label="Color 2" :dataList="getColors()" v-model="color2"></SearchBy>
        </div>
      </div>
    </form>

    <button class="btn btn-success" @click="clearFilter">Clear filter</button>
    <button class="btn btn-success" @click="searchForDelve">Apply filter</button>

    <hr/>

    <div v-if="searched">
      {{ foundMessage }}
      <div v-for="delve in delvesFiltered" :key="delve.name">
        <strong>{{delve.name | capitalize}}</strong> - {{delve.color1 | capitalize}} / {{delve.color2 | capitalize}}
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
      color1: '',
      color2: '',
      delvesFiltered: [],
      searched: false
    }
  },
  computed: {
    ...mapGetters(['getColors', 'getDelves']),
    foundMessage () {
      switch (this.delvesFiltered.length) {
        case 0: return 'No delve found'
        case 1: return '1 delve found:'
      }
      return this.delvesFiltered.length + ' delves found:'
    }
  },
  methods: {
    searchForDelve () {
      const filter = {
        color: this.color1,
        colorAnd: this.color2
      }
      this.delvesFiltered = this.getDelves(filter)
      this.searched = true
    },
    clearFilter () {
      this.color1 = ''
      this.color2 = ''
      this.delvesFiltered = []
      this.searched = false
    }
  }
}
</script>
