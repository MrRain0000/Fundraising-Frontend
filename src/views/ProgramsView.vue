<script setup>
import { RouterLink, RouterView } from "vue-router";

const programs = [
  { name: "Hỗ trợ Giáo dục", path: "/hoat-dong/giao-duc", icon: "mortarboard" },
  { name: "Hỗ trợ Y tế", path: "/hoat-dong/y-te", icon: "heart-pulse" },
  { name: "Bác ái Xã hội", path: "/hoat-dong/bac-ai", icon: "house-heart" },
  { name: "Gây quỹ", path: "/hoat-dong/gay-quy", icon: "piggy-bank" },
];
</script>

<template>
  <div class="programs-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-2">
            <li class="breadcrumb-item">
              <RouterLink to="/">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active">Hoạt động</li>
          </ol>
        </nav>
        <h1 class="page-title">Chương trình hoạt động</h1>
        <p class="page-subtitle">
          Các chương trình hỗ trợ thiết thực cho cộng đồng
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="page-content section-padding">
      <div class="container">
        <div class="row g-5">
          <!-- Sidebar -->
          <div class="col-lg-3">
            <div class="sidebar-nav">
              <h5 class="sidebar-title">Chương trình</h5>
              <ul class="nav flex-column">
                <li
                  v-for="program in programs"
                  :key="program.path"
                  class="nav-item"
                >
                  <RouterLink
                    class="nav-link d-flex align-items-center"
                    :to="program.path"
                  >
                    <i :class="`bi bi-${program.icon} me-2`"></i>
                    {{ program.name }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Main Content -->
          <div class="col-lg-9">
            <RouterView>
              <!-- Default content when no child route is active -->
              <div class="programs-overview">
                <h2>Tổng quan chương trình</h2>
                <p class="lead">
                  Quỹ Bông Hồng Nhỏ triển khai 4 chương trình chính nhằm hỗ trợ
                  toàn diện cho trẻ em và gia đình có hoàn cảnh khó khăn.
                </p>

                <div class="row g-4 mt-4">
                  <div
                    v-for="program in programs"
                    :key="program.path"
                    class="col-md-6"
                  >
                    <RouterLink :to="program.path" class="program-card-link">
                      <div class="program-card">
                        <div class="program-icon">
                          <i :class="`bi bi-${program.icon}`"></i>
                        </div>
                        <h5>{{ program.name }}</h5>
                        <span class="view-more">Xem chi tiết →</span>
                      </div>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </RouterView>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  background: linear-gradient(
    135deg,
    var(--color-secondary) 0%,
    var(--color-secondary-dark) 100%
  );
  padding: var(--spacing-3xl) 0;
  color: var(--color-white);
}

.breadcrumb-item a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.breadcrumb-item.active {
  color: rgba(255, 255, 255, 0.6);
}

.breadcrumb-item + .breadcrumb-item::before {
  color: rgba(255, 255, 255, 0.5);
}

.page-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  margin-bottom: 0;
}

.sidebar-nav {
  background: var(--color-background-alt);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  position: sticky;
  top: 100px;
}

.sidebar-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-secondary);
}

.sidebar-nav .nav-link {
  color: var(--color-text-light);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.sidebar-nav .nav-link:hover,
.sidebar-nav .nav-link.router-link-active {
  color: var(--color-secondary);
  background: rgba(42, 112, 80, 0.1);
}

.program-card-link {
  text-decoration: none;
}

.program-card {
  background: var(--color-background-alt);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all var(--transition-base);
}

.program-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.program-icon {
  width: 60px;
  height: 60px;
  background: var(--color-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
}

.program-icon i {
  font-size: 1.5rem;
  color: var(--color-white);
}

.program-card h5 {
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.view-more {
  color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

@media (max-width: 991.98px) {
  .sidebar-nav {
    position: static;
    margin-bottom: var(--spacing-xl);
  }
}
</style>
