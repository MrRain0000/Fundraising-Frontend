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

// Format date to dd/mm/yyyy
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
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
        <div class="progress-bar-wrapper">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: Math.min(progressPercent, 100) + '%' }"
            >
              <span class="progress-percent-inside">{{ progressPercent }}%</span>
            </div>
          </div>
        </div>

        <!-- Timeline Milestones - Start and End -->
        <div class="timeline-milestones">
          <div class="milestone milestone-start">
            <div class="milestone-marker"></div>
            <div class="milestone-info">
              <div class="milestone-date">{{ formatDate(project.startDate) }}</div>
            </div>
          </div>
          <div class="milestone milestone-end">
            <div class="milestone-marker"></div>
            <div class="milestone-info">
              <div class="milestone-date">{{ formatDate(project.endDate) }}</div>
              <div class="milestone-amount">{{ formatCurrency(project.target) }}</div>
            </div>
          </div>
        </div>

        <div class="progress-info">
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

.progress-bar-wrapper {
  position: relative;
  margin-bottom: var(--spacing-xs);
}

.timeline-milestones {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-md);
  position: relative;
}

.milestone {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.milestone-start {
  align-items: flex-start;
}

.milestone-end {
  align-items: flex-end;
}


.milestone-marker {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-white);
  border: 3px solid var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

/* Add connecting line from progress bar to marker */
.milestone-marker::before {
  content: '';
  position: absolute;
  width: 2px;
  height: 12px;
  background: var(--color-background-alt);
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
}

.milestone-end .milestone-marker {
  border-color: var(--color-primary);
  background: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1);
}

.milestone-end .milestone-marker::before {
  background: var(--color-primary);
}

.milestone-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.milestone-start .milestone-info {
  align-items: flex-start;
}

.milestone-end .milestone-info {
  align-items: flex-end;
}


.milestone-date {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  white-space: nowrap;
}

.milestone-amount {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-muted);
}

.milestone-end .milestone-amount {
  color: var(--color-primary);
}


.progress-bar {
  width: 100%;
  height: 20px;
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}

.progress-percent-inside {
  color: var(--color-white);
  font-size: 11px;
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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

  .milestone-date {
    font-size: 10px;
  }

  .milestone-amount {
    font-size: var(--font-size-xs);
  }

  .milestone-marker {
    width: 10px;
    height: 10px;
    border-width: 2px;
  }
}
</style>
