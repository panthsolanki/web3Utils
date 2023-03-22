export const useSolanaStore = defineStore('solanaStore', () => {
  const clusters = reactive([{
    title: 'Devnet',
    uri: 'https://api.devnet.solana.com',
    isDisable: false,
  },{
    title: 'Devnet',
    uri: 'https://api.devnet.solana.com',
    isDisable: true,
  },{
    title: 'Devnet',
    uri: 'https://api.devnet.solana.com',
    isDisable: true,
  },{
    title: 'Devnet',
    uri: 'https://api.devnet.solana.com',
    isDisable: true,
  }]);

  const activeCluster = reactive(clusters[0])

  return { clusters, activeCluster };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSolanaStore, import.meta.hot));
}