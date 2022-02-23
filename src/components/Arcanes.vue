<template>
  <div class="row">
    <div class="col-sm-7 inventory">
      <h2>Inventory</h2>
      <div class="row">
        <div v-for="arcane in getArcanes()" :key="arcane.name" class="col-3">
          <div class="form-floating mb-1">
            <input type="number" class="form-control" :id="'inventory_' + arcane.name" placeholder="0" v-model.number="inventory[arcane.name]" @change="updateInventory(arcane.name)">
            <label for="floatingInput">{{ arcane.name | capitalize }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-5">
      <div class="shouldFarm">
        <h2>You should farm</h2>
        <div v-for="spot in arcaneSpots" :key="spot.kingdom" class="arcaneSpot">
          <span v-if="spot.drop" class="increasedDropSpot">&neArr;</span>
          {{ spot.kingdom | capitalize }}
          ({{ spot.arcane | capitalize }})
          <span :class="'badge arcaneSpot-' + spot.arcaneStatus">{{ spot.count }}</span>
          <span v-if="spot.drop" class="increasedDropSpot">&neArr;</span>
        </div>

      </div>
      <hr/>
      <div class="arcaneDrop">
        <h2>Increased drops for</h2>
        <div class="row">
          <div class="col-6">
            <SearchBy id="drop1_kingdom" :dataList="getKingdoms()" v-model="increasedDrops[0]" @input="updateIncreasedDrops(0)"></SearchBy>
          </div>
          <div class="col-6">
            <SearchBy id="drop2_kingdom" :dataList="getKingdoms()" v-model="increasedDrops[1]" @input="updateIncreasedDrops(1)"></SearchBy>
          </div>
          <div class="col-6">
            <SearchBy id="drop3_kingdom" :dataList="getKingdoms()" v-model="increasedDrops[2]" @input="updateIncreasedDrops(2)"></SearchBy>
          </div>
          <div class="col-6">
            <SearchBy id="drop4_kingdom" :dataList="getKingdoms()" v-model="increasedDrops[3]" @input="updateIncreasedDrops(3)"></SearchBy>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SearchBy from '@/components/SearchBy'

export default {
  components: {
    SearchBy
  },
  data () {
    return {
      inventory: {},
      increasedDrops: ['', '', '', ''],
      arcaneSpots: []
    }
  },
  computed: {
    ...mapGetters(['arcaneHardLimit', 'arcaneSoftLimit', 'getArcanes', 'getKingdoms', 'increasedDropKingdoms'])
  },
  mounted () {
    for (const arcane of this.getArcanes()) {
      this.inventory[arcane.name] = arcane.inventory
    }
    this.computeArcaneSpot()
    this.increasedDrops = JSON.parse(JSON.stringify(this.increasedDropKingdoms))
  },
  methods: {
    ...mapActions(['changeInventoryPiece', 'changeIncreasedDropKingdom']),
    updateInventory (arcaneName) {
      this.changeInventoryPiece({
        bag: 'arcanes',
        piece: arcaneName,
        value: this.inventory[arcaneName]
      })
      this.computeArcaneSpot()
    },
    updateIncreasedDrops (kingdomIndex) {
      if (this.increasedDropKingdoms[kingdomIndex] !== this.increasedDrops[kingdomIndex]) {
        this.changeIncreasedDropKingdom({ kingdomName: this.increasedDrops[kingdomIndex], index: kingdomIndex })
        this.computeArcaneSpot()
      }
    },
    computeArcaneSpot (kingdomIndex) {
      const kingdomFarm = []
      for (const kingdom of this.getKingdoms()) {
        if (!kingdom.arcane) continue
        const arcaneCount = this.inventory[kingdom.arcane.name] ? this.inventory[kingdom.arcane.name] : 0
        let arcaneStatus = 'ok'
        if (arcaneCount < this.arcaneHardLimit) {
          arcaneStatus = 'hard'
        } else if (arcaneCount < this.arcaneSoftLimit) {
          arcaneStatus = 'soft'
        }

        kingdomFarm.push({
          kingdom: kingdom.name,
          arcane: kingdom.arcane.name,
          count: arcaneCount,
          arcaneStatus: arcaneStatus,
          drop: this.increasedDropKingdoms.includes(kingdom.name)
        })
      }

      kingdomFarm.sort((itemA, itemB) => itemA.count - itemB.count)
      const onlyDropping = kingdomFarm.filter(item => item.drop)
      let notDropping = kingdomFarm.filter(item => !item.drop)
      notDropping = notDropping.slice(0, 2)
      this.arcaneSpots = onlyDropping.concat(notDropping)
    }
  }
}
</script>

<style lang="scss">
  .inventory {
      border-right: 1px solid var(--main-color);
  }
  .arcaneDrop {
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .increasedDropSpot {
    color: var(--success);
  }

  .arcaneSpot {
    .arcaneSpot-ok {
      background-color: var(--success);
    }

    .arcaneSpot-soft {
      background-color: var(--warning);
    }

    .arcaneSpot-hard {
      background-color: var(--danger);
    }
  }
</style>
