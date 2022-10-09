import { abi } from '@src/lib/infoStoreAbi';
import { ethers } from 'ethers';
import { JSONRPC_PROVIDER } from '@src/constants';
// export const STORE_ADDRESS = '0x838D974c4fB94537bFA9e700B1a09b8324743471'; // Goerli
export const STORE_ADDRESS = '0x24516E7EA22C009288eC666bCaa2593385D096D5';

export interface tokenInfo {
  image: string;
  DAOName: string;
  intro: string;
  symbol: string;
  tokenContractAddress: string;
  link: string;
  owner: string;
  totalSupply: string;
  name: string;
}

export const getAllGovernanceTokenInfo = async () => {
  const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);

  console.log('>>>>>>>> PROVIDER >>>>>>>>>', provider);
  const ContractInfoStore = new ethers.Contract(STORE_ADDRESS, daoAbi, provider);

  return await ContractInfoStore.getAllGovernanceTokenInfo();
};

export const beautifyAllGovernanceTokenInfoForIndex = async () => {
  const getAllGovernanceTokenInfoResult = await getAllGovernanceTokenInfo();

  console.log('>all result', getAllGovernanceTokenInfoResult);
  const response = [
    getAllGovernanceTokenInfoResult.map(
      (item: {
        airdropTokenAddress: string;
        isAirdropContractOpened: boolean;
        tokenInfo: tokenInfo;
      }) => {
        return {
          image:
            item.tokenInfo.image === 'some_image_url'
              ? 'https://www.nme.com/wp-content/uploads/2021/08/nme-sigrid-cover-2021-696x442.jpeg'
              : item.tokenInfo.image,
          spaceName: item.tokenInfo.DAOName,
          intro: item.tokenInfo.intro,
          tokenName: item.tokenInfo.name,
          governanceToken: item.tokenInfo.tokenContractAddress,
          isAirdropContractOpened: item.isAirdropContractOpened,
          airdropTokenAddress: item.airdropTokenAddress,
          homepage: item.tokenInfo.link,
          ownerAddress: item.tokenInfo.owner,
          tokenSupply:
            Number(item.tokenInfo.totalSupply._hex.toString()).toLocaleString('fullwide', {
              useGrouping: false,
            }) /
            10 ** 18,
          tokenSymbol: item.tokenInfo.symbol,
        };
      },
    ),
  ][0];

  console.log('>>>>>>>>>>> RESPONSE', response);

  return response;
};
