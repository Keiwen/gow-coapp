<template>
  <nav class="navbar navbar-dark navbar-expand-sm sticky-top">
    <div class="container-fluid">
      <span class="navbar-brand"><img src="@/assets/logo.png"></span>
      <button class="navbar-toggler" type="button" aria-controls="navbarNav" aria-label="Toggle navigation" @click="toogleNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" ref="navbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{name: 'search'}" class="nav-link" @click.native="closeNav">Search</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'arcanes'}" class="nav-link" @click.native="closeNav">Arcanes</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'kingdoms'}" class="nav-link" @click.native="closeNav">Kingdoms</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'delves'}" class="nav-link" @click.native="closeNav">Delves</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'classes'}" class="nav-link" @click.native="closeNav">Classes</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'about'}" class="nav-link" @click.native="closeNav">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    toogleNav () {
      this.$refs.navbar.classList.toggle('show')
    },
    closeNav () {
      this.$refs.navbar.classList.remove('show')
    }
  }
}
</script>

<style lang="scss">
  .navbar {
    background-color: var(--main-bg);
  }
</style>
