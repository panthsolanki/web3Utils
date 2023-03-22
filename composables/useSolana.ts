export const useSolana = async () => {
  const solanaWeb3 = await import('@solana/web3.js');
  return reactive(solanaWeb3)
}
