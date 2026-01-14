<template>
  <div class="program-social">
    <h2 class="content-title">Bác ái Xã hội</h2>
    <p class="content-intro">
      Chương trình bác ái xã hội hỗ trợ nhu yếu phẩm và cải thiện điều kiện sống
      cho các gia đình có hoàn cảnh đặc biệt khó khăn.
    </p>

    <div class="program-highlights mt-4">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-house-heart"></i>
            </div>
            <h5>Xây nhà tình thương</h5>
            <p>Xây dựng và sửa chữa nhà ở cho gia đình nghèo</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-basket3"></i>
            </div>
            <h5>Nhu yếu phẩm</h5>
            <p>Cung cấp gạo, thực phẩm và đồ dùng thiết yếu</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-gift"></i>
            </div>
            <h5>Quà tặng</h5>
            <p>Tặng quà nhân các dịp lễ Tết, Trung thu cho trẻ em</p>
          </div>
        </div>
      </div>
    </div>

    <div class="program-stats mt-5 p-4 bg-light rounded">
      <div class="row text-center">
        <div class="col-4">
          <h3 class="text-primary">50+</h3>
          <p class="mb-0">Nhà tình thương</p>
        </div>
        <div class="col-4">
          <h3 class="text-primary">500+</h3>
          <p class="mb-0">Phần quà đã trao</p>
        </div>
        <div class="col-4">
          <h3 class="text-primary">20</h3>
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
  background: #ffb74d;
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
