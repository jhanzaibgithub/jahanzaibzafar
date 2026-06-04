<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

let canvas;
let ctx;
let nebulaCanvas;
let nebulaCtx;
let animationId = 0;
let lastTime = 0;
let width = 0;
let height = 0;
let stars = [];
let dust = [];
let shootingStars = [];
let nextShootingStar = 0;

const starCount = 130;
const dustCount = 32;

const random = (min, max) => min + Math.random() * (max - min);

function buildNebula() {
  nebulaCanvas = document.createElement('canvas');
  nebulaCanvas.width = width;
  nebulaCanvas.height = height;
  nebulaCtx = nebulaCanvas.getContext('2d');

  const blobs = [
    [width * 0.18, height * 0.12, width * 0.28, '#0a0a3a', 0.13],
    [width * 0.78, height * 0.28, width * 0.22, '#1a0a2e', 0.11],
    [width * 0.58, height * 0.72, width * 0.3, '#002a2a', 0.1],
    [width * 0.12, height * 0.82, width * 0.2, '#1a0a2e', 0.08],
  ];

  blobs.forEach(([x, y, r, color, alpha]) => {
    const gradient = nebulaCtx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${color}00`);
    nebulaCtx.fillStyle = gradient;
    nebulaCtx.fillRect(x - r, y - r, r * 2, r * 2);
  });
}

function resetScene() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  stars = Array.from({ length: starCount }, () => ({
    x: random(0, width),
    y: random(0, height),
    size: random(0.3, 2.5),
    opacity: random(0.4, 1),
    baseOpacity: random(0.4, 1),
    // UPDATED
    speed: random(0.0006, 0.0024),
    phase: random(0, Math.PI * 2),
    // UPDATED
    vx: random(-0.08, 0.08) * 0.4,
    vy: random(-0.08, 0.08) * 0.4,
  }));

  dust = Array.from({ length: dustCount }, () => ({
    x: random(0, width),
    y: random(0, height),
    opacity: random(0.2, 0.5),
    // UPDATED
    speed: random(0.08, 0.22) * 0.4,
  }));

  shootingStars = [
    { active: false, x: 0, y: 0, life: 0, speed: 0, length: 0, opacity: 0 },
    { active: false, x: 0, y: 0, life: 0, speed: 0, length: 0, opacity: 0 },
  ];
  // UPDATED
  nextShootingStar = performance.now() + random(6000, 12000);
  buildNebula();
}

function spawnShootingStar(timestamp) {
  const star = shootingStars.find((item) => !item.active);
  if (!star) return;
  star.active = true;
  star.x = random(width * 0.05, width * 0.75);
  star.y = random(-20, height * 0.2);
  star.life = 0;
  star.speed = random(7, 11);
  star.length = random(80, 150);
  star.opacity = 1;
  // UPDATED
  nextShootingStar = timestamp + random(6000, 12000);
}

function animate(timestamp) {
  animationId = requestAnimationFrame(animate);
  if (timestamp - lastTime < 16) return;
  const delta = Math.min(timestamp - lastTime, 32);
  lastTime = timestamp;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#020008';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(nebulaCanvas, 0, 0, width, height);

  stars.forEach((star) => {
    star.x += star.vx * delta;
    star.y += star.vy * delta;
    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;
    const pulse = Math.sin(timestamp * star.speed + star.phase) * 0.25;
    star.opacity = Math.min(1, Math.max(0.35, star.baseOpacity + pulse));
    ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  dust.forEach((dot) => {
    dot.y -= dot.speed * delta * 0.08;
    if (dot.y < -2) {
      dot.y = height + 2;
      dot.x = random(0, width);
    }
    ctx.fillStyle = `rgba(110,231,200,${dot.opacity})`;
    ctx.fillRect(dot.x, dot.y, 1, 1);
  });

  if (timestamp > nextShootingStar) spawnShootingStar(timestamp);
  shootingStars.forEach((star) => {
    if (!star.active) return;
    star.x += star.speed * delta * 0.08;
    star.y += star.speed * delta * 0.05;
    star.life += delta;
    star.opacity = Math.max(0, 1 - star.life / 1100);
    const gradient = ctx.createLinearGradient(star.x, star.y, star.x - star.length, star.y - star.length * 0.58);
    gradient.addColorStop(0, `rgba(255,255,255,${star.opacity})`);
    gradient.addColorStop(0.35, `rgba(110,231,200,${star.opacity * 0.7})`);
    gradient.addColorStop(1, 'rgba(110,231,200,0)');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.length, star.y - star.length * 0.58);
    ctx.stroke();
    if (star.x > width + star.length || star.y > height + star.length || star.opacity <= 0) star.active = false;
  });
}

onMounted(() => {
  canvas = document.getElementById('galaxy-bg');
  ctx = canvas.getContext('2d');
  resetScene();
  window.addEventListener('resize', resetScene);
  canvas.classList.add('is-visible');
  animationId = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', resetScene);
});
</script>

<template>
  <canvas id="galaxy-bg" aria-hidden="true"></canvas>
</template>
