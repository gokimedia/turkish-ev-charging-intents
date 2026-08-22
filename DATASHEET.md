# Datasheet

## Motivation

The dataset provides a small, transparent regression suite for Turkish-language EV assistants and intent routers. It is designed to make routing experiments reproducible without using private search logs or customer conversations.

## Composition

Version 1.0.0 contains 192 records and eight balanced intent classes, with 24 records per class. The fixed splits contain 128 train, 32 validation, and 32 test records.

The classes are:

1. `FIND_STATION`
2. `COMPARE_PRICE`
3. `ROUTE_PLANNING`
4. `CHARGING_SPEED`
5. `VEHICLE_COMPARISON`
6. `HOME_CHARGING`
7. `BATTERY_HEALTH`
8. `OWNERSHIP_COST`

Each record contains a stable ID, Turkish text, intent ID, Turkish label, suggested TekPedal route, split, language, and provenance marker.

## Collection process and provenance

All v1 examples were generated editorially from documented subject lists and templates. Their provenance field is `synthetic-editorial`. They were not copied from search engines, analytics tools, support tickets, customer conversations, or third-party datasets.

The dataset therefore measures performance on this controlled taxonomy, not real-world demand or user behavior.

## Personal and sensitive information

The dataset is designed not to include names, email addresses, telephone numbers, session identifiers, precise personal locations, account details, or user profiles. Automated validation checks several common direct-identifier patterns, but contributors and maintainers must still review changes manually.

## Preprocessing and splits

Examples are stored as UTF-8 JSON Lines. The split assignment is deterministic within every class: 16 train, four validation, and four test examples. No normalization or tokenization has been applied to the text.

## Recommended evaluation

Report macro F1 alongside per-class precision, recall, F1, and the confusion matrix. Keep the provided test split unchanged for comparable results. Any tuning based on test examples must be disclosed.

## Known limitations

- Small, template-based corpus.
- Limited spelling, dialect, and code-switching diversity.
- Limited multi-intent and out-of-scope coverage.
- No observational frequency or popularity signal.
- No guarantee of production safety or factual answer quality.
- Suggested product routes can change independently of the linguistic label.

## Maintenance

TekPedal maintains the dataset. Releases follow semantic versioning. Record or split changes require a new version and changelog entry. Older releases remain available through Git tags and external archives when configured.

## Licensing

The dataset and its documentation are licensed under CC BY 4.0. Contributors must have the right to license every submitted record on those terms.

