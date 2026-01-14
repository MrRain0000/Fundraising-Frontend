<script setup>
import { RouterView, RouterLink, useRoute } from "vue-router";
import { computed } from "vue";
import BackButton from "@/components/common/BackButton.vue";

const route = useRoute();

// Check if current route is team or its children
const isTeamActive = computed(() => {
  return route.path.startsWith("/gioi-thieu/doi-ngu");
});
</script>

<template>
  <div class="about-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <nav class="breadcrumb-nav" aria-label="breadcrumb">
          <BackButton variant="light" />
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <RouterLink to="/">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Giới thiệu
            </li>
          </ol>
        </nav>
        <h1 class="page-title">Về Quỹ Bông Hồng Nhỏ</h1>
        <p class="page-subtitle">
          Tìm hiểu về sứ mệnh, tầm nhìn và đội ngũ của chúng tôi
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="page-content section-padding">
      <div class="container">
        <div class="row g-5">
          <!-- Sidebar Navigation -->
          <div class="col-lg-3">
            <div class="sidebar-nav">
              <h5 class="sidebar-title">Giới thiệu</h5>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <RouterLink
                    class="nav-link"
                    to="/gioi-thieu"
                    :class="{ active: $route.name === 'about-overview' }"
                  >
                    Tầm nhìn & Sứ mệnh
                  </RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink
                    class="nav-link"
                    to="/gioi-thieu/doi-ngu"
                    :class="{ active: isTeamActive }"
                  >
                    Đội ngũ nhân sự
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Main Content -->
          <div class="col-lg-9">
            <RouterView />
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
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
  padding: var(--spacing-2xl) 0;
  color: var(--color-white);
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.breadcrumb {
  background: transparent;
  padding: 0;
  margin: 0;
}

.breadcrumb-item a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.breadcrumb-item a:hover {
  color: var(--color-white);
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
  color: var(--color-white);
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
  border-bottom: 2px solid var(--color-primary);
}

.sidebar-nav .nav-link {
  color: var(--color-text-light);
  padding: var(--spacing-sm) 0;
  border-left: 3px solid transparent;
  padding-left: var(--spacing-md);
  transition: all var(--transition-fast);
}

.sidebar-nav .nav-link:hover,
.sidebar-nav .nav-link.active {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  background: rgba(177, 32, 41, 0.05);
}

@media (max-width: 991.98px) {
  .sidebar-nav {
    position: static;
    margin-bottom: var(--spacing-xl);
  }
}
</style>
