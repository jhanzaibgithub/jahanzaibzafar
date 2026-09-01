<script setup>
import { onMounted, ref } from 'vue';

const sectionRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
</script>

<template>
  <section id="about" class="about section-shell" ref="sectionRef">
    <div class="about-grid">
      <div class="reveal">
        <span class="section-label">About</span>
        <h2 class="section-heading">How I think about <em>building software</em></h2>
      </div>

      <div class="about-text reveal reveal-delay-1">
        <p>
          As a senior full-stack engineer, I bridge high-level domain objectives with low-level execution integrity.
          I deconstruct complex business logic, identify systemic bottlenecks, and design decoupled, maintainable software architectures engineered for fault tolerance, security, and long-term scalabilty.
        </p>
        <p>
          My technical foundation centers around <strong>Laravel, PHP, and Node.js microservices</strong> on the backend, complemented by <strong>Vue.js, React, and Next.js</strong> on the frontend, with <strong>MySQL, MongoDB, and Redis</strong> powering data layers. I specialize in Stripe payment gateway orchestration, custom multi-tenant portal development, devops server provisioning (cPanel/WHM/Plesk/Docker), and bulletproof REST API integrations.
        </p>
      </div>

      <div class="about-highlight reveal reveal-delay-2">
        I don't ship throwaway prototypes. I engineer resilient, battle-tested production platforms built to scale.
      </div>
    </div>
  </section>
</template>
