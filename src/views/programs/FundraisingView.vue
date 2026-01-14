<template>
  <div class="program-fundraising">
    <h2 class="content-title">Gây quỹ</h2>
    <p class="content-intro">
      Các hoạt động gây quỹ đa dạng, kết nối nhà hảo tâm với những hoàn cảnh cần
      được giúp đỡ một cách minh bạch và hiệu quả.
    </p>

    <div class="program-highlights mt-4">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-calendar-event"></i>
            </div>
            <h5>Sự kiện gây quỹ</h5>
            <p>Tổ chức các sự kiện từ thiện, đêm nhạc gây quỹ</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-people"></i>
            </div>
            <h5>Kết nối nhà tài trợ</h5>
            <p>Kết nối doanh nghiệp và cá nhân với các dự án cụ thể</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="highlight-card text-center">
            <div class="highlight-icon">
              <i class="bi bi-graph-up-arrow"></i>
            </div>
            <h5>Báo cáo minh bạch</h5>
            <p>Cập nhật tiến độ và báo cáo tài chính định kỳ</p>
          </div>
        </div>
      </div>
    </div>

    <div class="program-stats mt-5 p-4 bg-light rounded">
      <div class="row text-center">
        <div class="col-4">
          <h3 class="text-primary">20+</h3>
          <p class="mb-0">Sự kiện tổ chức</p>
        </div>
        <div class="col-4">
          <h3 class="text-primary">100+</h3>
          <p class="mb-0">Nhà tài trợ</p>
        </div>
        <div class="col-4">
          <h3 class="text-primary">500M+</h3>
          <p class="mb-0">VNĐ đã quyên góp</p>
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
  background: #6366f1;
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
