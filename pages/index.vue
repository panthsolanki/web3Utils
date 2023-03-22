<script lang="ts" setup>
  const routes = reactive([{
    link:'/airdrop',
    title: 'AirDrop SOL to your account'
  }, {
    link:'/transfer',
    title: 'Send SOL to other account'
  }])
</script>
<template>
  <div class="flex w-full h-full flex-col justify-between items-center space-x-1">
    <h1 class="p-5 text-2xl font-mono">Click following utils to redirect</h1>
    <nuxt-link 
      v-for="route, index in routes" :key="index" 
      :to="route.link" 
      class="p-5">
      <a class="text-4xl font-mono underline-offset-3">{{route.title}}</a>
    </nuxt-link>
  </div>
</template>
