<script setup>
import { ref } from "vue";

// Timeline/Milestones
const milestones = ref([
  {
    year: "2021",
    month: "Tháng 11",
    title: "Thành lập Quỹ",
    description:
      "Quỹ chính thức được thành lập theo quyết định số 1151/QĐ-BNV của Bộ Nội Vụ.",
    icon: "flag-fill",
  },
  {
    year: "2022",
    month: "Tháng 4",
    title: "Được cấp phép hoạt động",
    description:
      "Ngày 22/04/2022, Quỹ chính thức được cấp phép hoạt động trên phạm vi toàn quốc.",
    icon: "patch-check-fill",
  },
  {
    year: "2023",
    month: "Suốt năm",
    title: "Mở rộng hoạt động",
    description:
      "Triển khai hơn 50 chương trình thiện nguyện tại 20 tỉnh thành trên cả nước.",
    icon: "globe-asia-australia",
  },
  {
    year: "2024",
    month: "Hiện tại",
    title: "Kết nối quốc tế",
    description:
      "Hợp tác với các tổ chức quốc tế để mở rộng nguồn lực và phạm vi hoạt động.",
    icon: "stars",
  },
]);
</script>

<template>
  <div class="vision-mission">
    <!-- About LRF -->
    <div class="content-block mb-5">
      <div class="row align-items-center g-4">
        <div class="col-lg-6">
          <div class="image-wrapper">
            <img
              src="https://littlerosesfoundation.org/wp-content/uploads/2023/03/about-us-lrf-1-2048x1365.jpg"
              alt="Little Roses Foundation"
              class="img-fluid rounded-4 shadow"
            />
            <div class="image-badge">
              <span class="badge-number">2021</span>
              <span class="badge-text">Năm thành lập</span>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <span class="section-label">Về chúng tôi</span>
          <h3 class="block-title">Quỹ Từ Thiện Bông Hồng Nhỏ</h3>
          <p class="block-content">
            Quỹ từ thiện Bông hồng nhỏ (Little Roses Foundation) là quỹ từ thiện
            không vì mục tiêu lợi nhuận, hướng đến các hoạt động thiện nguyện đa
            dạng phục vụ cộng đồng. Được thúc đẩy bởi truyền thống gia đình và
            tấm lòng người Mẹ, NHG là thành viên sáng lập chủ chốt của Quỹ.
          </p>
          <p class="block-content mb-0">
            Quỹ phục vụ chủ yếu trên các lĩnh vực
            <strong>sức khỏe – giáo dục</strong>, được cấp phép bởi Bộ Nội Vụ để
            hoạt động trên phạm vi toàn quốc và đón nhận sự trợ giúp quốc tế.
          </p>
          <div class="feature-list">
            <div class="feature-item">
              <i class="bi bi-check-circle-fill"></i>
              <span>Được cấp phép bởi Bộ Nội Vụ</span>
            </div>
            <div class="feature-item">
              <i class="bi bi-check-circle-fill"></i>
              <span>Hoạt động trên phạm vi toàn quốc</span>
            </div>
            <div class="feature-item">
              <i class="bi bi-check-circle-fill"></i>
              <span>Minh bạch và công khai tài chính</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vision & Mission Cards -->
    <div class="vm-section">
      <div class="row g-4">
        <div class="col-md-6">
          <div class="vm-card vision-card">
            <div class="vm-icon">
              <i class="bi bi-eye-fill"></i>
            </div>
            <h3 class="vm-title">Tầm nhìn</h3>
            <p class="vm-text">
              Quỹ từ thiện Bông hồng nhỏ là quỹ từ thiện của nền văn minh tình
              thương và các giá trị nhân bản toàn diện dành cho tất cả những ai
              đang trong hoàn cảnh nghèo khó cả về vật chất cũng như tinh thần.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="vm-card mission-card">
            <div class="vm-icon">
              <i class="bi bi-bullseye"></i>
            </div>
            <h3 class="vm-title">Sứ mệnh</h3>
            <p class="vm-text">
              Giúp những người đang lâm cảnh ngặt nghèo vượt qua nghịch cảnh,
              cải thiện đời sống vật chất và tinh thần; tạo cơ hội để mọi người
              không phân biệt thu nhập đều có thể chia sẻ giá trị bản thân cho
              sự phát triển cộng đồng.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline Section -->
    <div class="timeline-section">
      <div class="text-center mb-5">
        <span class="section-label">Hành trình phát triển</span>
        <h3 class="section-title">Các cột mốc quan trọng</h3>
      </div>
      <div class="timeline">
        <div
          v-for="(milestone, index) in milestones"
          :key="milestone.year"
          class="timeline-item"
          :class="{ right: index % 2 !== 0 }"
        >
          <div class="timeline-marker">
            <i :class="`bi bi-${milestone.icon}`"></i>
          </div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-year">{{ milestone.year }}</span>
              <span class="timeline-month">{{ milestone.month }}</span>
            </div>
            <h4 class="timeline-title">{{ milestone.title }}</h4>
            <p class="timeline-description">{{ milestone.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Core Values -->
    <div class="content-block values-block">
      <div class="text-center mb-4">
        <span class="section-label">Giá trị cốt lõi</span>
        <h3 class="section-title">Những giá trị chúng tôi theo đuổi</h3>
      </div>
      <div class="row g-4">
        <div class="col-6 col-md-3">
          <div class="value-card text-center">
            <div
              class="value-icon"
              style="background: linear-gradient(135deg, #e91e63, #c2185b)"
            >
              <i class="bi bi-heart-fill"></i>
            </div>
            <h5 class="value-title">Yêu thương</h5>
            <p class="value-desc">Lan tỏa tình yêu thương đến mọi người</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="value-card text-center">
            <div
              class="value-icon"
              style="background: linear-gradient(135deg, #2196f3, #1565c0)"
            >
              <i class="bi bi-shield-check"></i>
            </div>
            <h5 class="value-title">Chính trực</h5>
            <p class="value-desc">Minh bạch trong mọi hoạt động</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="value-card text-center">
            <div
              class="value-icon"
              style="background: linear-gradient(135deg, #4caf50, #2e7d32)"
            >
              <i class="bi bi-people-fill"></i>
            </div>
            <h5 class="value-title">Tôn trọng</h5>
            <p class="value-desc">Tôn trọng phẩm giá mỗi người</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="value-card text-center">
            <div
              class="value-icon"
              style="background: linear-gradient(135deg, #ff9800, #ef6c00)"
            >
              <i class="bi bi-star-fill"></i>
            </div>
            <h5 class="value-title">Tận tâm</h5>
            <p class="value-desc">Cống hiến hết mình vì cộng đồng</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vision-mission {
  padding-bottom: 2rem;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
}

/* Section Labels */
.section-label {
  display: block;
  color: var(--color-primary, #b12029);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text, #1a1a1a);
  margin: 0;
}

/* Image Wrapper */
.image-wrapper {
  position: relative;
}

.image-badge {
  position: absolute;
  bottom: -15px;
  right: 20px;
  background: var(--color-primary, #b12029);
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(177, 32, 41, 0.3);
}

.badge-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.badge-text {
  font-size: 0.7rem;
  opacity: 0.9;
}

/* Block styles */
.block-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text, #1a1a1a);
  margin-bottom: 1rem;
}

.block-content {
  font-size: 1rem;
  color: var(--color-text-light, #666);
  line-height: 1.8;
}

/* Feature List */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text, #333);
  font-weight: 500;
}

.feature-item i {
  color: var(--color-secondary, #2a7050);
  font-size: 1.1rem;
}

/* Vision & Mission Cards */
.vm-section {
  margin-bottom: 3rem;
}

.vm-card {
  padding: 2rem;
  border-radius: 20px;
  height: 100%;
  transition: all 0.3s ease;
}

.vm-card:hover {
  transform: translateY(-5px);
}

.vision-card {
  background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%);
  border: 2px solid rgba(177, 32, 41, 0.1);
}

.mission-card {
  background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
  border: 2px solid rgba(42, 112, 80, 0.1);
}

.vm-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  font-size: 1.5rem;
}

.vision-card .vm-icon {
  background: var(--color-primary, #b12029);
  color: #fff;
}

.mission-card .vm-icon {
  background: var(--color-secondary, #2a7050);
  color: #fff;
}

.vm-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: var(--color-text, #1a1a1a);
}

.vm-text {
  color: #666;
  line-height: 1.7;
  margin: 0;
}

/* Timeline Section */
.timeline-section {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 3rem 2rem;
  border-radius: 20px;
  margin-bottom: 3rem;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 0;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(
    to bottom,
    var(--color-primary, #b12029),
    var(--color-secondary, #2a7050)
  );
  transform: translateX(-50%);
  border-radius: 4px;
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 0 2.5rem 2rem 0;
}

.timeline-item.right {
  margin-left: 50%;
  padding: 0 0 2rem 2.5rem;
}

.timeline-marker {
  position: absolute;
  top: 5px;
  width: 44px;
  height: 44px;
  background: #fff;
  border: 4px solid var(--color-primary, #b12029);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--color-primary, #b12029);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.timeline-item:not(.right) .timeline-marker {
  right: -22px;
}

.timeline-item.right .timeline-marker {
  left: -22px;
}

.timeline-content {
  background: #fff;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.timeline-year {
  background: var(--color-primary, #b12029);
  color: #fff;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.timeline-month {
  color: #999;
  font-size: 0.85rem;
}

.timeline-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: var(--color-text, #1a1a1a);
}

.timeline-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

/* Core Values */
.values-block {
  margin-top: 2rem;
}

.value-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.value-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.value-icon i {
  font-size: 1.5rem;
  color: #fff;
}

.value-title {
  font-weight: 700;
  color: var(--color-text, #1a1a1a);
  margin-bottom: 0.5rem;
}

.value-desc {
  color: #888;
  font-size: 0.8rem;
  margin: 0;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 991px) {
  .timeline::before {
    left: 20px;
  }

  .timeline-item,
  .timeline-item.right {
    width: 100%;
    margin-left: 0;
    padding: 0 0 2rem 3.5rem;
  }

  .timeline-marker,
  .timeline-item.right .timeline-marker {
    left: 0 !important;
    right: auto !important;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.35rem;
  }

  .timeline-section {
    padding: 2rem 1rem;
  }
}
</style>
