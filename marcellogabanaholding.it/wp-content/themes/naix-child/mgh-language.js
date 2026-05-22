(function () {
  var STORAGE_KEY = 'mgh-language';
  var loader = document.getElementById('naix-before-unloader');
  var languageOverlay = document.getElementById('mgh-language-overlay');
  var switcher = document.querySelector('.language-switch');

  var htmlRules = [
    ['#slider-6-slide-6-layer-1', 'Caring for progress'],
    ['.intro-quote-copy p', 'We look to the future by caring for our people, living in harmony with nature and supporting our territory.'],
    ['.intro-quote-feature:nth-child(1) h3', 'Measurable sustainability'],
    ['.intro-quote-feature:nth-child(1) p', 'A commitment documented through reports, indicators and choices tied to the group’s real impact.'],
    ['.intro-quote-feature:nth-child(2) h3', 'Real industry'],
    ['.intro-quote-feature:nth-child(2) p', 'Production, services and assets rooted in operating companies, not abstract positioning.'],
    ['.intro-quote-feature:nth-child(3) h3', 'Care for people'],
    ['.intro-quote-feature:nth-child(3) p', 'Inclusive work, training and wellbeing as the foundation for lasting growth.'],
    ['.intro-quote-feature:nth-child(4) h3', 'Local roots'],
    ['.intro-quote-feature:nth-child(4) p', 'Businesses connected to the territories where the group operates and creates value.'],
    ['.home-sector-accordion__intro span', 'Group activities'],
    ['.home-sector-accordion__intro h2', 'Sectors'],
    ['.home-sector-item:nth-of-type(1) .home-sector-trigger span', 'Agri-food sector'],
    ['.home-sector-item:nth-of-type(2) .home-sector-trigger span', 'Ecology sector'],
    ['.home-sector-item:nth-of-type(3) .home-sector-trigger span', 'Real estate sector'],
    ['.home-sector-item:nth-of-type(2) .home-sector-trigger span', 'Agri-food sector'],
    ['.home-sector-item:nth-of-type(3) .home-sector-trigger span', 'Ecology sector'],
    ['.home-sector-item:nth-of-type(4) .home-sector-trigger span', 'Real estate sector'],
    ['.home-sector-panel__inner p:nth-of-type(1)', 'Grandi Riso is the Group’s largest company by size and revenue. It is the fourth-largest Italian rice producer and processes and packages rice at its Codigoro plant, in the province of Ferrara.'],
    ['.home-sector-panel__inner p:nth-of-type(2)', 'The Grandi &amp; Gabana wine estate, located in the DOC Friuli-Latisana area, specialises in quality wine produced from grapes grown in its own vineyards.'],
    ['.home-sector-item:nth-of-type(2) .home-sector-panel__inner p:nth-of-type(1)', 'Gedit builds and manages non-hazardous special waste disposal plants in the province of Brescia. The company also produces electricity from biogas generated on site.'],
    ['.home-sector-item:nth-of-type(2) .home-sector-panel__inner p:nth-of-type(2)', 'Gelab carries out chemical and physico-chemical analyses for micro-pollutant research and environmental matrix monitoring, with an ISO 9001 certified quality management system.'],
    ['.home-sector-item:nth-of-type(2) .home-sector-panel__inner p:nth-of-type(3)', 'Ecoplant is a service and consulting platform for companies and small artisans in waste management and disposal. It is based in Cremona and operates a storage facility.'],
    ['.home-sector-item:nth-of-type(4) .home-sector-panel__inner h3:nth-of-type(2)', 'Tiburtina 90 Shopping Centre s.r.l.'],
    ['.home-sector-item:nth-of-type(4) .home-sector-panel__inner p:nth-of-type(1)', 'Le Pietrare is a real estate management company focused on leasing activities in the municipality of Viterbo, including offices, shops, storage areas, covered parking and service spaces.'],
    ['.home-sector-item:nth-of-type(4) .home-sector-panel__inner p:nth-of-type(2)', 'CCT 90 manages a leased real estate surface of about 3,200 sqm in the metropolitan city of Rome, mainly intended for commercial activities.'],
    ['.home-sector-item:nth-of-type(4) .home-sector-panel__inner p:nth-of-type(3)', 'Interlaghi owns the former Colonia Motta real estate complex in Verbania, made up of several buildings on land sloping down toward Lake Maggiore.'],
    ['.home-sector-item:nth-of-type(4) .home-sector-panel__inner p:nth-of-type(4)', 'Magazzini e Molini del Tirreno owns an industrial complex for cereal milling in the Lucca area, currently being assessed for production restart or real estate enhancement.'],
    ['.home-focus-title--intro h2', 'Our<br>focus'],
    ['.home-focus-slide--wellbeing .home-focus-copy h2', 'Attention to wellbeing'],
    ['.home-focus-slide--wellbeing .home-focus-copy p', 'We ensure an inclusive, stimulating and positive work environment.<br>Because every success is built together.'],
    ['.home-focus-metric:nth-child(1) p', '60 employees'],
    ['.home-focus-metric:nth-child(2) p', '39% female employees'],
    ['.home-focus-metric:nth-child(3) p', '+12% hiring rate'],
    ['.home-focus-metric:nth-child(4) p', '1,064 training hours (+19%)'],
    ['.home-focus-slide--ecosystem .home-focus-copy h2', 'Ecosystem protection'],
    ['.home-focus-slide--ecosystem .home-focus-copy p', 'We constantly monitor the environmental impact of our activities, in the name of sustainability.'],
    ['.home-priorities-point:nth-child(1) h3', 'Cross-sector vision'],
    ['.home-priorities-point:nth-child(1) p', 'A group capable of connecting agricultural, industrial, environmental and real estate expertise.'],
    ['.home-priorities-point:nth-child(2) h3', 'Operational responsibility'],
    ['.home-priorities-point:nth-child(2) p', 'Every choice comes from concrete activities rooted in local areas and oriented toward measurable results.'],
    ['.home-priorities-point:nth-child(3) h3', 'Culture of doing'],
    ['.home-priorities-point:nth-child(3) p', 'Entrepreneurial passion, attention to people and continuity guide the group’s growth.'],
    ['.home-priorities-copy p', 'Creative spirit, cross-sector expertise, passion and responsibility. The priorities of Marcello Gabana Holding.'],
    ['.home-priorities-cta', 'Discover who we are'],
    ['.home-image-pillar:nth-child(1) h3', 'Attention to wellbeing'],
    ['.home-image-pillar:nth-child(2) h3', 'In harmony with nature'],
    ['.home-image-pillar:nth-child(3) h3', 'Territory growth'],
    ['.home-centered-quote-section--report .home-centered-quote p', 'Operations oriented toward the UN Sustainable Development Goals and UNESCO Culture Indicators.'],
    ['.home-centered-quote-cta', 'Read our new sustainability report'],
    ['.home-centered-quote-section--synergy .home-centered-quote p', 'To design new synergies between industry, art and education.'],
    ['.mgh-footer-menu a[href*="p=6165"]', 'About us'],
    ['.mgh-footer-menu a[href*="chi-siamo"]', 'About us'],
    ['.mgh-footer-menu .current-menu-item > a', 'About us'],
    ['.mgh-footer-menu a[href*="p=4309"]', 'Attention to wellbeing'],
    ['.mgh-footer-menu a[href*="p=6357"]', 'In harmony with nature'],
    ['.mgh-footer-menu a[href*="p=6359"]', 'Territory growth'],
    ['.mgh-footer-menu a[href*="p=6489"]', 'News and projects'],
    ['.mgh-footer-menu a[href*="p=6492"]', 'Sustainability report'],
    ['.mgh-footer-menu a[href*="p=2229"]', 'Contacts'],
    ['.sidebar-menu a[href*="p=6165"]', 'About us'],
    ['.sidebar-menu a[href*="chi-siamo"]', 'About us'],
    ['.sidebar-menu .current-menu-item > a', 'About us'],
    ['.sidebar-menu a[href*="p=4309"]', 'Attention to wellbeing'],
    ['.sidebar-menu a[href*="p=6357"]', 'In harmony with nature'],
    ['.sidebar-menu a[href*="p=6359"]', 'Territory growth'],
    ['.sidebar-menu a[href*="p=6489"]', 'News and projects'],
    ['.sidebar-menu a[href*="p=6492"]', 'Sustainability report'],
    ['.sidebar-menu a[href*="p=2229"]', 'Contacts'],

    ['.about-hero-copy .about-kicker', 'About us'],
    ['.about-hero-copy h1', 'A family holding company, an industrial vision.'],
    ['.about-hero-copy p:nth-of-type(1)', 'Marcello Gabana Holding was founded in 1973, tracing a history of evolution, responsibility and a forward-looking vision.'],
    ['.about-hero-copy p:nth-of-type(2)', 'The ordinary and extraordinary management of the Group, including organisational, control and strategic guidelines, is entrusted to the Holding’s Board of Directors.'],
    ['.about-outline-cta', 'Download organisation chart'],
    ['.about-president-info span', 'Chairwoman and Chief Executive Officer'],
    ['.about-president-info p', 'She leads the Holding with a focus on governance, Group continuity and responsibility toward people, companies and territory.'],
    ['.about-board > .about-kicker', 'Board of Directors'],
    ['.about-board > h2', 'The people who guide the Group’s direction.'],
    ['.about-board-member--featured p', 'Chairwoman and Chief Executive Officer'],
    ['.about-board-member:not(.about-board-member--featured) p', 'Director'],
    ['.about-board-card-docs h3', 'Further reading'],
    ['.about-board-card-docs a:nth-of-type(1)', 'Marcello Gabana Holding Policy'],
    ['.about-board-card-docs a:nth-of-type(2)', 'Organisation, Management and Control Model and Code of Ethics'],
    ['.about-board-card-docs a:nth-of-type(3)', 'SA8000 Certificate'],
    ['.about-board-card-docs a:nth-of-type(4)', 'SA8000 Report'],
    ['.about-board-card-docs a:nth-of-type(5)', 'Reports and complaints procedure'],
    ['.about-board-card-docs a:nth-of-type(6)', 'Complaint form'],
    ['.about-board-card-docs a:nth-of-type(7)', 'Whistleblowing Portal'],
    ['.about-board-card-docs a:nth-of-type(8)', 'Whistleblowing Portal Instructions'],
    ['.about-board-card-docs a:nth-of-type(9)', 'Customer Privacy Notice'],
    ['.about-board-card-docs a:nth-of-type(10)', 'Supplier Privacy Notice'],
    ['.about-board-card-docs a:nth-of-type(11)', 'Candidate Privacy Notice'],
    ['.about-timeline-heading .about-kicker', 'Our history'],
    ['.about-timeline-heading h2', 'From yesterday to tomorrow, with you for the future.'],
    ['.about-timeline-list li:nth-child(1) p', 'Foundation of Gruppo Gabeca'],
    ['.about-timeline-list li:nth-child(2) p', 'Start of cement import activities'],
    ['.about-timeline-list li:nth-child(3) p', 'Opening of Gedit’s first landfill and birth of Gelab, the Group’s analysis laboratory'],
    ['.about-timeline-list li:nth-child(4) p', 'Birth of Marcello Gabana Holding'],
    ['.about-timeline-list li:nth-child(5) p', 'Acquisition of Grandi Riso'],
    ['.about-timeline-list li:nth-child(6) p', 'Opening of the second landfill in Montichiari and start of an important investment cycle'],
    ['.about-timeline-list li:nth-child(7) p', 'Creation of the Marcello Gabana fund'],
    ['.about-timeline-list li:nth-child(8) p', 'Birth of Ecoplant, a Group company managing the entire waste cycle'],
    ['.about-timeline-list li:nth-child(9) p', 'New sustainability path for the Holding'],
    ['.page-id-6165 .vc_custom_1636757988975 h3', 'Cross-sector expertise and passion for our territory:<br>the most important resources.'],
    ['.about-quality-copy-heading .about-kicker', 'Quality and safety'],
    ['.about-quality-copy-heading h2', 'Attention to quality'],
    ['.about-quality-copy-text p:nth-child(1)', 'In addition to integrity and transparency, the Group promotes quality and safety, both in relation to products, in the case of the agri-food sector, and to waste management, in the ecology sector.'],
    ['.about-quality-copy-text p:nth-child(2)', 'Depending on the activities carried out in offices and plants, the Group companies have adopted different tools, policies and certified management systems, according to ISO standards, in order to ensure the best possible performance.<br>Specifically, the ecology division has the largest number of certifications and procedures due to the varied risks connected to its activities and the materials it manages.'],
    ['.about-quality-copy-text p:nth-child(3)', 'Grandi Riso deserves specific mention: today it is one of the benchmark brands in the Italian agri-food sector, thanks to the recognised quality of its products. To achieve this, over time Grandi Riso has invested in creating a centre of expertise and excellence, made up of highly experienced people and a production system that combines latest-generation technologies with traditional artisanal processing. All activities are carried out in compliance with its Quality and Food Safety Management System and the related quality and food safety manual.']
  ];

  var textRules = {
    'Pallino selezionato': 'Selected dot',
    'Tocca un punto arancione': 'Tap an orange point',
    'Tocca un pallino sulla mappa': 'Tap a dot on the map',
    'Punto non assegnato': 'Unassigned point'
  };

  function remember(el) {
    if (!el.dataset.mghItHtml) el.dataset.mghItHtml = el.innerHTML;
  }

  function setActive(lang) {
    if (!switcher) return;
    switcher.querySelectorAll('a').forEach(function (link) {
      var isActive = link.getAttribute('lang') === lang;
      link.classList.toggle('is-active', isActive);
      link.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function translateTextNodes(lang) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement && node.parentElement.closest('script, style')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      if (!node.__mghItText) node.__mghItText = node.nodeValue;
      var original = node.__mghItText;
      var trimmed = original.trim();
      if (lang === 'en' && textRules[trimmed]) {
        node.nodeValue = original.replace(trimmed, textRules[trimmed]);
      } else {
        node.nodeValue = original;
      }
    });
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'it-IT';
    setActive(lang);

    htmlRules.forEach(function (rule) {
      document.querySelectorAll(rule[0]).forEach(function (el) {
        remember(el);
        el.innerHTML = lang === 'en' ? rule[1] : el.dataset.mghItHtml;
      });
    });

    translateTextNodes(lang);

    window.setTimeout(function () {
      if (window.revapi6 && typeof window.revapi6.revredraw === 'function') {
        window.revapi6.revredraw();
      }
      if (window.revapi6 && typeof window.revapi6.revresize === 'function') {
        window.revapi6.revresize();
      }
    }, 80);
  }

  function showLoader() {
    document.body.classList.add('mgh-language-is-loading');
    if (languageOverlay) {
      languageOverlay.setAttribute('aria-hidden', 'false');
      languageOverlay.classList.add('is-active');
      return;
    }
    if (loader) {
      loader.classList.remove('out');
      loader.classList.add('mgh-language-loading');
    }
  }

  function hideLoader() {
    if (languageOverlay) {
      languageOverlay.classList.remove('is-active');
      languageOverlay.setAttribute('aria-hidden', 'true');
    } else if (loader) {
      loader.classList.add('out');
      loader.classList.remove('mgh-language-loading');
    }
    document.body.classList.remove('mgh-language-is-loading');
  }

  function changeLanguage(lang, withLoader) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    if (!withLoader) {
      applyLanguage(lang);
      return;
    }
    showLoader();
    window.setTimeout(function () {
      applyLanguage(lang);
      window.setTimeout(hideLoader, 620);
    }, 780);
  }

  if (switcher) {
    switcher.querySelectorAll('a[lang]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var lang = link.getAttribute('lang') === 'en' ? 'en' : 'it';
        event.preventDefault();
        if (document.documentElement.lang.indexOf(lang) === 0) return;
        changeLanguage(lang, true);
      });
    });
  }

  var initial = window.location.hash === '#en' ? 'en' : 'it';
  try { initial = localStorage.getItem(STORAGE_KEY) || initial; } catch (e) {}
  changeLanguage(initial === 'en' ? 'en' : 'it', false);
}());
