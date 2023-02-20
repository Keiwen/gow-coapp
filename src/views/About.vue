<template>
  <div class="about">

    <p>Last update: 2023-02-20</p>
    <div>Last class added: Geomancer</div>
    <div>Last kingdom added: Vulpacea</div>
    <div>Last delve added: Obsidian Depths</div>

    <hr />
    <p>
      <em>Tip: by default, you need 16 traitstones to fully trait a legendary troop, and 21 to fully trait a mythic one.</em>
    </p>

    <hr />
    <ResetButtonLight />
    <ResetButton />

  </div>
</template>

<script>
import ResetButton from '@/components/resetButton.vue'
import ResetButtonLight from '@/components/resetButtonLight.vue'

export default {
  components: {
    ResetButton, ResetButtonLight
  }
}
</script>
