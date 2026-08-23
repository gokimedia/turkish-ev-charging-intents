---
title: Building an Open Turkish EV Charging Intent Dataset
published: true
description: A practical, reproducible dataset for testing Turkish intent routers in electric-vehicle and charging applications.
tags: machinelearning, nlp, datascience, opensource
---

Electric-vehicle assistants rarely have just one job. A short Turkish question may ask for a nearby station, a charging-price comparison, help planning a route, or an explanation of battery health. Before an application can retrieve current data or generate an answer, it needs to identify that intent reliably.

We created the **Turkish EV Charging Intent Dataset** as a small, transparent starting point for that routing problem. Version 1.0.0 contains 192 Turkish queries distributed evenly across eight intent classes. It is open under CC BY 4.0, includes fixed train, validation, and test splits, and is maintained by [TekPedal](https://tekpedal.com/), an EV charging map and vehicle decision platform for Türkiye.

You can [explore the dataset interactively](https://tekpedal.com/acik-veri), inspect the [source and validation workflow on GitHub](https://github.com/gokimedia/turkish-ev-charging-intents), or cite the permanent [Zenodo release with DOI 10.5281/zenodo.22062688](https://doi.org/10.5281/zenodo.22062688).

## Why intent routing comes first

An assistant should not answer every EV question in the same way. Different requests need different tools and freshness guarantees:

- a station request needs a map or location index;
- a price request needs current tariff data;
- route planning needs distance, range, and charging-stop logic;
- a battery question needs careful educational content;
- a vehicle comparison needs structured specifications.

An intent router makes that separation explicit. It can send each query to the correct retrieval source, product page, or application workflow. This also makes evaluation easier: teams can test routing independently before measuring the quality of downstream answers.

## Dataset design

The taxonomy contains eight balanced classes, with 24 records in each class:

1. `FIND_STATION`
2. `COMPARE_PRICE`
3. `ROUTE_PLANNING`
4. `CHARGING_SPEED`
5. `VEHICLE_COMPARISON`
6. `HOME_CHARGING`
7. `BATTERY_HEALTH`
8. `OWNERSHIP_COST`

Every record includes a stable ID, the Turkish query, the intent identifier, a human-readable Turkish label, a suggested TekPedal content route, the assigned split, the language, and a provenance marker.

Here is a simplified example:

```json
{
  "id": "tp-01-001",
  "text": "İstanbul içinde yakınımdaki elektrikli araç şarj istasyonu nerede?",
  "intent": "FIND_STATION",
  "intent_label_tr": "İstasyon bulma",
  "target_path": "/harita",
  "split": "train",
  "language": "tr",
  "provenance": "synthetic-editorial"
}
```

The split is deterministic inside every class: 16 training, four validation, and four test examples. Across the full dataset, that produces 128 training records, 32 validation records, and 32 test records.

## Reproducibility instead of hidden data

All version 1 examples were generated editorially from documented subject lists and templates. They were not copied from search logs, customer conversations, support tickets, or third-party datasets. Each row is marked `synthetic-editorial` so the provenance remains visible during downstream use.

That decision improves privacy and makes redistribution straightforward, but it also creates an important limitation: this dataset does **not** measure real search demand or the natural frequency of user intents. It is a controlled regression suite, not evidence about customer behavior.

The repository includes automated checks for:

- the expected total row count;
- balanced class counts;
- fixed split sizes;
- stable and unique record IDs;
- required fields and allowed values;
- common direct-identifier patterns.

This lets contributors review changes through the same validation process used for the published release.

## Quick start with Python

The JSON Lines files can be loaded directly from GitHub:

```python
import pandas as pd

train = pd.read_json(
    "https://raw.githubusercontent.com/gokimedia/"
    "turkish-ev-charging-intents/main/data/train.jsonl",
    lines=True,
)

print(train[["text", "intent"]].head())
print(train["intent"].value_counts())
```

For evaluation, we recommend keeping the supplied test split unchanged and reporting macro F1 together with per-class precision, recall, F1, and a confusion matrix. Any tuning performed after looking at test examples should be disclosed.

## What the dataset is useful for

The release is intentionally compact. It works well for:

- prototyping a Turkish text classifier;
- evaluating embedding-based or zero-shot routers;
- building a deterministic regression suite for an EV assistant;
- demonstrating data-loading and classification workflows;
- testing which tool or content route should receive a question.

It should not be treated as proof that a model is production-ready. The corpus has limited spelling-error, dialect, code-switching, multi-intent, and out-of-scope coverage. A real deployment also needs monitoring, rejection behavior, broader evaluation data, and current authoritative sources for prices, routes, taxes, charging stations, and vehicle specifications.

## Open distribution and citation

The dataset is available from several open-data services, but the project keeps two stable starting points:

- [TekPedal Open Data](https://tekpedal.com/acik-veri) for the human-readable overview and explorer;
- [Zenodo DOI 10.5281/zenodo.22062688](https://doi.org/10.5281/zenodo.22062688) for a versioned archival citation.

The full documentation, datasheet, license, machine-readable files, and validation scripts are available in the [GitHub repository](https://github.com/gokimedia/turkish-ev-charging-intents). A rendered documentation edition is also available on [Read the Docs](https://turkish-ev-charging-intents.readthedocs.io/tr/latest/).

If you work on Turkish NLP, EV software, retrieval systems, or intent routing, contributions are welcome—especially carefully reviewed examples covering spelling variation, regional language, multi-intent requests, and safe out-of-scope handling.
