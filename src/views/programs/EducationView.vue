<template>
  <div class="program-education">
    <h2 class="content-title">Hỗ trợ Phát triển Giáo dục</h2>
    <p class="content-intro">
      Chương trình hỗ trợ giáo dục của Quỹ Bông Hồng Nhỏ mang đến cơ hội học tập
      cho trẻ em có hoàn cảnh khó khăn trên khắp Việt Nam.
    </p>

    <div class="program-highlights mt-4">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-book"></i>
            </div>
            <h5>Học bổng</h5>
            <p>Hỗ trợ học phí và chi phí học tập cho học sinh nghèo hiếu học</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-building"></i>
            </div>
            <h5>Xây trường</h5>
            <p>Xây dựng và sửa chữa trường học tại vùng sâu vùng xa</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-journals"></i>
            </div>
            <h5>Trang thiết bị</h5>
            <p>Cung cấp sách vở, dụng cụ học tập cho các em học sinh</p>
          </div>
        </div>
      </div>
    </div>

    <div class="program-stats mt-5 p-4 bg-light rounded">
      <div class="row text-center">
        <div class="col-4">
          <h3 class="text-primary">1500+</h3>
          <p class="mb-0">Học bổng đã trao</p>
        </div>
        <div class="col-4">
          <h3 class="text-primary">25</h3>
          <p class="mb-0">Trường được xây mới</p>
        </div>
        <div class="col-4">
          <h3 class="text-primary">15</h3>
          <p class="mb-0">Tỉnh thành triển khai</p>
        </div>
      </div>
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
}

.highlight-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  height: 100%;
  transition: all var(--transition-base);
}

.highlight-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.highlight-icon {
  width: 60px;
  height: 60px;
  background: var(--color-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
}

.highlight-icon i {
  font-size: 1.5rem;
  color: var(--color-white);
}

.highlight-card h5 {
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.highlight-card p {
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
  margin-bottom: 0;
}

.text-primary {
  color: var(--color-primary) !important;
}
</style>
