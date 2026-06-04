<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

let cursor;
let frame = 0;
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

function updateCursor() {
  currentX += (mouseX - currentX) * 0.22;
  currentY += (mouseY - currentY) * 0.22;
  cursor.style.setProperty('--cursor-x', `${currentX}px`);
  cursor.style.setProperty('--cursor-y', `${currentY}px`);
  frame = requestAnimationFrame(updateCursor);
}

function handleMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function handleOver(event) {
  const target = event.target.closest('a, button, .project-card');
  cursor.classList.toggle('is-hover', Boolean(target && !target.classList.contains('project-card')));
  cursor.classList.toggle('is-ring', Boolean(target && target.classList.contains('project-card')));
}

onMounted(() => {
  cursor = document.querySelector('.custom-cursor');
  window.addEventListener('mousemove', handleMove, { passive: true });
  document.addEventListener('mouseover', handleOver);
  frame = requestAnimationFrame(updateCursor);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener('mousemove', handleMove);
  document.removeEventListener('mouseover', handleOver);
});
</script>

<template>
  <div class="custom-cursor" aria-hidden="true"></div>
</template>
