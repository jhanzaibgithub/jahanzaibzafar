<script setup>
const stats = [
  ['3+', 'Years Experience'],
  ['30+', 'Projects Delivered'],
  ['25+', 'Clients'],
  ['3', 'Corporate Companies'],
];

const entries = [
  // UPDATED
  {
    range: 'October 2025 – Present',
    role: 'Full Stack Developer',
    company: 'Dcodax Technology PVT LTD',
    badge: 'CURRENT',
    bullets: [
      'Architecting scalable MERN and Laravel web applications from concept to production deployment.',
      'Collaborating directly with enterprise clients to translate business logic into robust database schemas and fast APIs.',
    ],
tags: ["React", "Vue", "Laravel", "Node.js", "MongoDB", "Firebase"],  },
  {
    range: 'March 2023 – June 2025',
    role: 'Full Stack Developer',
    company: 'Crexed Software Company',
    bullets: [
      'Architected and delivered high-traffic e-commerce platforms and custom business dashboards using Laravel, React.js, and MySQL.',
      'Optimized complex database queries and implemented caching strategies, improving application page-load speed by over 40%.',
      'Built and integrated secure, custom payment gateway APIs and third-party accounting software.',
    ],
    tags: ["HTML", "CSS", "JavaScript", "MERN", "Laravel", "MySQL", "REST APIs"],
  },
  {
    range: 'July 2021 – July 2022',
    role: 'PHP / Laravel Developer',
    company: 'Pixelz360',
    bullets: [
      'Led an agile team of developers to design, build, and deploy enterprise-level Laravel applications across multiple industries.',
      'Standardized code review processes and database architecture guidelines, reducing post-deployment bugs by 25%.',
      'Managed client communication, translating complex business requirements into clear technical roadmaps.',
    ],
tags: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript", "Laravel", "Git"],  },
  {
    range: '2016 – 2020',
    role: 'Bachelor of Computer Science (BCompSc)',
    company: 'Islamia University Bahawalpur (IUB)',
    badge: 'EDUCATION',
    bullets: [
      "Completed Bachelor's in Computer Science with focus on software engineering, databases, and web technologies.",
      'Worked on multiple academic projects using modern web stacks.',
    ],
    tags: ['Academic', 'Computer Science'],
  },
];

</script>

<template>
  <section id="experience" class="timeline section-shell">
    <div class="section-kicker">
      <span class="eyebrow">Experience</span>
      <h2 class="section-title timeline-title">Timeline of growth <em>and delivery</em></h2>
      <p>A focused path through product development, backend architecture, integrations, and production support.</p>
    </div>
    <div class="stat-strip glass-card">
      <div v-for="[number, label] in stats" :key="label">
        <b>{{ number }}</b><span>{{ label }}</span>
      </div>
    </div>
    <div class="timeline-track">
      <article v-for="entry in entries" :key="entry.role + entry.range" class="timeline-entry glass-card">
        <span class="range">{{ entry.range }}</span>
        <!-- UPDATED -->
        <span v-if="entry.badge" :class="entry.badge === 'EDUCATION' ? 'education-badge' : 'current-badge'">{{ entry.badge }}</span>
        <h3>{{ entry.role }}</h3>
        <strong>{{ entry.company }}</strong>
        <ul>
          <li v-for="bullet in entry.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
        <div class="pills">
          <span v-for="tag in entry.tags" :key="tag">{{ tag }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
