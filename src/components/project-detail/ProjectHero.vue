<script setup>
import { computed } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

// Get tag color based on category
const tagColorClass = computed(() => {
  const colors = {
    education: "tag-education",
    health: "tag-health",
    social: "tag-social",
    fundraising: "tag-fundraising",
  };
  return colors[props.project.tag] || "tag-default";
});
</script>

<template>
  <section class="project-hero">
    <div class="hero-image">
      <img :src="project.image" :alt="project.title" />
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content container">
      <div class="hero-badges">
        <span class="hero-tag" :class="tagColorClass">
          {{ project.tagLabel }}
        </span>
        <span
          v-if="project.status === 'active'"
          class="hero-status status-active"
        >
          <i class="bi bi-hourglass-split"></i>
          Đang gây quỹ
        </span>
        <span v-else class="hero-status status-completed">
          <i class="bi bi-check-circle-fill"></i>
          Đã hoàn thành
        </span>
      </div>
      <h1 class="hero-title">{{ project.title }}</h1>
      <div class="hero-meta">
        <span class="hero-location">
          <i class="bi bi-geo-alt-fill"></i>
          {{ project.location }}
        </span>
        <span class="hero-organizer">
          <i class="bi bi-building"></i>
          {{ project.organizer?.name || "Quỹ Bông Hồng Nhỏ" }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-hero {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: var(--spacing-2xl);
}

.hero-badges {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.hero-tag {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.tag-education {
  background: rgba(59, 130, 246, 0.9);
  color: #fff;
}

.tag-health {
  background: rgba(239, 68, 68, 0.9);
  color: #fff;
}

.tag-social {
  background: rgba(245, 158, 11, 0.9);
  color: #fff;
}

.tag-fundraising {
  background: rgba(139, 92, 246, 0.9);
  color: #fff;
}

.hero-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.status-active {
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-primary);
}

.status-completed {
  background: rgba(42, 112, 80, 0.95);
  color: #fff;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  color: #fff;
  margin: 0 0 var(--spacing-md) 0;
  max-width: 800px;
  line-height: 1.3;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.hero-meta {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.hero-location,
.hero-organizer {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--font-size-base);
}

.hero-location i,
.hero-organizer i {
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .project-hero {
    height: 350px;
  }

  .hero-title {
    font-size: var(--font-size-2xl);
  }

  .hero-meta {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
