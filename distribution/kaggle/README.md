# Kaggle publication

Run the repository export first:

```bash
npm run export:platforms
```

Then copy `dataset-metadata.template.json` to `dataset-metadata.json` and replace `OWNER_SLUG` with the Kaggle account or organization slug. Keep `dataset-metadata.json`, `turkish-ev-charging-intents.csv`, and `dataset-cover-image.png` together in this directory.

With the official Kaggle CLI authenticated, validate and publish the folder as a public dataset:

```bash
kaggle datasets create -p distribution/kaggle --public --keep-tabular --dir-mode skip
kaggle datasets status OWNER_SLUG/turkish-ev-charging-intents
```

After publication, add the Kaggle URL to the canonical repository and TekPedal open-data page. Do not commit `dataset-metadata.json` if it contains account-specific details that are not intended to be public.
