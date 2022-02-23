<template>
  <div>
    <form>
      <div class="row">
        <div class="col">
          <SearchBy id="class_by_troop_type" label="Troop type" :dataList="getTroopTypes()" v-model="troopType"></SearchBy>
        </div>
        <div class="col">
          <SearchBy id="class_by_kingdom" label="Kingdom" :dataList="getKingdoms()" v-model="kingdom"></SearchBy>
        </div>
        <div class="col">
          <SearchBy id="class_by_tree" label="Tree" :dataList="getTrees()" v-model="tree"></SearchBy>
        </div>
      </div>
    </form>

    <button class="btn btn-success" @click="clearFilter">Clear filter</button>
    <button class="btn btn-success" @click="searchForClass">Apply filter</button>

    <hr/>

    <div v-if="searched">
      {{ foundMessage }}
      <div v-for="gowClass in classesFiltered" :key="gowClass.name">
        <strong>{{gowClass.name | capitalize}}</strong> - {{gowClass.troop.name | capitalize}} ({{gowClass.kingdom.name | capitalize}})
        <small>[ <span v-for="gowTree in gowClass.trees" :key="gowTree.name">{{ gowTree.name | capitalize }} </span>]</small>
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
      troopType: '',
      kingdom: '',
      tree: '',
      classesFiltered: [],
      searched: false
    }
  },
  computed: {
    ...mapGetters(['getTroopTypes', 'getKingdoms', 'getTrees', 'getClasses']),
    foundMessage () {
      switch (this.classesFiltered.length) {
        case 0: return 'No class found'
        case 1: return '1 class found:'
      }
      return this.classesFiltered.length + ' classes found:'
    }
  },
  methods: {
    searchForClass () {
      const filter = {
        troop: this.troopType,
        kingdom: this.kingdom,
        tree: this.tree
      }
      this.classesFiltered = this.getClasses(filter)
      this.searched = true
    },
    clearFilter () {
      this.troopType = ''
      this.kingdom = ''
      this.tree = ''
      this.classesFiltered = []
      this.searched = false
    }
  }
}
</script>
