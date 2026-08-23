# Getting started

The release provides UTF-8 JSON Lines files for the fixed training, validation, and test splits. You can use the raw GitHub URLs directly in a reproducible experiment.

## Load the splits with Python

```python
import pandas as pd

base = (
    "https://raw.githubusercontent.com/gokimedia/"
    "turkish-ev-charging-intents/main/data"
)

train = pd.read_json(f"{base}/train.jsonl", lines=True)
validation = pd.read_json(f"{base}/validation.jsonl", lines=True)
test = pd.read_json(f"{base}/test.jsonl", lines=True)

print(train[["text", "intent"]].head())
print(train["intent"].value_counts())
```

## Clone and validate the repository

```bash
git clone https://github.com/gokimedia/turkish-ev-charging-intents.git
cd turkish-ev-charging-intents
npm test
```

The validation suite checks the expected record count, class balance, split sizes, unique IDs, allowed field values, and common direct-identifier patterns.

## Recommended evaluation

Keep the supplied test split unchanged so results remain comparable. Use the validation split for model selection and threshold decisions, then run the final test evaluation once.

Report at least:

* macro F1;
* per-class precision, recall, and F1;
* the confusion matrix;
* rejection or clarification behavior;
* any tuning performed after inspecting evaluation examples.

Classification quality does not measure answer freshness. Price, tax, route, station, battery, and vehicle answers still require current authoritative sources after a request is routed.
