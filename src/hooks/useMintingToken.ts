import { JSONRPC_PROVIDER } from '@src/constants';
import { abi } from '@src/lib/airdropAbi';
import { postAirdropInfo } from '@src/lib/api';
import { postAirdropInfoInfoParams } from '@src/types';
import { useMutation } from '@tanstack/react-query';
import { ethers } from 'ethers';
const useMintingToken = ({
  name,
  ticker,
  DAOName,
  intro,
  image,
  link,
  initial_supply,
  owner,
  airdrop_timestamps,
  airdrop_target_addresses,
  airdrop_round_airdrop_amounts,
}: postAirdropInfoInfoParams) => {
  // const queryKeys = [flag] as string[];

  return useMutation(
    async () =>
      postAirdropInfo({
        name,
        ticker,
        DAOName,
        intro,
        image,
        link,
        initial_supply,
        owner,
        airdrop_timestamps,
        airdrop_target_addresses,
        airdrop_round_airdrop_amounts,
      }),
    {
      onSuccess: async ({ data }) => {
        localStorage.setItem('airdropInfo', JSON.stringify(data));
        try {
          const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
          const signer = new ethers.Wallet(owner, provider);
          const airdropContract = new ethers.Contract(
            data?.airdropContract.contractAddress,
            abi,
            signer,
          );

          const receipt = await airdropContract.executeAirdropRound(
            data?.governanceToken.contractAddress,
          );

          console.log('>>receipt', receipt);
          localStorage.setItem('excuteAfterInfo', JSON.stringify(receipt));
        } catch (err) {
          console.log(err);
        }
      },
    },
  );
};

export default useMintingToken;
