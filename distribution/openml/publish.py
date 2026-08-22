"""Publish the generated CSV to OpenML using an authenticated account."""

from __future__ import annotations

import os
from pathlib import Path

import openml
import pandas as pd


ROOT = Path(__file__).resolve().parents[2]
CSV_PATH = ROOT / "distribution" / "kaggle" / "turkish-ev-charging-intents.csv"

DESCRIPTION = """A compact Turkish-language text-classification dataset for routing
electric-vehicle and charging questions. It contains 192 synthetic-editorial
queries balanced across eight intent classes, with fixed train, validation, and
test splits. It is not search-log or customer data and contains no personal
data. Full provenance, limitations, and validation details are available at
https://github.com/gokimedia/turkish-ev-charging-intents and
https://tekpedal.com/acik-veri.
"""


def main() -> None:
    if not CSV_PATH.exists():
        raise SystemExit("Missing generated CSV. Run `npm run export:platforms` first.")

    frame = pd.read_csv(CSV_PATH, dtype=str, keep_default_na=False)
    if len(frame) != 192:
        raise SystemExit(f"Expected 192 rows, found {len(frame)}.")

    api_key = os.getenv("OPENML_API_KEY")
    if api_key:
        openml.config.apikey = api_key

    dataset = openml.datasets.create_dataset(
        data=frame,
        name="Turkish EV Charging Intent Dataset",
        description=DESCRIPTION,
        creator="TekPedal",
        collection_date="2026-08-22",
        language="Turkish",
        licence="CC BY 4.0",
        default_target_attribute="intent",
        row_id_attribute="id",
        ignore_attribute=[
            "intent_label_tr",
            "target_path",
            "split",
            "language",
            "provenance",
        ],
        citation=(
            "TekPedal (2026). Turkish EV Charging Intent Dataset, version 1.0.0. "
            "https://github.com/gokimedia/turkish-ev-charging-intents"
        ),
        version_label="1.0.0",
        original_data_url="https://github.com/gokimedia/turkish-ev-charging-intents",
    )
    dataset.publish()
    print(f"Published OpenML dataset: {dataset.openml_url}")


if __name__ == "__main__":
    main()
