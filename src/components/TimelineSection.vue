<script setup>
import { onMounted, ref } from 'vue';

const sectionRef = ref(null);

const stats = [
  ['3+', 'Years Experience'],
  ['30+', 'Projects Delivered'],
  ['25+', 'Clients Served'],
  ['3', 'Companies'],
];

const entries = [
  {
    range: 'October 2025 – Present',
    role: 'Full Stack Developer',
    company: 'Dcodax Technology PVT LTD',
    type: 'current',
    bullets: [
      'Architecting scalable MERN and Laravel web applications end-to-end — from database schema design through API layer to production deployment.',
      'Collaborating directly with enterprise clients to decompose complex business logic into robust, normalized database schemas and high-performance REST APIs.',
      'Leading frontend development with React and Vue.js, building component-driven interfaces with state management, real-time updates, and responsive layouts.',
      'Implementing CI/CD pipelines and containerized deployments to reduce release cycles and eliminate manual deployment errors.',
    ],
    tags: ['React', 'Vue.js', 'Laravel', 'Node.js', 'MongoDB', 'Firebase'],
  },
  {
    range: 'July 2023 – August 2025',
    role: 'Full Stack Developer',
    company: 'Crexed Software Company',
    type: 'work',
    bullets: [
      'Architected and shipped high-traffic e-commerce platforms and custom business dashboards handling thousands of daily transactions using Laravel, React.js, and MySQL.',
      'Optimized complex SQL queries, implemented Redis caching layers, and introduced database indexing strategies — cutting average page-load times by over 40%.',
      'Designed and integrated secure payment gateway APIs (Stripe, custom processors) and third-party accounting system integrations with full webhook handling.',
      'Built multi-tenant admin panels with role-based access control, audit logging, and automated reporting for enterprise clients.',
      'Mentored junior developers on Laravel best practices, code review standards, and clean architecture principles.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'MERN', 'Laravel', 'MySQL', 'REST APIs', 'Stripe'],
  },
  {
    range: 'July 2021 – July 2023',
    role: 'PHP / Laravel Developer',
    company: 'Pixelz360',
    type: 'work',
    bullets: [
      'Led an agile development team to design, build, and deploy enterprise-grade Laravel applications across e-commerce, hosting, and SaaS verticals.',
      'Standardized code review workflows, database migration patterns, and architecture guidelines — reducing post-deployment defects by 25%.',
      'Owned end-to-end server management: provisioning, SSL configuration, DNS routing, and performance tuning on cPanel/WHM and Plesk environments.',
      'Managed direct client communication — translating ambiguous business requirements into actionable technical roadmaps with clear milestones.',
      'Built reusable Laravel packages and Blade component libraries adopted across multiple company projects.',
    ],
    tags: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'JavaScript', 'Laravel', 'Git', 'cPanel/WHM'],
  },
  {
    range: '2020 – 2024',
    role: 'Bachelor of Computer Science (BCompSc)',
    company: 'Islamia University Bahawalpur (IUB)',
    type: 'education',
    bullets: [
      'Completed a four-year degree in Computer Science with specialization in software engineering, relational database systems, and web technologies.',
      'Developed full-stack academic projects spanning e-commerce platforms, content management systems, and REST API architectures.',
      'Studied advanced algorithms, data structures, operating systems, and software design patterns.',
    ],
    tags: ['Computer Science', 'Software Engineering', 'Databases'],
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
  <section id="experience" class="timeline section-shell" ref="sectionRef">
    <div class="timeline-header reveal">
      <span class="section-label">Experience</span>
      <h2 class="section-heading">Where I've <em>built &amp; shipped</em></h2>
      <p class="section-subtext">
        Three+ years of designing systems, leading teams, and delivering production applications across enterprise, SaaS, and e-commerce.
      </p>
    </div>

    <div class="stats-strip reveal">
      <div v-for="[number, label] in stats" :key="label" class="stat-item">
        <span class="stat-number">{{ number }}</span>
        <span class="stat-label">{{ label }}</span>
      </div>
    </div>

    <div class="timeline-track">
      <article
        v-for="entry in entries"
        :key="entry.role + entry.range"
        class="timeline-entry reveal"
        :class="entry.type"
      >
        <span class="timeline-range">{{ entry.range }}</span>
        <span
          v-if="entry.type === 'current' || entry.type === 'education'"
          class="timeline-badge"
          :class="entry.type"
        >
          {{ entry.type === 'current' ? 'Current' : 'Education' }}
        </span>
        <h3 class="timeline-role">{{ entry.role }}</h3>
        <span class="timeline-company">{{ entry.company }}</span>
        <ul class="timeline-bullets">
          <li v-for="bullet in entry.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
        <div class="timeline-tags">
          <span v-for="tag in entry.tags" :key="tag" class="timeline-tag">{{ tag }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
