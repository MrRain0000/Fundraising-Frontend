<script setup>
import { computed } from "vue";
import ProjectCard from "@/components/activities/ProjectCard.vue";
import projectsData from "@/data/projects.json";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

// Get related projects (same category, excluding current project)
const relatedProjects = computed(() => {
  return projectsData
    .filter((p) => p.tag === props.project.tag && p.id !== props.project.id)
    .slice(0, 3);
});
</script>

<template>
  <section v-if="relatedProjects.length" class="related-section">
    <div class="section-header">
      <h2 class="section-title">
        <i class="bi bi-collection"></i>
        Dự án liên quan
      </h2>
      <p class="section-subtitle">
        Các dự án khác trong danh mục {{ project.tagLabel }}
      </p>
    </div>

    <div class="related-grid">
      <ProjectCard
        v-for="relatedProject in relatedProjects"
        :key="relatedProject.id"
        :project="relatedProject"
      />
    </div>
  </section>
</template>

<style scoped>
.related-section {
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-2xl);
  border-top: 1px solid var(--color-background-alt);
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.section-title {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0 0 var(--spacing-sm) 0;
}

.section-title i {
  color: var(--color-primary);
}

.section-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  margin: 0;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

/* Responsive */
@media (max-width: 991.98px) {
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575.98px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
