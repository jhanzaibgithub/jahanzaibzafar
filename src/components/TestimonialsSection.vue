<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const sectionRef = ref(null);
const activeIndex = ref(0);
const autoPlayTimer = ref(null);
const isPaused = ref(false);

const testimonials = [
  {
    title: 'Senior Next.js/MERN Developer to Help Scale a Growing SaaS',
    rating: 5.0,
    date: 'Jul 2026',
    quote:
      'Excellent developer and a great partner to work with. They quickly understood our SaaS architecture and delivered high-quality solutions that helped improve the platform. Would definitely recommend for complex development projects.',
    endorsements: ['Next.js', 'SaaS Development', 'Collaborative', 'Committed to Quality', 'Solution Oriented'],
    tags: ['Next.js', 'React', 'Node.js', 'ExpressJS', 'MongoDB'],
    clientRole: 'SaaS Founder / Client',
  },
  {
    title: 'Fix Design Issues on React Site Migrated from Vue',
    rating: 5.0,
    date: 'Aug 2026',
    quote:
      'Jahanzaib delivered under a tight window with professionalism and excellent communication. Would recommend his services.',
    endorsements: ['Clear Communicator', 'Professional', 'Fast Delivery'],
    tags: ['Next.js', 'React', 'Vue.js', 'Nuxt.js', 'Tailwind UI'],
    clientRole: 'Web Application Owner',
  },
  {
    title: 'MERN Developer — Healthcare Appointment Booking Platform',
    rating: 5.0,
    date: 'Jul 2026',
    quote:
      'Great developer with strong technical skills and a professional approach. They helped build our appointment booking platform efficiently and were always responsive when we needed adjustments. The overall experience was smooth, and I would happily hire them for future projects.',
    endorsements: ['MERN Stack', 'Solution Oriented', 'Clear Communicator', 'Responsive'],
    tags: ['Node.js', 'ExpressJS', 'React', 'MongoDB', 'REST APIs'],
    clientRole: 'Healthcare Client',
  },
  {
    title: 'Full Stack Developer for Multi-Vendor Marketplace (Pre-Launch)',
    rating: 5.0,
    date: 'Jul 2026',
    quote:
      'This was a great experience from start to finish. The developer understood the scope quickly, delivered everything on schedule, and handled feedback without any issues. The quality of the implementation was solid, and I wouldn\'t hesitate to work with them again. Recommended.',
    endorsements: ['Reliable', 'Collaborative', 'Committed to Quality', 'Accountable for Outcomes'],
    tags: ['React', 'Node.js', 'Marketplace Architecture', 'REST APIs'],
    clientRole: 'Marketplace Founder',
  },
  {
    title: 'Laravel & Vue.js E-Commerce Platform Architecture',
    rating: 5.0,
    date: 'Jun 2026',
    quote:
      'Jahanzaib is a top-tier full-stack engineer. He refactored our backend query performance, structured clean API layers, and delivered responsive Vue components ahead of deadline. Exceptional attention to detail.',
    endorsements: ['Laravel Expert', 'Database Optimization', 'High Performance'],
    tags: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Stripe'],
    clientRole: 'E-Commerce Business Client',
  },
  {
    title: 'API Integration & Performance Tuning for Enterprise Dashboard',
    rating: 5.0,
    date: 'May 2026',
    quote:
      'Exceptional problem solver. Jahanzaib integrated third-party REST APIs and webhooks into our platform while keeping the backend resilient, secure, and fast. Highly recommended for any complex full-stack work.',
    endorsements: ['API Architecture', 'Problem Solver', 'Security-Minded'],
    tags: ['Node.js', 'REST APIs', 'ExpressJS', 'Webhooks', 'Redis'],
    clientRole: 'Enterprise Technical Lead',
  },
];

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % testimonials.length;
}

function prevSlide() {
  activeIndex.value = (activeIndex.value - 1 + testimonials.length) % testimonials.length;
}

function goToSlide(index) {
  activeIndex.value = index;
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer.value = setInterval(() => {
    if (!isPaused.value) {
      nextSlide();
    }
  }, 4500); // Auto-scroll every 4.5 seconds
}

function stopAutoPlay() {
  if (autoPlayTimer.value) {
    clearInterval(autoPlayTimer.value);
    autoPlayTimer.value = null;
  }
}

onMounted(() => {
  startAutoPlay();
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

onBeforeUnmount(() => {
  stopAutoPlay();
});
</script>

<template>
  <section id="testimonials" class="testimonials section-shell" ref="sectionRef">
    <div class="testimonials-header reveal">
      <div class="header-top-row">
        <span class="section-label">Client Feedback</span>
        <span class="upwork-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          5.0 ★ Rated on Upwork
        </span>
      </div>

      <h2 class="section-heading">What clients say <em>working with me</em></h2>
      <p class="section-subtext">
        Verified contract reviews from founders, agency leads, and technical teams across SaaS, marketplace, and enterprise projects.
      </p>
    </div>

    <!-- Carousel Container -->
    <div
      class="carousel-wrapper reveal"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <button class="carousel-nav prev" @click="prevSlide" aria-label="Previous Review">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div class="carousel-track-container">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
        >
          <div
            v-for="(item, idx) in testimonials"
            :key="item.title + idx"
            class="carousel-slide"
          >
            <article class="testimonial-card">
              <div class="card-header">
                <div class="stars-row">
                  <span v-for="s in 5" :key="s" class="star">★</span>
                  <span class="rating-num">5.0</span>
                </div>
                <span class="contract-date">{{ item.date }}</span>
              </div>

              <h3 class="contract-title">{{ item.title }}</h3>

              <blockquote class="client-quote">
                "{{ item.quote }}"
              </blockquote>

              <div class="card-footer">
                <div class="endorsements-group">
                  <span class="group-label">Client Endorsements:</span>
                  <div class="endorsement-pills">
                    <span v-for="end in item.endorsements" :key="end" class="pill pill-primary">
                      ✓ {{ end }}
                    </span>
                  </div>
                </div>

                <div class="tags-group">
                  <span v-for="tag in item.tags" :key="tag" class="pill pill-muted">{{ tag }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <button class="carousel-nav next" @click="nextSlide" aria-label="Next Review">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>

    <!-- Carousel Indicators -->
    <div class="carousel-indicators reveal">
      <button
        v-for="(_, i) in testimonials"
        :key="i"
        class="indicator-dot"
        :class="{ active: activeIndex === i }"
        @click="goToSlide(i)"
        :aria-label="`Go to review ${i + 1}`"
      ></button>
    </div>

    <div class="testimonials-cta reveal">
      <a
        href="https://www.upwork.com/freelancers/~017d9280669d695f18?viewMode=1&mp_source=share"
        target="_blank"
        rel="noreferrer"
        class="btn btn-outline"
      >
        Verify All Reviews on Upwork Profile →
      </a>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  background: var(--surface-alt);
}

.header-top-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.upwork-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text);
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  margin-top: 36px;
  margin-bottom: 24px;
}

.carousel-track-container {
  overflow: hidden;
  width: 100%;
  border-radius: 16px;
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  width: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  min-width: 100%;
  padding: 0 4px;
}

.testimonial-card {
  padding: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stars-row {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #f59e0b;
  font-size: 1.2rem;
}

.rating-num {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text);
  margin-left: 6px;
}

.contract-date {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
}

.contract-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text);
  line-height: 1.35;
}

.client-quote {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text);
  font-style: italic;
  margin: 0;
  padding-left: 20px;
  border-left: 3px solid var(--primary);
}

.card-footer {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.endorsements-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.group-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--primary);
}

.endorsement-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: var(--shadow-lift);
  transition: all 0.2s ease;
}

.carousel-nav.prev {
  left: -22px;
}

.carousel-nav.next {
  right: -22px;
}

.carousel-nav:hover {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background: var(--border-strong);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  width: 28px;
  background: var(--primary);
}

.testimonials-cta {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .testimonial-card {
    padding: 24px;
  }

  .carousel-nav.prev {
    left: 4px;
  }

  .carousel-nav.next {
    right: 4px;
  }

  .contract-title {
    font-size: 1.15rem;
  }

  .client-quote {
    font-size: 1rem;
  }
}
</style>
