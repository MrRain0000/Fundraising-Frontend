<script setup>
import { computed } from "vue";

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

// Format full currency
const formatFullCurrency = (value) => {
  return value.toLocaleString("vi-VN") + " đ";
};
</script>

<template>
  <section class="progress-section">
    <div class="progress-card">
      <div class="progress-stats">
        <div class="stat-item stat-raised">
          <span class="stat-label">Đã quyên góp</span>
          <span class="stat-value">{{ formatCurrency(project.raised) }}</span>
          <span class="stat-detail">{{
            formatFullCurrency(project.raised)
          }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item stat-target">
          <span class="stat-label">Mục tiêu</span>
          <span class="stat-value">{{ formatCurrency(project.target) }}</span>
          <span class="stat-detail">{{
            formatFullCurrency(project.target)
          }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item stat-donors">
          <span class="stat-label">Lượt đóng góp</span>
          <span class="stat-value">{{
            project.donorCount?.toLocaleString() || 0
          }}</span>
          <span class="stat-detail">người ủng hộ</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item stat-time">
          <span class="stat-label">{{
            project.status === "active" ? "Còn lại" : "Hoàn thành"
          }}</span>
          <span class="stat-value">
            {{
              project.status === "active"
                ? project.daysLeft
                : project.completedDate
            }}
          </span>
          <span class="stat-detail">{{
            project.status === "active" ? "ngày" : ""
          }}</span>
        </div>
      </div>

      <div class="progress-bar-container">
        <!-- Milestone markers -->
        <div class="progress-milestones">
          <div class="milestone milestone-raised" :style="{ left: Math.min(progressPercent, 100) + '%' }">
            <div class="milestone-label">
              <span class="milestone-title">Đã quyên góp</span>
              <span class="milestone-value">{{ formatCurrency(project.raised) }}</span>
              <span class="milestone-detail">{{ formatFullCurrency(project.raised) }}</span>
            </div>
          </div>
          <div class="milestone milestone-target" style="left: 100%">
            <div class="milestone-label">
              <span class="milestone-title">Mục tiêu</span>
              <span class="milestone-value">{{ formatCurrency(project.target) }}</span>
              <span class="milestone-detail">{{ formatFullCurrency(project.target) }}</span>
            </div>
          </div>
        </div>
        
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: Math.min(progressPercent, 100) + '%' }"
          ></div>
        </div>
        <div class="progress-info">
          <span class="progress-percent">{{ progressPercent }}% đạt được</span>
          <span
            v-if="project.status === 'completed'"
            class="progress-complete-badge"
          >
            <i class="bi bi-check-circle-fill"></i> Mục tiêu hoàn thành
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.progress-section {
  margin-top: calc(-1 * var(--spacing-xl));
  position: relative;
  z-index: 10;
}

.progress-card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  min-width: 100px;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  line-height: 1.2;
}

.stat-raised .stat-value {
  color: var(--color-primary);
}

.stat-detail {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  margin-top: 2px;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: var(--color-background-alt);
}

.progress-bar-container {
  margin-top: var(--spacing-md);
  position: relative;
}

.progress-milestones {
  position: relative;
  height: 80px;
  margin-bottom: var(--spacing-sm);
}

.milestone {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.milestone::before {
  content: '';
  width: 2px;
  height: 20px;
  background: var(--color-text-muted);
  margin-bottom: 4px;
}

.milestone-raised::before {
  background: var(--color-primary);
}

.milestone-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  min-width: 100px;
}

.milestone-title {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 2px;
}

.milestone-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  line-height: 1.2;
}

.milestone-raised .milestone-value {
  color: var(--color-primary);
}

.milestone-detail {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  margin-top: 2px;
}


.progress-bar {
  width: 100%;
  height: 12px;
  background: var(--color-background-alt);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 100%
  );
  border-radius: var(--radius-full);
  transition: width 0.8s ease-out;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-sm);
}

.progress-percent {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.progress-complete-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #198754;
}

/* Responsive */
@media (max-width: 768px) {
  .progress-stats {
    gap: var(--spacing-sm);
  }

  .stat-divider {
    display: none;
  }

  .stat-item {
    min-width: 45%;
  }

  .stat-value {
    font-size: var(--font-size-xl);
  }

  .progress-milestones {
    height: 70px;
  }

  .milestone-label {
    min-width: 80px;
    padding: 4px 8px;
  }

  .milestone-value {
    font-size: var(--font-size-base);
  }

  .milestone-detail {
    font-size: 10px;
  }
}
</style>
