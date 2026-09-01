<script setup>
import { onMounted, ref } from 'vue';
import ProjectCaseStudyModal from './ProjectCaseStudyModal.vue';

const base = import.meta.env.BASE_URL;
const sectionRef = ref(null);

const activeModalProject = ref(null);
const isModalOpen = ref(false);

function openCaseStudy(proj) {
  activeModalProject.value = proj;
  isModalOpen.value = true;
}

function closeCaseStudy() {
  isModalOpen.value = false;
  activeModalProject.value = null;
}

const projects = [
  {
    id: 'codehunter',
    title: 'CodeHunter',
    number: '01',
    category: 'Gamification SaaS',
    tagline: 'Explore real places, scan QR checkpoints & climb leaderboards',
    url: 'https://codehunter.dcodax.net/',
    heroImage: `${base}portfolio-assets/codehunter/codehunter-home.png`,
    thumbnail: `${base}portfolio-assets/codehunter/codehunter-home.png`,
    overview:
      'CodeHunter is a location-based gamification platform that turns physical destinations into interactive QR code adventures. Explorers scan real-world checkpoints, earn points, and climb leaderboards while venue managers analyze visitor engagement metrics.',
    productWorkflow:
      'Explorers browse active locations on the web app, visit real-world checkpoints, scan unique QR codes to collect points, and track their weekly ranking on live leaderboards. Destination managers use the administrative portal to configure locations, monitor daily scan telemetry, and analyze peak activity times.',
    problem:
      'Destinations and venue managers needed a scalable way to incentivize physical exploration, increase visitor dwell time, and measure real-world foot traffic.',
    solution:
      'Engineered an API-driven Next.js web application paired with a high-concurrency Node.js backend. Built one-time QR scan validation rules, live leaderboard calculation logic, and an administrative telemetry analytics dashboard.',
    myContribution:
      'Developed Node.js REST API endpoints for user authentication, checkpoint scan validation, points accounting, and leaderboard aggregation. Built Next.js frontend views connecting user flows with real-time analytics dashboards.',
    features: [
      'Location-Based QR Checkpoint Discovery & Validation',
      'Explorer Points & Live Weekly Leaderboard System',
      'One-Time Reward Validation per Checkpoint for Fair Competition',
      'Administrative Location Telemetry & Scan Analytics Dashboard',
      'Responsive Mobile-Optimized Explorer UI & Web Portal'
    ],
    stackGrouped: {
      'Backend & API': ['Node.js API'],
      'Frontend': ['Next.js'],
      'Features': ['QR System', 'Analytics Telemetry', 'Leaderboards']
    },
    stack: ['Node.js API', 'Next.js', 'QR System', 'Analytics'],
    gallery: [
      { src: `${base}portfolio-assets/codehunter/codehunter-home.png`, caption: 'CodeHunter Location Discovery & Scan Analytics Dashboard' },
    ]
  },
  {
    id: 'pikup',
    title: 'Pikup Logistics',
    number: '02',
    category: 'Logistics SaaS',
    tagline: 'On-demand delivery dispatching & real-time parcel tracking',
    url: 'https://pikup.site/',
    heroImage: `${base}portfolio-assets/pikup/pikup-home.png`,
    thumbnail: `${base}portfolio-assets/pikup/pikup-home.png`,
    overview:
      'Pikup is an on-demand logistics and transport web application designed to streamline intracity courier requests, freight vehicle selection, and real-time package delivery tracking for businesses and consumers.',
    productWorkflow:
      'Customers enter pickup and dropoff addresses, select appropriate vehicle types (pickup trucks, vans, box trucks), receive automated fare estimates, and submit delivery requests. Dispatchers and drivers monitor active shipments via an interactive logistics dashboard.',
    problem:
      'Businesses and marketplace sellers required an instant, reliable way to schedule local freight moves without long phone calls or rigid pricing.',
    solution:
      'Built a Next.js frontend styled with Tailwind CSS, backed by a Node.js API layer handling distance calculation, driver dispatch logic, and real-time shipment status updates.',
    myContribution:
      'Developed Node.js REST API services for pickup booking creation, freight pricing estimation, and status management. Designed responsive Next.js frontend interfaces using Tailwind CSS.',
    features: [
      'On-Demand Courier & Vehicle Request Workflow',
      'Real-Time Parcel & Shipment Tracking Interface',
      'Vehicle Classification & Capacity Selection',
      'Distance-Based Quote Calculation Logic',
      'Tailwind CSS Responsive Dashboard UI'
    ],
    stackGrouped: {
      'Backend & API': ['Node.js API'],
      'Frontend': ['Next.js'],
      'Styling': ['Tailwind CSS']
    },
    stack: ['Node.js API', 'Next.js', 'Tailwind CSS', 'Logistics API'],
    gallery: [
      { src: `${base}portfolio-assets/pikup/pikup-home.png`, caption: 'Pikup Dispatch Dashboard & Tracking Interface' },
    ]
  },
  {
    id: 'napa-stores',
    title: 'Napa Stores',
    number: '03',
    category: 'Retail E-Commerce',
    tagline: 'Multi-language international retail storefront & checkout platform',
    url: 'https://napa-stores.com/',
    heroImage: `${base}portfolio-assets/napa-stores/napa-home.png`,
    thumbnail: `${base}portfolio-assets/napa-stores/napa-home.png`,
    overview:
      'Napa Stores is an international multi-language retail e-commerce platform offering product catalog browsing, localized pricing, dynamic storefronts, and customer order management.',
    productWorkflow:
      'Shoppers browse product categories, select localized language options (English, Arabic, Kurdish/CKB), add items to their shopping cart, and complete orders through a streamlined web storefront. Administrators manage inventory and order fulfillment via Laravel backend tools.',
    problem:
      'A multi-regional retail brand needed a unified web store capable of serving customers across distinct linguistic regions with fast page loads and simple catalog management.',
    solution:
      'Engineered a robust Laravel application with Bootstrap frontend templates. Implemented full RTL/LTR internationalization switcher (EN/AR/CKB), dynamic database query optimization, and localized currency handling.',
    myContribution:
      'Developed Laravel backend controllers, database migrations, localized route structures, and integrated Bootstrap responsive layouts for retail storefront views.',
    features: [
      'Multi-Language Localization Engine (English, Arabic, Kurdish/CKB)',
      'Product Storefront & Category Management System',
      'Shopping Cart & Customer Order Checkout Flow',
      'Customer Support & Business Contact Portal',
      'Bootstrap Responsive Web Storefront'
    ],
    stackGrouped: {
      'Backend': ['Laravel', 'PHP'],
      'Frontend': ['Bootstrap', 'Blade'],
      'Database': ['MySQL']
    },
    stack: ['Laravel', 'Bootstrap', 'PHP', 'MySQL', 'Multi-Language'],
    gallery: [
      { src: `${base}portfolio-assets/napa-stores/napa-home.png`, caption: 'Napa Stores Storefront & Multi-Language Switching Interface' },
    ]
  },
  {
    id: 'wecares',
    title: 'WECARES Store',
    number: '04',
    category: 'Healthcare E-Commerce',
    tagline: 'All-in-one healthcare products, subscriptions & wellness booking portal',
    url: 'https://wecares.store/',
    heroImage: `${base}portfolio-assets/wecares/wecares-home.png`,
    thumbnail: `${base}portfolio-assets/wecares/wecares-home.png`,
    overview:
      'WECARES is a comprehensive digital healthcare and wellness marketplace based in the UAE. It connects consumers with medical supplies, health services, subscriptions, and rapid delivery options.',
    productWorkflow:
      'Users search for pharmaceutical and wellness products, select healthcare subscription plans, schedule home care services, and place orders with express delivery options in UAE. The platform provides Arabic, English, and Chinese language toggles.',
    problem:
      'Healthcare consumers required a single trusted platform to order medical products, manage recurring wellness subscriptions, and access verified care services.',
    solution:
      'Architected a Laravel backend with responsive Bootstrap frontend components. Built medical product catalog indexing, multi-lingual translation layers, and express delivery logistics integration.',
    myContribution:
      'Built Laravel backend logic for product search, order handling, service booking structures, and responsive multi-lingual layout implementations.',
    features: [
      'Healthcare & Medical Supply Product Catalog',
      'Wellness Service & Appointment Booking Engine',
      'Multi-Language Localization (Arabic, English, Chinese)',
      'Express Delivery & Order Management',
      'Bootstrap & Responsive UI Architecture'
    ],
    stackGrouped: {
      'Backend': ['Laravel', 'PHP'],
      'Frontend': ['Bootstrap'],
      'Database': ['MySQL']
    },
    stack: ['Laravel', 'Bootstrap', 'PHP', 'MySQL', 'Healthcare API'],
    gallery: [
      { src: `${base}portfolio-assets/wecares/wecares-home.png`, caption: 'WECARES Healthcare Storefront & Medical Service Marketplace' },
    ]
  },
  {
    id: 'forall-doctors',
    title: 'ForAllDoctors (FAD)',
    number: '05',
    category: 'Healthcare Portal',
    tagline: 'Physician portal & medical professional networking community',
    url: 'https://foralldoctors.com/',
    heroImage: `${base}portfolio-assets/forall-doctors/forall-doctors-home.png`,
    thumbnail: `${base}portfolio-assets/forall-doctors/forall-doctors-home.png`,
    overview:
      'ForAllDoctors (FAD) is a specialized digital platform designed for healthcare professionals, providing clinical resources, medical practitioner tools, specialty articles, and professional community workflows.',
    productWorkflow:
      'Doctors and healthcare practitioners log in to access specialty clinical topics, professional resources, interactive medical calculators, and peer networking updates via an intuitive Next.js frontend interface.',
    problem:
      'Medical professionals needed a clean, secure digital portal dedicated strictly to clinical content, practitioner updates, and specialized healthcare tools.',
    solution:
      'Engineered an API-driven Next.js application backed by a Node.js backend. Implemented Ant Design UI components, structured content indexing, and specialized user account dashboards.',
    myContribution:
      'Developed Node.js REST API endpoints for user authorization, resource management, and Next.js frontend component integration.',
    features: [
      'Medical Professional Resource & Content Portal',
      'Specialty Clinical Topic Categorization',
      'Physician Community & Account Dashboard',
      'Ant Design UI Components',
      'API-Driven Next.js Architecture'
    ],
    stackGrouped: {
      'Backend & API': ['Node.js API'],
      'Frontend': ['Next.js'],
      'UI Library': ['Ant Design']
    },
    stack: ['Node.js API', 'Next.js', 'Ant Design', 'Healthcare Portal'],
    gallery: [
      { src: `${base}portfolio-assets/forall-doctors/forall-doctors-home.png`, caption: 'ForAllDoctors Physician Portal & Resource Dashboard' },
    ]
  },
  {
    id: 'borrowmate',
    title: 'BorrowMate',
    number: '06',
    category: 'Fintech Platform',
    tagline: 'Collateral-backed lending & automated loan approval portal',
    url: 'https://borrowmate.heydigital.com.au',
    heroImage: `${base}borrowmate/1.png`,
    thumbnail: `${base}borrowmate/1.png`,
    overview:
      'BorrowMate is a collateral-backed lending platform built for controlled borrower management, loan lifecycle approval workflows, and administrative financial visibility.',
    productWorkflow:
      'Lending staff process borrower profiles, review collateral valuation reports, manage multi-stage approval gates, and track automated repayment schedules through a centralized dashboard.',
    problem:
      'Legacy spreadsheet workflows caused data fragmentation, manual tracking errors, and audit risks in collateral-backed lending operations.',
    solution:
      'Architected an enterprise Laravel backend integrated with a reactive Vue.js administrative portal. Engineered relational state-machine models for loan lifecycles, role-based approval gates, and automated repayment calculation engines.',
    myContribution:
      'Architected Laravel backend APIs, loan lifecycle state machines, and Vue.js administrative views.',
    features: [
      'Collateral-Backed Loan Approval Lifecycle Workflows',
      'Borrower Risk Tracking & Repayment Calculators',
      'Role-Based Administrative Portal (Vue.js)',
      'Audit Logging & Relational Database Schemas'
    ],
    stackGrouped: {
      'Backend': ['Laravel', 'PHP'],
      'Frontend': ['Vue.js'],
      'Database': ['MySQL']
    },
    stack: ['Laravel', 'Vue.js', 'MySQL', 'REST APIs'],
  },
  {
    id: 'islegit',
    title: 'IcLegit',
    number: '07',
    category: 'Verification Tool',
    tagline: 'High-throughput verification signal & vendor legitimacy tool',
    url: 'http://isitlegit.co/',
    heroImage: `${base}islegit/1.png`,
    thumbnail: `${base}islegit/1.png`,
    overview:
      'IcLegit is a verification platform designed for checking and reviewing vendor legitimacy signals through an accelerated automated workflow.',
    productWorkflow:
      'Verification staff enter entity identifiers, trigger automated background checks, and inspect consolidated trust analytics through structured result dashboards.',
    problem:
      'Business verification teams needed a high-throughput platform to aggregate multiple verification signals and evaluate vendor legitimacy seamlessly.',
    solution:
      'Engineered an API-driven analytical backend using Laravel and custom webhooks. Designed normalized data pipelines to ingest external verification endpoints concurrently with asynchronous worker queues.',
    myContribution:
      'Engineered Laravel API controllers, webhook ingest pipeline handlers, and administrative result review views.',
    features: [
      'Automated Entity Verification Ingestion Pipeline',
      'Real-Time Signal Aggregation Dashboard',
      'Asynchronous Worker Queue Processing',
      'Structured Administrative Compliance Reporting'
    ],
    stackGrouped: {
      'Backend': ['Laravel', 'PHP'],
      'Database': ['MySQL'],
      'Integrations': ['REST APIs', 'Queue Processing']
    },
    stack: ['Laravel', 'REST APIs', 'MySQL', 'Queue Processing'],
  },
  {
    id: 'gifted-taxi',
    title: 'Gifted Taxi & Tours',
    number: '08',
    category: 'Transport & Booking',
    tagline: 'Customer transport reservation & automated tour booking engine',
    url: 'https://giftedtaxiandtours.com',
    heroImage: `${base}gifted-texi/1.png`,
    thumbnail: `${base}gifted-texi/1.png`,
    overview:
      'Gifted Taxi & Tours is a booking-oriented platform for transport and tour services, supporting route discovery, pricing matrices, and direct customer reservations.',
    productWorkflow:
      'Customers select tour destinations, enter pickup locations, calculate travel quotes, and submit instant online booking inquiries.',
    problem:
      'A regional transport company required an automated customer reservation and dispatch engine capable of real-time route discovery and quote calculation.',
    solution:
      'Developed a custom Laravel booking platform with optimized geolocation query handlers, dynamic pricing matrix algorithms, and mobile-responsive customer inquiry UI.',
    myContribution:
      'Built Laravel booking controllers, pricing matrix algorithms, and customer reservation templates.',
    features: [
      'Interactive Tour & Transport Reservation Engine',
      'Dynamic Pricing & Distance Calculation Matrix',
      'Automated Customer Dispatch Notifications',
      'Mobile-Optimized Service Inquiry Interface'
    ],
    stackGrouped: {
      'Backend': ['Laravel', 'PHP'],
      'Database': ['MySQL'],
      'UX': ['Responsive Web']
    },
    stack: ['Laravel', 'MySQL', 'REST APIs', 'Responsive UX'],
  },
  {
    id: 'hosting-panel',
    title: 'Hosting Panel',
    number: '09',
    category: 'Admin Platform',
    tagline: 'Consolidated infrastructure telemetry & hosting admin control panel',
    url: 'https://hpanel.pixelz360.com.au/',
    heroImage: `${base}hosting-panel/1.png`,
    thumbnail: `${base}hosting-panel/1.png`,
    overview:
      'Hosting Panel is an administrative control interface for managing hosting accounts, domain assets, bandwidth utilization metrics, and operational workflows.',
    productWorkflow:
      'System administrators track active hosting accounts, monitor server resource utilization graphs, and manage customer billing records from a single unified portal.',
    problem:
      'Infrastructure administrators lacked a consolidated control panel for provisioning hosting accounts, tracking bandwidth metrics, and handling customer domain assets.',
    solution:
      'Built a dashboard application leveraging Laravel architecture. Designed compact, low-latency UI components for server asset management, billing integration, and system status telemetry.',
    myContribution:
      'Developed administrative dashboard components, server asset tracking databases, and customer management flows.',
    features: [
      'Infrastructure Account Provisioning & Resource Tracking',
      'Low-Latency Server Telemetry Dashboard',
      'Customer Asset & Billing Management',
      'Compact Administrator UI Architecture'
    ],
    stackGrouped: {
      'Backend': ['Laravel', 'PHP'],
      'Database': ['MySQL'],
      'Interface': ['Admin Portal']
    },
    stack: ['Laravel', 'MySQL', 'Admin Architecture'],
  },
  {
    id: 'blog-platform',
    title: 'Blog Platform',
    number: '10',
    category: 'Publishing CMS',
    tagline: 'Decoupled publishing engine with rich media rendering & SEO schemas',
    github: 'https://github.com/jhanzaibgithub/Blog-site-Vue-js-Laravel.git',
    heroImage: `${base}blog_site/1.png`,
    thumbnail: `${base}blog_site/1.png`,
    overview:
      'Blog Platform is an open-source content management system featuring structured publishing workflows, editorial post management, and server-rendered reading templates.',
    productWorkflow:
      'Content creators draft and schedule blog posts through a rich administrative editor, while public visitors enjoy clean, fast-loading article reading screens.',
    problem:
      'Required an extensible publishing system with granular access delegation, rich media rendering, and SEO-optimized server rendering.',
    solution:
      'Decoupled publishing engine built with Laravel and Blade templates. Implemented optimized content caching layers, dynamic slug routing, and structured JSON-LD schema generation.',
    myContribution:
      'Created Laravel content publishing APIs, Blade template layouts, dynamic routing engines, and open-source GitHub codebase.',
    features: [
      'Structured Editorial Post & Category Publishing Engine',
      'SEO Caching & Dynamic Schema Generation',
      'Granular Admin & Writer Role Delegation',
      'Open-Source Codebase Available on GitHub'
    ],
    stackGrouped: {
      'Backend': ['Laravel', 'PHP'],
      'Frontend': ['Blade Templates', 'Vue.js'],
      'Database': ['MySQL']
    },
    stack: ['Laravel', 'MySQL', 'Blade', 'SEO Architecture'],
  },
  {
    id: 'domain-generator',
    title: 'Domain Name Generator',
    number: '11',
    category: 'Web Tool',
    tagline: 'Asynchronous WHOIS availability lookup & domain idea discovery tool',
    url: 'https://3sname.com/',
    heroImage: `${base}domain-name-generater/1.png`,
    thumbnail: `${base}domain-name-generater/1.png`,
    overview:
      'Domain Name Generator is a high-speed branding tool for generating brandable domain name combinations and performing instant availability checks.',
    productWorkflow:
      'Users enter keyword combinations, view real-time domain availability statuses via concurrent WHOIS API checks, and select viable domain options without page refreshes.',
    problem:
      'Branding agencies required a rapid-fire domain availability and combination lookup engine with sub-second response times.',
    solution:
      'Built a lightweight, asynchronous lookup engine combining Laravel micro-endpoints with vanilla JavaScript client-side rendering and WHOIS API integrations.',
    myContribution:
      'Developed WHOIS API lookup handlers, client-side asynchronous JavaScript fetch routines, and minimal UI workflow.',
    features: [
      'Asynchronous Domain Combination Generator',
      'Concurrent WHOIS Availability API Lookup Engine',
      'Zero-Page-Refresh Instant Results Interface',
      'Lightweight High-Speed Application Architecture'
    ],
    stackGrouped: {
      'Backend': ['Laravel', 'PHP'],
      'Frontend': ['JavaScript'],
      'API': ['WHOIS API Integration']
    },
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
      <h2 class="section-heading">Featured <em>case studies</em></h2>
      <p class="section-subtext">
        Production applications spanning SaaS, marketplaces, e-commerce, logistics, fintech, and healthcare — analyzed &amp; built for performance.
      </p>
    </div>

    <div class="project-list">
      <article
        v-for="(project, index) in projects"
        :key="project.id || project.title"
        class="project-item reveal"
        :class="{ alt: index % 2 === 1 }"
      >
        <div class="project-visual" @click="openCaseStudy(project)" role="button" tabindex="0">
          <img
            :src="project.thumbnail"
            :alt="`${project.title} — project preview`"
            loading="lazy"
            width="560"
            height="350"
          />
          <div class="project-visual-overlay">
            <span>View Full Case Study →</span>
          </div>
        </div>

        <div class="project-content">
          <div class="project-header-row">
            <span class="project-number">Project {{ project.number }}</span>
            <span class="pill pill-secondary">{{ project.category }}</span>
          </div>

          <h3 class="project-name">{{ project.title }}</h3>
          <p class="project-tagline-text">{{ project.tagline }}</p>

          <div class="project-story">
            <div>
              <span class="project-story-label">The Problem</span>
              <p class="project-story-text">{{ project.problem }}</p>
            </div>
            <div>
              <span class="project-story-label">Technical Solution</span>
              <p class="project-story-text">{{ project.solution || project.decisions }}</p>
            </div>
          </div>

          <div class="project-stack">
            <span v-for="tech in project.stack" :key="tech" class="pill pill-muted">{{ tech }}</span>
          </div>

          <div class="project-links">
            <button class="btn btn-primary btn-sm" @click="openCaseStudy(project)">
              View Case Study
            </button>
            <a
              v-if="project.url && project.url !== '#'"
              :href="project.url"
              target="_blank"
              rel="noreferrer"
              class="project-link"
              aria-label="View live website"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Website
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
        View Upwork Profile &amp; Client Feedback →
      </a>
    </div>

    <ProjectCaseStudyModal
      :is-open="isModalOpen"
      :project="activeModalProject"
      @close="closeCaseStudy"
    />
  </section>
</template>

<style scoped>
.project-visual {
  position: relative;
  cursor: pointer;
}

.project-visual-overlay {
  position: absolute;
  inset: 0;
  background: rgba(194, 96, 62, 0.85);
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-visual:hover .project-visual-overlay {
  opacity: 1;
}

.project-header-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.project-tagline-text {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--primary);
  margin-top: -4px;
}

.btn-sm {
  min-height: 38px;
  padding: 0 16px;
  font-size: 0.85rem;
}
</style>
