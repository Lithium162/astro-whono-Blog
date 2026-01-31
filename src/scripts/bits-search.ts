const input = document.getElementById('bits-search') as HTMLInputElement | null;
const btn = document.getElementById('bits-search-btn') as HTMLButtonElement | null;
const statusEl = document.getElementById('bits-search-status') as HTMLDivElement | null;

const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-bit]')).map((el) => ({
  el,
  slug: (el.getAttribute('data-slug') || '').trim()
}));

type IndexItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  text: string;
  date: string | null;
};

const showAll = () => {
  for (const { el } of cards) {
    el.style.display = '';
  }
};

const setStatus = (text: string) => {
  if (!statusEl) return;
  if (statusEl.textContent === text) return;
  statusEl.textContent = text;
};

const buildHay = (item: IndexItem) => {
  const tags = Array.isArray(item.tags) ? item.tags.join(' ') : '';
  return `${item.title ?? ''} ${item.description ?? ''} ${tags} ${item.text ?? ''}`.toLowerCase();
};

let indexPromise: Promise<IndexItem[] | null> | null = null;
let indexCache: IndexItem[] | null = null;
let indexHay: Map<string, string> | null = null;
let indexFailed = false;

const setDegradedMode = () => {
  if (input) {
    input.placeholder = '索引加载失败';
    input.disabled = true;
    input.setAttribute('aria-disabled', 'true');
  }
  if (btn) {
    btn.disabled = true;
    btn.setAttribute('aria-disabled', 'true');
  }
  setStatus('索引加载失败，已禁用搜索');
  showAll();
};

const loadIndex = async () => {
  if (indexCache) return indexCache;
  if (indexFailed) return null;
  if (!indexPromise) {
    setStatus('正在加载索引...');
    indexPromise = fetch('/bits/index.json')
      .then((r) => {
        if (!r.ok) throw new Error('index fetch failed');
        return r.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('index data invalid');
        indexCache = data as IndexItem[];
        indexHay = new Map(indexCache.map((item) => [item.slug, buildHay(item)]));
        setStatus('');
        return indexCache;
      })
      .catch(() => {
        indexFailed = true;
        setDegradedMode();
        return null;
      });
  }
  return indexPromise;
};

const applyFilter = async () => {
  if (!input) return;
  const q = (input.value || '').trim().toLowerCase();
  if (q === '') {
    showAll();
    return;
  }
  const index = await loadIndex();
  if (!index || !indexHay) {
    showAll();
    return;
  }
  for (const { el, slug } of cards) {
    if (!slug) {
      el.style.display = '';
      continue;
    }
    const hay = indexHay.get(slug) || '';
    el.style.display = hay.includes(q) ? '' : 'none';
  }
};

input?.addEventListener('focus', () => {
  void loadIndex();
});
input?.addEventListener('input', () => {
  void applyFilter();
});
btn?.addEventListener('click', () => {
  void applyFilter();
});

const newBtn = document.querySelector<HTMLButtonElement>('[data-new-bit]');
const newLabel = newBtn?.querySelector<HTMLElement>('.new-label');
const setNewLabel = (text: string) => {
  if (newLabel) {
    newLabel.textContent = text;
  } else if (newBtn) {
    newBtn.textContent = text;
  }
  newBtn?.setAttribute('aria-label', text);
};
newBtn?.addEventListener('click', async () => {
  const cmd = 'npm run new:bit';
  try {
    await navigator.clipboard.writeText(cmd);
    setNewLabel('已复制命令');
    window.setTimeout(() => {
      setNewLabel('碎碎念');
    }, 1200);
  } catch {
    alert(`在项目根目录运行：\n\n${cmd}`);
  }
});
