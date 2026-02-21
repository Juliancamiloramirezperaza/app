


const fmt   = n => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
const fmtD  = d => new Date(d + 'T00:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
const stars = n => '★'.repeat(Math.floor(n)) + (n % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(n));
const ini   = s => (s || '?').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();


function applyFilters() {
  const q  = document.getElementById('searchInput').value.toLowerCase();
  const tp = document.getElementById('filterType').value;
  const br = document.getElementById('filterBrand').value;
  const so = document.getElementById('filterSort').value;

  let list = getAllDevices().filter(d => {
    const matchQ  = d.name.toLowerCase().includes(q)
                 || d.brand.toLowerCase().includes(q)
                 || (d.synopsis || '').toLowerCase().includes(q);
    const matchTp = tp === 'all' || d.type  === tp;
    const matchBr = br === 'all' || d.brand === br;
    return matchQ && matchTp && matchBr;
  });

  list.sort((a, b) => {
    if (so === 'date')       return new Date(b.launchDate) - new Date(a.launchDate);
    if (so === 'price-asc')  return a.price - b.price;
    if (so === 'price-desc') return b.price - a.price;
    if (so === 'name')       return a.name.localeCompare(b.name);
    if (so === 'rating')     return b.stars - a.stars;
    return 0;
  });

  renderCards(list);
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('filterType').value  = 'all';
  document.getElementById('filterBrand').value = 'all';
  document.getElementById('filterSort').value  = 'date';
  applyFilters();
}

function setTypeFilter(type) {
  document.getElementById('filterType').value = type;
  applyFilters();
  document.getElementById('catalog-anchor').scrollIntoView({ behavior: 'smooth' });
}


function renderCards(list) {
  const grid = document.getElementById('devicesGrid');
  const info = document.getElementById('resultsInfo');

  info.textContent = `Mostrando ${list.length} dispositivo${list.length !== 1 ? 's' : ''}`;

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="ei">🔍</div>
        <h3>Sin resultados</h3>
        <p>Intenta con otro término o quita los filtros.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map((d, i) => `
    <div class="device-card" style="animation-delay:${i * 45}ms" onclick="openModal(${d.id})">
      <div class="card-img">
        <span class="card-badge ${d.type === 'celular' ? 'badge-y' : 'badge-b'}">
          ${d.type === 'celular' ? '📱 Celular' : '💻 Portátil'}
        </span>
        ${d.emoji}
      </div>
      <div class="card-body">
        <div class="card-brand">${d.brand}</div>
        <div class="card-name">${d.name}</div>
        <div class="card-stars">
          ${'★'.repeat(Math.floor(d.stars))}
          <span style="color:var(--text3);font-size:.78rem">${d.stars} (${d.reviews})</span>
        </div>
        <div class="card-date">📅 ${fmtD(d.launchDate)}</div>
        <div class="card-footer">
          <div class="card-price">${fmt(d.price)}</div>
          <div class="card-cta">Ver más →</div>
        </div>
      </div>
    </div>
  `).join('');
}


function openModal(id) {
  const d = getDeviceById(id);
  if (!d) return;

  const allC = getAllComments(d);


  const specsHtml = Object.entries(d.specs || {}).map(([k, v]) => `
    <div class="spec-item">
      <div class="spec-k">${k}</div>
      <div class="spec-v">${v}</div>
    </div>`).join('');


  const galleryHtml = (d.images || []).map(img => `
    <div class="gthumb">${img}</div>`).join('');


  const colorsHtml = d.colors && d.colors.length
    ? d.colors.map(c => `<span class="m-color">🎨 ${c}</span>`).join('')
    : '';


  const commentsHtml = allC.length
    ? allC.map(c => `
      <div class="ccard">
        <div class="ctop">
          <div class="c-uw">
            <div class="c-av">${ini(c.user)}</div>
            <div>
              <div class="c-un">${c.user}</div>
              <div class="c-dt">${c.date}</div>
            </div>
          </div>
          <span class="c-rt">${c.stars}/5 ★</span>
        </div>
        <div class="c-st">${'★'.repeat(c.stars)}${'☆'.repeat(5 - c.stars)}</div>
        <div class="c-tx">${c.text}</div>
      </div>`).join('')
    : '<p style="color:var(--text3);font-size:.88rem">Aún no hay reseñas. ¡Sé el primero en opinar!</p>';

  document.getElementById('modalContent').innerHTML = `
    <!-- Hero -->
    <div class="m-hero">
      <div class="m-img">${d.emoji}</div>
      <div class="m-meta">
        <div class="m-brand">${d.brand}</div>
        <div class="m-name">${d.name}</div>
        <div class="m-badge-row">
          <span class="m-pill ${d.type === 'celular' ? 'mp-y' : 'mp-b'}">
            ${d.type === 'celular' ? '📱 Celular' : '💻 Portátil'}
          </span>
          <span class="m-date">📅 ${fmtD(d.launchDate)}</span>
        </div>
        <div class="m-price">
          ${fmt(d.price)}
          <span style="font-size:.9rem;color:var(--text3)"> / USD ${d.priceUSD || '—'}</span>
        </div>
        <div class="m-stars-row">
          <span class="m-stars">${stars(d.stars)}</span>
          <span class="m-rcount">${d.stars} — ${d.reviews} reseñas</span>
        </div>
        ${colorsHtml ? `<div class="m-colors">${colorsHtml}</div>` : ''}
      </div>
    </div>

    <!-- Sinopsis -->
    <div class="ms">
      <div class="ms-title">📋 Sinopsis / Descripción</div>
      <p class="ms-text">${d.synopsis}</p>
    </div>

    <!-- Especificaciones -->
    <div class="ms">
      <div class="ms-title">⚙️ Especificaciones Técnicas</div>
      <div class="specs-grid">${specsHtml}</div>
    </div>

    <!-- Galería -->
    <div class="ms">
      <div class="ms-title">🖼️ Galería de Fotos</div>
      <div class="gal">${galleryHtml}</div>
    </div>

    ${colorsHtml ? `
    <!-- Colores -->
    <div class="ms">
      <div class="ms-title">🎨 Colores Disponibles</div>
      <div class="m-colors">${colorsHtml}</div>
    </div>` : ''}

    <!-- Reseñas -->
    <div class="ms">
      <div class="ms-title">💬 Reseñas y Comentarios (${allC.length})</div>
      <div class="clist">${commentsHtml}</div>

      <!-- Formulario de reseña -->
      <div class="cform">
        <div class="cform-title">✍️ Deja tu reseña</div>
        <div class="cf-row">
          <div class="cf-field">
            <label>Tu nombre</label>
            <input type="text" id="cfName_${d.id}" placeholder="Ej: Juan García">
          </div>
          <div class="cf-field">
            <label>Calificación</label>
            <select id="cfStars_${d.id}">
              <option value="5">★★★★★ Excelente (5/5)</option>
              <option value="4">★★★★☆ Muy bueno (4/5)</option>
              <option value="3">★★★☆☆ Bueno (3/5)</option>
              <option value="2">★★☆☆☆ Regular (2/5)</option>
              <option value="1">★☆☆☆☆ Malo (1/5)</option>
            </select>
          </div>
        </div>
        <div class="cf-field full" style="margin-bottom:0">
          <label>Tu comentario</label>
          <textarea id="cfText_${d.id}" placeholder="¿Qué te pareció el dispositivo? Comparte tu experiencia…"></textarea>
        </div>
        <button class="submit-btn" onclick="submitComment(${d.id})">📨 Publicar reseña</button>
      </div>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}


function submitComment(id) {
  const nameEl  = document.getElementById('cfName_'  + id);
  const textEl  = document.getElementById('cfText_'  + id);
  const starsEl = document.getElementById('cfStars_' + id);

  const name  = nameEl  ? nameEl.value.trim()  : '';
  const text  = textEl  ? textEl.value.trim()  : '';
  const rating = starsEl ? parseInt(starsEl.value) : 5;

  if (!name || !text) {
    alert('Por favor completa tu nombre y comentario antes de publicar.');
    return;
  }

  saveExtraComment(id, {
    user:  name,
    date:  new Date().toISOString().split('T')[0],
    stars: rating,
    text:  text
  });

  openModal(id); 
}


document.addEventListener('DOMContentLoaded', () => {
  applyFilters();


  document.getElementById('modalOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });


  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});