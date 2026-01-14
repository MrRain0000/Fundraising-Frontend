<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="cta-section">
    <div class="container">
      <div class="cta-card">
        <!-- Decorative circles -->
        <div class="circle circle-left"></div>
        <div class="circle circle-right"></div>

        <!-- Content -->
        <div class="cta-content">
          <h2 class="cta-title">Chung tay vì cộng đồng</h2>
          <p class="cta-description">
            Sự đóng góp của bạn, dù nhỏ bé, cũng có thể thay đổi cuộc đời của
            một con người. Hãy cùng chúng tôi viết tiếp những câu chuyện cổ tích
            đời thường.
          </p>
          <div class="cta-buttons">
            <RouterLink to="/quyen-gop" class="btn-cta btn-primary-cta">
              Quyên góp ngay
            </RouterLink>
            <RouterLink to="/lien-he" class="btn-cta btn-outline-cta">
              Đăng ký tình nguyện
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  padding: 9rem 1rem 4rem;
}

.cta-card {
  position: relative;
  overflow: hidden;
  background: #d8232a;
  border-radius: var(--radius-xl);
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(177, 32, 41, 0.25);
}

/* Decorative circles */
.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-left {
  width: 300px;
  height: 300px;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.circle-right {
  width: 400px;
  height: 400px;
  bottom: 0;
  right: 0;
  transform: translate(30%, 30%);
}

/* Content */
.cta-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.cta-title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  margin: 0;
  line-height: 1.2;
}

.cta-description {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0;
  line-height: 1.7;
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.btn-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 1.2rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  transition: all var(--transition-base);
}

.btn-primary-cta {
  background: var(--color-white);
  color: var(--color-primary);
}

.btn-primary-cta:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.btn-outline-cta {
  background: transparent;
  color: var(--color-white);
  border: 2px solid var(--color-white);
}

.btn-outline-cta:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 767.98px) {
  .cta-card {
    padding: 3rem 1.5rem;
  }

  .cta-title {
    font-size: 1.75rem;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .btn-cta {
    width: 100%;
  }
}
</style>
