# Garden docs

Mintlify docs served at garden.finance/docs. Preview with `mint dev`; config lives in `docs.json`.

## Translations

The docs ship in English plus Spanish (`es/`), Russian (`ru/`) and Simplified Chinese (`zh/`). Each language folder mirrors the English file tree, and only some pages are translated. Follow `i18n/STYLE_GUIDE.md` for every translation.

When you edit an English `.mdx` page:

1. Check whether `es/<path>`, `ru/<path>` or `zh/<path>` exists for it.
2. Apply the same change to every translated copy in the same change set, following `i18n/STYLE_GUIDE.md`. Translate from the current English, not from another translation.
3. If you can't translate the change, tell the user which translated files are now stale instead of leaving them silently out of date.
4. After adding, moving, renaming or deleting any page (English or translated), run `node i18n/i18n-sync.mjs` and commit the regenerated `docs.json`.

Never hand-edit the generated parts of `docs.json`: the non-English entries in `navigation.languages` and the `redirects` array. Edit the English navigation or `i18n/<lang>.json`, then run the sync script.
