<script setup>
import { computed, onMounted, onUnmounted, reactive, watch } from 'vue';

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
const expandedImages = reactive(new Set());

const images = computed(() => props.project?.images || []);

function closeModal() {
  emit('close');
}

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) closeModal();
}

function handleKeydown(event) {
  if (event.key === 'Escape' && props.isOpen) closeModal();
}

function toggleExpand(index) {
  if (expandedImages.has(index)) {
    expandedImages.delete(index);
    return;
  }
  expandedImages.add(index);
}

watch(
  () => props.isOpen,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) expandedImages.clear();
  },
);

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="project-modal">
      <div v-if="isOpen" class="project-modal-overlay" @click="handleBackdropClick">
        <article class="project-modal-box" role="dialog" aria-modal="true" :aria-label="project?.title">
          <button class="project-modal-close" aria-label="Close modal" @click="closeModal">x</button>

          <header class="project-modal-header">
            <h3>{{ project?.title }}</h3>
            <span>{{ project?.category }}</span>
          </header>

          <div class="project-modal-gallery">
            <template v-if="images.length">
              <div v-for="(image, index) in images" :key="image" class="gallery-item">
                <span class="gallery-count">{{ String(index + 1).padStart(2, '0') }}</span>
                <div class="gallery-image-wrap" :class="{ expanded: expandedImages.has(index) }">
                  <img :src="image" :alt="`${project?.title} screenshot ${index + 1}`" loading="lazy" />
                  <button class="gallery-expand" @click="toggleExpand(index)">
                    {{ expandedImages.has(index) ? 'Collapse' : 'Show Full' }}
                  </button>
                </div>
              </div>
            </template>

            <div v-else class="gallery-empty">
              <span>Screenshots coming soon</span>
            </div>
          </div>
        </article>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.project-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  width: 100dvw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.96);
  backdrop-filter: blur(10px);
  overscroll-behavior: contain;
}

.project-modal-box {
  position: fixed;
  top: 50%;
  left: 50%;
  width: min(860px, 92vw);
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  padding: 0;
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-radius: 18px;
  background: #0d0d1f;
  box-shadow: 0 0 60px rgba(0, 212, 255, 0.08), 0 24px 80px rgba(0, 0, 0, 0.6);
  transform: translate(-50%, -50%);
  overscroll-behavior: contain;
}

.project-modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  color: #f0eeff;
  font-size: 18px;
  line-height: 1;
  transition: all 0.2s ease;
}

.project-modal-close:hover {
  background: #00d4ff;
  border-color: #00d4ff;
  color: #000;
}

.project-modal-header {
  padding: 28px 28px 0;
}

.project-modal-header h3 {
  margin: 0;
  color: #f0eeff;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 22px;
  font-weight: 700;
}

.project-modal-header span {
  display: block;
  margin-top: 6px;
  color: #00d4ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}

.project-modal-header::after {
  content: '';
  display: block;
  height: 1px;
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.07);
}

.project-modal-gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 28px 28px;
}

.gallery-count {
  display: block;
  margin-bottom: 6px;
  color: rgba(0, 212, 255, 0.5);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
}

.gallery-image-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  background: #1a1a2e;
}

.gallery-image-wrap img {
  display: block;
  width: 100%;
  height: 320px;
  object-fit: cover;
  object-position: top;
  transition: transform 0.3s ease;
}

.gallery-image-wrap:not(.expanded):hover img {
  transform: scale(1.03);
}

.gallery-image-wrap.expanded img {
  height: auto;
  object-fit: unset;
}

.gallery-expand {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 4px 10px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.65);
  color: #00d4ff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
}

.gallery-expand:hover {
  background: rgba(0, 212, 255, 0.15);
}

.gallery-empty {
  display: grid;
  place-items: center;
  height: 200px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
}

.gallery-empty span {
  color: #888899;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
}

.project-modal-enter-active {
  transition: opacity 200ms ease;
}

.project-modal-leave-active {
  transition: opacity 160ms ease;
}

.project-modal-enter-from,
.project-modal-leave-to {
  opacity: 0;
}

.project-modal-enter-active .project-modal-box {
  transition: opacity 250ms ease-out, transform 250ms ease-out;
}

.project-modal-leave-active .project-modal-box {
  transition: opacity 160ms ease-in, transform 160ms ease-in;
}

.project-modal-enter-from .project-modal-box,
.project-modal-leave-to .project-modal-box {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}

@media (max-width: 600px) {
  .project-modal-box {
    width: 96vw;
  }

  .project-modal-header {
    padding: 16px 16px 0;
  }

  .project-modal-gallery {
    padding: 16px;
  }

  .gallery-image-wrap img {
    height: 220px;
  }
}
</style>
