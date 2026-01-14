<script setup>
import { ref, onMounted } from "vue";

const stats = [
  {
    id: 1,
    number: 5000,
    suffix: "+",
    label: "Hoàn cảnh được hỗ trợ",
    icon: "people",
  },
  {
    id: 2,
    number: 50,
    suffix: "+",
    label: "Dự án hoàn thành",
    icon: "clipboard-check",
  },
  {
    id: 3,
    number: 100,
    suffix: "%",
    label: "Minh bạch tài chính",
    icon: "shield-check",
  },
  {
    id: 4,
    number: 20,
    suffix: "+",
    label: "Tỉnh thành triển khai",
    icon: "geo-alt",
  },
];

const animatedNumbers = ref({});

const animateNumber = (id, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    animatedNumbers.value[id] = Math.floor(current);
  }, 16);
};

onMounted(() => {
  // Initialize all numbers to 0
  stats.forEach((stat) => {
    animatedNumbers.value[stat.id] = 0;
  });

  // Start animation after a short delay
  setTimeout(() => {
    stats.forEach((stat) => {
      animateNumber(stat.id, stat.number);
    });
  }, 500);
});
</script>

<template>
  <section class="impact-stats section-padding">
    <div class="container">
      <div class="stats-wrapper">
        <div class="row g-4">
          <div v-for="stat in stats" :key="stat.id" class="col-6 col-lg-3">
            <div class="stat-item text-center">
              <div class="stat-icon">
                <i :class="`bi bi-${stat.icon}`"></i>
              </div>
              <div class="stat-number">
                {{ animatedNumbers[stat.id] || 0 }}{{ stat.suffix }}
              </div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.impact-stats {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
  position: relative;
  overflow: hidden;
}

.impact-stats::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

.stats-wrapper {
  position: relative;
  z-index: 1;
}

.stat-item {
  padding: var(--spacing-lg);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
}

.stat-icon i {
  font-size: 1.75rem;
  color: var(--color-white);
}

.stat-number {
  font-family: var(--font-heading);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  line-height: 1;
  margin-bottom: var(--spacing-sm);
}

.stat-label {
  font-size: var(--font-size-base);
  color: rgba(255, 255, 255, 0.9);
  font-weight: var(--font-weight-medium);
}

@media (max-width: 767.98px) {
  .stat-number {
    font-size: var(--font-size-3xl);
  }

  .stat-icon {
    width: 50px;
    height: 50px;
  }

  .stat-icon i {
    font-size: 1.5rem;
  }
}
</style>
