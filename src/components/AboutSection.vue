<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stack = ['Vue', 'React', 'Node', 'Laravel', 'PHP', 'MySQL', 'MongoDB', 'Firebase', 'REST APIs', 'Git'];

onMounted(() => {
  gsap.from('.about-title', {
    clipPath: 'inset(0 100% 0 0)',
    duration: 0.7,
    scrollTrigger: { trigger: '.about-title', start: 'top 75%' },
  });
  gsap.from('.about-card, .stack-item', {
    opacity: 0,
    y: 30,
    duration: 0.5,
    stagger: 0.06,
    scrollTrigger: { trigger: '#about', start: 'top 65%' },
  });
  gsap.to('.about-glow', {
    y: -80,
    scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: true },
  });
});
</script>

<template>
  <section id="about" class="about section-shell">
    <div>
      <span class="eyebrow">About</span>
      <h2 class="section-title about-title">Practical engineering,<br /><em>premium execution</em></h2>
      <div class="about-card glass-card">
        <p>
          I am a full stack developer focused on shipping clean, durable products for businesses that need more than a surface-level website.
        </p>
        <p>
          My work spans Laravel backends, Vue and React interfaces, REST APIs, dashboards, booking flows, ecommerce, hosting tools, and automation-heavy platforms.
        </p>
        <p>
          I keep the build process direct: understand the workflow, design the right architecture, implement carefully, and leave the project maintainable.
        </p>
      </div>
    </div>
    <div class="stack-panel glass-card">
      <span class="panel-label">Core Expertise</span>
      <div class="stack-grid">
        <span v-for="item in stack" :key="item" class="stack-item">{{ item }}</span>
      </div>
    </div>
    <div class="about-glow" aria-hidden="true"></div>
  </section>
</template>
