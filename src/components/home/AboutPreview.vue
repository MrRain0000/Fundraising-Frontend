<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="about-preview section-padding">
    <div class="container">
      <div class="row align-items-center g-5">
        <!-- Image Column -->
        <div class="col-lg-6">
          <div class="about-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hoạt động Quỹ Bông Hồng Nhỏ"
              class="about-image"
            />
            <div class="image-accent"></div>
          </div>
        </div>

        <!-- Content Column -->
        <div class="col-lg-6">
          <div class="about-content">
            <span class="section-label">Về chúng tôi</span>
            <h2 class="about-title">Quỹ Bông Hồng Nhỏ</h2>
            <p class="about-description">
              Quỹ từ thiện Bông Hồng Nhỏ (Little Roses Foundation) là quỹ từ
              thiện không vì mục tiêu lợi nhuận, được cấp phép bởi Bộ Nội Vụ để
              hoạt động trên phạm vi toàn quốc. Chúng tôi hướng đến các hoạt
              động thiện nguyện đa dạng phục vụ cộng đồng trên lĩnh vực sức khỏe
              và giáo dục.
            </p>
            <ul class="about-features">
              <li>
                <i class="bi bi-check-circle-fill"></i>
                <span>100% minh bạch trong mọi khoản đóng góp</span>
              </li>
              <li>
                <i class="bi bi-check-circle-fill"></i>
                <span>Báo cáo tài chính định kỳ công khai</span>
              </li>
              <li>
                <i class="bi bi-check-circle-fill"></i>
                <span>Đội ngũ tình nguyện viên tận tâm</span>
              </li>
            </ul>
            <RouterLink to="/gioi-thieu" class="btn btn-primary-custom">
              Tìm hiểu thêm
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-preview {
  background-color: var(--color-background);
  margin: 20px 0;
}

.about-image-wrapper {
  position: relative;
}

.about-image {
  width: 100%;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  position: relative;
  z-index: 2;
}

.image-accent {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 80%;
  height: 80%;
  background-color: var(--color-primary);
  opacity: 0.1;
  border-radius: var(--radius-lg);
  z-index: 1;
}

.section-label {
  display: inline-block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: var(--spacing-sm);
}

.about-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
}

.about-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
}

.about-features {
  list-style: none;
  padding: 0;
  margin-bottom: var(--spacing-xl);
}

.about-features li {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.about-features i {
  color: var(--color-secondary);
  font-size: var(--font-size-lg);
}

@media (max-width: 991.98px) {
  .image-accent {
    display: none;
  }

  .about-title {
    font-size: var(--font-size-3xl);
  }
}
</style>
