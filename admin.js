
const fmt   = n => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
const fmtD  = d => new Date(d + 'T00:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
const stars = n => '★'.repeat(Math.floor(n)) + (n % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(n));
const ini   = s => (s || '?').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();


function showToast(msg, type = 'ok') {
  const t = document.getElementById('toast');
  t.textContent = (type === 'ok' ? '✓ ' : '✕ ') + msg;
  t.className   = 'toast ' + type;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}


function nav(panelName, el) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sbl').forEach(l => l.classList.remove('active'));

  const panel = document.getElementById('panel-' + panelName);
  if (panel) panel.classList.add('active');
  if (el) el.classList.add('active');

  if (panelName === 'brands')   renderBrands();
  if (panelName === 'comments') renderCommentsTable();
}


function getFiltered() {
  const q  = (document.getElementById('aSearch')  || { value: '' }).value.toLowerCase();
  const tp = (document.getElementById('aType')    || { value: 'all' }).value;
  const br = (document.getElementById('aBrand')   || { value: 'all' }).value;
  const so = (document.getElementById('aSort')    || { value: 'date' }).value;

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

  return list;
}

function renderTable() {
  const list  = getFiltered();
  const tbody = document.getElementById('tbody');
  const empty = document.getElementById('emptyState');
  const cnt   = document.getElementById('tCount');

  cnt.textContent = list.length + ' dispositivo' + (list.length !== 1 ? 's' : '');


  const all = getAllDevices();
  document.getElementById('stAll').textContent  = all.length;
  document.getElementById('stLbl').textContent  = '↑ ' + all.length + ' total';
  document.getElementById('stCel').textContent  = all.filter(d => d.type === 'celular').length;
  document.getElementById('stPort').textContent = all.filter(d => d.type === 'portatil').length;
  document.getElementById('sbDev').textContent  = all.length;

  if (!list.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = list.map(d => `
    <tr>
      <td>
        <div class="tdname">
          <div class="tdemoji">${d.emoji}</div>
          <div>
            <div class="tdtitle">${d.name}</div>
            <div class="tdsub">${(d.colors || []).slice(0, 2).join(' · ')}</div>
          </div>
        </div>
      </td>
      <td style="font-weight:500">${d.brand}</td>
      <td><span class="pill ${d.type === 'celular' ? 'py' : 'pb'}">${d.type === 'celular' ? '📱 Celular' : '💻 Portátil'}</span></td>
      <td><span class="ptag">${fmt(d.price)}</span></td>
      <td style="font-size:.8rem;color:var(--text2);white-space:nowrap">${fmtD(d.launchDate)}</td>
      <td>
        <span style="color:var(--warn);font-size:.82rem">${'★'.repeat(Math.floor(d.stars))}</span>
        <span style="font-size:.78rem;color:var(--text3)"> ${d.stars} (${d.reviews})</span>
      </td>
      <td><span class="pill pg">● Activo</span></td>
      <td>
        <div class="tdact">
          <button class="bi eye"      onclick="showDetail(${d.id})"      title="Ver detalle">👁</button>
          <button class="bi edit-btn" onclick="openAddModal(${d.id})"   title="Editar">✏️</button>
          <button class="bi del"      onclick="deleteDevice(${d.id})"   title="Eliminar">🗑</button>
        </div>
      </td>
    </tr>`).join('');
}

function resetAdminFilters() {
  document.getElementById('aSearch').value = '';
  document.getElementById('aType').value   = 'all';
  document.getElementById('aBrand').value  = 'all';
  document.getElementById('aSort').value   = 'date';
  renderTable();
}


function showDetail(id) {
  const d = getDeviceById(id);
  if (!d) return;

  const allC = getAllComments(d);

  const specsHtml = Object.entries(d.specs || {}).map(([k, v]) => `
    <div class="sprow">
      <span class="spk">${k}</span>
      <span class="spv">${v}</span>
    </div>`).join('');

  const galHtml = (d.images || []).map(img => `
    <div class="gal-t">${img}</div>`).join('');

  const commentsHtml = allC.length
    ? allC.map(c => `
      <div class="dccard">
        <div class="dctop">
          <div class="dcuw">
            <div class="dcav">${ini(c.user)}</div>
            <div>
              <div class="dcun">${c.user}</div>
              <div class="dcdt">${c.date}</div>
            </div>
          </div>
          <span class="pill ${c.stars >= 4 ? 'pg' : c.stars >= 3 ? 'pw' : 'pr'}">${c.stars}/5</span>
        </div>
        <div class="dcst">${'★'.repeat(c.stars)}${'☆'.repeat(5 - c.stars)}</div>
        <div class="dctx">${c.text}</div>
      </div>`).join('')
    : '<p style="color:var(--text3);font-size:.88rem">Aún no hay reseñas. ¡Sé el primero!</p>';

  document.getElementById('detailContent').innerHTML = `
    <!-- Hero -->
    <div class="dhero">
      <div class="dimg">${d.emoji}</div>
      <div class="dmeta">
        <div class="dbrand">${d.brand}</div>
        <div class="dname">${d.name}</div>
        <div class="drow">
          <span class="pill ${d.type === 'celular' ? 'py' : 'pb'}">${d.type === 'celular' ? '📱 Celular' : '💻 Portátil'}</span>
          <span class="ddate">Lanzamiento: ${fmtD(d.launchDate)}</span>
        </div>
        <div class="dprice">
          ${fmt(d.price)}
          <span style="font-size:.9rem;color:var(--text3)"> / USD ${d.priceUSD || '—'}</span>
        </div>
        <div class="drow">
          <span style="color:var(--warn);font-size:1.1rem">${stars(d.stars)}</span>
          <span style="font-size:.82rem;color:var(--text3)">${d.stars} — ${d.reviews} reseñas</span>
        </div>
        ${d.colors && d.colors.length
          ? `<div class="ctag-wrap">${d.colors.map(c => `<span class="ctag">🎨 ${c}</span>`).join('')}</div>`
          : ''}
        <div class="drow">
          <button class="btn btn-ac btn-sm" onclick="openAddModal(${d.id})">✏️ Editar</button>
          <button class="btn btn-gh btn-sm" onclick="backToList()">← Volver</button>
        </div>
      </div>
    </div>

    <!-- Secciones -->
    <div class="dgrid">

      <!-- Sinopsis -->
      <div class="dsec full">
        <div class="dstitle">📋 Sinopsis / Descripción</div>
        <p class="syntext">${d.synopsis}</p>
      </div>

      <!-- Especificaciones -->
      <div class="dsec">
        <div class="dstitle">⚙️ Especificaciones Técnicas</div>
        ${specsHtml}
      </div>

      <!-- Galería -->
      <div class="dsec">
        <div class="dstitle">🖼️ Galería de Fotos</div>
        <div class="galgrid">${galHtml}</div>
        <p style="font-size:.76rem;color:var(--text3);margin-top:10px">
          Las imágenes se representan con emojis en esta versión frontend.
        </p>
      </div>

      <!-- Colores -->
      ${d.colors && d.colors.length ? `
      <div class="dsec full">
        <div class="dstitle">🎨 Colores Disponibles</div>
        <div class="ctag-wrap">${d.colors.map(c => `<span class="ctag">🎨 ${c}</span>`).join('')}</div>
      </div>` : ''}

      <!-- Comentarios -->
      <div class="dsec full">
        <div class="dstitle">💬 Reseñas y Comentarios (${allC.length})</div>
        <div class="dclist">${commentsHtml}</div>

        <!-- Formulario de reseña -->
        <div class="dcform">
          <div class="dcft">✍️ Agregar reseña</div>
          <div class="dcfrow">
            <div class="dcff">
              <label>Nombre del usuario</label>
              <input type="text" id="dcfN_${d.id}" placeholder="Nombre">
            </div>
            <div class="dcff">
              <label>Calificación</label>
              <select id="dcfS_${d.id}">
                <option value="5">★★★★★ Excelente</option>
                <option value="4">★★★★☆ Muy bueno</option>
                <option value="3">★★★☆☆ Bueno</option>
                <option value="2">★★☆☆☆ Regular</option>
                <option value="1">★☆☆☆☆ Malo</option>
              </select>
            </div>
          </div>
          <div class="dcff full" style="margin-bottom:14px">
            <label>Comentario</label>
            <textarea id="dcfT_${d.id}" placeholder="Escribe la reseña…"></textarea>
          </div>
          <button class="btn btn-ac" onclick="submitDetailComment(${d.id})">📨 Publicar reseña</button>
        </div>
      </div>

    </div>
  `;

 
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-detail').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToList() {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-devices').classList.add('active');
}

function submitDetailComment(id) {
  const nameEl  = document.getElementById('dcfN_' + id);
  const textEl  = document.getElementById('dcfT_' + id);
  const starsEl = document.getElementById('dcfS_' + id);

  const name   = nameEl  ? nameEl.value.trim()  : '';
  const text   = textEl  ? textEl.value.trim()  : '';
  const rating = starsEl ? parseInt(starsEl.value) : 5;

  if (!name || !text) { showToast('Completa nombre y comentario.', 'err'); return; }

  saveExtraComment(id, {
    user:  name,
    date:  new Date().toISOString().split('T')[0],
    stars: rating,
    text:  text
  });

  showToast('¡Reseña publicada!');
  showDetail(id);
}


let editingId = null;

function openAddModal(id = null) {
  editingId = id;

  if (id) {
    const d = getDeviceById(id);
    document.getElementById('mTitle').textContent = '✏️ Editar: ' + d.name;
    document.getElementById('fName').value     = d.name;
    document.getElementById('fBrand').value    = d.brand;
    document.getElementById('fType').value     = d.type;
    document.getElementById('fPrice').value    = d.price;
    document.getElementById('fDate').value     = d.launchDate;
    document.getElementById('fEmoji').value    = d.emoji || '';
    document.getElementById('fColors').value   = (d.colors || []).join(', ');
    document.getElementById('fSynopsis').value = d.synopsis || '';
    document.getElementById('fCpu').value      = d.specs['Procesador'] || '';
    document.getElementById('fRam').value      = d.specs['RAM'] || '';
    document.getElementById('fScreen').value   = d.specs['Pantalla'] || '';
    document.getElementById('fStorage').value  = d.specs['Almacenamiento'] || '';
    document.getElementById('fCamera').value   = d.specs['Cámara'] || d.specs['Cámara Principal'] || '';
    document.getElementById('fBattery').value  = d.specs['Batería'] || '';
    document.getElementById('fOs').value       = d.specs['Sistema Operativo'] || '';
    document.getElementById('fConn').value     = d.specs['Conectividad'] || '';
  } else {
    document.getElementById('mTitle').textContent = '➕ Nuevo Dispositivo';
    ['fName','fPrice','fDate','fEmoji','fColors','fSynopsis',
     'fCpu','fRam','fScreen','fStorage','fCamera','fBattery','fOs','fConn']
      .forEach(fieldId => document.getElementById(fieldId).value = '');
  }

  document.getElementById('addOverlay').classList.add('open');
}

function closeAddModal(e) {
  if (!e || e.target === document.getElementById('addOverlay') || !e.target) {
    document.getElementById('addOverlay').classList.remove('open');
  }
}

function saveDevice() {
  const name     = document.getElementById('fName').value.trim();
  const price    = parseFloat(document.getElementById('fPrice').value);
  const date     = document.getElementById('fDate').value;
  const synopsis = document.getElementById('fSynopsis').value.trim();

  if (!name || !price || !date || !synopsis) {
    showToast('Completa los campos obligatorios (*)', 'err');
    return;
  }


  const specs = {};
  const addSpec = (key, fieldId) => {
    const val = document.getElementById(fieldId).value.trim();
    if (val) specs[key] = val;
  };
  addSpec('Pantalla', 'fScreen');
  addSpec('Procesador', 'fCpu');
  addSpec('RAM', 'fRam');
  addSpec('Almacenamiento', 'fStorage');
  addSpec('Cámara', 'fCamera');
  addSpec('Batería', 'fBattery');
  addSpec('Sistema Operativo', 'fOs');
  addSpec('Conectividad', 'fConn');

  const device = {
    name,
    brand:       document.getElementById('fBrand').value,
    type:        document.getElementById('fType').value,
    price,
    priceUSD:    Math.round(price / 3900),
    launchDate:  date,
    emoji:       document.getElementById('fEmoji').value.trim() || '📱',
    colors:      document.getElementById('fColors').value.split(',').map(c => c.trim()).filter(Boolean),
    synopsis,
    specs
  };

  if (editingId) {
    const extras = getAdminDevices();
    const idx    = extras.findIndex(d => d.id === editingId);
    if (idx >= 0) {
      extras[idx] = { ...extras[idx], ...device };
      saveAdminDevices(extras);
      showToast('Dispositivo actualizado.');
    } else {
      showToast('Solo se pueden editar dispositivos añadidos desde el admin.', 'err');
    }
  } else {
    const extras = getAdminDevices();
    extras.push({
      ...device,
      id:       Date.now(),
      stars:    0,
      reviews:  0,
      images:   ['📱', '📸', '⚡', '🎨'],
      comments: []
    });
    saveAdminDevices(extras);
    showToast('¡Dispositivo agregado al catálogo!');
  }

  closeAddModal();
  renderTable();
}

function deleteDevice(id) {
  if (!confirm('¿Eliminar este dispositivo del catálogo?')) return;
  const extras = getAdminDevices().filter(d => d.id !== id);
  saveAdminDevices(extras);
  showToast('Dispositivo eliminado.', 'error');
  renderTable();
}


const BRANDS = [
  { logo: '🍎', name: 'Apple',   country: 'EE.UU.',        types: 'Celulares, Portátiles', count: 3 },
  { logo: '🌌', name: 'Samsung', country: 'Corea del Sur', types: 'Celulares',              count: 3 },
  { logo: '🔶', name: 'Xiaomi',  country: 'China',         types: 'Celulares',              count: 2 },
  { logo: '💻', name: 'Dell',    country: 'EE.UU.',        types: 'Portátiles',             count: 1 },
  { logo: '🖨️', name: 'HP',      country: 'EE.UU.',        types: 'Portátiles',             count: 1 },
  { logo: '🔵', name: 'Lenovo',  country: 'China',         types: 'Portátiles',             count: 2 },
  { logo: '⚡', name: 'ASUS',    country: 'Taiwán',        types: 'Portátiles',             count: 1 },
];

function renderBrands() {
  document.getElementById('brandsGrid').innerHTML = BRANDS.map(b => `
    <div class="bcard">
      <div style="font-size:2.5rem;margin-bottom:12px">${b.logo}</div>
      <div style="font-family:var(--fd);font-size:1rem;font-weight:700;margin-bottom:4px">${b.name}</div>
      <div style="font-size:.78rem;color:var(--text3);margin-bottom:6px">📍 ${b.country}</div>
      <div style="font-size:.75rem;color:var(--text2);margin-bottom:12px">${b.types}</div>
      <span style="font-family:var(--fm);font-size:.75rem;color:var(--accent);background:rgba(232,255,58,.08);padding:3px 10px;border-radius:99px">
        ${b.count} dispositivo${b.count !== 1 ? 's' : ''}
      </span>
    </div>`).join('');
}


function renderCommentsTable() {
  const allComments = getAllDevices().flatMap(d =>
    getAllComments(d).map(c => ({ ...c, dname: d.name, did: d.id }))
  );

  document.getElementById('sbCom').textContent = allComments.length;

  document.getElementById('ctbody').innerHTML = allComments.map(c => `
    <tr>
      <td>
        <div class="tdname">
          <div class="dcav" style="width:30px;height:30px;font-size:.7rem">${ini(c.user)}</div>
          <span style="font-weight:600;font-size:.88rem">${c.user}</span>
        </div>
      </td>
      <td style="font-size:.85rem">${c.dname}</td>
      <td><span style="color:var(--warn)">${'★'.repeat(c.stars)}</span></td>
      <td style="font-size:.82rem;color:var(--text2);max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.text}</td>
      <td style="font-size:.8rem;color:var(--text3)">${c.date}</td>
      <td>
        <div class="tdact">
          <button class="bi eye" onclick="showDetail(${c.did})" title="Ver dispositivo">👁</button>
          <button class="bi del" title="Eliminar">🗑</button>
        </div>
      </td>
    </tr>`).join('');
}


document.addEventListener('DOMContentLoaded', () => {
  renderTable();

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAddModal();
  });
});