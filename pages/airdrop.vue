<script lang="ts" setup>
import { useSolanaStore } from '@/stores/solanaStore'

const pubKey = ref<string>('');
const isAirDropInProgress = ref<boolean>(false);
const steps = reactive<any[]>([]);
const successTxHash = ref<string>('');

const solanaStore = useSolanaStore();
const cluster = computed(() => solanaStore.activeCluster);

const web3 = await useSolana();

const addStep = (title: string = '', classNames: string = '') => {
  steps.push({ title, classNames });
}

const checkPublicKey = async (publicKeyStr: string) => {
  // Check if the public key is valid
  try {
    const publicKeyObject = new web3.PublicKey(publicKeyStr);
    const isValid = await web3.PublicKey.isOnCurve(publicKeyObject);
    return isValid;
  } catch (error) {
    return false;
  }
}
const onClick = async () => {
  successTxHash.value = '';
  steps.splice(0);
  console.log('address ==>', pubKey.value);
  const publicKeyStr = pubKey.value;
  addStep(`Connecting to Solana `);
  addStep(`=== \n\n`);
  isAirDropInProgress.value = true;
  try {
    const isValid = await checkPublicKey(publicKeyStr);
    addStep(`checking validation of ${publicKeyStr} `);
    addStep(`=== === \n\n`);
    if (isValid) {
      addStep(`The public key ${publicKeyStr} is valid!`);
      addStep(`=== === === \n\n`);

      const { Connection, PublicKey } = web3;
      addStep(`Connecting to ${cluster.value.title} Solana`);
      addStep(`=== === === === \n\n`);
      const connection = new Connection(cluster.value.uri);

      // Create a new PublicKey instance
      const publicKeyObject = new PublicKey(publicKeyStr);
      addStep(`Connected to ${cluster.value.title} Solana`);
      addStep(`=== === === === === \n\n`);

      addStep(`Trying to drop 1 SOL to ${publicKeyStr}`);
      addStep(`=== === === === === \n\n`);
      const txHash = await connection.requestAirdrop(publicKeyObject, 1e9);
      successTxHash.value = txHash;
      addStep(`Airdropped successful with transaction Hash ${JSON.stringify(txHash)}`);
      addStep(`=== === === === === === \n\n`);
    } else {
      addStep(`The public key ${publicKeyStr} is invalid :(`);
      addStep(`=== === === \n\n`);
    }

  } catch (error) {
    // addStep(`Failed to following error`);
    // addStep(`${typeof error === 'object' ? JSON.stringify(error) : error}`);
    addStep(`Something went wrong`);
    addStep(`=== === === === === === \n\n`);

  }
  pubKey.value = '';
  isAirDropInProgress.value = false;
}
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center bg-slate-200">
    <div class="flex-1 flex-col p-8 w-full">
      <div class="flex items-center justify-center">
        <label class="block text-gray-700 text-lg font-mono font-bold mb-2" for="username">
          Airdrop to your {{ cluster.title }} account
        </label>
      </div>
      <div class="flex items-center justify-center">
        <input class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  max-w-md 
                  mr-2 py-2 px-3
                  text-gray-700 
                  bg-white
                  leading-tight 
                  font-mono font-normal
                  focus:outline-none focus:shadow-outline" id="pubKey" type="text" :disabled="isAirDropInProgress"
          :placeholder="`Your ${cluster.title} Public Key`" v-model="pubKey">
        <button :disabled="isAirDropInProgress" class="
                  bg-blue-500 hover:bg-blue-700 
                  text-white
                  mr-2 py-2 px-3 
                  rounded 
                  font-mono font-normal
                  focus:outline-none focus:shadow-outline" type="button" @click="onClick">
          AirDrop 1 SOL
        </button>
      </div>
    </div>
    <div class="flex flex-col py-2 w-full p-28">
      <div v-for="step, index in steps" :key="index" class="text-lg font-mono font-normal">
        {{ step.title }}
      </div>
      <div v-if="successTxHash" class="mt-4">
        <a :href="`https://explorer.solana.com/tx/${successTxHash}?cluster=${cluster.title.toLocaleLowerCase()}`"
          target="_blank"
          :disabled="!isAirDropInProgress" 
          class="bg-blue-500 hover:bg-blue-700 
                  text-white font-bold 
                  mt-2 py-2 px-3 
                  rounded 
                  focus:outline-none focus:shadow-outline">
          Click to show full transaction in explorer
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
