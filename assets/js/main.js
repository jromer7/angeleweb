

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
      
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });




  /**
   * Hero Slideshow - Swiper con efecto fade entre imágenes
   */
  const heroSwiper = document.querySelector('.hero-swiper');
  if (heroSwiper) {
    new Swiper('.hero-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true   // desvanecimiento cruzado suave
      },
      speed: 1500,        // duración de la transición en ms
      autoplay: {
        delay: 2000,      // tiempo entre cada imagen en ms
        disableOnInteraction: false
      },
      allowTouchMove: false  // deshabilitar swipe manual (es solo fondo)
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });


  /**
   * Carrusel de imágenes en cada anuncio
   * + Lightbox con navegación entre todas las fotos del anuncio
   */
  (function() {

    /* ── 1. Inicializar cada carrusel ── */
    document.querySelectorAll('.anuncio-carrusel').forEach(car => {
      const pista  = car.querySelector('.car-pista');
      const imgs   = Array.from(pista.querySelectorAll('img'));
      const prev   = car.querySelector('.car-prev');
      const next   = car.querySelector('.car-next');
      const puntos = car.querySelector('.car-puntos');
      let idx = 0;

      // Crear puntos indicadores
      imgs.forEach((_, i) => {
        const p = document.createElement('button');
        p.className = 'car-punto' + (i === 0 ? ' activo' : '');
        p.setAttribute('aria-label', 'Foto ' + (i + 1));
        p.addEventListener('click', () => ir(i));
        puntos.appendChild(p);
      });

      function actualizar() {
        pista.style.transform = `translateX(-${idx * 130}px)`;  // 130 = ancho imagen
        car.querySelectorAll('.car-punto').forEach((p, i) =>
          p.classList.toggle('activo', i === idx)
        );
        prev.classList.toggle('oculto', imgs.length <= 1);
        next.classList.toggle('oculto', imgs.length <= 1);
      }

      function ir(n) {
        idx = (n + imgs.length) % imgs.length;
        actualizar();
      }

      prev.addEventListener('click', () => ir(idx - 1));
      next.addEventListener('click', () => ir(idx + 1));

      // Guardar referencia para el lightbox
      car._getIdx  = () => idx;
      car._getImgs = () => imgs;

      actualizar();
    });

    /* ── 2. Responsive: ajustar desplazamiento al redimensionar ── */
    function ajustarCarruseles() {
      document.querySelectorAll('.anuncio-carrusel').forEach(car => {
        const pista = car.querySelector('.car-pista');
        const imgs  = pista.querySelectorAll('img');
        const w     = car.offsetWidth;
        imgs.forEach(img => { img.style.minWidth = w + 'px'; img.style.width = w + 'px'; });
        const idx = car._getIdx ? car._getIdx() : 0;
        pista.style.transition = 'none';
        pista.style.transform  = `translateX(-${idx * w}px)`;
        setTimeout(() => pista.style.transition = '', 50);
      });
    }
    window.addEventListener('resize', ajustarCarruseles);
    window.addEventListener('load',   ajustarCarruseles);

    /* ── 3. Lightbox con navegación dentro del mismo anuncio ── */
    const lightbox     = document.getElementById('imgLightbox');
    const lightboxImg  = document.getElementById('imgLightboxImg');
    const lightboxClose= document.getElementById('imgLightboxCerrar');

    if (!lightbox) return;

    let lbImgs = [];   // array de imgs del anuncio activo
    let lbIdx  = 0;

    // Agregar flechas al lightbox (solo una vez)
    const lbPrev = document.createElement('button');
    const lbNext = document.createElement('button');
    lbPrev.className = 'lb-nav lb-nav-prev';
    lbNext.className = 'lb-nav lb-nav-next';
    lbPrev.innerHTML = '<i class="bi bi-chevron-left"></i>';
    lbNext.innerHTML = '<i class="bi bi-chevron-right"></i>';
    lightbox.appendChild(lbPrev);
    lightbox.appendChild(lbNext);

    // Contador "1 / 3"
    const lbCounter = document.createElement('span');
    lbCounter.className = 'lb-counter';
    lightbox.appendChild(lbCounter);

    function lbMostrar(n) {
      lbIdx = (n + lbImgs.length) % lbImgs.length;
      lightboxImg.src = lbImgs[lbIdx].src;
      lightboxImg.alt = lbImgs[lbIdx].alt;
      lbCounter.textContent = (lbIdx + 1) + ' / ' + lbImgs.length;
      lbPrev.style.display = lbImgs.length > 1 ? 'flex' : 'none';
      lbNext.style.display = lbImgs.length > 1 ? 'flex' : 'none';
    }

    function lbAbrir(imgs, idx) {
      lbImgs = imgs;
      document.body.style.overflow = 'hidden';
      lightbox.classList.add('activo');
      lbMostrar(idx);
    }

    function lbCerrar() {
      lightbox.classList.remove('activo');
      document.body.style.overflow = '';
      lightboxImg.src = '';
      lbImgs = [];
    }

    // Clic en miniatura → abrir lightbox con las fotos del mismo carrusel
    document.addEventListener('click', e => {
      if (!e.target.classList.contains('anuncio-img-zoom')) return;
      const car  = e.target.closest('.anuncio-carrusel');
      if (!car) return;
      const imgs = car._getImgs();
      const idx  = imgs.indexOf(e.target);
      lbAbrir(imgs, idx >= 0 ? idx : 0);
    });

    lbPrev.addEventListener('click', e => { e.stopPropagation(); lbMostrar(lbIdx - 1); });
    lbNext.addEventListener('click', e => { e.stopPropagation(); lbMostrar(lbIdx + 1); });
    lightboxClose.addEventListener('click', lbCerrar);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lbCerrar(); });

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('activo')) return;
      if (e.key === 'Escape')     lbCerrar();
      if (e.key === 'ArrowLeft')  lbMostrar(lbIdx - 1);
      if (e.key === 'ArrowRight') lbMostrar(lbIdx + 1);
    });

  })();

  /**
   * Modal de Anuncios
   */
  const anunciosBtn     = document.getElementById('anunciosBtn');
  const anunciosOverlay = document.getElementById('anunciosOverlay');
  const anunciosCerrar  = document.getElementById('anunciosCerrar');

  if (anunciosBtn && anunciosOverlay) {
    // Abrir modal
    anunciosBtn.addEventListener('click', () => {
      anunciosOverlay.classList.add('activo');
      document.body.style.overflow = 'hidden'; // bloquear scroll del fondo
    });

    // Cerrar con el botón X
    anunciosCerrar.addEventListener('click', cerrarAnuncios);

    // Cerrar haciendo clic fuera del modal
    anunciosOverlay.addEventListener('click', (e) => {
      if (e.target === anunciosOverlay) cerrarAnuncios();
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrarAnuncios();
    });

    function cerrarAnuncios() {
      anunciosOverlay.classList.remove('activo');
      document.body.style.overflow = '';
    }
  }

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);



})();