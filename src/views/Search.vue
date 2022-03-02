<template>
  <div>
    <VueTinyTabs id="searchTab" :anchor="false" :closable="false" :hideTitle="true">
      <div class="section" id="classes">
        <h3 class="title">Classes</h3>
        <ClassSearch />
      </div>
      <div class="section" id="kingdoms">
        <h3 class="title">Kingdoms</h3>
        <KingdomSearch />
      </div>
      <div class="section" id="delves">
        <h3 class="title">Delves</h3>
        <DelveSearch />
      </div>
      <div class="section" id="delvingTroops">
        <h3 class="title">Delving troops</h3>
        <DelvingTroops />
      </div>

    </VueTinyTabs>
  </div>
</template>

<script>
import ClassSearch from '@/components/ClassSearch.vue'
import KingdomSearch from '@/components/KingdomSearch.vue'
import DelveSearch from '@/components/DelveSearch.vue'
import DelvingTroops from '@/components/DelvingTroops.vue'
import VueTinyTabs from 'vue-tiny-tabs'

export default {
  components: {
    VueTinyTabs, ClassSearch, KingdomSearch, DelveSearch, DelvingTroops
  }
}
</script>
