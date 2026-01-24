const KEY = 'theme';
const root = document.documentElement;
const body = document.body;

const themeBtn = document.getElementById('theme-toggle');
const readerBtn = document.getElementById('reader-toggle');
const readerExit = document.getElementById('reader-exit');

const isDark = () => root.dataset.theme === 'dark';

const applyTheme = (theme: string) => {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  if (themeBtn) {
    themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    const label = dark ? '浅色模式' : '夜间模式';
    themeBtn.setAttribute('aria-label', label);
    themeBtn.setAttribute('title', label);
  }
};

const initTheme = () => {
  const current = isDark() ? 'dark' : 'light';
  applyTheme(current);
  themeBtn?.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch (_) {}
  });
};

const isReaderOn = () => body?.dataset.reading === 'immersive';
const isImmersivePage = body?.classList.contains('immersive-page');

const setReaderDisabled = (disabled: boolean) => {
  if (!readerBtn) return;
  readerBtn.setAttribute('aria-pressed', 'false');
  readerBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  if (disabled) {
    readerBtn.setAttribute('title', '阅读模式（仅文章/孩童页可用）');
    readerBtn.setAttribute('aria-label', '阅读模式（仅文章/孩童页可用）');
    readerBtn.tabIndex = -1;
  } else {
    readerBtn.setAttribute('title', '阅读模式');
    readerBtn.setAttribute('aria-label', '阅读模式');
    readerBtn.tabIndex = 0;
  }
};

const applyReader = (on: boolean) => {
  if (!body) return;
  if (on) {
    body.dataset.reading = 'immersive';
  } else {
    delete body.dataset.reading;
  }
  if (readerBtn) {
    readerBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  if (readerExit) {
    readerExit.setAttribute('aria-label', '退出阅读模式');
  }
};

const initReader = () => {
  if (!readerBtn) return;
  if (!isImmersivePage) {
    setReaderDisabled(true);
    return;
  }

  setReaderDisabled(false);
  applyReader(false);

  readerBtn.addEventListener('click', () => {
    applyReader(!isReaderOn());
  });

  readerExit?.addEventListener('click', () => {
    applyReader(false);
  });
};

initTheme();
initReader();
