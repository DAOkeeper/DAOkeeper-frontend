import { useRouter } from 'next/router';

interface CardSpaceProps {
  index: number;
  tokenSymbol: string;
  intro: string;
  tokenName: string;
  image: string;
  governanceToken: string;
  isAirdropContractOpened: string;
  airdropTokenAddress: string;
  [key: string]: any;
}

function CardSpace(props: CardSpaceProps) {
  const {
    key,
    index,
    homepage,
    image,
    intro,
    ownerAddress,
    spaceName,
    tokenName,
    tokenSupply,
    tokenSymbol,
    governanceToken,
    isAirdropContractOpened,
    airdropTokenAddress,
    ...propsRest
  } = props;

  const router = useRouter();

  const handleClick = () => {
    const tempData = {
      governanceToken: {
        hash: '0xcd82a1396d3fd4c4acf88b84a945d605c50417f78da27b87be4c985bde0a5bea',
        contractAddress: '0xf51a13303F50F7e80cf0C0C9a416ed9e21f5c1eF',
      },
      airdropContract: {
        hash: '0xb1f72c5ebf8d3d57f94a98ba42e5de5e883bd4905b906d665286e9e0800cb50d',
        contractAddress: '0x986d5C2531e80A56315Ea15CD386a55E3178ed91',
      },
    };

    // localStorage.setItem('clickedCardInfo', JSON.stringify(tempData));

    const realData = {
      governanceToken: {
        hash: '0x0', // no info
        contractAddress: governanceToken,
      },
      airdropContract: {
        hash: '0x0', // no info
        contractAddress: airdropTokenAddress,
      },
    };

    localStorage.setItem('clickedCardInfo', JSON.stringify(realData));
    router.push({
      pathname: `/detail/${tokenName}#airdrop`,
      query: {
        homepage,
        image,
        intro,
        ownerAddress,
        spaceName,
        tokenName,
        tokenSupply,
        tokenSymbol,
        governanceToken,
        isAirdropContractOpened,
        airdropTokenAddress,
      },
    });
  };

  return (
    <div key={index} className="card shadow-xl bg-[#]" {...propsRest}>
      <div className="card-body items-center text-center pb-7 border-1.5 text-black border-black border-solid rounded-[inherit] bg-[#f9f7f7]">
        <img
          src={image}
          className="w-24 min-w-24 min-h-24 h-24 rounded-full object-cover"
          alt="dao"
        />
        <h2 className="card-title">{spaceName}</h2>
        <p>{intro}</p>
        <div className="card-actions justify-center mt-2">
          <button
            className="!bg-black btn btn-warning  text-white border-0 hover:!bg-[#4a56ff]"
            onClick={handleClick}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardSpace;
