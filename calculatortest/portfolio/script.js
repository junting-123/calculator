const projects = [
  {
    id: 1,
    name: '赛博朋克城市',
    tag: 'Text2Image',
    desc: '通过多轮 Prompt 迭代，构建霓虹灯下的未来都市场景，强调光影层次与建筑细节。',
    image: 'https://picsum.photos/seed/cyberpunk/800/500',
    imageBefore: 'https://picsum.photos/seed/cyberpunk-before/800/500',
    imageAfter: 'https://picsum.photos/seed/cyberpunk-after/800/500',
    prompts: [
      { version: 'v1', text: 'cyberpunk city, neon lights, night — 基础场景描述，画面偏暗且缺乏细节' },
      { version: 'v2', text: 'cyberpunk cityscape, neon signs, rain-soaked streets, volumetric fog, cinematic lighting — 增加氛围与光照关键词' },
      { version: 'v3', text: '(masterpiece:1.2), cyberpunk megacity, towering skyscrapers, holographic billboards, neon pink and cyan, wet reflective pavement, blade runner style, 8k uhd — 最终优化版，权重控制 + 风格锚定' },
    ],
    params: { cfg: '7.5', steps: '30', sampler: 'DPM++ 2M Karras' },
  },
  {
    id: 2,
    name: '古风人像',
    tag: 'ControlNet',
    desc: '结合 OpenPose + Depth ControlNet，实现精准姿态控制下的古风人物渲染。',
    image: 'https://picsum.photos/seed/ancient/800/500',
    imageBefore: 'https://picsum.photos/seed/ancient-before/800/500',
    imageAfter: 'https://picsum.photos/seed/ancient-after/800/500',
    prompts: [
      { version: 'v1', text: 'chinese ancient woman, hanfu, portrait — 人物基础描述，面部细节不足' },
      { version: 'v2', text: 'beautiful chinese woman in traditional hanfu, delicate features, soft natural lighting, ink wash painting style — 加入风格与光照描述' },
      { version: 'v3', text: '(best quality:1.3), 1girl, elegant hanfu dress, flowing sleeves, cherry blossom background, guofeng aesthetic, detailed embroidery, soft bokeh — ControlNet 引导 + 精细 Prompt' },
    ],
    params: { cfg: '8.0', steps: '28', sampler: 'Euler a' },
  },
  {
    id: 3,
    name: '产品渲染',
    tag: 'Img2Img',
    desc: '基于参考图的图生图工作流，优化材质质感与商业级光影表现。',
    image: 'https://picsum.photos/seed/product/800/500',
    imageBefore: 'https://picsum.photos/seed/product-before/800/500',
    imageAfter: 'https://picsum.photos/seed/product-after/800/500',
    prompts: [
      { version: 'v1', text: 'product photo, headphones on desk — 简单描述，材质表现平庸' },
      { version: 'v2', text: 'professional product photography, wireless headphones, studio lighting, clean white background — 加入商业摄影关键词' },
      { version: 'v3', text: '(photorealistic:1.2), premium wireless headphones, brushed aluminum texture, soft box lighting, caustic reflections, commercial ad quality, 4k — 材质 + 光影精细控制' },
    ],
    params: { cfg: '6.5', steps: '25', sampler: 'DDIM' },
  },
];

function renderPortfolioCards() {
  const grid = document.getElementById('portfolioGrid');
  grid.innerHTML = projects.map((p, i) => `
    <article class="project-card fade-in" data-id="${p.id}" style="transition-delay: ${i * 0.1}s">
      <div class="project-card__image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="project-card__overlay">
          <span class="project-card__tag">${p.tag}</span>
        </div>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${p.name}</h3>
        <p class="project-card__desc">${p.desc}</p>
        <div class="project-card__params">
          <span class="param-chip">CFG ${p.params.cfg}</span>
          <span class="param-chip">${p.params.steps} Steps</span>
          <span class="param-chip">${p.params.sampler}</span>
        </div>
        <div class="project-card__cta">查看详情 →</div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.id)));
  });

  observeFadeElements(grid.querySelectorAll('.fade-in'));
}

function openModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modalBody');

  body.innerHTML = `
    <h2 class="modal__title">${project.name}</h2>
    <p class="modal__subtitle">${project.tag} · ${project.desc}</p>
    <div class="modal__image">
      <img src="${project.image}" alt="${project.name}">
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">Prompt 迭代过程</h3>
      <div class="prompt-timeline">
        ${project.prompts.map(p => `
          <div class="prompt-step">
            <div class="prompt-step__label">${p.version}</div>
            <div class="prompt-step__text">${p.text}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">关键参数</h3>
      <div class="params-grid">
        <div class="param-box">
          <div class="param-box__label">CFG Scale</div>
          <div class="param-box__value">${project.params.cfg}</div>
        </div>
        <div class="param-box">
          <div class="param-box__label">Steps</div>
          <div class="param-box__value">${project.params.steps}</div>
        </div>
        <div class="param-box">
          <div class="param-box__label">Sampler</div>
          <div class="param-box__value">${project.params.sampler}</div>
        </div>
      </div>
    </div>

    <div class="modal__section">
      <h3 class="modal__section-title">优化前后对比</h3>
      <div class="comparison" data-comparison>
        <div class="comparison__before">
          <img src="${project.imageBefore}" alt="优化前">
        </div>
        <div class="comparison__after">
          <img src="${project.imageAfter}" alt="优化后">
        </div>
        <div class="comparison__slider"></div>
        <div class="comparison__labels">
          <span class="comparison__label comparison__label--before">优化前</span>
          <span class="comparison__label comparison__label--after">优化后</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  initComparison(body.querySelector('[data-comparison]'));
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initComparison(el) {
  if (!el) return;
  const after = el.querySelector('.comparison__after');
  const slider = el.querySelector('.comparison__slider');
  let dragging = false;

  function setPosition(x) {
    const rect = el.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(5, Math.min(95, pct));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    slider.style.left = `${pct}%`;
  }

  slider.addEventListener('mousedown', () => { dragging = true; });
  document.addEventListener('mouseup', () => { dragging = false; });
  el.addEventListener('mousemove', (e) => { if (dragging) setPosition(e.clientX); });
  el.addEventListener('touchmove', (e) => { setPosition(e.touches[0].clientX); }, { passive: true });
  el.addEventListener('click', (e) => setPosition(e.clientX));
}

function observeFadeElements(elements) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

function initNav() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const navLinks = links.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

function initModal() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolioCards();
  initNav();
  initModal();
  observeFadeElements(document.querySelectorAll('.fade-in:not(.project-card)'));
});
