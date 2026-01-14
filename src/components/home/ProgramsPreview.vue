<script setup>
import { RouterLink } from "vue-router";

const programs = [
  {
    id: 1,
    title: "Hỗ trợ Giáo dục",
    description:
      "Học bổng, xây dựng trường học và cung cấp tài liệu học tập cho học sinh có hoàn cảnh khó khăn.",
    icon: "mortarboard",
    path: "/hoat-dong/giao-duc",
    color: "#B12029",
  },
  {
    id: 2,
    title: "Hỗ trợ Y tế",
    description:
      "Khám bệnh, phát thuốc miễn phí và hỗ trợ chi phí điều trị cho người có hoàn cảnh khó khăn.",
    icon: "heart-pulse",
    path: "/hoat-dong/y-te",
    color: "#2A7050",
  },
  {
    id: 3,
    title: "Bác ái Xã hội",
    description:
      "Hỗ trợ nhu yếu phẩm, xây nhà tình thương cho các gia đình khó khăn.",
    icon: "house-heart",
    path: "/hoat-dong/bac-ai",
    color: "#FFB74D",
  },
  {
    id: 4,
    title: "Gây quỹ",
    description:
      "Tổ chức các sự kiện gây quỹ, kết nối nhà hảo tâm với các hoàn cảnh cần giúp đỡ.",
    icon: "piggy-bank",
    path: "/hoat-dong/gay-quy",
    color: "#6366F1",
  },
];
</script>

<template>
  <section class="programs-preview section-padding bg-light">
    <div class="container">
      <div class="text-center mb-5">
        <span class="section-label">Hoạt động</span>
        <h2 class="section-title mb-3">Chương trình của chúng tôi</h2>
        <p class="section-subtitle mx-auto">
          Các chương trình hỗ trợ thiết thực, mang lại giá trị thực sự cho cộng
          đồng
        </p>
      </div>

      <div class="row g-4">
        <div
          v-for="program in programs"
          :key="program.id"
          class="col-md-6 col-lg-3"
        >
          <div class="program-card h-100">
            <div
              class="program-icon"
              :style="{ backgroundColor: program.color }"
            >
              <i :class="`bi bi-${program.icon}`"></i>
            </div>
            <h4 class="program-title">{{ program.title }}</h4>
            <p class="program-description">{{ program.description }}</p>
            <RouterLink :to="program.path" class="program-link">
              Xem chi tiết
              <i class="bi bi-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.programs-preview {
  background-color: var(--color-background-alt);
}

.section-label {
  display: inline-block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: var(--spacing-sm);
}

.section-title {
  margin-bottom: var(--spacing-md) !important;
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  max-width: 600px;
}

.program-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.program-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.program-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
}

.program-icon i {
  font-size: 2rem;
  color: var(--color-white);
}

.program-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.program-description {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.program-link {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  transition: gap var(--transition-fast);
}

.program-link:hover {
  gap: var(--spacing-sm);
}
</style>
