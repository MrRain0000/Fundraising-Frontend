<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import BackButton from "@/components/common/BackButton.vue";
import ProjectHero from "@/components/project-detail/ProjectHero.vue";
import ProjectHeaderContent from "@/components/project-detail/ProjectHeaderContent.vue";
import ProjectProgress from "@/components/project-detail/ProjectProgress.vue";
import ProjectFeaturedImage from "@/components/project-detail/ProjectFeaturedImage.vue";
import ProjectContent from "@/components/project-detail/ProjectContent.vue";
import ProjectSidebar from "@/components/project-detail/ProjectSidebar.vue";
import ProjectGallery from "@/components/project-detail/ProjectGallery.vue";
import ProjectTimeline from "@/components/project-detail/ProjectTimeline.vue";
import ProjectComments from "@/components/project-detail/ProjectComments.vue";
import RelatedProjects from "@/components/project-detail/RelatedProjects.vue";
import projectsData from "@/data/projects.json";

const route = useRoute();
const loading = ref(true);

// Get current project by slug
const project = computed(() => {
  const slug = route.params.slug;
  return projectsData.find((p) => p.slug === slug);
});

// Check if project exists
const projectNotFound = computed(() => {
  return !loading.value && !project.value;
});

onMounted(() => {
  // Simulate loading for smooth transition
  setTimeout(() => {
    loading.value = false;
  }, 300);
});
</script>

<template>
  <div class="project-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <span>Đang tải...</span>
    </div>

    <!-- Not Found State -->
    <div v-else-if="projectNotFound" class="not-found-state">
      <div class="container">
        <i class="bi bi-exclamation-circle"></i>
        <h2>Không tìm thấy dự án</h2>
        <p>Dự án bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <RouterLink to="/hoat-dong" class="btn-back">
          <i class="bi bi-arrow-left"></i>
          Quay lại danh sách dự án
        </RouterLink>
      </div>
    </div>

    <!-- Project Detail -->
    <template v-else>
      <!-- Breadcrumb -->
      <nav class="breadcrumb-section">
        <div class="container">
          <div class="breadcrumb-wrapper">
            <BackButton />
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <RouterLink to="/">Trang chủ</RouterLink>
              </li>
              <li class="breadcrumb-item">
                <RouterLink to="/hoat-dong">Hoạt động</RouterLink>
              </li>
              <li class="breadcrumb-item active">{{ project.title }}</li>
            </ol>
          </div>
        </div>
      </nav>

      <!-- Hero Banner -->
      <ProjectHero :project="project" />

      <!-- Header Content with Title, Subtitle, Date, Share -->
      <ProjectHeaderContent :project="project" />

      <!-- Main Content -->
      <main class="main-content">
        <div class="container">
          <!-- Progress Section -->
          <ProjectProgress :project="project" />

          <!-- Two Column Layout -->
          <div class="content-layout">
            <div class="content-main">
              <!-- Featured Image -->
              <ProjectFeaturedImage :project="project" />
              <ProjectContent :project="project" />
              <ProjectGallery :project="project" />
              <ProjectTimeline :project="project" />
              <!-- Comments Section -->
              <ProjectComments :project="project" />
            </div>
            <div class="content-sidebar">
              <ProjectSidebar :project="project" />
            </div>
          </div>

          <!-- Related Projects -->
          <RelatedProjects :project="project" />
        </div>
      </main>
    </template>
  </div>
</template>

<style scoped>
.project-detail-page {
  min-height: 100vh;
  background: var(--color-background-alt);
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: var(--spacing-md);
  color: var(--color-text-muted);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-background-alt);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Not Found State */
.not-found-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.not-found-state i {
  font-size: 4rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
}

.not-found-state h2 {
  font-size: var(--font-size-2xl);
  color: var(--color-text);
  margin: 0 0 var(--spacing-sm) 0;
}

.not-found-state p {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-lg);
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
}

.btn-back:hover {
  background: var(--color-primary-dark);
  color: #fff;
}

/* Breadcrumb */
.breadcrumb-section {
  background: var(--color-white);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-background-alt);
}

.breadcrumb-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  font-size: var(--font-size-sm);
}

.breadcrumb-item a {
  color: var(--color-text-light);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumb-item a:hover {
  color: var(--color-primary);
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "/";
  padding: 0 var(--spacing-sm);
  color: var(--color-text-muted);
}

.breadcrumb-item.active {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Main Content */
.main-content {
  padding: var(--spacing-2xl) 0;
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.content-main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Responsive */
@media (max-width: 1199.98px) {
  .content-layout {
    grid-template-columns: 1fr 320px;
  }
}

@media (max-width: 991.98px) {
  .content-layout {
    grid-template-columns: 1fr;
  }

  .content-sidebar {
    order: -1;
  }
}

@media (max-width: 575.98px) {
  .breadcrumb-item.active {
    max-width: 150px;
  }
}
</style>
