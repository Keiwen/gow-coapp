<template>
  <div class="row">
    <div class="col-sm-3 summary">
      <h2>Objectives</h2>
      <hr />
      <UpgradeStats upgradeName="renown" />
      <hr />
      <UpgradeStats upgradeName="quality" />

    </div>

    <div class="col-sm-9 delves">

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Delve</th>
            <th>
              Renown
              <button class="btn btn-sm btn-success" v-if="lowUpgradefilter !== 'renown'" @click="filterBy('renown')">All</button>
              <button class="btn btn-sm btn-warning" v-else @click="filterBy('')">Low only</button>
            </th>
            <th>
              Quality
              <button class="btn btn-sm btn-success" v-if="lowUpgradefilter !== 'quality'" @click="filterBy('quality')">All</button>
              <button class="btn btn-sm btn-warning" v-else @click="filterBy('')">Low only</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="delve in delvesUpgrade" :key="delve.name">
            <td>{{ delve.name | capitalize }}</td>
            <td>
              <div class="upgrade">
                <integer-plusminus :min="0" :max="delveMaxRenown" :step="100" v-model="delve.renown" @ipm-increment="incrementUpgrade(delve, 'renown')" @ipm-decrement="incrementUpgrade(delve, 'renown', true)">
                  <span class="badge" :class="getRenownCssClass(delve.renown)">{{ delve.renown }}</span>
                </integer-plusminus>
              </div>
            </td>
            <td>
              <div class="upgrade">
                <integer-plusminus :min="0" :max="delveMaxQuality" v-model="delve.quality" @ipm-increment="incrementUpgrade(delve, 'quality')" @ipm-decrement="incrementUpgrade(delve, 'quality', true)">
                  <span class="badge" :class="getQualityCssClass(delve.quality)">{{ delve.quality }}</span>
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
      delvesUpgrade: [],
      lowUpgradefilter: ''
    }
  },
  computed: {
    ...mapGetters(['getDelves', 'getUpgradeStats', 'delveMaxRenown', 'delveMaxQuality']),
    nextStepRenown () {
      return this.getNextStepUpgrade('renown')
    },
    nextStepQuality () {
      return this.getNextStepUpgrade('quality')
    }
  },
  mounted () {
    this.filterDelves()
  },
  methods: {
    ...mapActions(['changeUpgrade']),
    filterDelves () {
      const filteredDelves = []
      const allDelves = JSON.parse(JSON.stringify(this.getDelves()))
      for (const delve of allDelves) {
        let toFilter = false
        switch (this.lowUpgradefilter) {
          case 'renown': toFilter = (delve.renown >= this.nextStepRenown); break
          case 'quality': toFilter = (delve.quality >= this.nextStepQuality); break
        }
        if (!toFilter) filteredDelves.push(delve)
      }
      this.delvesUpgrade = filteredDelves
    },
    getNextStepUpgrade (upgradeName) {
      const stats = this.getUpgradeStats(upgradeName)
      return stats.nextStep
    },
    incrementUpgrade (delve, upgradeName, decrement) {
      let currentValue = delve[upgradeName]
      if (upgradeName === 'renown') {
        currentValue = decrement ? currentValue - 100 : currentValue + 100
      } else {
        currentValue = decrement ? currentValue - 1 : currentValue + 1
      }
      this.changeUpgrade({
        targetName: delve.name,
        upgradeName: upgradeName,
        value: currentValue
      }).then(() => {
        this.filterDelves()
      })
    },
    filterBy (upgradeName) {
      this.lowUpgradefilter = upgradeName
      this.filterDelves()
    },
    renownInput (event) {
      this.changeUpgrade({
        targetName: event.srcElement.dataset.delve,
        upgradeName: 'renown',
        value: parseInt(event.srcElement.value)
      }).then(() => {
        this.filterDelves()
      })
    },
    getRenownCssClass (renown) {
      if (renown === this.delveMaxRenown) return 'upgrade-max'
      if (this.nextStepRenown > renown) return 'upgrade-low'
      return 'upgrade-ok'
    },
    getQualityCssClass (quality) {
      if (quality === this.delveMaxQuality) return 'upgrade-max'
      if (this.nextStepQuality > quality) return 'upgrade-low'
      return 'upgrade-ok'
    }
  }
}
</script>

<style lang="scss">
  .delves {
    border-left: 1px solid var(--main-color);
  }

  .upgrade {
    display: inline-block;

    &.directInput {
      padding: 5px;
      border: 1px solid var(--main-color);
      border-radius: 15px;
      width: 7em;

      &.upgrade-low {
        border-color: var(--danger);
      }

      &.upgrade-ok {
        border-color: var(--success);
      }

      input {
        width: 5em;
      }
    }
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

    &.upgrade-max {
      background-color: var(--info);
    }
  }

  .summary {
    margin-bottom: 25px;
  }
</style>
