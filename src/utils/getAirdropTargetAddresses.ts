// getAirdropTargetAddresses

import { JSONRPC_PROVIDER } from '@src/constants';
import { abi } from '@src/lib/airdropAbi';
import { ethers } from 'ethers';

export const getAirdropTargetAddresses = async (airdropAddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
  const AirdropContract = new ethers.Contract(airdropAddress, abi, provider);

  return await AirdropContract.getAirdropTargetAddresses();
};
