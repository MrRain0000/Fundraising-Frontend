<script setup>
/**
 * CategoryLegend - Reusable legend component for category dots
 * Usage: <CategoryLegend :items="legendItems" />
 */
defineProps({
  items: {
    type: Array,
    required: true,
    // Expected format: [{ key: 'education', label: 'Giáo dục', color: '#3b82f6' }]
  },
  title: {
    type: String,
    default: "Chú thích danh mục:",
  },
});
</script>

<template>
  <div class="category-legend">
    <div class="legend-title">{{ title }}</div>
    <div class="legend-items">
      <div v-for="item in items" :key="item.key" class="legend-item">
        <span class="category-dot" :style="{ background: item.color }"></span>
        <span class="legend-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-legend {
  padding: 0.75rem 0;
  border-top: 1px solid #e5e7eb;
  margin-top: 0.75rem;
}

.legend-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #4b5563;
}

.category-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-label {
  white-space: nowrap;
}
</style>
