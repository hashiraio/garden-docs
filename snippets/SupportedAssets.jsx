export const supportedAssetsConfig = [
  {
    chain: { name: "Arbitrum", logo: "/icons/arbitrum.svg" },
    assets: [
      { symbol: "WBTC", logo: "/icons/wbtc.svg", contract: "https://arbiscan.io/address/0x6b6303fab8ec7232b4f2a7b9fa58e5216f608fcb#code" },
      { symbol: "USDC", logo: "/icons/usdc.svg", contract: "https://arbiscan.io/address/0xeae7721d779276eb0f5837e2fe260118724a2ba4#code" },
      { symbol: "iBTC", logo: "/icons/iBTC.png", contract: "https://arbiscan.io/address/0xdc74a45e86dedf1ff7c6dac77e0c2f082f9e4f72" }
    ]
  },
  {
    chain: { name: "Base", logo: "/icons/base.svg" },
    assets: [
      { symbol: "cbBTC", logo: "/icons/cbbtc.svg", contract: "https://basescan.io/address/0xeae7721d779276eb0f5837e2fe260118724a2ba4#code" },
      { symbol: "USDC", logo: "/icons/usdc.svg", contract: "https://basescan.io/address/0xd8a6e3fca403d79b6ad6216b60527f51cc967d39#code" }
    ]
  },
  {
    chain: { name: "Berachain", logo: "/icons/bera.svg" },
    assets: [
      { symbol: "LBTC", logo: "/icons/LBTC.svg", contract: "https://berascan.com/address/0x39f3294352208905fc6ebf033954E6c6455CdB4C#code" }
    ]
  },
  {
    chain: { name: "Botanix", logo: "/icons/BotanixIcon.jpg" },
    assets: [
      { symbol: "WBTC", logo: "/icons/BotanixBTC.png", contract: "https://uniscan.xyz/address/0xD8a6E3FCA403d79b6AD6216b60527F51cc967D39" }
    ]
  },
  {
    chain: { name: "Bitcoin", logo: "/icons/btc.svg" },
    assets: [
      { symbol: "BTC", logo: "/icons/btc.svg", contract: "/developers/contracts/atomic-swap-btc" }
    ]
  },
  {
    chain: { name: "Corn", logo: "/icons/corn.svg" },
    assets: [
      { symbol: "BTCN", logo: "/icons/bitcorn.svg", contract: "https://cornscan.io/address/0xeaE7721d779276eb0f5837e2fE260118724a2Ba4" }
    ]
  },
  {
    chain: { name: "Ethereum", logo: "/icons/ethereum.svg" },
    assets: [
      { symbol: "WBTC", logo: "/icons/wbtc.svg", contract: "https://etherscan.io/address/0x795dcb58d1cd4789169d5f938ea05e17eceb68ca#code" },
      { symbol: "USDC", logo: "/icons/usdc.svg", contract: "https://etherscan.io/address/0xd8a6e3fca403d79b6ad6216b60527f51cc967d39#code" },
      { symbol: "cbBTC", logo: "/icons/cbbtc.svg", contract: "https://etherscan.io/address/0xeae7721d779276eb0f5837e2fe260118724a2ba4#Code" },
      { symbol: "iBTC", logo: "/icons/iBTC.png", contract: "https://etherscan.io/address/0xDC74a45e86DEdf1fF7c6dac77e0c2F082f9E4F72#code" }
    ]
  },
  {
    chain: { name: "HyperEVM", logo: "/icons/hyperliquid.svg" },
    assets: [
      { symbol: "uBTC", logo: "/icons/btc.svg", contract: "https://hyperscan.gas.zip/address/0x39f3294352208905fc6ebf033954E6c6455CdB4C?tab=contract" }
    ]
  },
  {
    chain: { name: "Solana", logo: "/icons/solana.png" },
    assets: [
      { symbol: "SOL", logo: "/icons/solana.png", contract: "https://explorer.solana.com/address/2bag6xpshpvPe7SJ9nSDLHpxqhEAoHPGpEkjNSv7gxoF" }
    ]
  },
  {
    chain: { name: "Starknet", logo: "/icons/starknet.svg" },
    assets: [
      { symbol: "WBTC", logo: "/icons/wbtc.svg", contract: "https://starkscan.co/contract/0x07defd8eb3b770005ab1ca5f89ad31f98fb5bc3c52deaeafd130be3b49f967b4#overview" }
    ]
  },
  {
    chain: { name: "Unichain", logo: "/icons/unichain.svg" },
    assets: [
      { symbol: "WBTC", logo: "/icons/wbtc.svg", contract: "https://uniscan.xyz/address/0xD8a6E3FCA403d79b6AD6216b60527F51cc967D39" },
      { symbol: "USDC", logo: "/icons/usdc.svg", contract: "https://uniscan.xyz/address/0x795Dcb58d1cd4789169D5F938Ea05E17ecEB68cA" }
    ]
  }
];



export const SupportedAssets = ({supportedAssetsConfig}) =>{
  return (
    <table>
      <thead>
        <tr>
          <th>Chain</th>
          <th colSpan="4">Tokens</th>
        </tr>
      </thead>
      <tbody>
        {
          supportedAssetsConfig.map((supportedAssetConfig, i)=> (
            <SupportedAssetRow key={i} assets={supportedAssetConfig.assets} chain={supportedAssetConfig.chain}/>
          ))
        }
      </tbody>
    </table>
  )
}

export const SupportedAssetRow = ({ chain, assets }) => {
  return (
    <tr>
      <td className="flex items-center gap-2">
        <img src={chain.logo} width="20" alt={chain.name} />
        <strong>{chain.name}</strong>
      </td>
      <td colSpan={4}>
        <div className="flex gap-2">
          {assets.map((asset, i) => (
            <a key={i} href={asset.contract} className="border-none flex items-center gap-1">
              <img src={asset.logo} width={20} alt={asset.symbol} />
              <span>{asset.symbol}</span>
            </a>
          ))}
        </div>
      </td>
    </tr>
  );
}
