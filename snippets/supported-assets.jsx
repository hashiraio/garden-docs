export const mainnetSupportedAssetsConfig = [
  {
    chain: { name: "Arbitrum", logo: "/images/chains/arbitrum.svg" },
    assets: [
      {
        symbol: "WBTC",
        logo: "/images/assets/wbtc.svg",
        contract:
          "https://arbiscan.io/address/0x6b6303fab8ec7232b4f2a7b9fa58e5216f608fcb#code",
      },
      {
        symbol: "USDC",
        logo: "/images/assets/usdc.svg",
        contract:
          "https://arbiscan.io/address/0xeae7721d779276eb0f5837e2fe260118724a2ba4#code",
      },
      {
        symbol: "iBTC",
        logo: "/images/assets/iBTC.png",
        contract:
          "https://arbiscan.io/address/0xdc74a45e86dedf1ff7c6dac77e0c2f082f9e4f72",
      },
    ],
  },
  {
    chain: { name: "Base", logo: "/images/chains/base.svg" },
    assets: [
      {
        symbol: "cbBTC",
        logo: "/images/assets/cbbtc.svg",
        contract:
          "https://basescan.io/address/0xeae7721d779276eb0f5837e2fe260118724a2ba4#code",
      },
      {
        symbol: "USDC",
        logo: "/images/assets/usdc.svg",
        contract:
          "https://basescan.io/address/0xd8a6e3fca403d79b6ad6216b60527f51cc967d39#code",
      },
    ],
  },
  {
    chain: { name: "Berachain", logo: "/images/chains/bera.svg" },
    assets: [
      {
        symbol: "LBTC",
        logo: "/images/assets/LBTC.svg",
        contract:
          "https://berascan.com/address/0x39f3294352208905fc6ebf033954E6c6455CdB4C#code",
      },
    ],
  },
  {
    chain: { name: "Botanix", logo: "/images/chains/BotanixIcon.jpg" },
    assets: [
      {
        symbol: "WBTC",
        logo: "/images/assets/BotanixBTC.png",
        contract:
          "https://uniscan.xyz/address/0xD8a6E3FCA403d79b6AD6216b60527F51cc967D39",
      },
    ],
  },
  {
    chain: { name: "Bitcoin", logo: "/images/chains/btc.svg" },
    assets: [
      {
        symbol: "BTC",
        logo: "/images/chains/btc.svg",
        contract: "/developers/contracts/atomic-swap-btc",
      },
    ],
  },
  {
    chain: { name: "Corn", logo: "/images/chains/corn.svg" },
    assets: [
      {
        symbol: "BTCN",
        logo: "/images/assets/bitcorn.svg",
        contract:
          "https://cornscan.io/address/0xeaE7721d779276eb0f5837e2fE260118724a2Ba4",
      },
    ],
  },
  {
    chain: { name: "Ethereum", logo: "/images/chains/ethereum.svg" },
    assets: [
      {
        symbol: "WBTC",
        logo: "/images/assets/wbtc.svg",
        contract:
          "https://etherscan.io/address/0x795dcb58d1cd4789169d5f938ea05e17eceb68ca#code",
      },
      {
        symbol: "USDC",
        logo: "/images/assets/usdc.svg",
        contract:
          "https://etherscan.io/address/0xd8a6e3fca403d79b6ad6216b60527f51cc967d39#code",
      },
      {
        symbol: "cbBTC",
        logo: "/images/assets/cbbtc.svg",
        contract:
          "https://etherscan.io/address/0xeae7721d779276eb0f5837e2fe260118724a2ba4#Code",
      },
      {
        symbol: "iBTC",
        logo: "/images/assets/iBTC.png",
        contract:
          "https://etherscan.io/address/0xDC74a45e86DEdf1fF7c6dac77e0c2F082f9E4F72#code",
      },
    ],
  },
  {
    chain: { name: "HyperEVM", logo: "/images/chains/hyperliquid.svg" },
    assets: [
      {
        symbol: "uBTC",
        logo: "/images/chains/btc.svg",
        contract:
          "https://hyperscan.gas.zip/address/0x39f3294352208905fc6ebf033954E6c6455CdB4C?tab=contract",
      },
    ],
  },
  {
    chain: { name: "Solana", logo: "/images/chains/solana.png" },
    assets: [
      {
        symbol: "SOL",
        logo: "/images/chains/solana.png",
        contract:
          "https://explorer.solana.com/address/2bag6xpshpvPe7SJ9nSDLHpxqhEAoHPGpEkjNSv7gxoF",
      },
    ],
  },
  {
    chain: { name: "Starknet", logo: "/images/chains/starknet.svg" },
    assets: [
      {
        symbol: "WBTC",
        logo: "/images/assets/wbtc.svg",
        contract:
          "https://starkscan.co/contract/0x07defd8eb3b770005ab1ca5f89ad31f98fb5bc3c52deaeafd130be3b49f967b4#overview",
      },
    ],
  },
  {
    chain: { name: "Unichain", logo: "/images/chains/unichain.svg" },
    assets: [
      {
        symbol: "WBTC",
        logo: "/images/assets/wbtc.svg",
        contract:
          "https://uniscan.xyz/address/0xD8a6E3FCA403d79b6AD6216b60527F51cc967D39",
      },
      {
        symbol: "USDC",
        logo: "/images/assets/usdc.svg",
        contract:
          "https://uniscan.xyz/address/0x795Dcb58d1cd4789169D5F938Ea05E17ecEB68cA",
      },
    ],
  },
];

export const testnetSupportedAssetsConfig = [
  {
    chain: { name: "Arbitrum Sepolia", logo: "/images/chains/arbitrum.svg" },
    assets: [
      {
        symbol: "WBTC",
        logo: "/images/assets/wbtc.svg",
        contract:
          "https://sepolia.arbiscan.io/address/0x1cd0bBd55fD66B4C5F7dfE434eFD009C09e628d1",
      },
      {
        symbol: "SEED",
        logo: "/images/assets/seed.svg",
        contract:
          "https://sepolia.arbiscan.io/address/0xD5FeDb4ceCB0F1D32788a190d9EB47D94D23eE4e",
      },
      {
        symbol: "iBTC",
        logo: "/images/assets/iBTC.png",
        contract:
          "https://sepolia.arbiscan.io/address/0xDfe6D9363EE96152D39391009a6723819D9E25EB",
      },
    ],
  },
  {
    chain: { name: "Base Sepolia", logo: "/images/chains/base.svg" },
    assets: [
      {
        symbol: "WBTC",
        logo: "/images/assets/wbtc.svg",
        contract:
          "https://sepolia.basescan.org/address/0x00ab86f54F436CfE15253845F139955ae0C00bAf",
      },
      {
        symbol: "USDT",
        logo: "/images/assets/usdt.svg",
        contract:
          "https://sepolia.basescan.org/address/0xB391CA6D0A76CD2A927bC314856E8a374a225CFc",
      },
      {
        symbol: "iBTC",
        logo: "/images/assets/iBTC.png",
        contract:
          "https://sepolia.basescan.org/address/0xBCdAD29aC77E5bb27FD528Ab0045AF630259FE4f",
      },
    ],
  },
  {
    chain: { name: "Bitcoin Testnet", logo: "/images/chains/btc.svg" },
    assets: [
      {
        symbol: "BTC",
        logo: "/images/chains/btc.svg",
        contract: "/developers/contracts/atomic-swap-btc",
      },
    ],
  },
  {
    chain: { name: "Citrea Testnet", logo: "/images/chains/citrea.svg" },
    assets: [
      {
        symbol: "WCBTC",
        logo: "/images/assets/wbtc.svg",
        contract:
          "https://explorer.testnet.citrea.xyz/address/0xaD9d14CA82d9BF97fFf745fFC7d48172A1c0969E?tab=contract",
      },
      {
        symbol: "cBTC",
        logo: "/images/chains/btc.svg",
        contract:
          "https://explorer.testnet.citrea.xyz/address/0x6218FA00f47a61aCD8B46D6f1b15c4D730F803F2?tab=contract",
      },
    ],
  },
  {
    chain: { name: "Monad Testnet", logo: "/images/chains/monad.svg" },
    assets: [
      {
        symbol: "cbBTC",
        logo: "/images/assets/cbbtc.svg",
        contract:
          "https://testnet.monadexplorer.com/address/0x1dC94FdcAd8Aee13cfd34Db8a26d26E31572805c?tab=Contract",
      },
      {
        symbol: "USDC",
        logo: "/images/assets/usdc.svg",
        contract:
          "https://testnet.monadexplorer.com/address/0xE99D8A21d4F2ad2f90c279c869311503f9e25867?tab=Contract",
      },
    ],
  },
  {
    chain: { name: "Sepolia", logo: "/images/chains/ethereum.svg" },
    assets: [
      {
        symbol: "WBTC",
        logo: "/images/assets/wbtc.svg",
        contract:
          "https://sepolia.etherscan.io/address/0x3C6a17b8cD92976D1D91E491c93c98cd81998265",
      },
    ],
  },
  {
    chain: { name: "Solana Testnet", logo: "/images/chains/solana.png" },
    assets: [
      {
        symbol: "SOL",
        logo: "/images/chains/solana.png",
        contract:
          "https://explorer.solana.com/address/2bag6xpshpvPe7SJ9nSDLHpxqhEAoHPGpEkjNSv7gxoF?cluster=devnet",
      },
    ],
  },
  {
    chain: { name: "Starknet Sepolia", logo: "/images/chains/starknet.svg" },
    assets: [
      {
        symbol: "WBTC",
        logo: "/images/assets/wbtc.svg",
        contract:
          "https://sepolia.starkscan.co/contract/0x06579d255314109429a4477d89629bc2b94f529ae01979c2f8014f9246482603",
      },
    ],
  },
];

export const SupportedAssets = ({ supportedAssetsConfig }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Chain</th>
          <th colSpan="4">Token HTLCs</th>
        </tr>
      </thead>
      <tbody>
        {supportedAssetsConfig.map((supportedAssetConfig, i) => (
          <AssetRow
            key={i}
            assets={supportedAssetConfig.assets}
            chain={supportedAssetConfig.chain}
          />
        ))}
      </tbody>
    </table>
  );
};

export const AssetRow = ({ chain, assets }) => {
  return (
    <tr>
      <td className="flex items-center gap-2">
        <img src={chain.logo} width="20" alt={chain.name} />
        <strong>{chain.name}</strong>
      </td>
      <td colSpan={4}>
        <div className="flex gap-4">
          {assets.map((asset, i) => (
            <a
              key={i}
              href={asset.contract}
              className="border-none flex items-center gap-1"
            >
              <img src={asset.logo} width={20} alt={asset.symbol} />
              <span>{asset.symbol}</span>
            </a>
          ))}
        </div>
      </td>
    </tr>
  );
};
