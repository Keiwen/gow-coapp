<template>
  <div class="row">
    <div class="col-sm-3 summary">
      <h2>Objectives</h2>
      <hr />
      <UpgradeStats upgradeName="talent" />

    </div>

    <div class="col-sm-9 classes">

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Class</th>
            <th>
              Talents
              <button class="btn btn-sm btn-success" v-if="lowUpgradefilter !== 'talent'" @click="filterBy('talent')">All</button>
              <button class="btn btn-sm btn-warning" v-else @click="filterBy('')">Low only</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gowClass in classesUpgrade" :key="gowClass.name">
            <td>{{ gowClass.name | capitalize }}</td>
            <td>
              <div class="upgrade">
                <integer-plusminus :min="0" :max="classMaxTalent" v-model="gowClass.talent" @ipm-increment="incrementUpgrade(gowClass, 'talent')" @ipm-decrement="incrementUpgrade(gowClass, 'talent', true)">
                  <span class="badge" :class="(nextStepTalent > gowClass.talent) ? 'upgrade-low' : 'upgrade-ok'">{{ gowClass.talent }}</span>
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
      classesUpgrade: [],
      lowUpgradefilter: ''
    }
  },
  computed: {
    ...mapGetters(['getClasses', 'getUpgradeStats', 'classMaxTalent']),
    nextStepTalent () {
      return this.getNextStepUpgrade('talent')
    }
  },
  mounted () {
    this.filterClasses()
  },
  methods: {
    ...mapActions(['changeUpgrade']),
    filterClasses () {
      const filteredClasses = []
      const allClasses = JSON.parse(JSON.stringify(this.getClasses()))
      for (const gowClass of allClasses) {
        let toFilter = false
        switch (this.lowUpgradefilter) {
          case 'talent': toFilter = (gowClass.talent >= this.nextStepTalent); break
        }
        if (!toFilter) filteredClasses.push(gowClass)
      }
      this.classesUpgrade = filteredClasses
    },
    getNextStepUpgrade (upgradeName) {
      const stats = this.getUpgradeStats(upgradeName)
      return stats.nextStep
    },
    incrementUpgrade (gowClass, upgradeName, decrement) {
      let currentValue = gowClass[upgradeName]
      currentValue = decrement ? currentValue - 1 : currentValue + 1
      this.changeUpgrade({
        targetName: gowClass.name,
        upgradeName: upgradeName,
        value: currentValue
      }).then(() => {
        this.filterClasses()
      })
    },
    filterBy (upgradeName) {
      this.lowUpgradefilter = upgradeName
      this.filterClasses()
    }
  }
}
</script>

<style lang="scss">
  .classes {
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
