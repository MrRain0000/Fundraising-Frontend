<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";

const circleRef = ref(null);
const animatedPercent = ref(0);
const isAnimated = ref(false);

const animateCounter = () => {
  const duration = 2000; // 2 seconds
  const steps = 100;
  const stepDuration = duration / steps;
  let current = 0;

  const timer = setInterval(() => {
    current++;
    animatedPercent.value = current;
    if (current >= 100) {
      clearInterval(timer);
    }
  }, stepDuration);
};

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isAnimated.value) {
          isAnimated.value = true;
          animateCounter();
        }
      });
    },
    { threshold: 0.5 }
  );

  if (circleRef.value) {
    observer.observe(circleRef.value);
  }
});

onUnmounted(() => {
  if (observer && circleRef.value) {
    observer.unobserve(circleRef.value);
  }
});
</script>

<template>
  <section class="transparency-section">
    <div class="container">
      <div class="transparency-content">
        <!-- Left Content -->
        <div class="text-content">
          <div class="badge">
            <i class="bi bi-shield-check"></i>
            Minh bạch tuyệt đối
          </div>

          <h2 class="section-title">Mọi khoản đóng góp đều được công khai</h2>

          <p class="section-desc">
            Tại Quỹ Bông Hồng Nhỏ, niềm tin của bạn là tài sản quý giá nhất.
            Chúng tôi cam kết công khai báo cáo tài chính định kỳ, chi tiết từng
            khoản thu chi và cập nhật tiến độ dự án liên tục.
          </p>

          <ul class="check-list">
            <li>
              <i class="bi bi-check-circle-fill"></i>
              Báo cáo tài chính được kiểm toán hàng năm
            </li>
            <li>
              <i class="bi bi-check-circle-fill"></i>
              Cập nhật sao kê ngân hàng hàng tháng
            </li>
            <li>
              <i class="bi bi-check-circle-fill"></i>
              Hình ảnh thực tế từ mọi dự án
            </li>
          </ul>

          <RouterLink to="/bao-cao-tai-chinh" class="btn-report">
            <i class="bi bi-file-earmark-text"></i>
            Xem báo cáo mới nhất
          </RouterLink>
        </div>

        <!-- Right Visual - Progress Circle -->
        <div class="visual-content">
          <div
            ref="circleRef"
            class="progress-circle"
            :class="{ animated: isAnimated }"
          >
            <div class="circle-inner">
              <span class="percent">{{ animatedPercent }}%</span>
              <span class="label"
                >Khoản quyên góp<br />đến người cần hỗ trợ</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transparency-section {
  background: var(--color-white);
  padding: var(--spacing-3xl) 0;
  border-top: 1px solid #f4f0f0;
  border-bottom: 1px solid #f4f0f0;
}

.transparency-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-3xl);
}

.text-content {
  flex: 1;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  background: rgba(42, 112, 80, 0.1);
  color: var(--color-secondary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-lg);
}

.badge i {
  font-size: 1rem;
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  line-height: 1.2;
  margin: 0 0 var(--spacing-md) 0;
  text-align: left;
}

.section-desc {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
  max-width: 550px;
}

.check-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--spacing-xl) 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.check-list li {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.check-list li i {
  color: #2a7050;
  font-size: 1.25rem;
}

.btn-report {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-background-alt);
  color: var(--color-text);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.btn-report:hover {
  background: #e5e5e5;
  color: var(--color-text);
}

.btn-report i {
  font-size: 1.25rem;
}

/* Visual Content - Progress Circle */
.visual-content {
  flex-shrink: 0;
}

.progress-circle {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #f8f8f8 0%, #ffffff 100%);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08),
    inset 0 -2px 10px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.progress-circle::before {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  padding: 8px;
  background: conic-gradient(
    var(--color-primary) 0deg,
    var(--color-primary) 0deg,
    #e8e8e8 0deg,
    #e8e8e8 360deg
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  transition: background 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-circle.animated::before {
  background: conic-gradient(
    var(--color-primary) 0deg,
    var(--color-primary) 270deg,
    #e8e8e8 270deg,
    #e8e8e8 360deg
  );
}

.circle-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1;
}

.percent {
  font-size: 4rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
}

.label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-top: var(--spacing-sm);
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 991.98px) {
  .transparency-content {
    flex-direction: column;
    text-align: center;
  }

  .section-title {
    text-align: center;
  }

  .section-desc {
    max-width: none;
  }

  .check-list {
    align-items: center;
  }

  .progress-circle {
    width: 240px;
    height: 240px;
  }

  .percent {
    font-size: 3rem;
  }
}

@media (max-width: 767.98px) {
  .transparency-section {
    padding: var(--spacing-2xl) 0;
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .progress-circle {
    width: 200px;
    height: 200px;
  }

  .percent {
    font-size: 2.5rem;
  }
}
</style>
