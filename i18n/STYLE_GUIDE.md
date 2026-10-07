# Garden Docs Translation Style Guide

This guide covers translating the Garden docs (garden.finance/docs) from English into Spanish (es), Russian (ru) and Simplified Chinese (zh). It follows the swap app (garden-kiosk) guide for register and shared terms, so a reader moving between app.garden.finance and the docs sees the same words. Concepts the app never shows (intents, solvers, HTLCs) take the terms already used on garden.finance.

When in doubt, ask rather than guess. A consistent existing term beats a better new one.

## Files and URLs

Each language mirrors the English file tree under its own folder.

| English page | Spanish | Russian | Chinese |
| --- | --- | --- | --- |
| `home/about.mdx` | `es/home/about.mdx` | `ru/home/about.mdx` | `zh/home/about.mdx` |
| `garden.finance/docs/home/about` | `/docs/es/home/about` | `/docs/ru/home/about` | `/docs/zh/home/about` |

- **Same file names and folders as English.** Never rename or translate a file path.
- **Partial coverage is fine.** A page without a translation falls back to English through a generated redirect.
- **Don't hand-edit `navigation.languages` (except `en`) or `redirects` in `docs.json`.** `node i18n/i18n-sync.mjs` generates them. Translated nav labels, navbar and footer live in `i18n/<lang>.json`.

## Golden rules

1. **English is the source of truth.** Translate from the current English page, never from another translation.
2. **Keep translations in sync.** A PR that changes an English page that has translations updates every translated copy in the same PR. If you can't translate the change, delete the stale translations and run the sync script, so readers fall back to English instead of seeing outdated content.
3. **Translate meaning, not words.** The page should read as if written natively, with the same facts, numbers, steps and warnings. Don't add claims, links, emphasis or questions the English doesn't have.
4. **Fix obvious source typos silently.** Translate the intended meaning, and flag the English typo in the PR.
5. **One concept, one word.** Use the Glossary term every time. Search the existing translations before introducing a new term.

## What to translate in an MDX page

Translate the prose. Leave everything a machine reads untouched.

| Translate | Leave exactly as in English |
| --- | --- |
| Frontmatter `title`, `sidebarTitle`, `description` | Frontmatter keys and other values (`mode`, `icon`, `openapi`, …) |
| Headings, paragraphs, list items, table cells | Code blocks and inline `code`, including comments inside code |
| Component text props: `title`, `alt` | Component names and other props: `icon`, `cols`, `href`, `src`, `className`, `color` |
| Text inside `<Card>`, `<Note>`, `<Tip>`, `<Warning>`, `<Step>`, `<Accordion>` | JSX/HTML structure, `export` functions, math inside `$$ … $$` |
| Link text | Image paths, contract addresses, transaction hashes, numbers |

- **Keep the structure line for line.** Same headings, same components, same order. Reviewers compare the files side by side.
- **Math blocks:** translate the words inside `\text{…}` only if the surrounding prose names them the same way. When unsure, leave the formula in English.
- **Commented-out blocks** (`{/* … */}`) stay in English; they aren't rendered.
- **Images** keep their English path. Only use a localized screenshot (`/images/<lang>/…`) when one exists.

## Links

A link in a translated page points at the same language, so the reader stays in their language.

- **Absolute docs links take the locale prefix:** `/home/about` becomes `/es/home/about`, `/ru/home/about`, `/zh/home/about`. Do this even if the target isn't translated yet; its redirect sends the reader to English until it is.
- **Relative links stay as they are:** `./intents` already resolves inside the language folder.
- **Heading anchors change with the heading.** `#how-does-it-work` must become the anchor of the translated heading. Mintlify lowercases the heading, turns spaces into hyphens and drops ASCII punctuation such as `?` and `:`, but keeps everything else, including `¿`, `«»`, `—` and full-width `？`: "¿Cómo funciona?" becomes `#¿cómo-funciona`, "如何运作？" becomes `#如何运作？`. Check every anchor link in `mint dev` by clicking it.
- **garden.finance links take the prefix:** `https://garden.finance/blog/x` becomes `https://garden.finance/es/blog/x`. Same for `/zh` and `/ru`.
- **App links take the prefix:** `https://app.garden.finance/stake` becomes `https://app.garden.finance/es/stake`.
- **Leave other URLs unchanged:** explorers, GitHub, Discord, Snapshot, Dune, Google Forms, Etherscan, OpenSea, `explorer.garden.finance`.

## Terms that stay in English

Brand, product, chain and token names are never translated, in any language, Chinese included.

| Category | Examples |
| --- | --- |
| Brand and products | Garden, Gardener Pass, Garden Explorer |
| Product names in navigation | Swap, Stake, Explorer, Faucet |
| Chains and ecosystems | Bitcoin, Ethereum, Arbitrum, Base, Solana, Starknet, Sui, Tron, Litecoin, Lightning, EVM |
| Tokens and tickers | BTC, WBTC, cbBTC, ETH, USDC, SEED |
| Third-party names | Phantom, MetaMask, Snapshot, Uniswap, CoW Protocol, Across, Thorchain, TRM Labs |
| Acronyms | API, SDK, MEV, APY, NFT, DEX, DAO, TGE, KYC, XCoW |

**Swap: name vs action.** "Swap" stays English when it names the product (navbar, footer, "Garden Swap"). When it's the action or the thing a user does, translate it: es `intercambio` / `intercambiar`, ru `обмен` / `обменять` (never своп), zh `兑换`.

**UI labels.** When a step names a button or screen in app.garden.finance, use the exact string the app shows in that language (from `garden-kiosk/src/lib/i18n/messages/<lang>.json`), not a fresh translation. Russian puts button names in «»: Нажмите «Обменять».

## Glossary

Use these exact terms. Anything else is drift to fix.

| English | Spanish (es) | Russian (ru) | Chinese (zh) |
| --- | --- | --- | --- |
| swap (action / noun) | intercambiar / intercambio | обменять / обмен | 兑换 |
| atomic swap | intercambio atómico | атомарный обмен | 原子交换 |
| intent | intención | намерение | 意图 |
| solver | solver | солвер | solver |
| staker | staker | стейкер | 质押者 |
| stake / staking | hacer staking / staking | стейкинг, застейкать | 质押 |
| order | orden | ордер | 订单 |
| order book | libro de órdenes | книга ордеров | 订单簿 |
| auction | subasta | аукцион | 拍卖 |
| quote | cotización | котировка | 报价 |
| settlement / settle | liquidación / liquidar | расчёт / провести расчёт | 结算 |
| relayer | relayer | релейер | 中继器 |
| chain | cadena | блокчейн | 链 |
| network (mainnet / testnet) | red | сеть | 网络 |
| cross-chain | entre cadenas | кросс-чейн | 跨链 |
| on-chain / off-chain | on-chain / off-chain | ончейн / офчейн | 链上 / 链下 |
| wallet | wallet | кошелёк | 钱包 |
| token | token | токен | 代币 |
| address | dirección | адрес | 地址 |
| deposit (UI, noun) | depósito | депозит | 充值 |
| deposit into a contract (prose verb) | depositar | внести | 存入 |
| refund | reembolso | возврат | 退款 |
| redeem | canjear / canje | получить / получение | 赎回 |
| fee | comisión | комиссия | 手续费 |
| liquidity | liquidez | ликвидность | 流动性 |
| market maker | creador de mercado | маркет-мейкер | 做市商 |
| HTLC | Hash Time Locked Contract (HTLC) | Hash Time Locked Contract (HTLC) | 哈希时间锁定合约（HTLC） |
| timelock | timelock | таймлок | 时间锁 |
| secret / prehash | secreto / prehash | секрет / прехеш | 秘密值 / 原像 |
| slash / slashing | recortar / recorte | слэшинг | 罚没 |
| multiplier | multiplicador | множитель | 加成系数 |
| vote / votes | votar / votos | голосовать / голоса | 投票 / 票数 |
| governance | gobernanza | управление | 治理 |
| proposal | propuesta | предложение | 提案 |
| treasury | tesorería | казна | 国库 |
| mint / burn | acuñar / quemar | выпустить / сжечь | 铸造 / 销毁 |
| trustless | sin necesidad de confianza | не требующий доверия | 无需信任 |
| self-custodial | autocustodia | с самостоятельным хранением | 自托管 |
| custodian | custodio | кастодиан | 托管方 |
| bridge (noun) | puente | мост | 跨链桥 |
| free option | opción gratuita | бесплатный опцион | 免费期权 |
| coincidence of wants | coincidencia de necesidades | совпадение потребностей | 需求巧合 |
| address screening | verificación de direcciones | проверка адресов | 地址筛查 |

- **Chain vs network.** Chain is the blockchain an asset lives on. Network is mainnet versus testnet.
- **Deposit in Chinese.** `充值` is the app's word for topping up a deposit address. In protocol prose about locking funds in an HTLC, use `存入`. Never `存款` (bank savings).
- **Spanish "wallet".** The app keeps "wallet" in Spanish; the docs do the same (`tu wallet`), not "billetera".

## Voice and register

Each language addresses the reader one way, everywhere in the docs.

|  | Spanish (es) | Russian (ru) | Chinese (zh) |
| --- | --- | --- | --- |
| Address the reader as | tú | вы (lowercase "ваш" mid-sentence) | 你 (not 您) |
| Instructions | tú imperative: "Conecta", "Selecciona" | вы imperative: "Подключите", "Выберите" | 请 + verb, or plain verb in steps: "连接钱包" |
| Headings | sentence case, noun phrase or question | sentence case | short phrase, no trailing punctuation |
| "Please" | only where English has it | "Пожалуйста" only where English has it | 请 freely; it's neutral politeness |

- **Tone is plain and calm.** No hype the English doesn't have, and no exclamation marks unless the English uses one.
- **Avoid regionalisms in Spanish.** Prefer neutral forms: "¿Cuánto tarda…?", not "¿Qué tan rápido…?".
- **Prefer native Russian terms over transliterated slang** (обмен not своп, блокчейн not чейн), except fixed crypto terms from the Glossary (солвер, стейкинг, слэшинг).

## Formatting

Typography follows each language's native rules.

| Case | en | es | ru | zh |
| --- | --- | --- | --- | --- |
| Thousands | 210,000 SEED | 210 000 SEED | 210 000 SEED | 210,000 枚 SEED |
| 4-digit number | 2,100 | 2 100 | 2 100 | 2,100 |
| Decimal | 0.5 | 0,5 | 0,5 | 0.5 |
| Percent | 0.5% | 0,5% | 0,5% | 0.5% |
| Date | January 18, 2024 | 18 de enero de 2024 | 18 января 2024 года | 2024 年 1 月 18 日 |
| Duration | 48 hours | 48 horas | 48 часов | 48 小时 |

- **Numbers inside code, addresses, hashes and formulas never change.**
- **Spanish:** opening `¿` and `¡` on every question and exclamation, including headings. Accents always.
- **Russian:** guillemets «» for quoted names, a spaced em dash " — ", hyphenated compounds for Latin-prefixed nouns ("EVM-кошелёк", "QR-код"). Write ё where it belongs (кошелёк, расчёт).
- **Chinese:** full-width punctuation `，。：；？！（）` in Chinese text. One space between Chinese and any Latin word or number ("你的 Bitcoin", "48 小时", "SEED 代币"), but no space next to full-width punctuation. Use `枚` as the measure word for token amounts.
- **Casing:** sentence case for headings and card titles in every language. Never English-style Title Case in translations.
- **Bold and italics** stay on the same words they cover in English.

## Adding or updating a translation

1. Copy the English file to the same path under `es/`, `ru/` or `zh/`, then translate it following this guide.
2. Run `node i18n/i18n-sync.mjs`. It adds the page to that language's navigation and removes its English-fallback redirect.
3. Preview with `mint dev`, open `/es/<page>` and click every link and anchor.
4. Open a PR and request review from a native speaker of each language you changed.

## Review checklist

Run through this for every translation change.

- [ ] Every translated copy of a changed English page was updated, or deleted and re-synced
- [ ] Structure matches English: same headings, components, list items and code blocks
- [ ] Code, props other than `title`/`alt`, paths, addresses and numbers are unchanged
- [ ] Absolute docs links, garden.finance links and app links carry the locale prefix
- [ ] Anchor links point at the translated heading
- [ ] Brand, product, chain and token names are in English
- [ ] Every recurring concept uses its Glossary term
- [ ] Register matches the language column (tú, вы, 你)
- [ ] es has `¿…?`; zh has full-width punctuation and spaces around Latin text; ru has ё
- [ ] Numbers and dates follow the Formatting table
- [ ] `node i18n/i18n-sync.mjs` was run and `docs.json` is committed
