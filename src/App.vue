<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { useHead } from '@vueuse/head';
import NavBar from './components/NavBar.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ProcessSection from './components/ProcessSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import TimelineSection from './components/TimelineSection.vue';
import ContactSection from './components/ContactSection.vue';
import PreLoader from './components/PreLoader.vue';

const siteUrl = 'https://jhanzaibgithub.github.io/jahanzaibzafar/';
const profileImage = `${siteUrl}profile-pic-nobg.png`;
const cvUrl = `${siteUrl}jahanzaib-developer.pdf`;
const githubUrl = 'https://github.com/jhanzaibgithub';
const linkedInUrl = 'https://linkedin.com/in/jahanzaibzafar';
const description =
  'Jahanzaib Zafar — Full Stack Developer specializing in Laravel, Vue.js, React, Node.js, REST APIs, and production web applications. 3+ years building backend systems, admin dashboards, and API integrations.';

const sectionMeta = {
  '#home': {
    title: 'Jahanzaib Zafar — Full Stack Developer',
    description,
  },
  '#about': {
    title: 'About — Jahanzaib Zafar',
    description: 'Engineering philosophy and approach of Jahanzaib Zafar, Full Stack Developer specializing in Laravel, Vue.js, and production web applications.',
  },
  '#process': {
    title: 'Process — How I Work | Jahanzaib Zafar',
    description: 'My development process: Understand, Architect, Build, Maintain. A disciplined approach to shipping production-ready web applications.',
  },
  '#projects': {
    title: 'Projects — Jahanzaib Zafar',
    description: 'Selected production projects: lending platforms, admin panels, booking systems, and business tools built with Laravel, Vue.js, and MySQL.',
  },
  '#skills': {
    title: 'Skills — Jahanzaib Zafar',
    description: 'Technical skills: Laravel, PHP, Vue.js, React, Node.js, MySQL, MongoDB, Stripe Integration, REST APIs, Docker, and Git.',
  },
  '#experience': {
    title: 'Experience — Jahanzaib Zafar',
    description: '3+ years of professional full stack development across Dcodax Technology, Crexed Software, and Pixelz360.',
  },
  '#contact': {
    title: 'Contact — Jahanzaib Zafar',
    description: 'Get in touch with Jahanzaib Zafar for full stack development projects — Laravel, Vue.js, Node.js, APIs, and production web applications.',
  },
};

const currentHash = ref(typeof window === 'undefined' ? '#home' : window.location.hash || '#home');
const activeMeta = computed(() => sectionMeta[currentHash.value] || sectionMeta['#home']);

function updateHash() {
  currentHash.value = window.location.hash || '#home';
}

onMounted(() => {
  window.addEventListener('hashchange', updateHash);
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', updateHash);
});

useHead(
  computed(() => ({
    title: activeMeta.value.title,
    meta: [
      { name: 'description', content: activeMeta.value.description },
      { name: 'author', content: 'Jahanzaib Zafar' },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { name: 'googlebot', content: 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:site_name', content: 'Jahanzaib Zafar — Full Stack Developer' },
      { property: 'og:title', content: activeMeta.value.title },
      { property: 'og:description', content: activeMeta.value.description },
      { property: 'og:url', content: siteUrl },
      { property: 'og:image', content: profileImage },
      { property: 'og:image:alt', content: 'Jahanzaib Zafar — Full Stack Developer' },
      { property: 'profile:first_name', content: 'Jahanzaib' },
      { property: 'profile:last_name', content: 'Zafar' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: activeMeta.value.title },
      { name: 'twitter:description', content: activeMeta.value.description },
      { name: 'twitter:image', content: profileImage },
      { name: 'twitter:image:alt', content: 'Jahanzaib Zafar — Full Stack Developer' },
    ],
    link: [
      { rel: 'canonical', href: siteUrl },
      { rel: 'me', href: githubUrl },
      { rel: 'me', href: linkedInUrl },
      { rel: 'author', href: linkedInUrl },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `${siteUrl}#jahanzaib-zafar`,
          name: 'Jahanzaib Zafar',
          givenName: 'Jahanzaib',
          familyName: 'Zafar',
          jobTitle: 'Full Stack Developer',
          url: siteUrl,
          image: profileImage,
          email: 'mailto:jahanzaibryk2020@gmail.com',
          description,
          knowsAbout: [
            'Laravel', 'PHP', 'Vue.js', 'React', 'Node.js', 'MERN Stack',
            'REST APIs', 'MySQL', 'MongoDB', 'Stripe', 'cPanel/WHM',
          ],
          sameAs: [githubUrl, linkedInUrl, siteUrl],
          mainEntityOfPage: siteUrl,
          hasCredential: {
            '@type': 'CreativeWork',
            name: 'Jahanzaib Zafar CV',
            url: cvUrl,
          },
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${siteUrl}#website`,
          name: 'Jahanzaib Zafar — Full Stack Developer',
          url: siteUrl,
          description,
          publisher: {
            '@id': `${siteUrl}#jahanzaib-zafar`,
          },
        }),
      },
    ],
  })),
);
</script>

<template>
  <PreLoader />
  <a href="#home" class="skip-link">Skip to content</a>
  <NavBar />
  <main id="main-content">
    <HeroSection />
    <AboutSection />
    <ProcessSection />
    <ProjectsSection />
    <TestimonialsSection />
    <SkillsSection />
    <TimelineSection />
    <ContactSection />
  </main>
  <footer class="site-footer">
    <a href="#home" class="footer-logo">Jahanzaib Zafar</a>
    <div class="footer-links">
      <a href="https://github.com/jhanzaibgithub" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://linkedin.com/in/jahanzaibzafar" target="_blank" rel="noreferrer">LinkedIn</a>
      <a
        href="https://www.upwork.com/freelancers/~017d9280669d695f18?viewMode=1&mp_source=share"
        target="_blank"
        rel="noreferrer"
      >
        Upwork
      </a>
    </div>
    <span class="footer-copy">&copy; 2026 Jahanzaib Zafar. All rights reserved.</span>
  </footer>
</template>
