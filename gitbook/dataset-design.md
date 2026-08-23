# Dataset design

## Intent taxonomy

The dataset contains 24 records in each of eight intent classes.

| Intent | Turkish label | Suggested capability |
| --- | --- | --- |
| `FIND_STATION` | İstasyon bulma | Station map or location index |
| `COMPARE_PRICE` | Fiyat karşılaştırma | Current tariff comparison |
| `ROUTE_PLANNING` | Rota planlama | Route and charging-stop planner |
| `CHARGING_SPEED` | Şarj hızı | Charging-speed guidance |
| `VEHICLE_COMPARISON` | Araç karşılaştırma | Structured vehicle comparison |
| `HOME_CHARGING` | Evde şarj | Home-charging guidance |
| `BATTERY_HEALTH` | Batarya sağlığı | Battery-care content |
| `OWNERSHIP_COST` | Sahip olma maliyeti | Cost calculator or ownership guide |

## Record schema

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

| Field | Description |
| --- | --- |
| `id` | Stable example identifier |
| `text` | Turkish-language query |
| `intent` | One of the eight intent identifiers |
| `intent_label_tr` | Human-readable Turkish label |
| `target_path` | Suggested TekPedal content route |
| `split` | `train`, `validation`, or `test` |
| `language` | `tr` in version 1 |
| `provenance` | `synthetic-editorial` in version 1 |

## Fixed splits

Split assignment is deterministic inside every class:

* 16 training examples;
* four validation examples;
* four test examples.

No tokenization or text normalization is applied. Consumers receive the UTF-8 Turkish text as maintained in the release.

## Provenance

All version 1 examples were generated editorially from documented subject lists and templates. They were not copied from search engines, customer conversations, support tickets, private analytics, or third-party datasets.

The `synthetic-editorial` marker is included in every record so that downstream users retain this limitation and do not present the corpus as observational data.
