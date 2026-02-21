

const DEVICES = [
  {
    id: 1, type: 'celular', brand: 'Apple', name: 'iPhone 16 Pro Max',
    price: 4899000, priceUSD: 1199, launchDate: '2024-09-20', emoji: '📱', stars: 4.8, reviews: 312,
    colors: ['Titanio Negro', 'Titanio Blanco', 'Titanio Desert'],
    synopsis: 'El iPhone 16 Pro Max es la evolución definitiva de la gama Pro. Con su nuevo chip A18 Pro, cámara de 48 MP con zoom óptico 5x y pantalla ProMotion de 6.9 pulgadas, redefine lo que es posible en un smartphone. Su diseño en titanio y el nuevo Control de Cámara hacen de este dispositivo una herramienta de creación sin igual.',
    specs: {
      'Pantalla': '6.9" Super Retina XDR, 120 Hz',
      'Procesador': 'Apple A18 Pro',
      'RAM': '8 GB',
      'Almacenamiento': 'Hasta 1 TB',
      'Cámara': '48 MP, f/1.78',
      'Batería': '4685 mAh',
      'Sistema Operativo': 'iOS 18',
      'Conectividad': '5G, Wi-Fi 7, BT 5.3',
      'Resistencia': 'IP68',
      'Dimensiones': '163 × 77.6 × 8.25 mm'
    },
    images: ['📸', '🖥️', '⚡', '🎨'],
    comments: [
      { user: 'María L.',    date: '2024-10-15', stars: 5, text: 'La cámara es increíble, las fotos en modo nocturno son espectaculares. Muy contenta con la compra.' },
      { user: 'Carlos R.',   date: '2024-11-02', stars: 4, text: 'Excelente dispositivo, la pantalla es hermosa. El precio es elevado pero vale la pena.' },
      { user: 'Valentina S.',date: '2024-12-01', stars: 5, text: 'El mejor teléfono que he tenido. El zoom óptico 5x es una revolución para fotografía de viajes.' }
    ]
  },
  {
    id: 2, type: 'celular', brand: 'Samsung', name: 'Galaxy S25 Ultra',
    price: 4299000, priceUSD: 1099, launchDate: '2025-01-22', emoji: '📲', stars: 4.7, reviews: 203,
    colors: ['Titanio Black', 'Titanio Silver', 'Titanio White'],
    synopsis: 'El Galaxy S25 Ultra lleva la Serie S a nuevos horizontes con el S Pen mejorado, el potente chip Snapdragon 8 Elite y una cámara de 200 MP. La IA generativa integrada de Samsung transforma la manera en que interactuamos con el smartphone.',
    specs: {
      'Pantalla': '6.9" Dynamic AMOLED 2X, 120 Hz',
      'Procesador': 'Snapdragon 8 Elite',
      'RAM': '12 GB',
      'Almacenamiento': 'Hasta 1 TB',
      'Cámara': '200 MP, f/1.7',
      'Batería': '5000 mAh',
      'S Pen': 'Integrado',
      'Resistencia': 'IP68',
      'Sistema Operativo': 'Android 15, One UI 7',
      'Carga': '45W + 15W wireless'
    },
    images: ['✏️', '📸', '🤖', '🌙'],
    comments: [
      { user: 'Andrés P.', date: '2025-02-01', stars: 5, text: 'El S Pen es una pasada, lo uso para tomar notas en reuniones. La pantalla es la mejor que he visto.' },
      { user: 'Laura M.',  date: '2025-02-05', stars: 4, text: 'Muy buen teléfono, aunque es grande. La IA integrada realmente sorprende.' }
    ]
  },
  {
    id: 3, type: 'celular', brand: 'Xiaomi', name: 'Xiaomi 15 Pro',
    price: 2899000, priceUSD: 749, launchDate: '2024-11-26', emoji: '📱', stars: 4.5, reviews: 156,
    colors: ['Negro Volcán', 'Blanco Nieve', 'Azul Océano'],
    synopsis: 'El Xiaomi 15 Pro es el flagship más ambicioso de Xiaomi hasta la fecha. Con óptica Leica de última generación, pantalla AMOLED de 6.73 pulgadas y carga inalámbrica de 80W, ofrece prestaciones de alta gama a un precio mucho más accesible.',
    specs: {
      'Pantalla': '6.73" AMOLED, 120 Hz',
      'Procesador': 'Snapdragon 8 Elite',
      'RAM': '12 GB',
      'Almacenamiento': 'Hasta 512 GB',
      'Cámara': '50 MP Leica',
      'Batería': '6100 mAh',
      'Carga': '90W + 50W wireless',
      'Sistema Operativo': 'Android 15, HyperOS 2',
      'Resistencia': 'IP68',
      'Peso': '219 g'
    },
    images: ['🔬', '⚡', '📸', '🟠'],
    comments: [
      { user: 'Diego H.',    date: '2024-12-10', stars: 5, text: 'La batería dura todo el día y la carga es rapidísima. Excelente relación calidad-precio.' },
      { user: 'Patricia G.', date: '2025-01-08', stars: 4, text: 'Las fotos con la cámara Leica son espectaculares. Muy contenta con el rendimiento general.' }
    ]
  },
  {
    id: 4, type: 'celular', brand: 'Samsung', name: 'Galaxy Z Fold 6',
    price: 6499000, priceUSD: 1699, launchDate: '2024-07-10', emoji: '🔁', stars: 4.6, reviews: 98,
    colors: ['Crafted Black', 'Pink', 'Navy'],
    synopsis: 'El Galaxy Z Fold 6 es el smartphone plegable definitivo de Samsung. Con pantalla interior de 7.6 pulgadas y Snapdragon 8 Gen 3, combina productividad de tablet con portabilidad de smartphone.',
    specs: {
      'Pantalla Int.': '7.6" Dynamic AMOLED 2X',
      'Pantalla Ext.': '6.3" Dynamic AMOLED 2X',
      'Procesador': 'Snapdragon 8 Gen 3',
      'RAM': '12 GB',
      'Almacenamiento': 'Hasta 1 TB',
      'Cámara': '50 MP',
      'Batería': '4400 mAh',
      'Sistema Operativo': 'Android 14',
      'Diseño': 'Plegable libro',
      'Resistencia': 'IPX8'
    },
    images: ['🔁', '💼', '✏️', '🌟'],
    comments: [
      { user: 'Roberto A.', date: '2024-09-15', stars: 5, text: 'Increíble dispositivo para productividad. Uso la pantalla grande para revisar documentos.' }
    ]
  },
  {
    id: 5, type: 'celular', brand: 'Apple', name: 'iPhone 16',
    price: 3299000, priceUSD: 799, launchDate: '2024-09-20', emoji: '📱', stars: 4.6, reviews: 445,
    colors: ['Rosa', 'Verde', 'Azul Ultramar', 'Negro', 'Blanco'],
    synopsis: 'El iPhone 16 estándar trae el potente chip A18, cámara de 48 MP con mejoras significativas, la nueva función de control de cámara y el botón de acción. El iPhone para la mayoría.',
    specs: {
      'Pantalla': '6.1" Super Retina XDR',
      'Procesador': 'Apple A18',
      'RAM': '8 GB',
      'Almacenamiento': 'Hasta 512 GB',
      'Cámara': '48 MP, f/1.6',
      'Batería': '3561 mAh',
      'Sistema Operativo': 'iOS 18',
      'Conectividad': '5G, Wi-Fi 7',
      'Resistencia': 'IP68',
      'Extras': 'Botón Acción + Control Cámara'
    },
    images: ['🎨', '📸', '🎵', '✨'],
    comments: [
      { user: 'Sandra B.', date: '2024-10-08', stars: 5, text: 'Actualización perfecta desde mi iPhone 13. El control de cámara es muy cómodo de usar.' },
      { user: 'Felipe G.', date: '2024-10-22', stars: 4, text: 'Buen teléfono pero esperaba más novedad en diseño. El rendimiento es excelente.' },
      { user: 'Camila V.', date: '2024-11-30', stars: 5, text: 'La batería mejoró mucho respecto a versiones anteriores. Muy satisfecha con la compra.' }
    ]
  },
  {
    id: 6, type: 'celular', brand: 'Samsung', name: 'Galaxy A55 5G',
    price: 1899000, priceUSD: 499, launchDate: '2024-03-11', emoji: '📱', stars: 4.2, reviews: 289,
    colors: ['Azul Hielo', 'Lima', 'Negro Genial'],
    synopsis: 'El Galaxy A55 5G democratiza las características premium de Samsung. Diseño metálico, cámara IA de 50MP con OIS y batería de 5000mAh. La opción ideal para quien quiere calidad Samsung sin el precio de un Ultra.',
    specs: {
      'Pantalla': '6.6" Super AMOLED, 120 Hz',
      'Procesador': 'Exynos 1480',
      'RAM': '8 GB',
      'Almacenamiento': 'Hasta 256 GB',
      'Cámara': '50 MP OIS',
      'Batería': '5000 mAh',
      'Sistema Operativo': 'Android 14, One UI 6.1',
      'Conectividad': '5G, Wi-Fi 6',
      'Resistencia': 'IP67',
      'Peso': '213 g'
    },
    images: ['📱', '🔵', '📸', '⚡'],
    comments: [
      { user: 'Pedro M.',    date: '2024-05-10', stars: 4, text: 'Excelente relación precio-calidad. La pantalla AMOLED es hermosa para ver videos.' },
      { user: 'Isabella C.', date: '2024-06-22', stars: 4, text: 'Buena cámara para el precio. La batería dura tranquilamente todo el día.' }
    ]
  },
  {
    id: 7, type: 'celular', brand: 'Xiaomi', name: 'Redmi Note 13 Pro+',
    price: 1499000, priceUSD: 399, launchDate: '2023-09-21', emoji: '📱', stars: 4.3, reviews: 520,
    colors: ['Aurora Purple', 'Moonlight White', 'Midnight Black'],
    synopsis: 'El Redmi Note 13 Pro+ democratiza las cámaras de 200 MP. Con carga rápida de 120W, pantalla AMOLED a 120 Hz y diseño de vidrio curvo. El rey de la relación calidad-precio en gama media.',
    specs: {
      'Pantalla': '6.67" AMOLED, 120 Hz',
      'Procesador': 'MediaTek Dimensity 7200 Ultra',
      'RAM': '12 GB',
      'Almacenamiento': 'Hasta 512 GB',
      'Cámara': '200 MP, f/1.65',
      'Batería': '5000 mAh',
      'Carga': '120W HyperCharge',
      'Sistema Operativo': 'MIUI 14 / Android 13',
      'Resistencia': 'IP68',
      'Peso': '204 g'
    },
    images: ['📸', '💜', '⚡', '🌊'],
    comments: [
      { user: 'Valentina R.', date: '2023-11-15', stars: 4, text: 'Por el precio, las fotos son increíbles. La carga de 120W es un game changer absoluto.' },
      { user: 'Marco P.',     date: '2024-01-10', stars: 5, text: 'Increíble teléfono. La batería de 5000mAh dura 2 días con uso normal.' }
    ]
  },
  {
    id: 8, type: 'portatil', brand: 'Apple', name: 'MacBook Pro 14" M4 Pro',
    price: 9299000, priceUSD: 1999, launchDate: '2024-11-08', emoji: '💻', stars: 4.9, reviews: 187,
    colors: ['Plata', 'Negro Espacial'],
    synopsis: 'El MacBook Pro con chip M4 Pro es la laptop definitiva para profesionales creativos. Su pantalla Liquid Retina XDR de 14.2 pulgadas con 120Hz, batería de hasta 24 horas y el nuevo chip M4 Pro con 14 núcleos CPU lo convierten en la herramienta más poderosa del mercado.',
    specs: {
      'Pantalla': '14.2" Liquid Retina XDR, 120 Hz',
      'Procesador': 'Apple M4 Pro (14 núcleos)',
      'RAM': 'Hasta 64 GB',
      'Almacenamiento': 'Hasta 8 TB SSD',
      'GPU': 'M4 Pro 20 núcleos GPU',
      'Batería': 'Hasta 24 horas',
      'Puertos': 'Thunderbolt 4 ×3, HDMI, SD, MagSafe',
      'Sistema Operativo': 'macOS Sequoia',
      'Cámara': '12 MP Center Stage',
      'Peso': '1.55 kg'
    },
    images: ['🎬', '🎵', '💡', '🖥️'],
    comments: [
      { user: 'Ricardo V.', date: '2024-12-01', stars: 5, text: 'Para edición de video y fotografía es insuperable. La batería realmente dura todo el día.' },
      { user: 'Natalia F.', date: '2024-12-15', stars: 5, text: 'La pantalla es increíble para diseño gráfico. La inversión más acertada que he hecho.' },
      { user: 'Jorge A.',   date: '2025-01-20', stars: 5, text: 'Programo 10 horas al día y la batería aguanta perfectamente. El rendimiento es brutal.' }
    ]
  },
  {
    id: 9, type: 'portatil', brand: 'Apple', name: 'MacBook Air M3 13"',
    price: 5999000, priceUSD: 1099, launchDate: '2024-03-08', emoji: '💻', stars: 4.7, reviews: 310,
    colors: ['Medianoche', 'Blanco Estrella', 'Cielo', 'Plata'],
    synopsis: 'El MacBook Air M3 es la laptop perfecta para la mayoría de usuarios. Ultradelgada, completamente silenciosa sin ventiladores y con autonomía de hasta 18 horas. Ahora con soporte para dos monitores externos simultáneamente.',
    specs: {
      'Pantalla': '13.6" Liquid Retina',
      'Procesador': 'Apple M3 (8 núcleos CPU)',
      'RAM': 'Hasta 24 GB',
      'Almacenamiento': 'Hasta 2 TB SSD',
      'GPU': 'M3 10 núcleos GPU',
      'Batería': 'Hasta 18 horas',
      'Puertos': 'MagSafe 3, Thunderbolt 3 ×2, Jack 3.5mm',
      'Sistema Operativo': 'macOS Sonoma',
      'Cámara': '1080p FaceTime',
      'Peso': '1.24 kg'
    },
    images: ['✈️', '🌟', '💨', '🎨'],
    comments: [
      { user: 'Ana G.',   date: '2024-04-20', stars: 5, text: 'La mejor laptop que he tenido. Silenciosa, ligera y rapidísima para todo lo que hago.' },
      { user: 'Luis M.',  date: '2024-05-15', stars: 4, text: 'Excelente para estudiantes. La batería dura fácil 2 días con uso ligero.' }
    ]
  },
  {
    id: 10, type: 'portatil', brand: 'Dell', name: 'Dell XPS 15 (2024)',
    price: 7499000, priceUSD: 1799, launchDate: '2024-05-15', emoji: '💻', stars: 4.5, reviews: 132,
    colors: ['Platinum Silver', 'Graphite'],
    synopsis: 'El Dell XPS 15 2024 es la referencia en laptops Windows premium para creativos. Con pantalla OLED 4K de 15.6 pulgadas a 120Hz, Intel Core Ultra 9 y NVIDIA RTX 4070, ofrece rendimiento profesional en un diseño elegante.',
    specs: {
      'Pantalla': '15.6" OLED 4K, 120 Hz',
      'Procesador': 'Intel Core Ultra 9 185H',
      'RAM': 'Hasta 64 GB DDR5',
      'Almacenamiento': 'Hasta 2 TB NVMe',
      'GPU': 'NVIDIA RTX 4070 8GB',
      'Batería': '86 Wh, hasta 13h',
      'Puertos': 'Thunderbolt 4 ×2, USB-A, SD, HDMI 2.1',
      'Sistema Operativo': 'Windows 11 Home',
      'Webcam': '2 MP IR FHD',
      'Peso': '1.86 kg'
    },
    images: ['🎮', '🖥️', '⚡', '🔌'],
    comments: [
      { user: 'Juliana P.', date: '2024-07-10', stars: 5, text: 'Para desarrollo y diseño es perfecta. La pantalla OLED 4K es una maravilla para los ojos.' },
      { user: 'Tomás R.',   date: '2024-08-25', stars: 4, text: 'Excelente laptop pero la batería podría durar más. El rendimiento con la RTX 4070 es brutal.' }
    ]
  },
  {
    id: 11, type: 'portatil', brand: 'HP', name: 'HP Spectre x360 14',
    price: 5999000, priceUSD: 1549, launchDate: '2024-06-01', emoji: '💻', stars: 4.4, reviews: 89,
    colors: ['Nightfall Black', 'Nocturne Blue'],
    synopsis: 'El HP Spectre x360 14 es un convertible premium con pantalla táctil OLED 2.8K y lápiz digital incluido. Su diseño 360 grados permite usarlo como laptop, tablet o en modo presentación.',
    specs: {
      'Pantalla': '14" OLED Touch 2.8K, 120 Hz',
      'Procesador': 'Intel Core Ultra 7 155H',
      'RAM': '16 GB LPDDR5',
      'Almacenamiento': '1 TB NVMe SSD',
      'GPU': 'Intel Arc Graphics',
      'Batería': '64 Wh, hasta 17h',
      'Forma': 'Convertible 360°',
      'Lápiz': 'HP Tilt Pen incluido',
      'Sistema Operativo': 'Windows 11 Home',
      'Peso': '1.4 kg'
    },
    images: ['✏️', '🔄', '🎨', '📐'],
    comments: [
      { user: 'Mónica S.',   date: '2024-08-20', stars: 4, text: 'Excelente para estudiar y trabajar. Uso la pantalla táctil y el lápiz constantemente.' },
      { user: 'Daniela C.', date: '2024-09-12', stars: 5, text: 'El lápiz es increíble para tomar notas y hacer bocetos. El display OLED es de otro mundo.' }
    ]
  },
  {
    id: 12, type: 'portatil', brand: 'Lenovo', name: 'ThinkPad X1 Carbon Gen 12',
    price: 6299000, priceUSD: 1599, launchDate: '2024-04-10', emoji: '💼', stars: 4.7, reviews: 210,
    colors: ['Deep Black'],
    synopsis: 'La leyenda empresarial continúa. El ThinkPad X1 Carbon Gen 12 ofrece la combinación perfecta de rendimiento, durabilidad certificada militarmente y autonomía excepcional en un cuerpo de solo 1.12 kg.',
    specs: {
      'Pantalla': '14" IPS 2.8K, 60 Hz',
      'Procesador': 'Intel Core Ultra 7 165U',
      'RAM': 'Hasta 64 GB LPDDR5',
      'Almacenamiento': 'Hasta 2 TB NVMe',
      'Batería': '57 Wh, hasta 15h',
      'Certificación': 'MIL-SPEC 810H',
      'Teclado': 'Retroiluminado + TrackPoint',
      'Seguridad': 'Lector huella + IR Face',
      'Sistema Operativo': 'Windows 11 Pro',
      'Peso': '1.12 kg'
    },
    images: ['💼', '🔒', '⚡', '✈️'],
    comments: [
      { user: 'Germán T.', date: '2024-06-05', stars: 5, text: 'La laptop más confiable que he tenido en 15 años de carrera. El teclado es un placer.' },
      { user: 'Andrea L.', date: '2024-07-18', stars: 5, text: 'Para viajes de negocios es insuperable. Ligera, potente y la batería dura todo un vuelo largo.' }
    ]
  },
  {
    id: 13, type: 'portatil', brand: 'ASUS', name: 'ROG Zephyrus G16 (2024)',
    price: 8499000, priceUSD: 2199, launchDate: '2024-03-18', emoji: '🎮', stars: 4.6, reviews: 145,
    colors: ['Eclipse Gray', 'Platinum White'],
    synopsis: 'El ROG Zephyrus G16 2024 es la laptop gaming más elegante del mercado. Con pantalla QHD+ OLED 240Hz, RTX 4090 móvil y diseño ultradelgado de 15.9mm, rompe todos los esquemas del gaming portátil.',
    specs: {
      'Pantalla': '16" QHD+ OLED, 240 Hz',
      'Procesador': 'Intel Core Ultra 9 185H',
      'RAM': '32 GB DDR5',
      'Almacenamiento': '2 TB NVMe SSD',
      'GPU': 'NVIDIA RTX 4090 16GB',
      'Batería': '90 Wh, carga 100W',
      'Refrigeración': 'Liquid Metal + Triple Fan',
      'Sistema Operativo': 'Windows 11 Home',
      'Audio': 'Dolby Atmos 6 altavoces',
      'Peso': '1.85 kg'
    },
    images: ['🎮', '🔥', '⚡', '🌈'],
    comments: [
      { user: 'Sebastián A.', date: '2024-05-12', stars: 5, text: 'Bestial para gaming, juego en ultra todo sin problemas. El diseño es lo más premium que he visto.' },
      { user: 'Nicolás B.',   date: '2024-06-30', stars: 4, text: 'Rendimiento increíble. La pantalla OLED 240Hz es una locura para juegos competitivos.' }
    ]
  },
  {
    id: 14, type: 'portatil', brand: 'Lenovo', name: 'IdeaPad 5 Pro 16"',
    price: 3299000, priceUSD: 849, launchDate: '2024-01-05', emoji: '💻', stars: 4.2, reviews: 178,
    colors: ['Cloud Grey', 'Abyss Blue'],
    synopsis: 'El IdeaPad 5 Pro es la opción premium de gama media de Lenovo. Con pantalla 2.8K a 90 Hz, AMD Ryzen 7 y batería de 75 Wh, ideal para estudiantes y profesionales que buscan calidad sin gastar en exceso.',
    specs: {
      'Pantalla': '16" 2.8K IPS, 90 Hz',
      'Procesador': 'AMD Ryzen 7 8745H',
      'RAM': '16 GB DDR5',
      'Almacenamiento': '512 GB NVMe SSD',
      'GPU': 'AMD Radeon 780M integrada',
      'Batería': '75 Wh, hasta 14h',
      'Puertos': 'USB-C ×2, USB-A ×2, HDMI',
      'Sistema Operativo': 'Windows 11 Home',
      'Webcam': '1080p FHD con IA',
      'Peso': '1.68 kg'
    },
    images: ['📚', '🎨', '💡', '🖱️'],
    comments: [
      { user: 'Camila O.',   date: '2024-03-20', stars: 4, text: 'Perfecta para la universidad. Ligera y la batería aguanta todo el día de clases.' },
      { user: 'Esteban M.', date: '2024-04-10', stars: 4, text: 'Muy buena pantalla para el precio. El AMD Ryzen 7 corre todo lo que necesito sin problemas.' }
    ]
  }
];


function getExtraComments(deviceId) {
  try { return JSON.parse(sessionStorage.getItem('tpc_' + deviceId) || '[]'); }
  catch (e) { return []; }
}

function saveExtraComment(deviceId, comment) {
  const arr = getExtraComments(deviceId);
  arr.push(comment);
  sessionStorage.setItem('tpc_' + deviceId, JSON.stringify(arr));
}


function getAdminDevices() {
  try { return JSON.parse(sessionStorage.getItem('tp_dev') || '[]'); }
  catch (e) { return []; }
}

function saveAdminDevices(list) {
  sessionStorage.setItem('tp_dev', JSON.stringify(list));
}


function getAllDevices() {
  return [...DEVICES, ...getAdminDevices()];
}

function getDeviceById(id) {
  return getAllDevices().find(d => d.id === id);
}


function getAllComments(device) {
  return [...(device.comments || []), ...getExtraComments(device.id)];
}