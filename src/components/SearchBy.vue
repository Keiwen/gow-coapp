<template>
  <div class="mt-1 mb-1 searchBy">
    <label :for="id" class="form-label" v-if="label">{{ label }}</label>
    <div class="input-group">
      <v-suggest :data="dataList"
                  :full-list="true"
                  :id="id"
                  v-model="searchValue"
                  >
        <template #default="{ row }">
          <div>
            <span>{{ row.name | capitalize }}</span>
          </div>
        </template>
      </v-suggest>
    </div>
  </div>

</template>

<script>
import { Suggest } from 'v-suggest'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default () { return [] }
    },
    value: {}
  },
  components: {
    'v-suggest': Suggest
  },
  data () {
    return {
      searchValue: ''
    }
  },
  mounted () {
    this.searchValue = this.value
  },
  watch: {
    searchValue () {
      this.$emit('input', this.searchValue)
    },
    value () {
      if (this.searchValue !== this.value) this.searchValue = this.value
    }
  }
}
</script>

<style lang="scss">
  .searchBy {
    display: inline-block;
  }
</style>
