(() => {
  const state = { projects: [], activeTag: 'All', query: '' };
  const esc = (s='') => String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function projectCard(p) {
    const tags = p.tags.map(t => `<button class="mv-chip" data-tag-jump="${esc(t)}">${esc(t)}</button>`).join('');
    const repo = p.repository ? `<a class="mv-btn mv-btn-secondary" href="${esc(p.repository)}" target="_blank" rel="noopener">View project ↗</a>` : '';
    const download = p.download ? `<a class="mv-btn mv-btn-primary" href="${esc(p.download)}">Download ↓</a>` : '';
    return `<article class="mv-card ${p.featured ? 'is-featured' : ''}">
      <div class="mv-card-top"><span class="mv-type">${esc(p.type)}</span>${p.featured ? '<span class="mv-featured">Featured</span>' : ''}</div>
      <h2>${esc(p.name)}</h2>
      <p>${esc(p.description)}</p>
      <div class="mv-card-tags">${tags}</div>
      <div class="mv-actions">${repo}${download}</div>
    </article>`;
  }

  function render() {
    const q = state.query.trim().toLowerCase();
    const filtered = state.projects.filter(p => {
      const tagOK = state.activeTag === 'All' || p.tags.includes(state.activeTag);
      const haystack = [p.name, p.description, p.type, ...p.tags].join(' ').toLowerCase();
      return tagOK && (!q || haystack.includes(q));
    });
    document.querySelector('#marketplace-grid').innerHTML = filtered.map(projectCard).join('');
    document.querySelector('#marketplace-count').textContent = filtered.length;
    document.querySelector('#marketplace-empty').hidden = filtered.length !== 0;
    document.querySelectorAll('[data-tag-jump]').forEach(el => el.addEventListener('click', () => setTag(el.dataset.tagJump)));
  }

  function setTag(tag) {
    state.activeTag = tag;
    document.querySelectorAll('[data-filter-tag]').forEach(el => el.classList.toggle('is-active', el.dataset.filterTag === tag));
    render();
  }

  async function init() {
    const grid = document.querySelector('#marketplace-grid');
    if (!grid) return;
    try {
      const dataUrl = new URL('assets/data/projects.json', document.baseURI);
      state.projects = await (await fetch(dataUrl)).json();
      const tags = ['All', ...new Set(state.projects.flatMap(p => p.tags))].sort((a,b) => a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b));
      document.querySelector('#marketplace-tags').innerHTML = tags.map(t => `<button class="mv-filter ${t === 'All' ? 'is-active' : ''}" data-filter-tag="${esc(t)}">${esc(t)}</button>`).join('');
      document.querySelectorAll('[data-filter-tag]').forEach(el => el.addEventListener('click', () => setTag(el.dataset.filterTag)));
      document.querySelector('#marketplace-search').addEventListener('input', e => { state.query = e.target.value; render(); });
      render();
    } catch (e) {
      grid.innerHTML = '<div class="mv-empty">Could not load the marketplace catalog.</div>';
      console.error(e);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
