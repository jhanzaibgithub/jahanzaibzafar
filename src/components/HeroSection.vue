<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';

const base = import.meta.env.BASE_URL;

function scrollToWork() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    '.hero-name',
    { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8 },
  )
    .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
    .from('.hero-meta', { opacity: 0, y: 16, duration: 0.4 }, '-=0.2')
    .from('.hero-actions .btn', { opacity: 0, y: 16, duration: 0.4, stagger: 0.1 }, '-=0.1')
    .from('.hero-photo-frame', { opacity: 0, scale: 0.95, duration: 0.7 }, '-=0.5');
});
</script>

<template>
  <section id="home" class="hero section-shell">
    <div class="hero-content">
      <h1 class="hero-name">Jahanzaib<br />Zafar</h1>
      <p class="hero-tagline">
        Senior Full Stack Engineer specializing in resilient Laravel backend architecture,
        high-concurrency Node.js REST APIs, and reactive Vue.js &amp; React interfaces for mission-critical enterprise systems.
      </p>
      <div class="hero-meta">
        <span>Senior Full Stack Engineer</span>
        <span class="hero-meta-dot"></span>
        <span>3+ Years Experience</span>
        <span class="hero-meta-dot"></span>
        <span>3 Corporate Roles + Lead Freelance</span>
      </div>
      <div class="hero-actions">
        <button class="btn btn-primary" @click="scrollToWork">See My Work</button>
        <a class="btn btn-outline" :href="`${base}jahanzaib-developer.pdf`" download="Jahanzaib-Zafar-CV.pdf">Download CV</a>
        <button class="btn btn-outline" @click="scrollToContact">Get in Touch</button>
      </div>
    </div>
    <div class="hero-photo">
      <figure class="hero-photo-frame">
        <img
          :src="`${base}profile-pic.png`"
          alt="Jahanzaib Zafar — Full Stack Developer"
          width="360"
          height="450"
          loading="eager"
          fetchpriority="high"
        />
      </figure>
    </div>
  </section>
</template>
