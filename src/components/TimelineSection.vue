<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  ['5+', 'Years Exp'],
  ['50+', 'Projects'],
  ['25+', 'Clients'],
  ['3', 'Companies'],
];

const entries = [
  // UPDATED
  {
    range: '2022 - Present',
    role: 'Full Stack Developer',
    company: 'Freelance - Upwork',
    badge: 'CURRENT',
    bullets: [
      'Leading full-stack development of client applications across e-commerce, booking platforms, SaaS tools, and mobile backends.',
      'Specialized in MERN stack, Laravel, and Vue.js with Firebase and Stripe integrations.',
    ],
    tags: ['React', 'Vue', 'Laravel', 'Node.js', 'MongoDB', 'Firebase'],
  },
  {
    range: '2021 - 2022',
    role: 'Laravel Developer',
    company: 'Dcodax Private Limited',
    bullets: [
      'Developed and maintained client-facing web applications and Android app documentation systems.',
      'Produced pixel-accurate HTML deliverables and collaborated on full-stack Laravel and MERN projects.',
    ],
    tags: ['Laravel', 'MySQL', 'PHP', 'HTML/CSS', 'JavaScript'],
  },
  {
    range: '2020 - 2021',
    role: 'Junior Laravel Developer',
    company: 'Freelance (Early Career)',
    bullets: [
      'Built landing pages, business websites, and small web apps for local clients.',
      'Applied modern CSS layouts, responsive design principles, and JavaScript fundamentals to deliver clean, fast projects.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Laravel', 'GitHub Pages'],
  },
  {
    range: '2019 - 2023',
    role: 'BS Computer Science',
    company: 'FAST NUCES University',
    bullets: [
      "Completed Bachelor's in Computer Science with focus on software engineering, databases, and web technologies.",
      'Worked on multiple academic projects using modern web stacks.',
    ],
    tags: ['Academic', 'Computer Science'],
  },
];

onMounted(() => {
  gsap.from('.timeline-title', {
    clipPath: 'inset(0 100% 0 0)',
    duration: 0.7,
    scrollTrigger: { trigger: '.timeline-title', start: 'top 75%' },
  });
  gsap.from('.timeline-entry', {
    opacity: 0,
    x: -60,
    duration: 0.6,
    stagger: 0.14,
    scrollTrigger: { trigger: '.timeline-track', start: 'top 70%' },
  });
});
</script>

<template>
  <section id="experience" class="timeline section-shell">
    <div class="section-kicker">
      <span class="eyebrow">Experience</span>
      <h2 class="section-title timeline-title">Timeline of growth <em>and delivery</em></h2>
      <p>A focused path through product development, backend architecture, integrations, and production support.</p>
    </div>
    <div class="stat-strip glass-card">
      <div v-for="[number, label] in stats" :key="label">
        <b>{{ number }}</b><span>{{ label }}</span>
      </div>
    </div>
    <div class="timeline-track">
      <article v-for="entry in entries" :key="entry.role + entry.range" class="timeline-entry glass-card">
        <span class="range">{{ entry.range }}</span>
        <!-- UPDATED -->
        <span v-if="entry.badge" class="current-badge">{{ entry.badge }}</span>
        <h3>{{ entry.role }}</h3>
        <strong>{{ entry.company }}</strong>
        <ul>
          <li v-for="bullet in entry.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
        <div class="pills">
          <span v-for="tag in entry.tags" :key="tag">{{ tag }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
