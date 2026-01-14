<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import BackButton from "@/components/common/BackButton.vue";
import ProjectCard from "@/components/activities/ProjectCard.vue";
import projectsData from "@/data/projects.json";

// Filter states
const activeCategory = ref("all");
const searchQuery = ref("");
const startDateFilter = ref("");
const endDateFilter = ref("");

// Categories for filter
const categories = [
  { key: "all", label: "Tất cả", icon: "grid" },
  { key: "education", label: "Giáo dục", icon: "mortarboard" },
  { key: "health", label: "Y tế", icon: "heart-pulse" },
  { key: "social", label: "Xã hội", icon: "house-heart" },
  { key: "fundraising", label: "Gây quỹ", icon: "piggy-bank" },
];

// Filter projects by all criteria
const filterProjects = (projects) => {
  return projects.filter((project) => {
    // Category match
    const categoryMatch =
      activeCategory.value === "all" || project.tag === activeCategory.value;

    // Search match (title, location, shortDescription)
    const searchLower = searchQuery.value.toLowerCase().trim();
    const searchMatch =
      !searchLower ||
      project.title.toLowerCase().includes(searchLower) ||
      project.location.toLowerCase().includes(searchLower) ||
      project.shortDescription?.toLowerCase().includes(searchLower);

    // Date range match
    let dateMatch = true;
    if (startDateFilter.value || endDateFilter.value) {
      const projectStart = project.startDate
        ? new Date(project.startDate)
        : null;
      const filterStart = startDateFilter.value
        ? new Date(startDateFilter.value)
        : null;
      const filterEnd = endDateFilter.value
        ? new Date(endDateFilter.value)
        : null;

      if (projectStart) {
        if (filterStart && projectStart < filterStart) {
          dateMatch = false;
        }
        if (filterEnd && projectStart > filterEnd) {
          dateMatch = false;
        }
      }
    }

    return categoryMatch && searchMatch && dateMatch;
  });
};

// Separate active and completed projects
const activeProjects = computed(() => {
  const active = projectsData.filter((p) => p.status === "active");
  return filterProjects(active);
});

const completedProjects = computed(() => {
  const completed = projectsData.filter((p) => p.status === "completed");
  return filterProjects(completed);
});

// Clear all filters
const clearFilters = () => {
  searchQuery.value = "";
  startDateFilter.value = "";
  endDateFilter.value = "";
  activeCategory.value = "all";
};

// Check if any filter is active
const hasActiveFilters = computed(() => {
  return (
    searchQuery.value ||
    startDateFilter.value ||
    endDateFilter.value ||
    activeCategory.value !== "all"
  );
});

// Stats computed
const stats = computed(() => {
  const totalRaised = projectsData.reduce((sum, p) => sum + p.raised, 0);
  const completedCount = projectsData.filter(
    (p) => p.status === "completed"
  ).length;
  const donationCount = 3450; // Simulated
  return {
    totalRaised,
    completedCount,
    donationCount,
  };
});

// Format currency for display
const formatCurrency = (value) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1) + " Tỷ VNĐ";
  } else if (value >= 1000000) {
    return Math.round(value / 1000000) + " triệu";
  }
  return value.toLocaleString("vi-VN") + " đ";
};

// Scroll to section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
</script>

<template>
  <div class="activities-page">
    <!-- Hero Section (simplified) -->
    <section class="hero-section">
      <div class="container">
        <nav class="breadcrumb-nav" aria-label="breadcrumb">
          <BackButton variant="light" />
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <RouterLink to="/">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active">Hoạt động</li>
          </ol>
        </nav>
        <h1 class="hero-title">Các dự án và hoạt động</h1>
        <p class="hero-subtitle">
          Chung tay cùng Bông Hồng Nhỏ để mang lại nụ cười cho trẻ em và những
          hoàn cảnh khó khăn.
        </p>
      </div>
    </section>

    <!-- Inspirational Banner -->
    <section class="banner-section">
      <div class="container">
        <div class="banner-card">
          <img
            src="https://images.unsplash.com/photo-1764738130341-36d166654805?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Trẻ em vui cười"
            class="banner-image"
          />
          <div class="banner-overlay"></div>
          <div class="banner-content">
            <h2 class="banner-title">Kiến tạo nụ cười, Trao gửi yêu thương</h2>
            <p class="banner-text">
              Chúng tôi tin rằng sự minh bạch là nền tảng của lòng tin. Mọi đóng
              góp của bạn đều được ghi nhận và sử dụng đúng mục đích.
            </p>
            <RouterLink to="/bao-cao-tai-chinh" class="banner-btn">
              <i class="bi bi-file-earmark-text"></i>
              Xem báo cáo tài chính
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section (separate from hero) -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <i class="bi bi-piggy-bank stat-icon"></i>
              <span class="stat-label">Tổng quỹ tháng này</span>
            </div>
            <span class="stat-value">{{
              formatCurrency(stats.totalRaised)
            }}</span>
          </div>
          <div class="stat-card">
            <div class="stat-header">
              <i class="bi bi-check-circle stat-icon completed"></i>
              <span class="stat-label">Dự án hoàn thành</span>
            </div>
            <span class="stat-value">{{ stats.completedCount }}</span>
          </div>
          <div class="stat-card">
            <div class="stat-header">
              <i class="bi bi-people stat-icon donations"></i>
              <span class="stat-label">Lượt quyên góp</span>
            </div>
            <span class="stat-value">{{
              stats.donationCount.toLocaleString()
            }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="container">
        <!-- Active Projects Section -->
        <div id="active-section" class="projects-section">
          <div class="section-header">
            <div class="section-info">
              <h2 class="section-title">Dự án đang thực hiện</h2>
              <p class="section-subtitle">
                Chung tay giúp đỡ những hoàn cảnh khó khăn ngay hôm nay
              </p>
            </div>

            <!-- Tabs -->
            <div class="section-tabs">
              <button
                class="tab-btn tab-active"
                @click="scrollToSection('active-section')"
              >
                Đang gây quỹ
              </button>
              <button
                class="tab-btn tab-completed"
                @click="scrollToSection('completed-section')"
              >
                Đã hoàn thành
              </button>
            </div>
          </div>

          <!-- Search & Date Filters -->
          <div class="search-filter-bar">
            <div class="search-box">
              <i class="bi bi-search"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm dự án theo tên, địa điểm..."
                class="search-input"
              />
              <button
                v-if="searchQuery"
                class="clear-search"
                @click="searchQuery = ''"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="date-filters">
              <div class="date-input-group">
                <label>Từ ngày</label>
                <input
                  v-model="startDateFilter"
                  type="date"
                  class="date-input"
                />
              </div>
              <div class="date-input-group">
                <label>Đến ngày</label>
                <input v-model="endDateFilter" type="date" class="date-input" />
              </div>
              <button
                v-if="hasActiveFilters"
                class="clear-filters-btn"
                @click="clearFilters"
              >
                <i class="bi bi-x-circle"></i>
                Xóa bộ lọc
              </button>
            </div>
          </div>

          <!-- Category Filter -->
          <div class="filter-bar">
            <div class="filter-tabs">
              <button
                v-for="cat in categories"
                :key="cat.key"
                class="filter-tab"
                :class="{ active: activeCategory === cat.key }"
                @click="activeCategory = cat.key"
              >
                <i :class="`bi bi-${cat.icon}`"></i>
                {{ cat.label }}
              </button>
            </div>
          </div>

          <!-- Active Projects Grid -->
          <div class="projects-grid">
            <ProjectCard
              v-for="project in activeProjects"
              :key="project.id"
              :project="project"
            />
          </div>

          <!-- Empty State -->
          <div v-if="activeProjects.length === 0" class="empty-state">
            <i class="bi bi-inbox"></i>
            <p>Không có dự án nào trong danh mục này</p>
          </div>
        </div>

        <!-- Completed Projects Section -->
        <div id="completed-section" class="projects-section completed-section">
          <div class="section-header completed-header">
            <div class="section-info">
              <div class="section-title-row">
                <i class="bi bi-check-circle-fill section-icon"></i>
                <h2 class="section-title">Dự án đã hoàn thành</h2>
              </div>
              <p class="section-subtitle">
                Minh bạch tài chính là ưu tiên hàng đầu. Dưới đây là các dự án
                đã kết thúc gây quỹ, kèm theo báo cáo chi tiêu chi tiết và hình
                ảnh nghiệm thu thực tế.
              </p>
            </div>
          </div>

          <!-- Completed Projects List (Horizontal Layout) -->
          <div class="completed-list">
            <RouterLink
              v-for="project in completedProjects"
              :key="project.id"
              :to="`/du-an/${project.slug}`"
              class="completed-card-link"
            >
              <article class="completed-card">
                <div class="completed-image">
                  <img :src="project.image" :alt="project.title" />
                </div>
                <div class="completed-content">
                  <div class="completed-header-row">
                    <div class="completed-info">
                      <h4 class="completed-title">{{ project.title }}</h4>
                      <p class="completed-meta">
                        <i class="bi bi-geo-alt"></i> {{ project.location }} |
                        Hoàn thành: {{ project.completedDate }}
                      </p>
                    </div>
                    <span class="completed-badge">Thành công</span>
                  </div>
                  <p class="completed-description">
                    {{ project.shortDescription }}
                  </p>
                  <div class="completed-footer">
                    <div class="completed-amount">
                      <span class="amount-label">ĐÃ GIẢI NGÂN</span>
                      <span class="amount-value">{{
                        formatCurrency(project.raised)
                      }}</span>
                    </div>
                    <span class="report-link">
                      <i class="bi bi-file-earmark-text"></i>
                      Xem sao kê & báo cáo
                    </span>
                    <span class="btn-view-photos">Xem ảnh thực tế</span>
                  </div>
                </div>
              </article>
            </RouterLink>
          </div>

          <!-- Empty State -->
          <div v-if="completedProjects.length === 0" class="empty-state">
            <i class="bi bi-inbox"></i>
            <p>Không có dự án nào trong danh mục này</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.activities-page {
  min-height: 100vh;
  background: var(--color-background);
  font-family: var(--font-primary);
}

/* Hero Section - Simplified */
.hero-section {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
  color: var(--color-white);
  padding: var(--spacing-xl) 0;
  font-family: var(--font-primary);
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: var(--spacing-md);
}

.breadcrumb {
  display: flex;
  gap: var(--spacing-sm);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--font-size-sm);
}

.breadcrumb-item a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb-item a:hover {
  color: var(--color-white);
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "/";
  padding: 0 var(--spacing-sm);
  color: rgba(255, 255, 255, 0.5);
}

.breadcrumb-item.active {
  color: rgba(255, 255, 255, 0.6);
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
  color: var(--color-white);
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  max-width: 600px;
  margin: 0;
}

/* Banner Section */
.banner-section {
  padding: var(--spacing-xl) 0;
  background: var(--color-background-alt);
}

.banner-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  min-height: 500px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 500px;
  max-width: 600px;
}

.banner-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  margin: 0 0 var(--spacing-md) 0;
  line-height: 1.3;
  text-align: left;
}

.banner-text {
  font-size: var(--font-size-base);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  width: fit-content;
  transition: all var(--transition-fast);
}

.banner-btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  color: var(--color-white);
}

/* Stats Section */
.stats-section {
  background: var(--color-background-alt);
  padding: var(--spacing-lg) 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  background: var(--color-white);
  border: 1px solid #e5dcdc;
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stat-icon {
  font-size: 1.75rem;
  color: var(--color-primary);
}

.stat-icon.completed {
  color: var(--color-secondary);
}

.stat-icon.donations {
  color: var(--color-primary);
}

.stat-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  line-height: 1.2;
}

/* Content Section */
.content-section {
  padding: var(--spacing-2xl) 0;
  background: var(--color-background-alt);
}

.projects-section {
  margin-bottom: var(--spacing-3xl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.section-info {
  flex: 1;
  text-align: left;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.section-icon {
  color: var(--color-primary);
  font-size: 1.5rem;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
  text-align: left;
}

.section-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  margin-top: var(--spacing-xs);
  max-width: 700px;
}

/* Tabs - Separate Buttons Style */
.section-tabs {
  display: flex;
  gap: var(--spacing-sm);
}

.tab-btn {
  padding: var(--spacing-sm) var(--spacing-xl);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tab-btn.tab-active {
  background: var(--color-primary);
  color: var(--color-white);
}

.tab-btn.tab-active:hover {
  background: var(--color-primary-dark);
}

.tab-btn.tab-completed {
  background: transparent;
  color: var(--color-text-light);
  border: 1px solid #e5dcdc;
}

.tab-btn.tab-completed:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}

/* Search & Date Filter Bar */
.search-filter-bar {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  align-items: flex-end;
}

.search-box {
  flex: 1;
  min-width: 280px;
  position: relative;
  display: flex;
  align-items: center;
  height: 42px;
}

.search-box > i {
  position: absolute;
  left: 16px;
  color: var(--color-text-muted);
  font-size: 1rem;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 44px;
  border: 1px solid var(--color-background-alt);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background: var(--color-white);
  transition: all var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(177, 32, 41, 0.1);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.clear-search {
  position: absolute;
  right: 12px;
  width: 24px;
  height: 24px;
  border: none;
  background: var(--color-background-alt);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  transition: all var(--transition-fast);
}

.clear-search:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.date-filters {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-end;
  flex-wrap: wrap;
}

.date-input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-input-group label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

.date-input {
  padding: 10px 12px;
  border: 1px solid var(--color-background-alt);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: var(--color-white);
  min-width: 150px;
  transition: all var(--transition-fast);
}

.date-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: 1px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.clear-filters-btn:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

/* Filter Bar */
.filter-bar {
  margin-bottom: var(--spacing-xl);
}

.filter-tabs {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-background-alt);
  background: var(--color-white);
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-tab:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-tab.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

/* Completed Section */
.completed-section {
  padding-top: var(--spacing-2xl);
  border-top: 1px solid var(--color-background-alt);
}

.completed-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.completed-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.completed-card {
  display: flex;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-background-alt);
  transition: all var(--transition-base);
  cursor: pointer;
}

.completed-card:hover {
  box-shadow: var(--shadow-md);
}

.completed-image {
  width: 250px;
  min-height: 180px;
  flex-shrink: 0;
  overflow: hidden;
}

.completed-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(20%);
  transition: all var(--transition-base);
}

.completed-card:hover .completed-image img {
  filter: grayscale(0%);
}

.completed-content {
  flex: 1;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
}

.completed-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
}

.completed-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0 0 var(--spacing-xs) 0;
}

.completed-meta {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}

.completed-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(42, 112, 80, 0.1);
  color: #198754;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-full);
}

.completed-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  flex: 1;
}

.completed-footer {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-background-alt);
  flex-wrap: wrap;
}

.completed-amount {
  display: flex;
  flex-direction: column;
}

.amount-label {
  font-size: 10px;
  color: var(--color-text-muted);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
}

.amount-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.report-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
}

.report-link:hover {
  text-decoration: underline;
}

.btn-view-photos {
  margin-left: auto;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-background-alt);
  border-radius: var(--radius-md);
  background: var(--color-white);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-view-photos:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--color-text-muted);
}

.empty-state i {
  font-size: 3rem;
  opacity: 0.3;
  margin-bottom: var(--spacing-md);
}

/* Responsive */
@media (max-width: 991.98px) {
  .banner-card {
    flex-direction: column;
  }

  .banner-card {
    min-height: 280px;
  }

  .banner-content {
    min-height: 280px;
    padding: var(--spacing-lg);
  }

  .banner-title {
    font-size: var(--font-size-2xl);
  }

  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-md);
  }

  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .completed-card {
    flex-direction: column;
  }

  .completed-image {
    width: 100%;
    height: 200px;
  }
}

@media (max-width: 767.98px) {
  .hero-title {
    font-size: var(--font-size-2xl);
  }

  .banner-text {
    display: none;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
  }

  .section-tabs {
    width: 100%;
    justify-content: center;
  }

  .search-filter-bar {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .search-box {
    min-width: 100%;
  }

  .date-filters {
    width: 100%;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .date-input-group {
    width: 100%;
  }

  .date-input {
    width: 100%;
  }

  .clear-filters-btn {
    width: 100%;
    justify-content: center;
  }

  .filter-tabs {
    overflow-x: auto;
    padding-bottom: var(--spacing-xs);
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .completed-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-view-photos {
    margin-left: 0;
    width: 100%;
  }
}
</style>
