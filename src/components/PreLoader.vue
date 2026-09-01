<script setup>
import { ref, onMounted } from 'vue';

const isLoaded = ref(false);
const progress = ref(0);

onMounted(() => {
  const duration = 1200; // 1.2s smooth loading animation
  const interval = 20;
  const step = 100 / (duration / interval);

  const timer = setInterval(() => {
    progress.value = Math.min(100, Math.floor(progress.value + step + Math.random() * 3));
    if (progress.value >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        isLoaded.value = true;
      }, 200);
    }
  }, interval);
});
</script>

<template>
  <div class="preloader" :class="{ 'preloader-hidden': isLoaded }" aria-hidden="true">
    <div class="preloader-content">
      <div class="preloader-brand">
        <span class="preloader-monogram">JZ</span>
        <span class="preloader-name">Jahanzaib Zafar</span>
        <span class="preloader-sub">Senior Full Stack Engineer</span>
      </div>

      <div class="preloader-bar-wrapper">
        <div class="preloader-bar" :style="{ width: `${progress}%` }"></div>
      </div>

      <div class="preloader-meta">
        <span class="preloader-status">Initializing Systems...</span>
        <span class="preloader-percentage">{{ progress }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg, #FAF7F2);
  color: var(--text, #1C1917);
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.6s ease;
}

.preloader-hidden {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}

.preloader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: min(90%, 420px);
}

.preloader-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 32px;
}

.preloader-monogram {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  background: var(--primary, #C2603E);
  color: #ffffff;
  font-family: var(--font-display, 'Playfair Display', serif);
  font-size: 1.8rem;
  font-weight: 900;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(194, 96, 62, 0.25);
  margin-bottom: 8px;
  animation: pulseLogo 2s ease-in-out infinite alternate;
}

.preloader-name {
  font-family: var(--font-display, 'Playfair Display', serif);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text, #1C1917);
}

.preloader-sub {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted, #78716C);
}

.preloader-bar-wrapper {
  width: 100%;
  height: 4px;
  background: var(--border, #E7E2D8);
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 14px;
}

.preloader-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary, #C2603E), #E07A5F);
  border-radius: 100px;
  transition: width 0.15s ease-out;
  box-shadow: 0 0 12px rgba(194, 96, 62, 0.5);
}

.preloader-meta {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
}

.preloader-status {
  color: var(--text-muted, #78716C);
}

.preloader-percentage {
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  color: var(--primary, #C2603E);
}

@keyframes pulseLogo {
  0% {
    transform: scale(0.96);
  }
  100% {
    transform: scale(1.04);
  }
}
</style>
