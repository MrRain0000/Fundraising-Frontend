<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();

const teamCategories = [
  {
    name: "Hội đồng quản lý",
    path: "/gioi-thieu/doi-ngu",
    routeName: "team-overview",
  },
  {
    name: "Ban kiểm soát",
    path: "/gioi-thieu/doi-ngu/ban-kiem-soat",
    routeName: "supervisory-board",
  },
  {
    name: "Ban cố vấn",
    path: "/gioi-thieu/doi-ngu/ban-co-van",
    routeName: "advisory-board",
  },
];
</script>

<template>
  <div class="team-page">
    <h2 class="content-title">Đội ngũ nhân sự</h2>
    <p class="content-intro">
      Đội ngũ Quỹ Bông Hồng Nhỏ bao gồm những người có tâm huyết và kinh nghiệm
      trong lĩnh vực từ thiện và phát triển cộng đồng.
    </p>

    <!-- Team Category Tabs -->
    <div class="team-tabs mb-4">
      <RouterLink
        v-for="category in teamCategories"
        :key="category.path"
        :to="category.path"
        class="tab-btn"
        :class="{ active: route.path === category.path }"
      >
        {{ category.name }}
      </RouterLink>
    </div>

    <!-- Team Content -->
    <div class="team-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.content-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.content-intro {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

.team-tabs {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  border-bottom: 2px solid #e5e5e5;
  padding-bottom: var(--spacing-md);
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--color-text-light);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.tab-btn:hover {
  color: var(--color-primary);
  background: rgba(177, 32, 41, 0.05);
}

.tab-btn.active {
  background: var(--color-primary);
  color: var(--color-white);
}
</style>
