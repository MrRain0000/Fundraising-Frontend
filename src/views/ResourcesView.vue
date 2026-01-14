<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import BackButton from "@/components/common/BackButton.vue";

// Categories
const categories = ref([
  { id: "all", name: "Tất cả", icon: "grid" },
  { id: "research", name: "Nghiên cứu", icon: "journal-text" },
  { id: "report", name: "Báo cáo", icon: "file-earmark-bar-graph" },
  { id: "guide", name: "Hướng dẫn", icon: "book" },
  { id: "article", name: "Bài viết", icon: "newspaper" },
]);

const activeCategory = ref("all");

// Resources data
const resources = ref([
  {
    id: 1,
    title: "Báo cáo tác động xã hội năm 2024",
    description:
      "Đánh giá toàn diện hiệu quả các chương trình của Quỹ Bông Hồng Nhỏ trong năm 2024, bao gồm số liệu thụ hưởng và tác động thực tế.",
    category: "report",
    date: "2024-12-15",
    author: "Ban điều hành Quỹ",
    fileType: "PDF",
    fileSize: "2.5 MB",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Nghiên cứu: Ảnh hưởng của giáo dục sớm đến trẻ em vùng cao",
    description:
      "Nghiên cứu định lượng và định tính về tác động của các chương trình giáo dục sớm tại các trường vùng cao Hà Giang, Lào Cai.",
    category: "research",
    date: "2024-11-20",
    author: "ThS. Nguyễn Văn An - ĐH Sư phạm HN",
    fileType: "PDF",
    fileSize: "4.2 MB",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Hướng dẫn: Quy trình tổ chức chiến dịch khám bệnh miễn phí",
    description:
      "Tài liệu hướng dẫn chi tiết quy trình lập kế hoạch, tổ chức và đánh giá các chương trình khám bệnh miễn phí tại vùng sâu vùng xa.",
    category: "guide",
    date: "2024-10-05",
    author: "Ban Y tế Quỹ",
    fileType: "PDF",
    fileSize: "1.8 MB",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Bài viết: 5 năm hành trình Bông Hồng Nhỏ",
    description:
      "Nhìn lại hành trình 5 năm xây dựng và phát triển Quỹ, những thành tựu đạt được và bài học kinh nghiệm.",
    category: "article",
    date: "2024-09-15",
    author: "Đội ngũ truyền thông",
    fileType: "Online",
    fileSize: "",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Báo cáo đánh giá chương trình Bữa cơm 0 đồng",
    description:
      "Phân tích hiệu quả và tác động của chương trình Bữa cơm 0 đồng sau 2 năm triển khai tại 5 bệnh viện tuyến tỉnh.",
    category: "report",
    date: "2024-08-20",
    author: "Nhóm nghiên cứu độc lập",
    fileType: "PDF",
    fileSize: "3.1 MB",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Nghiên cứu: Mô hình can thiệp dinh dưỡng cho trẻ em",
    description:
      "Đánh giá hiệu quả chương trình hỗ trợ dinh dưỡng cho trẻ em vùng khó khăn, đề xuất mô hình nhân rộng.",
    category: "research",
    date: "2024-07-10",
    author: "TS. Trần Thị Bích - Viện Dinh dưỡng",
    fileType: "PDF",
    fileSize: "5.5 MB",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 7,
    title: "Hướng dẫn: Sổ tay Tình nguyện viên",
    description:
      "Tài liệu định hướng cho tình nguyện viên mới, bao gồm quy tắc ứng xử, kỹ năng làm việc với trẻ em và cộng đồng.",
    category: "guide",
    date: "2024-06-01",
    author: "Ban Tình nguyện viên",
    fileType: "PDF",
    fileSize: "1.2 MB",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: 8,
    title: "Bài viết: Câu chuyện thành công - Em Lan và giấc mơ đại học",
    description:
      "Chia sẻ về hành trình vượt khó của em Lan từ vùng cao Hà Giang đến sinh viên Đại học Y Hà Nội.",
    category: "article",
    date: "2024-05-15",
    author: "Phóng viên Tuổi Trẻ",
    fileType: "Online",
    fileSize: "",
    downloadUrl: "#",
    featured: false,
  },
]);

// Filtered resources
const filteredResources = computed(() => {
  if (activeCategory.value === "all") {
    return resources.value;
  }
  return resources.value.filter((r) => r.category === activeCategory.value);
});

const featuredResources = computed(() => {
  return resources.value.filter((r) => r.featured);
});

// Format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Category label
const getCategoryLabel = (categoryId) => {
  const cat = categories.value.find((c) => c.id === categoryId);
  return cat ? cat.name : categoryId;
};

const getCategoryColor = (categoryId) => {
  const colors = {
    research: "#8b5cf6",
    report: "#3b82f6",
    guide: "#10b981",
    article: "#f59e0b",
  };
  return colors[categoryId] || "#6b7280";
};
</script>

<template>
  <div class="resources-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="container">
        <nav class="breadcrumb-nav">
          <BackButton variant="light" />
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <RouterLink to="/">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active">Tài liệu & Nghiên cứu</li>
          </ol>
        </nav>

        <div class="hero-content">
          <span class="hero-badge">
            <i class="bi bi-journal-bookmark"></i>
            Tài nguyên học thuật
          </span>
          <h1>Tài liệu & Nghiên cứu</h1>
          <p>
            Bài viết chuyên môn, báo cáo tác động và tài liệu hướng dẫn từ các
            hoạt động của Quỹ
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Resources -->
    <section class="featured-section">
      <div class="container">
        <h2 class="section-title">
          <i class="bi bi-star-fill"></i>
          Tài liệu nổi bật
        </h2>

        <div class="row g-4">
          <div
            v-for="resource in featuredResources"
            :key="resource.id"
            class="col-md-6"
          >
            <div class="featured-card">
              <div
                class="card-badge"
                :style="{ background: getCategoryColor(resource.category) }"
              >
                {{ getCategoryLabel(resource.category) }}
              </div>
              <h3>{{ resource.title }}</h3>
              <p>{{ resource.description }}</p>
              <div class="card-meta">
                <span><i class="bi bi-person"></i> {{ resource.author }}</span>
                <span
                  ><i class="bi bi-calendar"></i>
                  {{ formatDate(resource.date) }}</span
                >
              </div>
              <a :href="resource.downloadUrl" class="btn-download">
                <i class="bi bi-download"></i>
                Tải xuống ({{ resource.fileType }} {{ resource.fileSize }})
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Resources -->
    <section class="resources-section">
      <div class="container">
        <!-- Category Filter -->
        <div class="category-filter">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="filter-btn"
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            <i :class="`bi bi-${cat.icon}`"></i>
            {{ cat.name }}
          </button>
        </div>

        <!-- Resources Grid -->
        <div class="resources-grid">
          <div
            v-for="resource in filteredResources"
            :key="resource.id"
            class="resource-card"
          >
            <div class="card-header">
              <span
                class="category-tag"
                :style="{ background: getCategoryColor(resource.category) }"
              >
                {{ getCategoryLabel(resource.category) }}
              </span>
              <span class="file-type">{{ resource.fileType }}</span>
            </div>
            <h4>{{ resource.title }}</h4>
            <p>{{ resource.description }}</p>
            <div class="card-footer">
              <div class="meta">
                <span class="author">{{ resource.author }}</span>
                <span class="date">{{ formatDate(resource.date) }}</span>
              </div>
              <a
                :href="resource.downloadUrl"
                class="download-link"
                :title="
                  resource.fileSize
                    ? `Tải xuống (${resource.fileSize})`
                    : 'Xem bài viết'
                "
              >
                <i
                  :class="
                    resource.fileType === 'Online'
                      ? 'bi bi-box-arrow-up-right'
                      : 'bi bi-download'
                  "
                ></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredResources.length === 0" class="empty-state">
          <i class="bi bi-folder2-open"></i>
          <p>Chưa có tài liệu trong danh mục này</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h3>Bạn là chuyên gia muốn đóng góp nghiên cứu?</h3>
            <p>Liên hệ với chúng tôi để chia sẻ bài viết, nghiên cứu của bạn</p>
          </div>
          <RouterLink to="/dang-ky-chuyen-gia" class="btn-cta">
            <i class="bi bi-person-badge"></i>
            Đăng ký Chuyên gia
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.resources-page {
  min-height: 100vh;
  background: #f8fafc;
}

/* Hero */
.hero-section {
  position: relative;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
  padding: 1rem 1rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0.05;
}

.breadcrumb-nav {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.breadcrumb-item a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.breadcrumb-item.active {
  color: rgba(255, 255, 255, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.hero-content h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.hero-content p {
  color: rgba(255, 255, 255, 0.9);
}

/* Featured Section */
.featured-section {
  padding: 4rem 0 3rem;
  margin-top: -2rem;
  position: relative;
  z-index: 2;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.section-title i {
  color: #f59e0b;
}

.featured-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  width: fit-content;
}

.featured-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.featured-card > p {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1rem;
  flex: 1;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #6b7280;
}

.card-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--color-primary);
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-download:hover {
  background: var(--color-primary-dark);
  color: #fff;
}

/* Resources Section */
.resources-section {
  padding: 2rem 0 4rem;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 50px;
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.resource-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.resource-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.category-tag {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
}

.file-type {
  font-size: 0.7rem;
  color: #9ca3af;
  font-weight: 500;
}

.resource-card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.resource-card > p {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author {
  font-size: 0.75rem;
  color: #374151;
  font-weight: 500;
}

.date {
  font-size: 0.7rem;
  color: #9ca3af;
}

.download-link {
  width: 36px;
  height: 36px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: all 0.2s;
}

.download-link:hover {
  background: var(--color-primary);
  color: #fff;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #9ca3af;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* CTA Section */
.cta-section {
  padding: 0 0 4rem;
}

.cta-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
  border-radius: 16px;
  padding: 2rem 2.5rem;
  color: #fff;
}

.cta-content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  color: #fff;
}

.cta-content p {
  opacity: 0.9;
  font-size: 0.9rem;
  margin: 0;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: #fff;
  color: var(--color-primary);
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s;
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.75rem;
  }

  .cta-card {
    flex-direction: column;
    text-align: center;
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }
}
</style>
