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
    <h1 class="p-5 text-2xl font-mono">Get started by clicking any of following utils</h1>
    <nuxt-link 
      v-for="route, index in routes" :key="index" 
      :to="route.link" 
      class="p-5">
      <a class="text-4xl font-mono underline">{{route.title}}</a>
    </nuxt-link>
    <h1 class="pt-20 text-xl font-mono">created by Panth</h1>
  </div>
</template>
