<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import { useHead } from '@vueuse/head';
import GalaxyCanvas from './components/GalaxyCanvas.vue';
import NavBar from './components/NavBar.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import TimelineSection from './components/TimelineSection.vue';
import ContactSection from './components/ContactSection.vue';

const siteUrl = 'https://jhanzaibgithub.github.io/jahanzaibzafar/';
const profileImage = `${siteUrl}profile-pic.png`;
const cvUrl = `${siteUrl}jahanzaib-developer.pdf`;
const githubUrl = 'https://github.com/jhanzaibgithub';
const linkedInUrl = 'https://www.linkedin.com/in/jahanzaib-zafar-814ab4296/';
const description =
  'Jahanzaib Zafar is a Full Stack Developer building Laravel, MERN, Vue.js, Node.js, API, dashboard, and production web applications.';

const sectionMeta = {
  '#home': {
    title: 'Jahanzaib Zafar | Full Stack Developer',
    description,
  },
  '#about': {
    title: 'About Jahanzaib Zafar | Full Stack Developer',
    description: 'Learn about Jahanzaib Zafar, a Full Stack Developer specializing in Laravel, Vue.js, MERN, APIs, dashboards, and maintainable web products.',
  },
  '#projects': {
    title: 'Projects by Jahanzaib Zafar | Laravel, MERN, Vue.js',
    description: 'Explore production projects by Jahanzaib Zafar, including Laravel platforms, Vue.js interfaces, booking systems, dashboards, APIs, and business tools.',
  },
  '#skills': {
    title: 'Skills | Jahanzaib Zafar Full Stack Developer',
    description: 'Technical skills for Jahanzaib Zafar: Laravel, PHP, Vue.js, React, Node.js, Express, MERN, MySQL, MongoDB, Firebase, REST APIs, and Git.',
  },
  '#experience': {
    title: 'Experience | Jahanzaib Zafar',
    description: 'Professional full stack development experience for Jahanzaib Zafar across freelance builds, business applications, APIs, dashboards, and web platforms.',
  },
  '#contact': {
    title: 'Contact Jahanzaib Zafar | Full Stack Developer',
    description: 'Contact Jahanzaib Zafar for full stack development work involving Laravel, Vue.js, MERN, dashboards, APIs, and production web applications.',
  },
  '#resume': {
    title: 'Resume | Jahanzaib Zafar CV',
    description: 'Download the CV of Jahanzaib Zafar, Full Stack Developer specializing in Laravel, MERN, Vue.js, Node.js, APIs, and web applications.',
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
      { property: 'og:site_name', content: 'Jahanzaib Zafar Portfolio' },
      { property: 'og:title', content: activeMeta.value.title },
      { property: 'og:description', content: activeMeta.value.description },
      { property: 'og:url', content: siteUrl },
      { property: 'og:image', content: profileImage },
      { property: 'og:image:alt', content: 'Jahanzaib Zafar Full Stack Developer' },
      { property: 'profile:first_name', content: 'Jahanzaib' },
      { property: 'profile:last_name', content: 'Zafar' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: activeMeta.value.title },
      { name: 'twitter:description', content: activeMeta.value.description },
      { name: 'twitter:image', content: profileImage },
      { name: 'twitter:image:alt', content: 'Jahanzaib Zafar Full Stack Developer' },
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
          email: 'mailto:jahanzaibzafar.dev63@gmail.com',
          description,
          knowsAbout: ['Laravel', 'MERN Stack', 'Vue.js', 'Node.js', 'React', 'PHP', 'REST APIs', 'MySQL', 'MongoDB'],
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
          name: 'Jahanzaib Zafar Portfolio',
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
  <GalaxyCanvas />
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <TimelineSection />
    <section id="resume" class="resume section-shell">
      <div class="resume-card glass-card">
        <div>
          <span class="eyebrow">Resume</span>
          <h2 class="section-title">Jahanzaib Zafar <em>CV</em></h2>
          <p>
            Download the CV for Jahanzaib Zafar, Full Stack Developer specializing in Laravel, MERN, Vue.js, Node.js,
            REST APIs, dashboards, and production web applications.
          </p>
        </div>
        <a class="btn primary" :href="cvUrl" download="Jahanzaib-Zafar-CV.pdf">Download CV</a>
      </div>
    </section>
    <ContactSection />
  </main>
  <footer class="site-footer">
    <a href="#home" aria-label="Back to top">JZ</a>
    <p>Crafted with precision by Jahanzaib Zafar</p>
    <div class="footer-socials">
      <a href="https://github.com/jhanzaibgithub" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/jahanzaib-zafar-814ab4296/" target="_blank" rel="noreferrer">LinkedIn</a>
      <a :href="cvUrl" download="Jahanzaib-Zafar-CV.pdf">Download CV</a>
      <a href="https://www.upwork.com/freelancers/~017d9280669d695f18?viewMode=1&mp_source=share" target="_blank" rel="noreferrer">Upwork</a>
    </div>
    <span>(c) 2026 Jahanzaib Zafar. All rights reserved.</span>
  </footer>
</template>
