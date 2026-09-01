<script setup>
import { onMounted, ref } from 'vue';

const sectionRef = ref(null);
const base = import.meta.env.BASE_URL;

const email = 'jahanzaibzafar.dev63@gmail.com';
const whatsappUrl =
  'https://wa.me/923067648159?text=Hi%20Jahanzaib%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.';
const cvUrl = `${base}jahanzaib-developer.pdf`;

const links = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/jahanzaibzafar', icon: 'in' },
  { label: 'GitHub', url: 'https://github.com/jhanzaibgithub', icon: 'GH' },
  { label: 'Upwork', url: 'https://www.upwork.com/freelancers/jahanzaibzafar01?mp_source=share', icon: 'Up' },
  { label: 'WhatsApp', url: whatsappUrl, icon: 'WA' },
];

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
  <section id="contact" class="contact section-shell" ref="sectionRef">
    <div class="contact-inner">
      <div class="reveal">
        <span class="section-label">Contact</span>
        <h2 class="section-heading contact-heading">Let's work <em>together</em></h2>
        <p class="contact-text">
          Seeking senior engineering leadership, resilient backend system architecture, or full-stack platform execution? Let's connect to discuss your technical vision.
        </p>
      </div>

      <a class="contact-email reveal reveal-delay-1" :href="`mailto:${email}`">
        ✉ {{ email }}
      </a>

      <div class="contact-links reveal reveal-delay-2">
        <a
          v-for="link in links"
          :key="link.label"
          class="contact-link"
          :href="link.url"
          target="_blank"
          rel="noreferrer"
          :aria-label="link.label"
        >
          <strong>{{ link.icon }}</strong>
          {{ link.label }}
        </a>
      </div>

      <a class="contact-cv reveal reveal-delay-3" :href="cvUrl" download="Jahanzaib-Zafar-CV.pdf">
        ↓ Download CV
      </a>
    </div>
  </section>
</template>
