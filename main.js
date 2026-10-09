// 奖项筛选
const filters = document.querySelectorAll('.filter');
const awards = document.querySelectorAll('.awards li');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.f;
    filters.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    awards.forEach((li) => {
      li.hidden = f !== 'all' && li.dataset.c !== f;
    });
  });
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
