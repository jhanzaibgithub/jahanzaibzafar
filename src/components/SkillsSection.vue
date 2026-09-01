<script setup>
import { onMounted, ref } from 'vue';

const sectionRef = ref(null);

const categories = [
  {
    title: 'Backend',
    tiers: [
      { label: 'Primary', tier: 'primary', skills: ['Laravel', 'PHP', 'REST APIs', 'Stripe Integration', 'Node.js', 'Express.js'] },
    ],
  },
  {
    title: 'Frontend',
    tiers: [
      { label: 'Primary', tier: 'primary', skills: ['JavaScript', 'Next.js', 'Vue.js', 'React', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'] },
    ],
  },
  {
    title: 'Database',
    tiers: [
      { label: 'Primary', tier: 'primary', skills: ['MySQL', 'MongoDB', 'Firebase', 'PostgreSQL', 'Redis'] },
    ],
  },
  {
    title: 'DevOps & Hosting',
    tiers: [
      { label: 'Primary', tier: 'primary', skills: ['cPanel / WHM / Plesk', 'Git', 'Docker', 'CI/CD Pipelines'] },
      { label: 'Proficient', tier: 'secondary', skills: ['Cloud Hosting'] },
    ],
  },
];

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  if (sectionRef.value) {
    sectionRef.value.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }
});
</script>

<template>
  <section id="skills" class="skills section-shell" ref="sectionRef">
    <div class="skills-header reveal">
      <span class="section-label">Skills</span>
      <h2 class="section-heading">Technical <em>toolkit</em></h2>
      <p class="section-subtext">
        Production-proven technical capabilities across modern backend frameworks, reactive UI libraries, data persistence engines, and cloud infrastructure.
      </p>
    </div>

    <div class="skills-legend reveal">
      <span class="skills-legend-item">
        <span class="skills-legend-dot primary"></span>
        Primary — daily driver, deep expertise
      </span>
      <span class="skills-legend-item">
        <span class="skills-legend-dot secondary"></span>
        Proficient — strong working knowledge
      </span>
    </div>

    <div class="skills-grid">
      <article
        v-for="category in categories"
        :key="category.title"
        class="skill-category reveal"
      >
        <h3 class="skill-category-title">{{ category.title }}</h3>

        <div
          v-for="tier in category.tiers"
          :key="tier.label"
          class="skill-tier"
        >
          <div class="skill-tier-label">{{ tier.label }}</div>
          <div class="skill-tags">
            <span
              v-for="skill in tier.skills"
              :key="skill"
              class="pill"
              :class="`pill-${tier.tier}`"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
