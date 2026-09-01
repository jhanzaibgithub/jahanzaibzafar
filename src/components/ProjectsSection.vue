<script setup>
import { onMounted, ref } from 'vue';

const base = import.meta.env.BASE_URL;
const sectionRef = ref(null);

const projects = [
  {
    title: 'BorrowMate',
    number: '01',
    url: 'https://borrowmate.heydigital.com.au',
    thumbnail: `${base}borrowmate/1.png`,
    problem:
      'Legacy spreadsheet workflows caused data fragmentation, manual tracking errors, and audit risks in collateral-backed lending operations.',
    decisions:
      'Architected an enterprise Laravel backend integrated with a reactive Vue.js administrative portal. Engineered relational state-machine models for loan lifecycles, role-based approval gates, and automated repayment calculation engines.',
    outcome:
      'Delivered a centralized, audit-compliant financial application that reduced loan processing friction and enabled real-time portfolio management for operational staff.',
    stack: ['Laravel', 'Vue.js', 'MySQL', 'REST APIs'],
  },
  {
    title: 'IcLegit',
    number: '02',
    url: 'http://isitlegit.co/',
    thumbnail: `${base}islegit/1.png`,
    problem:
      'Business verification teams needed a high-throughput platform to aggregate multiple verification signals and evaluate vendor legitimacy seamlessly.',
    decisions:
      'Engineered an API-driven analytical backend using Laravel and custom webhooks. Designed normalized data pipelines to ingest external verification endpoints concurrently with asynchronous worker queues.',
    outcome:
      'Accelerated vendor evaluation cycles with instant signal aggregation, interactive analytical dashboards, and structured administrative reporting.',
    stack: ['Laravel', 'REST APIs', 'MySQL', 'Queue Processing'],
  },
  {
    title: 'Gifted Taxi & Tours',
    number: '03',
    url: 'https://giftedtaxiandtours.com',
    thumbnail: `${base}gifted-texi/1.png`,
    problem:
      'A regional transport company required an automated customer reservation and dispatch engine capable of real-time route discovery and quote calculation.',
    decisions:
      'Developed a custom Laravel booking platform with optimized geolocation query handlers, dynamic pricing matrix algorithms, and mobile-responsive customer inquiry UI.',
    outcome:
      'Increased online conversion rates through intuitive booking UX and automated dispatch notifications, eliminating manual telephone scheduling bottlenecks.',
    stack: ['Laravel', 'MySQL', 'REST APIs', 'Responsive UX'],
  },
  {
    title: 'Hosting Panel',
    number: '04',
    url: 'https://hpanel.pixelz360.com.au/',
    thumbnail: `${base}hosting-panel/1.png`,
    problem:
      'Infrastructure administrators lacked a consolidated control panel for provisioning hosting accounts, tracking bandwidth metrics, and handling customer domain assets.',
    decisions:
      'Built a dashboard application leveraging Laravel architecture. Designed compact, low-latency UI components for server asset management, billing integration, and system status telemetry.',
    outcome:
      'Empowered sysadmins with centralized infrastructure oversight, reducing account onboarding latency and simplifying client management.',
    stack: ['Laravel', 'MySQL', 'Admin Architecture'],
  },
  {
    title: 'Blog Platform',
    number: '05',
    github: 'https://github.com/jhanzaibgithub/Blog-site-Vue-js-Laravel.git',
    thumbnail: `${base}blog_site/1.png`,
    problem:
      'Required an extensible publishing system with granular access delegation, rich media rendering, and SEO-optimized server rendering.',
    decisions:
      'Decoupled publishing engine built with Laravel and Blade templates. Implemented optimized content caching layers, dynamic slug routing, and structured JSON-LD schema generation.',
    outcome:
      'Shipped an open-source CMS platform featuring clean editorial workflows, fast indexability, and modular component extension patterns.',
    stack: ['Laravel', 'MySQL', 'Blade', 'SEO Architecture'],
  },
  {
    title: 'Domain Name Generator',
    number: '06',
    url: 'https://3sname.com/',
    thumbnail: `${base}domain-name-generater/1.png`,
    problem:
      'Branding agencies required a rapid-fire domain availability and combination lookup engine with sub-second response times.',
    decisions:
      'Built a lightweight, asynchronous lookup engine combining Laravel micro-endpoints with vanilla JavaScript client-side rendering and WHOIS API integrations.',
    outcome:
      'Delivered a ultra-responsive domain exploration tool executing concurrent API requests with zero page refreshes.',
    stack: ['Laravel', 'JavaScript', 'WHOIS API', 'Async Fetch'],
  },
];

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  if (sectionRef.value) {
    sectionRef.value.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }
});
</script>

<template>
  <section id="projects" class="projects section-shell" ref="sectionRef">
    <div class="projects-header reveal">
      <span class="section-label">Selected Work</span>
      <h2 class="section-heading">Projects with <em>production weight</em></h2>
      <p class="section-subtext">
        Real projects spanning lending platforms, booking systems, admin panels, APIs, and business tools.
      </p>
    </div>

    <div class="project-list">
      <article
        v-for="(project, index) in projects"
        :key="project.title"
        class="project-item reveal"
        :class="{ alt: index % 2 === 1 }"
      >
        <div class="project-visual">
          <img
            :src="project.thumbnail"
            :alt="`${project.title} — project screenshot`"
            loading="lazy"
            width="560"
            height="350"
          />
        </div>

        <div class="project-content">
          <span class="project-number">Project {{ project.number }}</span>
          <h3 class="project-name">{{ project.title }}</h3>

          <div class="project-story">
            <div>
              <span class="project-story-label">The Problem</span>
              <p class="project-story-text">{{ project.problem }}</p>
            </div>
            <div>
              <span class="project-story-label">Technical Decisions</span>
              <p class="project-story-text">{{ project.decisions }}</p>
            </div>
            <div>
              <span class="project-story-label">Outcome</span>
              <p class="project-story-text">{{ project.outcome }}</p>
            </div>
          </div>

          <div class="project-stack">
            <span v-for="tech in project.stack" :key="tech" class="pill pill-muted">{{ tech }}</span>
          </div>

          <div class="project-links">
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noreferrer"
              class="project-link"
              aria-label="View live site"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Site
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noreferrer"
              class="project-link"
              aria-label="View source code"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              Source
            </a>
          </div>
        </div>
      </article>
    </div>

    <div class="projects-more">
      <a
        class="btn btn-outline"
        href="https://www.upwork.com/freelancers/~017d9280669d695f18?viewMode=1&mp_source=share"
        target="_blank"
        rel="noreferrer"
      >
        More work on Upwork →
      </a>
    </div>
  </section>
</template>
