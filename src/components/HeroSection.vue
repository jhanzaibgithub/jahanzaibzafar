<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const role = ref('Full Stack Developer');
const roles = ['Full Stack Developer (Laravel, MERN, Vue.js)', 'Laravel Engineer', 'Vue.js Builder', 'Node.js API Specialist'];
const base = import.meta.env.BASE_URL;

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => {
  const tl = gsap.timeline();
  tl.fromTo('.hero-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.out' })
    .from('.hero-copy, .hero-role', { opacity: 0, y: 24, duration: 0.45, stagger: 0.08 }, '+=0.2')
    .from('.hero-actions .btn', { opacity: 0, y: 18, duration: 0.35, stagger: 0.1 }, '-=0.1')
    .from('.floating-card', { opacity: 0, scale: 0.92, duration: 0.7, stagger: 0.1 }, '-=0.1');

  let index = 0;
  const swap = () => {
    index = (index + 1) % roles.length;
    gsap.to('.hero-role', {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        role.value = roles[index];
        gsap.fromTo('.hero-role', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.28 });
      },
    });
  };
  const loop = gsap.delayedCall(2.6, function repeat() {
    swap();
    this.restart(true);
  });
  loop.vars.delay = 2.6;
});
</script>

<template>
  <section id="home" class="hero section-shell">
    <div class="hero-content">
      <span class="eyebrow">Available for freelance</span>
      <h1 class="hero-name">Jahanzaib<br/>Zafar</h1>
      <strong class="hero-role">{{ role }}</strong>
      <p class="hero-copy">
        I build polished web products with Vue, Laravel, Node.js, API integrations, and database systems that stay stable after launch.
      </p>
      <div class="hero-actions">
        <a class="btn primary" :href="`${base}jahanzaib-developer.pdf`" download="Jahanzaib-Zafar-CV.pdf">Download CV</a>
        <button class="btn ghost" @click="scrollToProjects">View Projects</button>
        <a class="btn ghost" href="https://github.com/jhanzaibgithub" target="_blank" rel="noreferrer">View GitHub</a>
        <a class="btn ghost" href="https://www.linkedin.com/in/jahanzaib-zafar-814ab4296/" target="_blank" rel="noreferrer">View LinkedIn</a>
      </div>
    </div>
    <div class="hero-orbit">
      <figure class="profile-card floating-card">
        <img
          :src="`${base}profile.svg`"
          alt="Jahanzaib Zafar Full Stack Developer"
          width="280"
          height="280"
          loading="eager"
          fetchpriority="high"
        />
        <figcaption>Jahanzaib Zafar</figcaption>
      </figure>
      <div class="code-card floating-card">
        <span>Developer.js</span>
        <pre>const developer = {
  name: "Jahanzaib Zafar",
  stack: ["Laravel", "PHP", "MERN", "Vue", "Express", "Node"],
  focus: "Production web"
};</pre>
      </div>
      <div class="metric-card floating-card">
        <b>30+</b><span>Projects</span>
        <b>25+</b><span>Clients</span>
      </div>
    </div>
  </section>
</template>
