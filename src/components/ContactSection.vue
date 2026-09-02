<script setup>
import { onMounted, ref } from 'vue';

const sectionRef = ref(null);
const base = import.meta.env.BASE_URL;

const email = 'jahanzaibryk2020@gmail.com';
const whatsappUrl =
  'https://wa.me/923067648159?text=Hi%20Jahanzaib%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.';
const cvUrl = `${base}jahanzaib-developer.pdf`;

const links = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/jahanzaibzafar', icon: 'in' },
  { label: 'GitHub', url: 'https://github.com/jhanzaibgithub', icon: 'GH' },
  { label: 'Upwork', url: 'https://www.upwork.com/freelancers/jahanzaibzafar01?mp_source=share', icon: 'Up' },
  { label: 'WhatsApp', url: whatsappUrl, icon: 'WA' },
];

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const errorMessage = ref('');

async function handleSubmit() {
  submitSuccess.value = false;
  errorMessage.value = '';

  if (!form.value.name.trim() || !form.value.email.trim() || !form.value.message.trim()) {
    errorMessage.value = 'Please fill out all required fields.';
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.value.name.trim(),
        email: form.value.email.trim(),
        subject: form.value.subject.trim(),
        message: form.value.message.trim(),
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      submitSuccess.value = true;
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
    } else {
      errorMessage.value = result.message || 'Failed to send message. Please try again.';
    }
  } catch (err) {
    console.error('Contact Form Submission Error:', err);
    errorMessage.value = 'Network error. Please check your connection or send an email directly.';
  } finally {
    isSubmitting.value = false;
  }
}

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
    <div class="contact-grid">
      <!-- Left Column: Contact Details -->
      <div class="contact-info reveal">
        <span class="section-label">Contact</span>
        <h2 class="section-heading contact-heading">Let's work <em>together</em></h2>
        <p class="contact-text">
          Looking to hire a senior full-stack developer, discuss a software engineering role, or build a high-performance web platform? Let's connect.
        </p>

        <a class="contact-email" :href="`mailto:${email}`" aria-label="Send direct email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          {{ email }}
        </a>

        <div class="contact-links">
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

        <a class="contact-cv" :href="cvUrl" download="Jahanzaib-Zafar-CV.pdf">
          ↓ Download CV
        </a>
      </div>

      <!-- Right Column: Interactive Form -->
      <div class="contact-form-card reveal reveal-delay-1">
        <h3 class="form-title">Send a Direct Message</h3>
        <p class="form-subtitle">Fill out the form below to discuss job opportunities, projects, or collaborations.</p>

        <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
          <div class="form-group">
            <label for="contact-name" class="form-label">Full Name <span class="required">*</span></label>
            <input
              id="contact-name"
              type="text"
              v-model="form.name"
              class="form-input"
              placeholder="John Doe"
              required
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="contact-email" class="form-label">Email Address <span class="required">*</span></label>
            <input
              id="contact-email"
              type="email"
              v-model="form.email"
              class="form-input"
              placeholder="john@example.com"
              required
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="contact-subject" class="form-label">Subject</label>
            <input
              id="contact-subject"
              type="text"
              v-model="form.subject"
              class="form-input"
              placeholder="e.g. Job Offer / Project Inquiry"
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="contact-message" class="form-label">Message <span class="required">*</span></label>
            <textarea
              id="contact-message"
              v-model="form.message"
              class="form-textarea"
              rows="4"
              placeholder="Tell me about your role, project, team, or inquiry..."
              required
              :disabled="isSubmitting"
            ></textarea>
          </div>

          <button type="submit" class="form-submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting" class="btn-content">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Send Message
            </span>
            <span v-else class="btn-spinner-container">
              <span class="spinner"></span>
              Sending...
            </span>
          </button>

          <!-- Feedback Banners -->
          <div v-if="submitSuccess" class="alert alert-success" role="alert">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div>
              <p>Your message has landed safely in my inbox. Thank you for connecting.</p>
            </div>
          </div>

          <div v-if="errorMessage" class="alert alert-error" role="alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <div>
              <strong>Submission Failed</strong>
              <p>{{ errorMessage }}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
