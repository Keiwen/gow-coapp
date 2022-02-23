<template>
  <div class="kingdomStat">
    <h3>{{ upgradeName | capitalize}} {{ statsDisplay.nextStep }}</h3>
    <div>
      <div v-if="!done">
        <i>
          From {{ statsDisplay.min }} to {{ statsDisplay.max }}
          <br />
          ({{ statsDisplay.highlightStatName }}: {{ statsDisplay.highlightStat }})
        </i>
        <br />
        {{ statsDisplay.steps[statsDisplay.nextStep] }} to upgrade
        ({{ statsDisplay.lowUpgradeDisplay }})
      </div>
      <div v-else>
        <i>Done!</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    upgradeName: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['getUpgradeStats']),
    statsDisplay () {
      const stats = this.getUpgradeStats(this.upgradeName)
      stats.lowUpgradeShort = stats.lowUpgrade.slice(0, 2)
      stats.lowUpgradeDisplay = stats.lowUpgradeShort.join(', ')
      if (stats.lowUpgrade.length > 3) stats.lowUpgradeDisplay += ', ...'
      switch (this.upgradeName) {
        case 'renown': stats.highlightStatName = 'total'; break
        default: stats.highlightStatName = 'average'
      }
      stats.highlightStat = stats[stats.highlightStatName]
      return stats
    },
    done () {
      const stats = this.getUpgradeStats(this.upgradeName)
      return (stats.lowUpgrade.length === 0)
    }
  }
}
</script>

<style lang="scss">

</style>
