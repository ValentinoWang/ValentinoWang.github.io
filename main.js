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

// 奖项统计：按级别数条目
document.querySelectorAll('.aw-stats [data-l]').forEach((d) => {
  d.querySelector('dd').textContent = document.querySelectorAll(`.years .lvl.${d.dataset.l}`).length;
});

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
