<script setup>
import { computed, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectModal from './ProjectModal.vue';

gsap.registerPlugin(ScrollTrigger);

const base = import.meta.env.BASE_URL;
const selectedProject = ref(null);
const modalOpen = ref(false);
const currentProjectIndex = ref(0);
const dragStartX = ref(0);
const dragDistance = ref(0);
const isDraggingCarousel = ref(false);
const suppressProjectClick = ref(false);

const projectAssets = (folder, count) => ({
  thumbnail: `${base}${folder}/1.png`,
  images: Array.from({ length: Math.max(0, count - 1) }, (_, index) => `${base}${folder}/${index + 2}.png`),
});

// UPDATED
const projects = [
  {
    ...projectAssets('borrowmate', 13),
    title: 'BorrowMate',
    url: 'https://borrowmate.heydigital.com.au',
    github: '#',
    category: 'Web',
    label: 'Web App',
    description:
      'BorrowMate is a collateral-backed lending platform built for controlled borrower management and operational visibility. It supports borrower tracking, loan approval workflows, repayment monitoring, and admin-side status handling. The interface is structured for staff who need to move quickly between records, review history, and maintain accurate lending activity.',
    stack: ['Laravel', 'Vue', 'MySQL'],
    span: 'wide',
  },
  {
    ...projectAssets('islegit', 11),
    title: 'IcLegit',
    url: 'http://isitlegit.co/',
    github: '#',
    category: 'Tool',
    label: 'Tool',
    description:
      'IcLegit is a verification-focused tool for checking and reviewing legitimacy signals through a focused user flow. The project combines dashboard screens, result views, and admin-friendly data handling. It is designed to make review steps clear while keeping the interface fast and practical for repeated checks.',
    stack: ['Laravel', 'API', 'MySQL'],
    span: 'tall',
  },
  {
    ...projectAssets('domain-name-generater', 3),
    title: 'Domain Name Generator',
    url: 'https://3sname.com/',
    github: '#',
    category: 'Tool',
    label: 'Tool',
    description:
      'Domain Name Generator helps users explore usable name ideas through a clean, focused workflow. The application presents generated options in a simple interface with practical actions for review and selection. It keeps the experience lightweight while supporting a real tool-style use case.',
    stack: ['Laravel', 'JavaScript', 'API'],
    span: '',
  },
  {
    ...projectAssets('gifted-texi', 9),
    title: 'Gifted Taxi & Tours',
    url: 'https://giftedtaxiandtours.com',
    category: 'Web',
    label: 'Booking',
    description:
      'Gifted Taxi & Tours is a booking-oriented website for transport and tour services. It presents service information, destination content, and inquiry paths in a way that supports direct customer action. The build focuses on responsive layouts, clear trip discovery, and simple maintenance for business updates.',
    stack: ['Laravel', 'Booking', 'MySQL'],
    span: '',
  },
  {
    ...projectAssets('blog_site', 6),
    title: 'Blog Platform',
    url: '#',
    github: 'https://github.com/jhanzaibgithub/Blog-site-Vue-js-Laravel.git',
    category: 'Web',
    label: 'Web App',
    description:
      'Blog Platform is a content management project with structured posting, listing, and detail screens. It gives admins a straightforward way to manage blog content while keeping the public reading experience clean. The project emphasizes reusable layouts, clear hierarchy, and maintainable backend flows.',
    stack: ['Laravel', 'MySQL', 'Blade'],
    span: 'tall',
  },
  {
    ...projectAssets('hosting-panel', 6),
    title: 'Hosting Panel',
    url: 'https://hpanel.pixelz360.com.au/',
    github: '#',
    category: 'Web',
    label: 'Panel',
    description:
      'Hosting Panel is an admin-style interface for managing hosting-related services and customer records. It includes screens for operational tracking, account information, and workflow visibility. The design is compact, dashboard-oriented, and built for day-to-day management tasks.',
    stack: ['Laravel', 'MySQL', 'Admin'],
    span: 'wide',
  },
];

const visibleProjects = computed(() =>
  Array.from({ length: Math.min(3, projects.length) }, (_, offset) => {
    const index = (currentProjectIndex.value + offset) % projects.length;
    return { ...projects[index], originalIndex: index };
  }),
);

function nextProjects() {
  currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.length;
}

function previousProjects() {
  currentProjectIndex.value = (currentProjectIndex.value - 1 + projects.length) % projects.length;
}

function startCarouselDrag(event) {
  isDraggingCarousel.value = true;
  dragStartX.value = event.clientX ?? event.touches?.[0]?.clientX ?? 0;
  dragDistance.value = 0;
}

function moveCarouselDrag(event) {
  if (!isDraggingCarousel.value) return;
  const currentX = event.clientX ?? event.touches?.[0]?.clientX ?? dragStartX.value;
  dragDistance.value = currentX - dragStartX.value;
}

function endCarouselDrag() {
  if (!isDraggingCarousel.value) return;
  isDraggingCarousel.value = false;
  if (Math.abs(dragDistance.value) < 48) return;
  suppressProjectClick.value = true;
  if (dragDistance.value < 0) nextProjects();
  if (dragDistance.value > 0) previousProjects();
  window.setTimeout(() => {
    suppressProjectClick.value = false;
  }, 0);
}

// UPDATED
function openModal(project) {
  if (suppressProjectClick.value) return;
  selectedProject.value = project;
  modalOpen.value = true;
}

// UPDATED
function closeModal() {
  modalOpen.value = false;
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.index) * 80;
        window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );
  document.querySelectorAll('.project-card').forEach((card) => observer.observe(card));

  gsap.from('.projects-title', {
    clipPath: 'inset(0 100% 0 0)',
    duration: 0.7,
    scrollTrigger: { trigger: '.projects-title', start: 'top 75%' },
  });
});
</script>

<template>
  <section id="projects" class="projects section-shell">
    <div class="section-kicker">
      <span class="eyebrow">Work</span>
      <h2 class="section-title projects-title">Selected builds <em>with production weight</em></h2>
      <p>Real projects spanning ecommerce, booking, lending, web platforms, APIs, and business tools.</p>
    </div>
    <div class="projects-carousel">
      <div class="carousel-head">
        <span>{{ currentProjectIndex + 1 }} / {{ projects.length }}</span>
        <div class="carousel-controls" aria-label="Project carousel controls">
          <button aria-label="Previous projects" @click="previousProjects">&lt;</button>
          <button aria-label="Next projects" @click="nextProjects">&gt;</button>
        </div>
      </div>
      <div
        class="carousel-viewport"
        :class="{ dragging: isDraggingCarousel }"
        @pointerdown="startCarouselDrag"
        @pointermove="moveCarouselDrag"
        @pointerup="endCarouselDrag"
        @pointercancel="endCarouselDrag"
        @pointerleave="endCarouselDrag"
      >
        <div class="carousel-track">
          <article
            v-for="project in visibleProjects"
            :key="`${project.title}-${currentProjectIndex}`"
            class="project-card glass-card tilt-card is-visible"
            :data-index="project.originalIndex"
            :data-category="project.category"
            role="button"
            tabindex="0"
            @click="openModal(project)"
            @keydown.enter.prevent="openModal(project)"
          >
            <div class="project-visual">
              <img :src="project.thumbnail" :alt="`${project.title} thumbnail`" loading="lazy" draggable="false" />
            </div>
            <span class="project-index">{{ String(project.originalIndex + 1).padStart(2, '0') }}</span>
            <div class="project-actions">
              <a :href="project.github" aria-label="GitHub repository" @click.stop>Git</a>
              <a :href="project.url" target="_blank" rel="noreferrer" aria-label="Live demo" @click.stop>Live</a>
            </div>
            <div class="project-info">
              <div class="project-meta">
                <span class="project-label">{{ project.label }}</span>
                <span>{{ project.category }}</span>
              </div>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="pills">
                <span v-for="tech in project.stack" :key="tech">{{ tech }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="carousel-dots" aria-label="Project carousel position">
        <button
          v-for="(_, index) in projects"
          :key="index"
          :class="{ active: index === currentProjectIndex }"
          :aria-label="`Show project set starting at ${index + 1}`"
          @click="currentProjectIndex = index"
        ></button>
      </div>
      <div class="more-work-row">
        <a
          class="btn primary more-work-btn"
          href="https://www.upwork.com/freelancers/~017d9280669d695f18?viewMode=1&mp_source=share"
          target="_blank"
          rel="noreferrer"
        >
          More work? Check Upwork Profile
        </a>
      </div>
    </div>

    <ProjectModal :is-open="modalOpen" :project="selectedProject" @close="closeModal" />
  </section>
</template>
