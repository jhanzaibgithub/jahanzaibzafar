<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const isOpen = ref(false);
const isScrolled = ref(false);
const activeSection = ref('home');
let ticking = false;
let observer;

const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
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
      <button
        v-for="[id, label] in links"
        :key="id"
        class="nav-link"
        :class="{ active: activeSection === id }"
        @click="goTo(id)"
      >
        {{ label }}
      </button>
    </nav>
    <button class="hire-btn" @click="goTo('contact')">Hire Me</button>
    <button class="menu-btn" :aria-expanded="isOpen" aria-label="Open menu" @click="isOpen = !isOpen">
      <span></span><span></span>
    </button>
    <div class="mobile-menu" :class="{ open: isOpen }">
      <button v-for="[id, label] in links" :key="id" @click="goTo(id)">{{ label }}</button>
    </div>
  </header>
</template>
