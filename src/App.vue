<script setup>
import GalaxyCanvas from './components/GalaxyCanvas.vue';
import NavBar from './components/NavBar.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import TimelineSection from './components/TimelineSection.vue';
import ContactSection from './components/ContactSection.vue';
</script>

<template>
  <GalaxyCanvas />
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <TimelineSection />
    <ContactSection />
  </main>
  <footer class="site-footer">
    <a href="#home" aria-label="Back to top">JZ</a>
    <p>Crafted with precision by Jahanzaib Zafar</p>
    <!-- UPDATED -->
    <div class="footer-socials">
      <a href="https://github.com/jhanzaibgithub" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/jahanzaib-zafar-814ab4296/" target="_blank" rel="noreferrer">LinkedIn</a>
      <a href="https://www.upwork.com/freelancers/~017d9280669d695f18?viewMode=1&mp_source=share" target="_blank" rel="noreferrer">Upwork</a>
    </div>
    <span>(c) 2026 Jahanzaib Zafar. All rights reserved.</span>
  </footer>
</template>
