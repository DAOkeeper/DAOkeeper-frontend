import { infoStoreContractAddress } from '@src/constants';
import { JSONRPC_PROVIDER } from '@src/constants';
import { abi } from '@src/lib/infoStoreAbi';
import { ethers } from 'ethers';

export const findAllEligibleAirdroppedTokenByUser = async (userAddress: string) => {
  // const provider = ethers.providers.getDefaultProvider('goerli');
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
  const ContractInfoStore = new ethers.Contract(infoStoreContractAddress, abi, provider);

  return await ContractInfoStore.findAirdropTokenAddressListByUserAddr(userAddress);
};
