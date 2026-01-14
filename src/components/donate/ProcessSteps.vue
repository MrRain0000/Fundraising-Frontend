<script setup>
const steps = [
  {
    icon: "bi-pencil-square",
    title: "1. Đăng ký",
    desc: "Điền thông tin vào biểu mẫu trực tuyến hoặc liên hệ trực tiếp qua hotline.",
    active: true,
  },
  {
    icon: "bi-patch-check",
    title: "2. Xác minh & Liên hệ",
    desc: "Đội ngũ CSKH sẽ liên hệ xác nhận thông tin và tư vấn chi tiết trong 24h.",
    active: false,
  },
  {
    icon: "bi-heart",
    title: "3. Thực hiện",
    desc: "Tiến hành quyên góp hoặc tham gia hoạt động tình nguyện thực tế tại địa phương.",
    active: false,
  },
  {
    icon: "bi-envelope-check",
    title: "4. Báo cáo & Phản hồi",
    desc: "Nhận báo cáo minh bạch về khoản đóng góp và thư cảm ơn từ quỹ.",
    active: false,
  },
];
</script>

<template>
  <section class="process-section">
    <div class="container">
      <!-- Header -->
      <div class="section-header text-center">
        <span class="section-label">QUY TRÌNH MINH BẠCH</span>
        <h2 class="section-title">Cách thức hoạt động</h2>
        <p class="section-desc">
          Chúng tôi tối giản hóa quy trình để bạn có thể dễ dàng bắt đầu hành
          trình chia sẻ yêu thương của mình.
        </p>
      </div>

      <!-- Steps -->
      <div class="steps-container">
        <!-- Connector Line -->
        <div class="connector-line"></div>

        <!-- Step Items -->
        <div class="steps-grid">
          <div v-for="(step, index) in steps" :key="index" class="step-item">
            <div class="step-icon" :class="{ active: step.active }">
              <i :class="`bi ${step.icon}`"></i>
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-section {
  background: var(--color-white);
  margin-bottom: 90px;
}

.section-header {
  max-width: 600px;
  margin: 0 auto var(--spacing-3xl);
}

.section-label {
  display: inline-block;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: var(--spacing-sm);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.section-desc {
  color: var(--color-text-light);
  line-height: 1.7;
  margin-bottom: 0;
}

.steps-container {
  position: relative;
}

.connector-line {
  display: none;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  position: relative;
}

.step-item {
  text-align: center;
  position: relative;
  z-index: 1;
}

.step-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-md);
  background: var(--color-white);
  border: 2px solid #e5e5e5;
  color: var(--color-text-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-base);
}

.step-icon.active {
  background: rgba(177, 32, 41, 0.1);
  border-color: rgba(177, 32, 41, 0.2);
  color: var(--color-primary);
}

.step-icon i {
  font-size: 1.75rem;
}

.step-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.step-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: 0;
}

/* Connector line for desktop */
@media (min-width: 768px) {
  .connector-line {
    display: block;
    position: absolute;
    top: 32px;
    left: 12.5%;
    right: 12.5%;
    height: 2px;
    background: #e5e5e5;
    z-index: 0;
  }
}

/* Tablet */
@media (max-width: 991.98px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-xl);
  }

  .connector-line {
    display: none;
  }
}

/* Mobile */
@media (max-width: 575.98px) {
  .process-section {
    padding: 60px 0;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
