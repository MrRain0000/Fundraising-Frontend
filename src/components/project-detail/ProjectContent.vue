<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});

// Format currency with thousand separators
const formatCurrency = (value) => {
  return value.toLocaleString("vi-VN") + " đ";
};

// Colors for fund items
const fundColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
</script>

<template>
  <div class="project-content">
    <!-- Full Description -->
    <section class="content-section">
      <h2 class="section-title">
        <i class="bi bi-info-circle"></i>
        Giới thiệu dự án
      </h2>
      <p class="section-text">{{ project.fullDescription }}</p>
    </section>

    <!-- Objectives -->
    <section v-if="project.objectives?.length" class="content-section">
      <h2 class="section-title">
        <i class="bi bi-bullseye"></i>
        Mục tiêu dự án
      </h2>
      <ul class="objectives-list">
        <li v-for="(obj, index) in project.objectives" :key="index">
          <i class="bi bi-check-circle-fill"></i>
          <span>{{ obj }}</span>
        </li>
      </ul>
    </section>

    <!-- Reason -->
    <section v-if="project.reason" class="content-section">
      <h2 class="section-title">
        <i class="bi bi-heart"></i>
        Tại sao cần hỗ trợ?
      </h2>
      <p class="section-text">{{ project.reason }}</p>
    </section>

    <!-- Fund Usage - New Card Design -->
    <section
      v-if="project.fundUsage?.length"
      class="content-section fund-section"
    >
      <h2 class="section-title">
        <i class="bi bi-clock-history"></i>
        Chi tiết sử dụng quỹ
      </h2>
      <div class="fund-cards">
        <div
          v-for="(item, index) in project.fundUsage"
          :key="index"
          class="fund-card"
        >
          <div class="fund-card-left">
            <span
              class="fund-dot"
              :style="{
                backgroundColor: fundColors[index % fundColors.length],
              }"
            ></span>
            <span class="fund-name">{{ item.item }}</span>
          </div>
          <div class="fund-amount">{{ formatCurrency(item.amount) }}</div>
        </div>
      </div>
      <div class="fund-total-card">
        <span class="fund-total-label">Tổng cộng</span>
        <span class="fund-total-value">{{
          formatCurrency(
            project.fundUsage.reduce((sum, item) => sum + item.amount, 0)
          )
        }}</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.project-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.content-section {
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
  margin: 0 0 var(--spacing-lg) 0;
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-background-alt);
}

.section-title i {
  color: var(--color-primary);
  font-size: 1.3rem;
}

.section-text {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  line-height: 1.8;
  margin: 0;
}

/* Objectives List */
.objectives-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.objectives-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  font-size: var(--font-size-base);
  color: var(--color-text);
  line-height: 1.6;
}

.objectives-list li i {
  color: #198754;
  margin-top: 4px;
  flex-shrink: 0;
}

/* Fund Usage - Card Style */
.fund-section {
  padding: var(--spacing-xl);
}

.fund-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.fund-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-white);
  border: 1px solid var(--color-background-alt);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.fund-card:hover {
  border-color: var(--color-text-muted);
  box-shadow: var(--shadow-sm);
}

.fund-card-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
}

.fund-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.fund-name {
  font-size: var(--font-size-base);
  color: var(--color-text);
  line-height: 1.4;
}

.fund-amount {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  white-space: nowrap;
  margin-left: var(--spacing-md);
}

.fund-total-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(135deg, #2a7050 0%, #1e5a3f 100%);
  border-radius: var(--radius-lg);
}

.fund-total-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: #fff;
}

.fund-total-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: #fff;
}

/* Responsive */
@media (max-width: 768px) {
  .content-section {
    padding: var(--spacing-lg);
  }

  .fund-card {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
  }

  .fund-card-left {
    width: 100%;
  }

  .fund-amount {
    margin-left: calc(10px + var(--spacing-md));
    font-size: var(--font-size-base);
  }

  .fund-total-card {
    flex-direction: column;
    gap: var(--spacing-xs);
    text-align: center;
  }

  .fund-total-value {
    font-size: var(--font-size-lg);
  }
}
</style>
