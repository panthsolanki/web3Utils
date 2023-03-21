<script lang="ts" setup>
  const solanaWeb3 = await useSolana();
  console.log('Component: Solana', solanaWeb3);
  
</script>

<template>
  <div>
    Component: Solana
  </div>
</template>

<style scoped></style>
