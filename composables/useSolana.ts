export const useSolana = async () => {
  const solanaWeb3 = await import('@solana/web3.js')
  // const solanaWeb3 = require("@solana/web3.js");
  console.log('useSolana ==>', solanaWeb3);
  return reactive(solanaWeb3)
}
