<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const isOpen = ref(false);
const isScrolled = ref(false);
const activeSection = ref('home');
let ticking = false;
let observer;

const base = import.meta.env.BASE_URL;
const cvUrl = `${base}jahanzaib-developer.pdf`;

const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['process', 'Process'],
  ['projects', 'Work'],
  ['testimonials', 'Reviews'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
];

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    isScrolled.value = window.scrollY > 60;
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
  <header class="navbar" :class="{ 'is-scrolled': isScrolled }" role="banner">
    <div class="navbar-inner">
      <a class="logo" href="#home" @click.prevent="goTo('home')" aria-label="Jahanzaib Zafar — home">
        <span class="logo-mark">JZ</span>
        <span>Jahanzaib Zafar</span>
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <a
          v-for="[id, label] in links"
          :key="id"
          :href="`#${id}`"
          class="nav-link"
          :class="{ active: activeSection === id }"
          @click.prevent="goTo(id)"
        >
          {{ label }}
        </a>
      </nav>

      <div class="nav-actions">
        <a class="btn btn-outline nav-cv-btn" :href="cvUrl" download="Jahanzaib-Zafar-CV.pdf">Download CV</a>
        <button class="btn btn-primary nav-cta" @click="goTo('contact')">Get in Touch</button>
      </div>

      <button
        class="menu-btn"
        :aria-expanded="String(isOpen)"
        aria-label="Toggle navigation menu"
        @click="isOpen = !isOpen"
      >
        <span></span>
        <span></span>
      </button>
    </div>

    <nav class="mobile-menu" :class="{ open: isOpen }" aria-label="Mobile navigation">
      <a
        v-for="[id, label] in links"
        :key="id"
        :href="`#${id}`"
        @click.prevent="goTo(id)"
      >
        {{ label }}
      </a>
      <a class="mobile-cv-cta" :href="cvUrl" download="Jahanzaib-Zafar-CV.pdf">↓ Download CV</a>
      <a class="mobile-cta" href="#contact" @click.prevent="goTo('contact')">Get in Touch</a>
    </nav>
  </header>
</template>
