<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const isOpen = ref(false);
const isScrolled = ref(false);
const activeSection = ref('home');
const cvUrl = `${import.meta.env.BASE_URL}jahanzaib-developer.pdf`;
let ticking = false;
let observer;

const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['resume', 'Resume'],
  ['contact', 'Contact'],
];

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    isScrolled.value = window.scrollY > 80;
    ticking = false;
  });
}

function goTo(id) {
  isOpen.value = false;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 },
  );
  links.forEach(([id]) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  observer?.disconnect();
});
</script>

<template>
  <header class="navbar" :class="{ 'is-scrolled': isScrolled }">
    <a class="logo" href="#home" @click.prevent="goTo('home')" aria-label="Jahanzaib Zafar home">
      <span class="logo-mark">JZ</span>
      <span class="logo-name">Jahanzaib <b>Zafar</b></span>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a
        v-for="[id, label] in links"
        :key="id"
        :href="`#${id}`"
        class="nav-link"
        :class="{ active: activeSection === id }"
        @click="goTo(id)"
      >
        {{ label }}
      </a>
    </nav>
    <div class="header-actions">
      <a class="header-social" href="https://github.com/jhanzaibgithub" target="_blank" rel="noreferrer" aria-label="Jahanzaib Zafar GitHub">GitHub</a>
      <a class="header-social" href="https://www.linkedin.com/in/jahanzaib-zafar-814ab4296/" target="_blank" rel="noreferrer" aria-label="Jahanzaib Zafar LinkedIn">LinkedIn</a>
      <a class="hire-btn" :href="cvUrl" download="Jahanzaib-Zafar-CV.pdf">Download CV</a>
      <button class="hire-btn" @click="goTo('contact')">Hire Me</button>
    </div>
    <button class="menu-btn" :aria-expanded="isOpen" aria-label="Open menu" @click="isOpen = !isOpen">
      <span></span><span></span>
    </button>
    <div class="mobile-menu" :class="{ open: isOpen }">
      <a v-for="[id, label] in links" :key="id" :href="`#${id}`" @click="goTo(id)">{{ label }}</a>
      <a :href="cvUrl" download="Jahanzaib-Zafar-CV.pdf">Download CV</a>
      <a href="https://github.com/jhanzaibgithub" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/jahanzaib-zafar-814ab4296/" target="_blank" rel="noreferrer">LinkedIn</a>
    </div>
  </header>
</template>
