<template>
  <div class="row">
    <div class="col-sm-3 summary">
      <h2>Objectives</h2>
      <hr />
      <UpgradeStats upgradeName="level" />
      <hr />
      <UpgradeStats upgradeName="power" />

    </div>

    <div class="col-sm-9 kingdoms">

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Kingdom</th>
            <th>
              Level
              <button class="btn btn-sm btn-success" v-if="lowUpgradefilter !== 'level'" @click="filterBy('level')">All</button>
              <button class="btn btn-sm btn-warning" v-else @click="filterBy('')">Low only</button>
            </th>
            <th>
              Power
              <button class="btn btn-sm btn-success" v-if="lowUpgradefilter !== 'power'" @click="filterBy('power')">All</button>
              <button class="btn btn-sm btn-warning" v-else @click="filterBy('')">Low only</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kingdom in kingdomsUpgrade" :key="kingdom.name">
            <td>{{ kingdom.name | capitalize }}</td>
            <td>
              <div class="upgrade">
                <integer-plusminus :min="0" :max="kingdomMaxLevel" v-model="kingdom.level" @ipm-increment="incrementUpgrade(kingdom, 'level')" @ipm-decrement="incrementUpgrade(kingdom, 'level', true)">
                  <span class="badge" :class="(nextStepLevel > kingdom.level) ? 'upgrade-low' : 'upgrade-ok'">{{ kingdom.level }}</span>
                </integer-plusminus>
              </div>
            </td>
            <td>
              <div class="upgrade">
                <integer-plusminus :min="0" :max="kingdomMaxPower" v-model="kingdom.power" @ipm-increment="incrementUpgrade(kingdom, 'power')" @ipm-decrement="incrementUpgrade(kingdom, 'power', true)">
                  <span class="badge" :class="(nextStepPower > kingdom.power) ? 'upgrade-low' : 'upgrade-ok'">{{ kingdom.power }}</span>
                </integer-plusminus>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { IntegerPlusminus } from 'vue-integer-plusminus'
import UpgradeStats from '@/components/UpgradeStats'

export default {
  components: { IntegerPlusminus, UpgradeStats },
  data () {
    return {
      kingdomsUpgrade: [],
      lowUpgradefilter: ''
    }
  },
  computed: {
    ...mapGetters(['getKingdoms', 'getUpgradeStats', 'kingdomMaxLevel', 'kingdomMaxPower']),
    nextStepLevel () {
      return this.getNextStepUpgrade('level')
    },
    nextStepPower () {
      return this.getNextStepUpgrade('power')
    }
  },
  mounted () {
    this.filterKingdoms()
  },
  methods: {
    ...mapActions(['changeUpgrade']),
    filterKingdoms () {
      const filteredKingdoms = []
      const allKingdoms = JSON.parse(JSON.stringify(this.getKingdoms()))
      for (const kingdom of allKingdoms) {
        let toFilter = false
        switch (this.lowUpgradefilter) {
          case 'level': toFilter = (kingdom.level >= this.nextStepLevel); break
          case 'power': toFilter = (kingdom.power >= this.nextStepPower); break
        }
        if (!toFilter) filteredKingdoms.push(kingdom)
      }
      this.kingdomsUpgrade = filteredKingdoms
    },
    getNextStepUpgrade (upgradeName) {
      const stats = this.getUpgradeStats(upgradeName)
      return stats.nextStep
    },
    incrementUpgrade (kingdom, upgradeName, decrement) {
      let currentValue = kingdom[upgradeName]
      currentValue = decrement ? currentValue - 1 : currentValue + 1
      this.changeUpgrade({
        targetName: kingdom.name,
        upgradeName: upgradeName,
        value: currentValue
      }).then(() => {
        this.filterKingdoms()
      })
    },
    filterBy (upgradeName) {
      this.lowUpgradefilter = upgradeName
      this.filterKingdoms()
    }
  }
}
</script>

<style lang="scss">
  .kingdoms {
    border-left: 1px solid var(--main-color);
  }

  .upgrade {
    display: inline-block;
  }

  .int-pm {
    .int-pm-value {
      padding: 5px 5px !important;
    }

    .int-pm-increment {
      background: var(--success) !important;
    }

    .int-pm-decrement {
      background: var(--warning) !important;
    }
  }

  .badge {
    &.upgrade-low {
      background-color: var(--danger);
    }

    &.upgrade-ok {
      background-color: var(--success);
    }
  }

  .summary {
      margin-bottom: 25px;
  }
</style>
