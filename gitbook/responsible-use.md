# Responsible use

The dataset is designed for controlled routing experiments, regression testing, education, and demonstrations. Its compact and transparent design makes failures easier to inspect, but also limits what a result can prove.

## Appropriate uses

* Evaluating classifiers or embedding-based routers on the documented taxonomy.
* Testing whether an EV assistant selects the expected capability.
* Comparing model or prompt changes against a fixed regression suite.
* Teaching reproducible Turkish NLP workflows.

## Inappropriate interpretations

Do not use the dataset to infer:

* demand or search volume;
* customer demographics or preferences;
* real-world intent frequency;
* individual behavior;
* production readiness from a single score.

## Known limitations

The corpus is small and template-based. It has limited coverage of spelling errors, regional language, conversational fragments, code-switching, adversarial inputs, out-of-scope questions, and requests that contain multiple intents.

A real deployment should add representative evaluation data, an explicit clarification or rejection path, monitoring, privacy controls, and current authoritative sources for every downstream capability.

## Privacy and sensitive information

The examples are designed not to include names, email addresses, telephone numbers, session identifiers, account details, user profiles, or precise personal locations. Automated validation checks several common direct-identifier patterns, but contributions still require manual review.

## Contributions and maintenance

Changes should preserve stable identifiers, transparent provenance, and documented licensing. Record or split changes require a new release and changelog entry. Contributions can be proposed through the [GitHub repository](https://github.com/gokimedia/turkish-ev-charging-intents).
