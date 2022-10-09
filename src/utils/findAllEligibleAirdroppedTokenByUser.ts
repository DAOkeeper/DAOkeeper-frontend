import { daoAbi } from '@src/lib/infoStoreAbi';
import { STORE_ADDRESS } from '@src/utils/getAllGovernanceTokenInfo';
import { ethers } from 'ethers';
import { JSONRPC_PROVIDER } from '@src/constants';

export const findAllEligibleAirdroppedTokenByUser = async (userAddress: string) => {
  // const provider = ethers.providers.getDefaultProvider('goerli');
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
  const ContractInfoStore = new ethers.Contract(STORE_ADDRESS, daoAbi, provider);

  return await ContractInfoStore.findAirdropTokenAddressListByUserAddr(userAddress);
};
