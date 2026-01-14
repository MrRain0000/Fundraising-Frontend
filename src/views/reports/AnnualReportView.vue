<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import BackButton from "@/components/common/BackButton.vue";
import DonorTable from "@/components/annual-report/DonorTable.vue";

// Selected year
const selectedYear = ref("2022");
const years = ["2024", "2023", "2022", "2021", "2020"];
</script>

<template>
  <div class="annual-report-page">
    <section class="content-section">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-nav">
          <BackButton variant="default" />
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <RouterLink to="/">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active">Báo cáo thường niên</li>
          </ol>
        </nav>

        <!-- Page Header -->
        <div class="page-header">
          <div class="header-content">
            <h1 class="page-title">Báo cáo thường niên</h1>
            <p class="page-subtitle">
              Các khoản đóng góp trong năm {{ selectedYear }}
            </p>
          </div>
          <div class="year-filter">
            <label for="year-select">Chọn năm:</label>
            <select id="year-select" v-model="selectedYear" class="year-select">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <!-- Donor Table Component -->
        <DonorTable :year="selectedYear" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.annual-report-page {
  min-height: 100vh;
  background: #f8fafc;
}

.content-section {
  padding: 2rem 0 4rem;
}

/* Breadcrumb */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.breadcrumb {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}

.breadcrumb-item a {
  color: #6b7280;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  color: var(--color-primary, #b12029);
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  padding: 0 0.5rem;
  color: #9ca3af;
}

.breadcrumb-item.active {
  color: #374151;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem;
}

.page-subtitle {
  color: #6b7280;
  margin: 0;
  font-size: 1rem;
}

/* Year Filter */
.year-filter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.year-filter label {
  font-size: 0.9rem;
  color: #6b7280;
  white-space: nowrap;
}

.year-select {
  padding: 0.6rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 0.9rem;
  color: #1f2937;
  cursor: pointer;
  min-width: 100px;
}

.year-select:focus {
  outline: none;
  border-color: var(--color-primary, #b12029);
  box-shadow: 0 0 0 3px rgba(177, 32, 41, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .year-filter {
    width: 100%;
  }

  .year-select {
    flex: 1;
  }
}
</style>
