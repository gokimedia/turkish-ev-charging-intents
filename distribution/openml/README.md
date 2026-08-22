# OpenML publication

The upload helper publishes the generated CSV as a text-classification dataset with `intent` as the default target. Supporting metadata columns are retained but marked as ignored attributes for modeling.

```bash
npm run export:platforms
python -m pip install -r distribution/openml/requirements.txt
$env:OPENML_API_KEY = "your-session-secret"
python distribution/openml/publish.py
```

OpenML can also read the API key from its local user configuration. Never commit the key or paste it into source files. After publication, record the returned dataset URL and ID in the canonical repository and TekPedal open-data page.
