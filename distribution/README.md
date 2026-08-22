# Platform publication packages

This directory keeps publication metadata and repeatable upload helpers for third-party dataset catalogs. The canonical source remains the versioned GitHub repository; platform copies should link back to both the repository and [TekPedal's open-data page](https://tekpedal.com/acik-veri).

Generate the shared CSV and Kaggle cover image before publishing:

```bash
npm run export:platforms
```

The export is deterministic: it combines the fixed train, validation, and test JSONL files without changing their rows or split labels.

## Publication order

1. Enable the GitHub repository in Zenodo and archive the next GitHub release. Zenodo reads the root [`.zenodo.json`](../.zenodo.json) file and assigns the DOI.
2. Publish the generated CSV with the metadata in [`kaggle/`](kaggle/).
3. Publish the same generated CSV to OpenML with [`openml/publish.py`](openml/publish.py).
4. Add the resulting canonical platform URLs and DOI to the repository, Croissant metadata, citation file, and TekPedal open-data page.

No platform credentials or API keys belong in this repository.
