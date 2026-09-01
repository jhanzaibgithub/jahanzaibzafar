<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// UPDATED
const email = 'jahanzaibzafar.dev63@gmail.com';
const whatsappNumber = '+92 306 764 8159';
const whatsappUrl =
  'https://wa.me/923067648159?text=Hi%20Jahanzaib%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.';
const upworkUrl = 'https://www.upwork.com/freelancers/jahanzaibzafar01?mp_source=share';

const socialLinks = [
  ['Gmail', '✉', `mailto:${email}`],
  ['LinkedIn', 'in', 'https://linkedin.com/in/jahanzaibzafar'],
  ['GitHub', 'GH', 'https://github.com/jhanzaibgithub'],
  ['Upwork', 'Up', upworkUrl],
  ['WhatsApp', 'WA', whatsappUrl],
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
        <p>Open to work opportunities that need thoughtful execution, reliable code, and clear communication.</p>
        <!-- Contact via Email -->
        <a class="email-link" :href="`mailto:${email}`">{{ email }}</a>
        <span class="availability">Available for freelance projects & full-time roles</span>
      </div>
      <div class="contact-actions">
        <!-- Social Links -->
        <div class="social-links">
          <a
            v-for="[label, icon, url] in socialLinks"
            :key="label"
            class="social-icon-link"
            :class="`social-${label.toLowerCase()}`"
            :href="url"
            :target="label === 'Gmail' ? '' : '_blank'"
            :rel="label === 'Gmail' ? '' : 'noreferrer'"
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
