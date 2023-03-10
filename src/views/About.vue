<template>
  <div class="about">

    <p>Last update: 2023-03-10</p>
    <div>Last class added: Spiritwalker</div>
    <div>Last kingdom added: Vulpacea</div>
    <div>Last delve added: Court of Foxes</div>

    <hr />
    <p>
      <em>Tip: by default, you need 16 traitstones to fully trait a legendary troop, and 21 to fully trait a mythic one.</em>
    </p>

    <hr />
    <ResetButtonLight />
    <br /><br />
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
