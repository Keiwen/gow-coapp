<template>
  <div>
    <form>
      <div class="row">
        <div class="col">
          <SearchBy id="kingdom_by_arcane" label="Arcane" :dataList="getArcanes()" v-model="arcane"></SearchBy>
        </div>
        <div class="col">
          <SearchBy id="kingdom_by_mastery" label="Mastery" :dataList="getColors()" v-model="mastery"></SearchBy>
        </div>
      </div>
    </form>

    <button class="btn btn-success" @click="clearFilter">Clear filter</button>
    <button class="btn btn-success" @click="searchForKingdom">Apply filter</button>

    <hr/>

    <div v-if="searched">
      {{ foundMessage }}
      <div v-for="kingdom in kingdomsFiltered" :key="kingdom.name">
        <strong>{{kingdom.name | capitalize}}</strong> - {{kingdom.arcane.name | capitalize}} ({{kingdom.mastery | capitalize}})
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
      arcane: '',
      mastery: '',
      kingdomsFiltered: [],
      searched: false
    }
  },
  computed: {
    ...mapGetters(['getColors', 'getArcanes', 'getKingdoms']),
    foundMessage () {
      switch (this.kingdomsFiltered.length) {
        case 0: return 'No kingdom found'
        case 1: return '1 kingdom found:'
      }
      return this.kingdomsFiltered.length + ' kingdoms found:'
    }
  },
  methods: {
    searchForKingdom () {
      const filter = {
        arcane: this.arcane,
        mastery: this.mastery
      }
      this.kingdomsFiltered = this.getKingdoms(filter)
      this.searched = true
    },
    clearFilter () {
      this.arcane = ''
      this.mastery = ''
      this.kingdomsFiltered = []
      this.searched = false
    }
  }
}
</script>
