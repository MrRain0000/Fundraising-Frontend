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

// Format date from YYYY-MM-DD to DD/MM/YYYY
const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
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
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: Math.min(progressPercent, 100) + '%' }"
          >
            <span class="progress-percent-inside">{{ progressPercent }}%</span>
          </div>
        </div>
        <div class="progress-dates">
          <div class="date-label date-start">
            {{ formatDate(project.startDate) }}
          </div>
          <div class="date-label date-end">
            {{ formatDate(project.endDate) }}
            <span class="target-amount">{{ formatCurrency(project.target) }}</span>
          </div>
        </div>
        <div class="progress-info" v-if="project.status === 'completed'">
          <span class="progress-complete-badge">
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

.progress-bar {
  width: 100%;
  height: 16px;
  background: var(--color-background-alt);
  border-radius: var(--radius-full);
  overflow: visible;
  position: relative;
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.progress-percent-inside {
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.progress-dates {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
}

.date-label {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.date-start {
  color: var(--color-text-muted);
  text-align: left;
}

.date-end {
  color: var(--color-text-muted);
  text-align: right;
}

.target-amount {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-base);
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

  .progress-bar {
    height: 14px;
  }

  .progress-percent-inside {
    font-size: 11px;
  }

  .progress-dates {
    font-size: 10px;
  }

  .target-amount {
    font-size: var(--font-size-sm);
  }
}
</style>
