<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

// Calculate progress percentage
const progressPercent = computed(() => {
  return Math.round((props.project.raised / props.project.target) * 100);
});

// Format currency
const formatCurrency = (value) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1) + " tỷ";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + " triệu";
  }
  return value.toLocaleString("vi-VN") + " đ";
};

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
  <RouterLink :to="`/du-an/${project.slug}`" class="project-card-link">
    <article class="project-card">
      <div class="card-image">
        <img :src="project.image" :alt="project.title" />
        <!-- Badge for status -->
        <div v-if="project.status === 'active'" class="card-badge badge-active">
          <i class="bi bi-hourglass-split"></i>
          {{ project.daysLeft }} ngày còn lại
        </div>
        <div v-else class="card-badge badge-completed">
          <i class="bi bi-check-circle-fill"></i>
          Hoàn thành {{ project.completedDate }}
        </div>
      </div>

      <div class="card-content">
        <div class="card-header">
          <span class="card-tag" :class="tagColorClass">
            {{ project.tagLabel }}
          </span>
          <span class="card-location">
            <i class="bi bi-geo-alt"></i>
            {{ project.location }}
          </span>
        </div>

        <h4 class="card-title">{{ project.title }}</h4>
        <p class="card-description">{{ project.shortDescription }}</p>

        <div class="card-progress">
          <div class="progress-info">
            <span class="raised">{{ formatCurrency(project.raised) }}</span>
            <span class="target">/ {{ formatCurrency(project.target) }}</span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: Math.min(progressPercent, 100) + '%' }"
            ></div>
          </div>
          <div class="progress-percent">{{ progressPercent }}% đạt được</div>
        </div>

        <div class="card-footer">
          <template v-if="project.status === 'active'">
            <span class="btn-detail">
              <i class="bi bi-eye"></i>
              Xem chi tiết
            </span>
            <span class="btn-donate">
              <i class="bi bi-heart-fill"></i>
              Quyên góp
            </span>
          </template>
          <span v-else class="btn-detail btn-detail-full">
            <i class="bi bi-eye"></i>
            Xem chi tiết
          </span>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<style scoped>
.project-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.project-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.project-card:hover .card-image img {
  transform: scale(1.05);
}

.card-badge {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
}

.badge-active {
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-primary);
}

.badge-completed {
  background: rgba(42, 112, 80, 0.95);
  color: var(--color-white);
}

.card-content {
  padding: var(--spacing-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.card-tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}

.tag-education {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
}

.tag-health {
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
}

.tag-social {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
}

.tag-fundraising {
  background: rgba(139, 92, 246, 0.15);
  color: #7c3aed;
}

.card-location {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-progress {
  margin-bottom: var(--spacing-md);
}

.progress-info {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: var(--spacing-xs);
}

.raised {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.target {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-background-alt);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
  border-radius: var(--radius-full);
  transition: width var(--transition-slow);
}

.progress-percent {
  margin-top: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: #198754;
  text-align: right;
}

.card-footer {
  margin-top: auto;
  display: flex;
  gap: var(--spacing-sm);
}

.btn-donate,
.btn-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  border: none;
}

.btn-donate {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-donate:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
}

.btn-detail {
  background: var(--color-white);
  color: var(--color-text);
  border: 1px solid var(--color-background-alt);
}

.btn-detail:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-detail-full {
  flex: 1;
  width: 100%;
}
</style>