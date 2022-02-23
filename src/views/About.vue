<template>
  <div class="about">

    <p>Last update: 2022-02-04</p>
    <div>Last class added: Elementalist</div>
    <div>Last kingdom added: Nexus</div>
    <div>Last delve added: Fire rift</div>

    <hr />
    <p>
      <em>Tip: by default, you need 16 traitstones to fully trait a legendary troop, and 21 to fully trait a mythic one.</em>
    </p>

    <hr />
    <ResetButton />

  </div>
</template>

<script>
import ResetButton from '@/components/resetButton.vue'

export default {
  components: {
    ResetButton
  }
}
</script>
