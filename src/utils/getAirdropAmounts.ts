import { JSONRPC_PROVIDER } from '@src/constants';
import { abi } from '@src/lib/airdropAbi';
import { ethers } from 'ethers';

export const getAirdropAmountsPerRound = async (airdropAddress: string) => {
  // const provider = ethers.providers.getDefaultProvider('goerli');
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
  const AirdropContract = new ethers.Contract(airdropAddress, abi, provider);

  // return await AirdropContract.getAirdropSnapshotTimestamps();

  const rawAmount = (await AirdropContract.getTotalAirdropVolumePerRound()).toString();

  console.log('RAW AMOUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', rawAmount);

  return parseInt(ethers.utils.formatEther(rawAmount));
};
