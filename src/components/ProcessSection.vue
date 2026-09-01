<script setup>
import { onMounted, ref } from 'vue';

const sectionRef = ref(null);

const steps = [
  {
    number: '01',
    title: 'Discover & Analyze',
    desc: 'Deconstruct domain logic, data models, and workflow requirements. Identify failure points and security vectors before design.',
  },
  {
    number: '02',
    title: 'System Architecture',
    desc: 'Establish relational database schemas, REST/GraphQL API contracts, authentication models, and caching strategies.',
  },
  {
    number: '03',
    title: 'Agile Engineering',
    desc: 'Clean code execution with modular Vue/React components and decoupled Laravel/Node.js backends. Test-driven & peer-reviewed.',
  },
  {
    number: '04',
    title: 'DevOps & Maintenance',
    desc: 'Containerized deployment on production infrastructure (WHM/Plesk/Docker). Continuous monitoring, logging, and comprehensive docs.',
  },
];

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), i * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
</script>

<template>
  <section id="process" class="process section-shell" ref="sectionRef">
    <div class="process-header reveal">
      <span class="section-label">Process</span>
      <h2 class="section-heading">How I <em>work</em></h2>
      <p class="section-subtext">
        A disciplined engineering framework ensuring structural stability, rapid execution, and seamless deployment for every system.
      </p>
    </div>

    <div class="process-grid">
      <div v-for="step in steps" :key="step.number" class="process-step reveal">
        <div class="process-number">{{ step.number }}</div>
        <h3 class="process-title">{{ step.title }}</h3>
        <p class="process-desc">{{ step.desc }}</p>
      </div>
    </div>
  </section>
</template>
