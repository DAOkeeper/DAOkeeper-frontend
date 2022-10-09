import { JSONRPC_PROVIDER } from '@src/constants';
import { abi } from '@src/lib/airdropAbi';
import { ethers } from 'ethers';

export const getAirdropSnapshotTimestamps = async (airdropAddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
  const AirdropContract = new ethers.Contract(airdropAddress, abi, provider);

  // return await AirdropContract.getAirdropSnapshotTimestamps();

  const unixTimeList = await AirdropContract.getAirdropSnapshotTimestamps();

  return unixTimeList.map((item: any) => {
    const unixTime = item._hex;
    const parsedUnixTime = new Date(parseInt(unixTime) * 1000);

    return new Date(parsedUnixTime).toLocaleString();
  });
};
