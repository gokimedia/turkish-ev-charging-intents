const state = { examples: [], intents: [] };

const body = document.querySelector("#examples-body");
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#intent-filter");
const resultCount = document.querySelector("#result-count");
const classGrid = document.querySelector("#class-grid");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function renderExamples() {
  const query = searchInput.value.trim().toLocaleLowerCase("tr-TR");
  const intent = filterSelect.value;
  const filtered = state.examples.filter((example) => {
    const matchesIntent = !intent || example.intent === intent;
    const haystack = `${example.text} ${example.intent_label_tr} ${example.intent}`.toLocaleLowerCase("tr-TR");
    return matchesIntent && (!query || haystack.includes(query));
  });

  resultCount.textContent = `${filtered.length} / ${state.examples.length} örnek`;
  body.innerHTML = filtered.length
    ? filtered
        .map(
          (example) => `<tr>
            <td class="mono">${escapeHtml(example.id)}</td>
            <td>${escapeHtml(example.text)}</td>
            <td><span class="tag">${escapeHtml(example.intent)}</span></td>
            <td class="path">${escapeHtml(example.target_path)}</td>
          </tr>`,
        )
        .join("")
    : '<tr><td colspan="4" class="loading">Bu filtrelerle eşleşen örnek yok.</td></tr>';
}

function renderClasses() {
  classGrid.innerHTML = state.intents
    .map(
      (intent, index) => `<article class="class-card">
        <span class="index">${String(index + 1).padStart(2, "0")} / 08</span>
        <div><h3>${escapeHtml(intent.label_tr)}</h3><p>${escapeHtml(intent.id)} · ${intent.rows} örnek</p></div>
      </article>`,
    )
    .join("");
}

async function initialize() {
  try {
    const response = await fetch("./data/preview.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    state.examples = payload.examples;
    state.intents = payload.stats.intents;

    for (const intent of state.intents) {
      const option = document.createElement("option");
      option.value = intent.id;
      option.textContent = intent.label_tr;
      filterSelect.append(option);
    }

    renderExamples();
    renderClasses();
  } catch (error) {
    body.innerHTML = '<tr><td colspan="4" class="loading">Veri şu anda yüklenemiyor. GitHub deposundan indirmeyi deneyin.</td></tr>';
    resultCount.textContent = "Yükleme hatası";
    classGrid.innerHTML = '<p class="loading">Taksonomi yüklenemedi.</p>';
    console.error(error);
  }
}

searchInput.addEventListener("input", renderExamples);
filterSelect.addEventListener("change", renderExamples);

document.querySelector("#copy-code").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(document.querySelector("#code-sample").textContent);
    button.textContent = "Kopyalandı";
    window.setTimeout(() => { button.textContent = "Kopyala"; }, 1600);
  } catch {
    button.textContent = "Seçip kopyalayın";
  }
});

initialize();

