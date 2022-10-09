import { infoStoreContractAddress } from '@src/constants';
import { abi } from '@src/lib/airdropAbi';
import { bytecode } from '@src/lib/airdropBytecode';
import { ethers, utils } from 'ethers';

import { getTimestampArray } from './getTimstampArray';

export const airdropContractDeploy = async ({
  treasuryAddress,
  startDate,
  rounds,
  interval,
  duration,
  isDelegate,
  delegationList,
  whiteList,
}: any) => {
  const airdropTimestamp = getTimestampArray(startDate, interval, rounds);

  const targetAddressesList = whiteList?.map((o) => ethers.utils.getAddress(o.address));
  let totalValue = 0;

  const targetAmountList = whiteList?.map((o) => {
    totalValue += Number(o.amounts);

    return utils.parseEther(o.amounts.toString());
  });

  const totalValuePerRound = utils.parseEther(totalValue.toString());

  const signer = new ethers.providers.Web3Provider((window as any).ethereum).getSigner();

  console.log('SIGNER >>>>>>>>>>>>>>>>>>>>>>>>>>>>', signer);
  const airdropFactory = new ethers.ContractFactory(abi, bytecode, signer);

  console.log('>>>>>>>>>>>>>>>>>>> AIRDROP FACTORY >>>>>>>>>>>>>>>>>', airdropFactory);

  console.log(
    treasuryAddress,
    airdropTimestamp,
    duration,
    rounds,
    targetAddressesList,
    targetAmountList,
    totalValuePerRound,
    infoStoreContractAddress,
  );

  await airdropFactory.deploy(
    treasuryAddress,
    airdropTimestamp,
    duration,
    rounds,
    targetAddressesList,
    targetAmountList,
    totalValuePerRound,
    infoStoreContractAddress,
  );
};
