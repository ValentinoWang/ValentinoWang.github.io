// 主页 02 段：鼠标移到（或键盘聚焦到）终端里的一行，右侧换成那个项目的预览
const rows = document.querySelectorAll('.pj-term__rows a[data-id]');
const previews = document.querySelectorAll('.pj-prev');
function show(id) {
  previews.forEach((p) => { p.hidden = p.dataset.id !== id; });
  rows.forEach((r) => r.classList.toggle('is-on', r.dataset.id === id));
}
rows.forEach((r) => {
  r.addEventListener('mouseenter', () => show(r.dataset.id));
  r.addEventListener('focus', () => show(r.dataset.id));
});
if (rows.length) show('cadenvo');
