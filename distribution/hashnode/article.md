---
title: Designing a Reliable Intent Router for Turkish EV Applications
subtitle: A practical routing architecture with explicit intent contracts, confidence thresholds, and an open evaluation dataset.
published: true
tags: machine-learning, natural-language-processing, electric-vehicles, opensource
---

An electric-vehicle assistant may need to answer one question with a map, another with current charging tariffs, and a third with educational battery content. Sending all three queries directly to the same retrieval or generation flow makes the system harder to evaluate and easier to break.

A small intent router can create a clean boundary between language understanding and downstream tools. This article develops that architecture for Turkish EV applications using the open [Turkish EV Charging Intent Dataset](https://tekpedal.com/acik-veri) maintained by [TekPedal](https://tekpedal.com/).

The goal is not to present a production benchmark. Instead, we will define a testable routing contract, train a transparent baseline, add a rejection path, and identify the evaluation work required before deployment.

## 1. Treat every intent as a product contract

An intent label should describe more than a topic. It should identify which downstream capability owns the request and what kind of answer is allowed.

The example dataset uses eight balanced intent classes:

| Intent | Typical downstream capability |
|---|---|
| `FIND_STATION` | Station map or location index |
| `COMPARE_PRICE` | Current tariff comparison |
| `ROUTE_PLANNING` | Route and charging-stop planner |
| `CHARGING_SPEED` | Charging-speed explainer or specification lookup |
| `VEHICLE_COMPARISON` | Structured vehicle comparison |
| `HOME_CHARGING` | Home-charging guidance |
| `BATTERY_HEALTH` | Battery-care educational content |
| `OWNERSHIP_COST` | Cost calculator or ownership guide |

This contract prevents a classifier output from becoming an answer by itself. The router selects a capability; the selected capability is still responsible for freshness, citations, safety checks, and presentation.

## 2. Keep the evaluation data explicit

Version 1.0.0 of the dataset contains 192 Turkish queries, with 24 examples per class. Fixed splits provide 128 training, 32 validation, and 32 test records. Each JSON Lines record contains the query, intent, Turkish label, suggested route, split, language, and provenance.

```json
{
  "id": "tp-01-001",
  "text": "İstanbul içinde yakınımdaki elektrikli araç şarj istasyonu nerede?",
  "intent": "FIND_STATION",
  "target_path": "/harita",
  "split": "train",
  "language": "tr",
  "provenance": "synthetic-editorial"
}
```

The examples are editorially generated rather than collected from customers, analytics systems, or support conversations. That makes the release suitable for open experimentation without exposing private logs. It also means that the data cannot represent natural demand, production frequency, or every form of Turkish language variation.

The permanent versioned release is archived under [Zenodo DOI 10.5281/zenodo.22062688](https://doi.org/10.5281/zenodo.22062688). The [GitHub repository](https://github.com/gokimedia/turkish-ev-charging-intents) contains the files, datasheet, license, and automated validation workflow.

## 3. Start with a transparent baseline

Character n-grams are a useful baseline for compact Turkish text datasets. They can capture suffix patterns and tolerate some spelling variation without requiring a large pretrained model.

```python
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.pipeline import Pipeline

base = (
    "https://raw.githubusercontent.com/gokimedia/"
    "turkish-ev-charging-intents/main/data"
)

train = pd.read_json(f"{base}/train.jsonl", lines=True)
validation = pd.read_json(f"{base}/validation.jsonl", lines=True)

router = Pipeline(
    [
        (
            "features",
            TfidfVectorizer(
                analyzer="char_wb",
                ngram_range=(3, 5),
                min_df=2,
                sublinear_tf=True,
            ),
        ),
        (
            "classifier",
            LogisticRegression(
                max_iter=2000,
                class_weight="balanced",
            ),
        ),
    ]
)

router.fit(train["text"], train["intent"])
predictions = router.predict(validation["text"])

print(
    classification_report(
        validation["intent"],
        predictions,
        digits=3,
    )
)
```

This baseline is deliberately easy to inspect and reproduce. Compare it with embedding similarity, a multilingual encoder, or a zero-shot model only after preserving the same split and reporting macro F1, per-class precision and recall, and the confusion matrix.

Do not tune against the test split. Use validation data for decisions, freeze the configuration, and then run the final test once.

## 4. Add an explicit rejection path

A production router must be able to say “I do not know.” Always choosing one of eight labels will silently misroute unrelated, ambiguous, or multi-intent questions.

For models that expose class probabilities, begin with a validation-driven threshold:

```python
def route_query(text: str, threshold: float = 0.65):
    probabilities = router.predict_proba([text])[0]
    best_index = probabilities.argmax()
    confidence = float(probabilities[best_index])
    intent = router.classes_[best_index]

    if confidence < threshold:
        return {
            "intent": "NEEDS_CLARIFICATION",
            "confidence": confidence,
        }

    return {
        "intent": intent,
        "confidence": confidence,
    }
```

The value `0.65` is only an example, not a recommended universal threshold. Select the threshold on representative validation data and measure both sides of the trade-off:

- incorrect high-confidence routes;
- valid requests unnecessarily rejected;
- calibration by intent;
- behavior on out-of-scope and multi-intent sets.

An embedding-based router needs the same discipline. Similarity is not automatically calibrated confidence.

## 5. Separate routing from retrieval and generation

A maintainable flow can remain simple:

```text
Turkish query
    ↓
Intent router
    ├── low confidence → clarification or safe fallback
    └── accepted intent
            ↓
       capability policy
            ↓
       current data source or content route
            ↓
       answer with provenance and freshness checks
```

This separation creates useful operational metrics. Teams can log the predicted intent, confidence, fallback decision, selected capability, and final outcome without storing unnecessary personal data. Routing regressions can then be distinguished from failures in search, pricing data, maps, or answer generation.

For an EV product, current-data requirements matter. A correct `COMPARE_PRICE` label does not make an outdated tariff correct. A correct `ROUTE_PLANNING` label does not guarantee that a charging stop is available. Routing is one component in a larger reliability system.

## 6. Build the next evaluation set from failures

The open dataset is intentionally compact and template-based. Before production use, extend evaluation coverage for:

- spelling mistakes and missing Turkish characters;
- regional phrasing and conversational fragments;
- Turkish-English code-switching;
- two intents in the same message;
- unrelated and unsupported requests;
- adversarial or instruction-like inputs;
- route and content changes over time.

Review misroutes first. Add new examples only when their label and downstream behavior are clear. Version data changes, preserve old releases, and document any tuning performed after inspecting evaluation examples.

## A reproducible starting point

The [TekPedal Open Data explorer](https://tekpedal.com/acik-veri) provides a human-readable view of all intent classes and downloadable artifacts. Full documentation is available through [Read the Docs](https://turkish-ev-charging-intents.readthedocs.io/tr/latest/), and the repository accepts contributions that improve linguistic diversity, out-of-scope handling, and evaluation quality.

A small dataset will not solve production routing by itself. It can, however, make the first design decisions visible: which capabilities exist, how they are evaluated, when the router must reject a query, and where current authoritative data enters the system.
