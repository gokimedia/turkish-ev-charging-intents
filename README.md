# Turkish EV Charging Intent Dataset

[![Dataset validation](https://github.com/gokimedia/turkish-ev-charging-intents/actions/workflows/validate.yml/badge.svg)](https://github.com/gokimedia/turkish-ev-charging-intents/actions/workflows/validate.yml)
[![GitHub Pages](https://github.com/gokimedia/turkish-ev-charging-intents/actions/workflows/pages.yml/badge.svg)](https://github.com/gokimedia/turkish-ev-charging-intents/actions/workflows/pages.yml)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.22062688.svg)](https://doi.org/10.5281/zenodo.22062688)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-00a86b.svg)](LICENSE)

A compact, balanced Turkish-language dataset for routing electric-vehicle and charging questions. It contains 192 editorially generated queries across eight intent classes, with fixed train, validation, and test splits.

Created and maintained by [TekPedal](https://tekpedal.com/), an independent EV charging map and vehicle decision platform for Türkiye.

## Explore and download

- [Interactive GitHub Pages explorer](https://gokimedia.github.io/turkish-ev-charging-intents/)
- [TekPedal open-data page](https://tekpedal.com/acik-veri)
- [Zenodo archival record (DOI: 10.5281/zenodo.22062688)](https://doi.org/10.5281/zenodo.22062688)
- [Hugging Face dataset](https://huggingface.co/datasets/FoodSecuriry/turkish-ev-charging-intents)
- [Hugging Face interactive Space](https://huggingface.co/spaces/FoodSecuriry/tekpedal-ev-intent-explorer)

Publication metadata and repeatable export helpers for Zenodo, Kaggle, and OpenML are maintained in [`distribution/`](distribution/). Platform URLs are added here only after the corresponding public record is live.

## Dataset at a glance

| Property | Value |
|---|---:|
| Language | Turkish (`tr`) |
| Rows | 192 |
| Intent classes | 8 |
| Train | 128 |
| Validation | 32 |
| Test | 32 |
| Provenance | `synthetic-editorial` |
| License | CC BY 4.0 |

The intent taxonomy covers station search, price comparison, route planning, charging speed, vehicle comparison, home charging, battery health, and ownership cost.

## Schema

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable example identifier |
| `text` | string | Turkish-language query |
| `intent` | string | One of eight intent identifiers |
| `intent_label_tr` | string | Human-readable Turkish label |
| `target_path` | string | Suggested TekPedal content route |
| `split` | string | `train`, `validation`, or `test` |
| `language` | string | `tr` in v1 |
| `provenance` | string | `synthetic-editorial` in v1 |

## Quick start

```python
import pandas as pd

train = pd.read_json(
    "https://raw.githubusercontent.com/gokimedia/turkish-ev-charging-intents/main/data/train.jsonl",
    lines=True,
)

print(train[["text", "intent"]].head())
```

## Intended use

- Evaluate Turkish intent classifiers and embedding-based routers.
- Test routing before connecting an assistant to maps, price guides, route planning, or battery content.
- Use as a deterministic regression suite for Turkish EV assistants.
- Teach and demonstrate compact text-classification workflows.

## Important limitations

This dataset is not a record of real searches or customer conversations. It must not be used to infer demand, search volume, demographics, or individual behavior. The corpus is deliberately small and template-based; it does not represent the full diversity of Turkish dialects, spelling errors, code-switching, adversarial inputs, or multi-intent requests.

A strong score on this dataset is not evidence that a system is production-ready. Route, price, tax, charging, and battery answers require current authoritative sources.

See [DATASHEET.md](DATASHEET.md) for provenance, composition, maintenance, and responsible-use details.

## Validation

```bash
npm test
```

The validator checks row counts, fixed splits, stable IDs, required fields, allowed labels, duplicates, and the absence of common direct identifiers. GitHub Actions runs it on every push and pull request.

## Citation

Use the versioned Zenodo record and the metadata in [CITATION.cff](CITATION.cff): [10.5281/zenodo.22062688](https://doi.org/10.5281/zenodo.22062688).

```bibtex
@dataset{tekpedal_turkish_ev_intents_2026,
  title   = {Turkish EV Charging Intent Dataset},
  author  = {{TekPedal}},
  year    = {2026},
  version = {1.0.0},
  publisher = {Zenodo},
  doi     = {10.5281/zenodo.22062688},
  url     = {https://doi.org/10.5281/zenodo.22062688},
  license = {CC-BY-4.0}
}
```

## License

The dataset and documentation are licensed under [Creative Commons Attribution 4.0 International](LICENSE). Attribute the work as “TekPedal Turkish EV Charging Intent Dataset, v1.0.0.” Brand names and trademarks remain the property of their respective owners.
