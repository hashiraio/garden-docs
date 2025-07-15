import React, { useEffect, useState } from "react";

export const MAINNET_ASSETS_URL = "https://api.garden.finance/v2/chains";
export const TESTNET_ASSETS_URL = "https://testnet.api.garden.finance/v2/chains";

export const CHAIN_EXPLORERS = {
  botanix: "https://botanixscan.io/",
  hyperliquid: "https://purrsec.com/",
  corn: "https://cornscan.io/",
  ethereum: "https://etherscan.io/",
  bera: "https://berascan.com/",
  starknet: "https://starkscan.co/",
  solana: "https://explorer.solana.com/",
  base: "https://basescan.org/",
  unichain: "https://uniscan.xyz/",
  arbitrum: "https://arbiscan.io/",
  bitcoin: "https://mempool.space/",
  starknet_sepolia: "https://sepolia.starkscan.co/",
  ethereum_sepolia: "https://sepolia.etherscan.io/",
  solana_testnet: "https://explorer.solana.com/",
  citrea_testnet: "https://explorer.testnet.citrea.xyz/",
  base_sepolia: "https://sepolia.basescan.org/",
  monad_testnet: "https://explorer.monad-devnet.devnet101.com",
  arbitrum_sepolia: "https://sepolia.arbiscan.io/",
  bitcoin_testnet: "https://mempool.space/testnet4/"
};



export const trimAssetName = (id)=>{
  return id.split(":")[1].toUpperCase();
}

export const titilize = (chain)=>{
  const chainSplit = chain.split("_");
  const firstWord = chainSplit[0].charAt(0).toUpperCase() + chainSplit[0].slice(1);
  const secondWord = chainSplit.length > 1 ? chainSplit[1].charAt(0).toUpperCase() + chainSplit[1].slice(1) : "";
  return firstWord + " " + secondWord;
}

export const getExplorerUrl = (chain, address) => {
  if(chain.includes("bitcoin")){
    return "/developers/contracts/atomic-swap-btc";
  } else if (chain.includes("starknet")){
    return CHAIN_EXPLORERS[chain] + "contract/" + address + "#overview";
  } else if(chain.includes("solana")){
    return CHAIN_EXPLORERS[chain] + "address/" + "2bag6xpshpvPe7SJ9nSDLHpxqhEAoHPGpEkjNSv7gxoF" + (chain.includes("testnet") ? "?cluster=devnet" : "");
  } else {
    return CHAIN_EXPLORERS[chain] + "address/" + address + "#code";
  }
}

export const AssetRow = ({ chain, assets }) => {
  return (
    <tr>
      <td className="flex items-center gap-2 w-full whitespace-nowrap border-r-[1px] border-[#e5e1e2] dark:border-[#454143]/50" colSpan={4}>
        <Frame className="pointer-events-none w-[20px]">
          <img width="20" src={chain.icon} alt={chain.chain} />
        </Frame>
        <strong>{titilize(chain.chain)}</strong>
      </td>
      <td colSpan={4}>
        <div className="flex gap-4 flex-wrap mx-2">
          {assets.map((asset, i) => (
            <a
              key={i}
              href={getExplorerUrl(chain.chain,asset.htlc)}
              className="border-none flex items-center gap-2"
            >
              <Frame className="pointer-events-none w-[20px]">
                <img width="20" src={asset.icon} alt={asset.id}/>
              </Frame>
              <span>{trimAssetName(asset.id)}</span>
            </a>
          ))}
        </div>
      </td>
    </tr>
  );
};

export const getAssets = async (url = MAINNET_ASSETS_URL)=>{
  try {
    const response = await fetch(url);
    const data = await response.json();
    if(data.status.includes("OK")){
      return [];
    }
    const sortedResult = data.result.sort((a, b) => {
      return a.chain.localeCompare(b.chain);
    });
    return sortedResult;
  } catch (error) {
    console.log("Error fetching assets",error);
    return [];
  }
}

export const SupportedAssets = ({url}) => {
  const [supportedAssetsConfig, setSupportedAssetsConfig] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const assetsConfig = await getAssets(url);
        setSupportedAssetsConfig(assetsConfig);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th>Chain</th>
          <th colSpan="4">Asset HTLCs</th>
        </tr>
      </thead>
      <tbody>
        {supportedAssetsConfig.map((chainConfig, i) => (
          <AssetRow
            key={i}
            chain={{ chain: chainConfig.chain, icon: chainConfig.icon }}
            assets={chainConfig.assets}
          />
        ))}
      </tbody>
    </table>
  );
};
