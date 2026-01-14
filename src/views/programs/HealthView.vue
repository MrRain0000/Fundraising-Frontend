<template>
  <div class="program-health">
    <h2 class="content-title">Hỗ trợ Y tế & Sức khỏe</h2>
    <p class="content-intro">
      Chương trình y tế mang đến dịch vụ chăm sóc sức khỏe thiết yếu cho trẻ em
      và gia đình có hoàn cảnh khó khăn.
    </p>

    <div class="program-highlights mt-4">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-hospital"></i>
            </div>
            <h5>Khám bệnh miễn phí</h5>
            <p>Tổ chức các đợt khám bệnh miễn phí tại vùng sâu vùng xa</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-capsule"></i>
            </div>
            <h5>Phát thuốc</h5>
            <p>Cung cấp thuốc men và vật tư y tế thiết yếu</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-heart-pulse"></i>
            </div>
            <h5>Hỗ trợ điều trị</h5>
            <p>Chi trả chi phí phẫu thuật và điều trị bệnh hiểm nghèo</p>
          </div>
        </div>
      </div>
    </div>

    <div class="program-stats mt-5 p-4 bg-light rounded">
      <div class="row text-center">
        <div class="col-4">
          <h3 class="text-primary">3000+</h3>
          <p class="mb-0">Lượt khám bệnh</p>
        </div>
        <div class="col-4">
          <h3 class="text-primary">150</h3>
          <p class="mb-0">Ca phẫu thuật hỗ trợ</p>
        </div>
        <div class="col-4">
          <h3 class="text-primary">10</h3>
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
  background: var(--color-primary);
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
