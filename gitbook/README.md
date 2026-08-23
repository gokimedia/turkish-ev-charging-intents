# Turkish EV Charging Intent Dataset

An open, reproducible Turkish-language dataset for evaluating intent routers in electric-vehicle and charging applications.

Version 1.0.0 contains **192 editorially generated queries** across eight balanced intent classes. It includes fixed train, validation, and test splits, transparent provenance, a detailed datasheet, and automated validation. The dataset is maintained by [TekPedal](https://tekpedal.com/), an EV charging map and vehicle decision platform for Türkiye.

{% hint style="info" %}
Explore and download the dataset from [TekPedal Open Data](https://tekpedal.com/acik-veri), or cite the permanent release using [Zenodo DOI 10.5281/zenodo.22062688](https://doi.org/10.5281/zenodo.22062688).
{% endhint %}

## Dataset at a glance

| Property | Value |
| --- | ---: |
| Language | Turkish (`tr`) |
| Records | 192 |
| Intent classes | 8 |
| Training split | 128 |
| Validation split | 32 |
| Test split | 32 |
| Provenance | `synthetic-editorial` |
| License | CC BY 4.0 |

## What it supports

Use the release to:

* prototype Turkish text classifiers;
* compare embedding-based, supervised, and zero-shot intent routers;
* create a deterministic regression suite for an EV assistant;
* test tool or content routing before evaluating downstream answers;
* teach compact text-classification and evaluation workflows.

The dataset does not contain customer conversations, private search logs, support tickets, or analytics records. It is a controlled evaluation resource and must not be interpreted as evidence of search demand or user behavior.

## Stable project links

* [TekPedal Open Data](https://tekpedal.com/acik-veri)
* [GitHub source repository](https://github.com/gokimedia/turkish-ev-charging-intents)
* [Interactive GitHub Pages explorer](https://gokimedia.github.io/turkish-ev-charging-intents/)
* [Permanent Zenodo release](https://doi.org/10.5281/zenodo.22062688)
* [Read the Docs edition](https://turkish-ev-charging-intents.readthedocs.io/tr/latest/)

Continue with [Getting started](getting-started.md) to load the fixed splits and run the repository validation checks.
