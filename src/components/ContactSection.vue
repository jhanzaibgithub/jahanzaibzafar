<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// UPDATED
const email = 'jahanzaibzafar.dev@gmail.com';
const whatsappUrl =
  'https://wa.me/923067648159?text=Hi%20Jahanzaib%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.';
const socialLinks = [
  ['LinkedIn', 'in', 'https://www.linkedin.com/in/jahanzaib-zafar-814ab4296/'],
  ['GitHub', 'GH', 'https://github.com/jhanzaibgithub'],
  ['Upwork', 'Up', 'https://www.upwork.com/freelancers/~017d9280669d695f18?viewMode=1&mp_source=share'],
];

onMounted(() => {
  gsap.from('.contact-card', {
    opacity: 0,
    y: 40,
    duration: 0.7,
    scrollTrigger: { trigger: '#contact', start: 'top 70%' },
  });
});
</script>

<template>
  <section id="contact" class="contact section-shell">
    <div class="contact-card glass-card">
      <div>
        <span class="eyebrow">Contact</span>
        <h2 class="section-title">Let's build <em>something durable.</em></h2>
        <p>Open to freelance projects that need thoughtful execution, reliable code, and clear communication.</p>
        <!-- UPDATED -->
        <div class="contact-list">
          <a class="email-link" :href="`mailto:${email}`">{{ email }}</a>
          <a class="contact-item whatsapp-link" :href="whatsappUrl" target="_blank" rel="noreferrer">
            <span class="contact-icon whatsapp-icon">WA</span>
            <span>+92 306 764 8159</span>
            <b>WhatsApp</b>
          </a>
          <a class="contact-item" href="https://www.linkedin.com/in/jahanzaib-zafar-814ab4296/" target="_blank" rel="noreferrer">
            <span class="contact-icon">in</span>
            <span>linkedin.com/in/jahanzaib-zafar-814ab4296</span>
          </a>
          <a class="contact-item" href="https://github.com/jhanzaibgithub" target="_blank" rel="noreferrer">
            <span class="contact-icon">GH</span>
            <span>jhanzaibgithub</span>
          </a>
          <a
            class="contact-item"
            href="https://www.upwork.com/freelancers/~017d9280669d695f18?viewMode=1&mp_source=share"
            target="_blank"
            rel="noreferrer"
          >
            <span class="contact-icon upwork-icon">Up</span>
            <span>View Profile</span>
          </a>
        </div>
        <span class="availability">Open to freelance projects</span>
      </div>
      <div class="contact-actions">
        <!-- UPDATED -->
        <a class="btn primary" :href="`mailto:${email}`">Send Message</a>
        <div class="social-links">
          <a
            v-for="[label, icon, url] in socialLinks"
            :key="label"
            class="social-icon-link"
            :class="`social-${label.toLowerCase()}`"
            :href="url"
            target="_blank"
            rel="noreferrer"
            :aria-label="label"
          >
            <span>{{ icon }}</span>
            <b>{{ label }}</b>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
