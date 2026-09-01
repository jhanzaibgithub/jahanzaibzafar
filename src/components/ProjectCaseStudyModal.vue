<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  project: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close']);

function handleClose() {
  emit('close');
}

function handleKeydown(e) {
  if (e.key === 'Escape' && props.isOpen) {
    handleClose();
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.classList.remove('modal-open');
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen && project"
      class="cs-modal-backdrop"
      @click.self="handleClose"
      role="dialog"
      aria-modal="true"
      :aria-label="`Case Study: ${project.title}`"
    >
      <div class="cs-modal-container">
        <button class="cs-modal-close" @click="handleClose" aria-label="Close Case Study">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <header class="cs-hero">
          <div class="cs-hero-meta">
            <span class="pill pill-primary">{{ project.category }}</span>
            <span class="cs-tagline">{{ project.tagline }}</span>
          </div>

          <h2 class="cs-title">{{ project.title }}</h2>

          <p class="cs-overview-lead">{{ project.overview }}</p>

          <div class="cs-hero-actions">
            <a
              v-if="project.url && project.url !== '#'"
              :href="project.url"
              target="_blank"
              rel="noreferrer"
              class="btn btn-primary"
            >
              Visit Live Project →
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noreferrer"
              class="btn btn-outline"
            >
              Source Code (GitHub)
            </a>
          </div>

          <div v-if="project.heroImage" class="cs-hero-image-frame">
            <img :src="project.heroImage" :alt="`${project.title} Hero Preview`" />
          </div>
        </header>

        <div class="cs-body-grid">
          <div class="cs-main-content">
            <section class="cs-section">
              <h3 class="cs-section-title">The Product & Workflow</h3>
              <p class="cs-text">{{ project.productWorkflow }}</p>
            </section>

            <section class="cs-section">
              <h3 class="cs-section-title">Business Problem & Technical Solution</h3>
              <div class="cs-problem-solution-box">
                <div class="cs-ps-item">
                  <strong class="cs-ps-label">Business Problem</strong>
                  <p>{{ project.problem }}</p>
                </div>
                <div class="cs-ps-item">
                  <strong class="cs-ps-label">Technical Solution</strong>
                  <p>{{ project.solution }}</p>
                </div>
              </div>
            </section>

            <section class="cs-section">
              <h3 class="cs-section-title">My Contribution</h3>
              <p class="cs-text">{{ project.myContribution }}</p>
            </section>

            <section class="cs-section">
              <h3 class="cs-section-title">Key Verified Features</h3>
              <ul class="cs-feature-list">
                <li v-for="feat in project.features" :key="feat">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </section>

            <section class="cs-section" v-if="project.gallery && project.gallery.length">
              <h3 class="cs-section-title">Project Gallery</h3>
              <div class="cs-gallery-grid">
                <figure v-for="(img, idx) in project.gallery" :key="idx" class="cs-gallery-item">
                  <img :src="img.src" :alt="img.caption || `${project.title} Screenshot ${idx + 1}`" />
                  <figcaption v-if="img.caption">{{ img.caption }}</figcaption>
                </figure>
              </div>
            </section>
          </div>

          <aside class="cs-sidebar">
            <div class="cs-sidebar-card">
              <h4>Technology Stack</h4>

              <div class="cs-stack-group" v-if="project.stackGrouped">
                <div v-for="(items, layer) in project.stackGrouped" :key="layer" class="cs-stack-layer">
                  <span class="cs-layer-label">{{ layer }}</span>
                  <div class="cs-layer-tags">
                    <span v-for="t in items" :key="t" class="pill pill-muted">{{ t }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="cs-layer-tags">
                <span v-for="t in project.stack" :key="t" class="pill pill-muted">{{ t }}</span>
              </div>
            </div>

            <div class="cs-sidebar-card cs-cta-card">
              <h4>Building a Product?</h4>
              <p>Need senior full-stack development, API architecture, or custom SaaS execution?</p>
              <a href="#contact" @click="handleClose" class="btn btn-primary btn-block">Let's Discuss Your Project</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.cs-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  background: rgba(18, 16, 14, 0.8);
  backdrop-filter: blur(8px);
  overflow-y: auto;
}

.cs-modal-container {
  position: relative;
  width: min(1000px, 100%);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  margin: auto;
}

.cs-modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cs-modal-close:hover {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.cs-hero {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);
}

.cs-hero-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.cs-tagline {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
}

.cs-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: var(--text);
  margin-bottom: 16px;
}

.cs-overview-lead {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--text);
  max-width: 800px;
  margin-bottom: 28px;
}

.cs-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 32px;
}

.cs-hero-image-frame {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lift);
}

.cs-hero-image-frame img {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
}

.cs-body-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
}

.cs-section {
  margin-bottom: 36px;
}

.cs-section-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.cs-text {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-muted);
}

.cs-problem-solution-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}

.cs-ps-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 8px;
}

.cs-ps-item p {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--text-muted);
  margin: 0;
}

.cs-feature-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cs-feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.98rem;
  line-height: 1.6;
  color: var(--text);
}

.cs-feature-list svg {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 3px;
}

.cs-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.cs-gallery-item {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface);
}

.cs-gallery-item img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.cs-gallery-item figcaption {
  padding: 10px 14px;
  font-size: 0.82rem;
  color: var(--text-muted);
  background: var(--surface-alt);
}

.cs-sidebar-card {
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 24px;
}

.cs-sidebar-card h4 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.cs-stack-layer {
  margin-bottom: 16px;
}

.cs-layer-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 8px;
}

.cs-layer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cs-cta-card {
  background: var(--primary-soft);
  border-color: var(--primary-border);
}

.cs-cta-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 18px;
}

.btn-block {
  width: 100%;
  text-align: center;
}

@media (max-width: 860px) {
  .cs-body-grid {
    grid-template-columns: 1fr;
  }

  .cs-problem-solution-box {
    grid-template-columns: 1fr;
  }

  .cs-modal-container {
    padding: 28px 20px;
  }
}
</style>
