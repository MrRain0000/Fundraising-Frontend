<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section v-if="project.timeline?.length" class="timeline-section">
    <h2 class="section-title">
      <i class="bi bi-clock-history"></i>
      Các mốc quan trọng
    </h2>

    <div class="timeline">
      <div
        v-for="(item, index) in project.timeline"
        :key="index"
        class="timeline-item"
        :class="{ 'timeline-last': index === project.timeline.length - 1 }"
      >
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          <div
            v-if="index < project.timeline.length - 1"
            class="timeline-line"
          ></div>
        </div>
        <div class="timeline-content">
          <span class="timeline-date">{{ item.date }}</span>
          <h4 class="timeline-title">{{ item.title }}</h4>
          <p class="timeline-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0 0 var(--spacing-xl) 0;
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-background-alt);
}

.section-title i {
  color: var(--color-primary);
  font-size: 1.3rem;
}

.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  gap: var(--spacing-lg);
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 3px solid var(--color-white);
  box-shadow: 0 0 0 3px var(--color-primary);
  z-index: 1;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: var(--color-primary);
  opacity: 0.3;
  margin: var(--spacing-xs) 0;
}

.timeline-content {
  flex: 1;
  padding-bottom: var(--spacing-xl);
}

.timeline-last .timeline-content {
  padding-bottom: 0;
}

.timeline-date {
  display: inline-block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  background: rgba(177, 32, 41, 0.1);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-sm);
}

.timeline-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0 0 var(--spacing-xs) 0;
}

.timeline-description {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  margin: 0;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-item {
    gap: var(--spacing-md);
  }

  .timeline-content {
    padding-bottom: var(--spacing-lg);
  }
}
</style>
