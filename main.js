// 奖项筛选：隐藏不匹配的条目，整年都没有条目时连年份一起隐藏
const filters = document.querySelectorAll('.filter');
const years = document.querySelectorAll('.year');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.f;
    filters.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    years.forEach((y) => {
      let shown = 0;
      y.querySelectorAll('li').forEach((li) => {
        li.hidden = f !== 'all' && li.dataset.c !== f;
        if (!li.hidden) shown += 1;
      });
      y.hidden = shown === 0;
    });
  });
});

// 奖项统计：按级别数奖项，一条里有几个奖项写在 data-n
document.querySelectorAll('.aw-stats [data-l]').forEach((d) => {
  let n = 0;
  document.querySelectorAll(`.years .lvl.${d.dataset.l}`).forEach((tag) => { n += Number(tag.parentElement.dataset.n || 1); });
  d.querySelector('dd').textContent = n;
});

// 奖项照片面板：把每年的照片复制到右侧面板，滚到哪一年就显示哪一年
const awLayout = document.querySelector('.awards-layout');
if (awLayout) {
  const panel = document.createElement('aside');
  panel.className = 'aw-panel';
  panel.setAttribute('aria-label', '当年照片');
  // 年份 → 照片组。带 data-panel 的几年共用一组，照片按这几年的总滚动距离平均展开
  const groups = new Map();
  const spans = new Map();
  let shared = null;
  document.querySelectorAll('.year').forEach((y) => {
    const key = y.dataset.panel;
    const shots = y.querySelector('.year-shots');
    if (key && shared && shared.key === key) {
      if (shots) shared.g.insertAdjacentHTML('beforeend', captioned(shots, y));
      groups.set(y, shared.g);
      spans.get(shared.g).push(y);
      return;
    }
    if (!shots && !key) return;
    const g = document.createElement('div');
    g.className = 'aw-group';
    g.innerHTML = `<p class="aw-group-year">${key || y.querySelector('h3').textContent.trim()}</p>`
      + (shots ? (key ? captioned(shots, y) : shots.innerHTML) : '');
    panel.appendChild(g);
    groups.set(y, g);
    spans.set(g, [y]);
    shared = key ? { key, g } : null;
  });
  panel.querySelectorAll('img').forEach((img) => img.removeAttribute('loading'));
  function captioned(shots, y) {
    const year = y.querySelector('h3').textContent.trim();
    const box = shots.cloneNode(true);
    box.querySelectorAll('figcaption').forEach((f) => { f.textContent = `${year} · ${f.textContent}`; });
    return box.innerHTML;
  }
  if (groups.size) {
    awLayout.appendChild(panel);
    awLayout.classList.add('has-panel');
    const show = (g) => {
      if (!g || g.classList.contains('is-on')) return;
      groups.forEach((x) => x.classList.remove('is-on'));
      g.classList.add('is-on');
    };
    show(groups.values().next().value);
    const yo = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) show(groups.get(e.target)); }),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    groups.forEach((_, y) => yo.observe(y));
    // 年份很长、照片很多时，面板跟着当年的滚动进度一起往下走
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const g = panel.querySelector('.aw-group.is-on');
        if (!g) return;
        const ys = spans.get(g);
        const top = ys[0].getBoundingClientRect().top;
        const height = ys[ys.length - 1].getBoundingClientRect().bottom - top;
        const t = Math.min(1, Math.max(0, (innerHeight * 0.3 - top) / Math.max(1, height - innerHeight * 0.6)));
        panel.scrollTop = t * (panel.scrollHeight - panel.clientHeight);
      });
    }, { passive: true });
  }
}

// 导航高亮当前栏目
const links = new Map(
  [...document.querySelectorAll('.navlinks a')].map((a) => [a.getAttribute('href').slice(1), a])
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      const a = links.get(e.target.id);
      if (a) {
        a.classList.add('is-active');
        const bar = a.parentElement;
        bar.scrollLeft = a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2;
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
