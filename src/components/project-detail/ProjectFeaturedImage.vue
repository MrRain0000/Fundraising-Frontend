<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="featured-image-section">
    <div class="featured-image-wrapper">
      <img :src="project.image" :alt="project.title" class="featured-image" />
      <div class="image-overlay"></div>
    </div>
    <div class="featured-caption">
      <i class="bi bi-camera"></i>
      <span>{{ project.title }} - {{ project.location }}</span>
    </div>
  </section>
</template>

<style scoped>
.featured-image-section {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.featured-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.featured-image-section:hover .featured-image {
  transform: scale(1.03);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
}

.featured-caption {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-background-alt);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.featured-caption i {
  color: var(--color-primary);
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .featured-image-wrapper {
    aspect-ratio: 4 / 3;
  }

  .featured-caption {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-xs);
  }
}
</style>
