<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";

const programs = [
  {
    id: 1,
    title: "Chương trình sức khỏe học đường và cộng đồng",
    description:
      "Phối hợp với Hội Bảo trợ người khuyết tật, Hội Chữ thập đỏ Việt Nam và các trường đại học thực hiện khám, chăm sóc sức khỏe cho trẻ em, người khuyết tật và người nghèo tại vùng sâu vùng xa.",
    goal: 2000000000, // 2 tỷ VNĐ
    raised: 1450000000, // 1.45 tỷ VNĐ
    image:
      "https://t3.ftcdn.net/jpg/01/55/60/16/360_F_155601656_lRZeta9aLJQ0yeqjrWSyWw4iXqsmTlF5.jpg",
    category: "y-te",
    path: "/hoat-dong/y-te",
    volunteers: 28,
  },
  {
    id: 2,
    title: "Nâng cao nhận thức phòng ngừa tật bệnh",
    description:
      "Phối hợp với WHO, UNESCO, UNDP, Unicef triển khai các chương trình giáo dục sức khỏe, tham vấn y tế học đường miễn phí, hướng đến phát triển bền vững theo UNSGD17.",
    goal: 2000000000, // 2 tỷ VNĐ
    raised: 800000000, // 800 triệu VNĐ
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/06/Dear-Future-1024x683.jpg",
    category: "giao-duc",
    path: "/hoat-dong/giao-duc",
    volunteers: 15,
  },
  {
    id: 3,
    title: "Chương trình cứu trợ khẩn cấp",
    description:
      "Đáp ứng nhanh chóng các nhu cầu cấp bách trong thiên tai, bão lũ, dịch bệnh: cung cấp thực phẩm, y tế, nơi ở tạm thời, hỗ trợ tâm lý và xây dựng cơ sở hạ tầng.",
    goal: 2000000000, // 2 tỷ VNĐ/năm
    raised: 1800000000, // 1.8 tỷ VNĐ
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/06/Remini20210628065621328sdsd-1024x683.jpg",
    category: "bac-ai",
    path: "/hoat-dong/bac-ai",
    volunteers: 42,
  },
];

// Format tiền VNĐ
const formatCurrency = (value) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1).replace(".0", "") + " tỷ";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + " triệu";
  }
  return value.toLocaleString("vi-VN");
};

// Tính phần trăm tiến độ
const getProgress = (raised, goal) => {
  return Math.min(Math.round((raised / goal) * 100), 100);
};

// Toast notification
const showToast = ref(false);
const toastMessage = ref("");

const displayToast = (message) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Social sharing functions
const getShareUrl = (program) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}${program.path}`;
};

const shareOnFacebook = (program) => {
  const url = getShareUrl(program);
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}&quote=${encodeURIComponent(program.title)}`;
  window.open(shareUrl, "_blank", "width=600,height=400");
};

const shareOnTwitter = (program) => {
  const url = getShareUrl(program);
  const text = `${
    program.title
  } - Cùng chung tay gây quỹ! Mục tiêu: ${formatCurrency(program.goal)} VNĐ`;
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;
  window.open(shareUrl, "_blank", "width=600,height=400");
};

const shareOnZalo = (program) => {
  const url = getShareUrl(program);
  const shareUrl = `https://zalo.me/share/social/?u=${encodeURIComponent(
    url
  )}&t=${encodeURIComponent(program.title)}`;
  window.open(shareUrl, "_blank", "width=600,height=400");
};

const copyLink = async (program) => {
  const url = getShareUrl(program);
  try {
    await navigator.clipboard.writeText(url);
    displayToast("Đã sao chép liên kết!");
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    displayToast("Đã sao chép liên kết!");
  }
};
</script>

<template>
  <section class="programs-highlight section-padding">
    <div class="container">
      <div class="section-header mb-5">
        <div class="header-content text-center">
          <span class="section-label">Chương trình nổi bật</span>
          <h2 class="section-title">Hoạt động của chúng tôi</h2>
        </div>
        <RouterLink to="/hoat-dong" class="view-more-link">
          Xem thêm <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>

      <div class="programs-list">
        <div
          v-for="(program, index) in programs"
          :key="program.id"
          class="program-item"
          :class="{ reverse: index % 2 === 1 }"
        >
          <div class="row g-0 align-items-stretch">
            <!-- Image -->
            <div class="col-lg-6" :class="{ 'order-lg-2': index % 2 === 1 }">
              <div class="program-image">
                <img :src="program.image" :alt="program.title" />
                <!-- Small badge on image - only show goal -->
                <div class="program-badge">
                  <div class="badge-text">
                    <span class="badge-label">Mục tiêu gây quỹ</span>
                    <span class="goal-value"
                      >{{ formatCurrency(program.goal) }} VNĐ</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="col-lg-6" :class="{ 'order-lg-1': index % 2 === 1 }">
              <div class="program-content">
                <span class="program-number">0{{ index + 1 }}</span>
                <h3 class="program-title">{{ program.title }}</h3>
                <p class="program-description">{{ program.description }}</p>

                <!-- Progress section moved here -->
                <div class="fundraising-progress">
                  <div class="progress-header">
                    <span class="raised-label">
                      Đã huy động:
                      <strong>{{ formatCurrency(program.raised) }} VNĐ</strong>
                    </span>
                    <span class="progress-percent"
                      >{{ getProgress(program.raised, program.goal) }}%</span
                    >
                  </div>
                  <div class="progress-bar">
                    <div
                      class="progress-fill"
                      :style="{
                        width: getProgress(program.raised, program.goal) + '%',
                      }"
                    ></div>
                  </div>
                  <div class="progress-footer">
                    <p class="progress-note">
                      <i class="bi bi-info-circle"></i>
                      Dự án triển khai khi đủ mục tiêu gây quỹ
                    </p>
                    <RouterLink to="/tinh-nguyen-vien" class="volunteers-badge">
                      <i class="bi bi-people-fill"></i>
                      {{ program.volunteers }} tình nguyện viên
                    </RouterLink>
                  </div>
                </div>

                <!-- Action buttons -->
                <div class="program-actions">
                  <RouterLink :to="program.path" class="btn btn-program">
                    Xem chi tiết
                    <i class="bi bi-arrow-right ms-2"></i>
                  </RouterLink>

                  <!-- Share buttons -->
                  <div class="share-buttons">
                    <span class="share-label">Chia sẻ:</span>
                    <button
                      class="share-btn facebook"
                      @click="shareOnFacebook(program)"
                      title="Chia sẻ lên Facebook"
                    >
                      <i class="bi bi-facebook"></i>
                    </button>
                    <button
                      class="share-btn twitter"
                      @click="shareOnTwitter(program)"
                      title="Chia sẻ lên X (Twitter)"
                    >
                      <i class="bi bi-twitter-x"></i>
                    </button>
                    <button
                      class="share-btn zalo"
                      @click="shareOnZalo(program)"
                      title="Chia sẻ lên Zalo"
                    >
                      <span class="zalo-icon">Z</span>
                    </button>
                    <button
                      class="share-btn copy"
                      @click="copyLink(program)"
                      title="Sao chép liên kết"
                    >
                      <i class="bi bi-link-45deg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="showToast" class="toast-notification">
        <i class="bi bi-check-circle-fill"></i>
        {{ toastMessage }}
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.programs-highlight {
  background-color: var(--color-background-alt);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.header-content {
  flex: 1;
}

.section-label {
  display: inline-block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: var(--spacing-sm);
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.view-more-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: all var(--transition-fast);
  padding-bottom: var(--spacing-sm);
}

.view-more-link:hover {
  color: var(--color-primary-dark);
  transform: translateX(5px);
}

.programs-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.program-item {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.program-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.program-image {
  position: relative;
  height: 100%;
  min-height: 350px;
  overflow: hidden;
}

.program-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.program-item:hover .program-image img {
  transform: scale(1.05);
}

.program-badge {
  position: absolute;
  bottom: var(--spacing-lg);
  left: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: var(--color-text);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.badge-icon {
  width: 32px;
  height: 32px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.badge-text {
  display: flex;
  flex-direction: column;
}

.badge-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-light);
}

.goal-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1.2;
}

/* Progress Section in Content Area */
.fundraising-progress {
  background: linear-gradient(
    135deg,
    rgba(177, 32, 41, 0.05),
    rgba(177, 32, 41, 0.02)
  );
  border: 1px solid rgba(177, 32, 41, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md) var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.raised-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.raised-label strong {
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
}

.progress-percent {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  background: rgba(177, 32, 41, 0.1);
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #e85d68);
  border-radius: var(--radius-full);
  transition: width 1s ease-out;
  position: relative;
}

.progress-fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.progress-note {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  margin: 0;
}

.progress-note i {
  color: var(--color-primary);
  font-size: 12px;
}

.volunteers-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: #fff;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: all 0.2s ease;
}

.volunteers-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  color: #fff;
}

.volunteers-badge i {
  font-size: 14px;
}

.program-content {
  padding: var(--spacing-2xl);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.program-number {
  display: inline-block;
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: rgba(177, 32, 41, 0.1);
  line-height: 1;
  margin-bottom: var(--spacing-sm);
}

.program-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  line-height: 1.3;
}

.program-description {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

.btn-program {
  display: inline-flex;
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color-white) !important;
  font-weight: var(--font-weight-semibold);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-base);
  width: fit-content;
}

.btn-program:hover {
  background-color: var(--color-primary-dark);
  transform: translateX(5px);
}

/* Program Actions */
.program-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

/* Share Buttons */
.share-buttons {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.share-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-right: var(--spacing-xs);
}

.share-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 16px;
}

.share-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.share-btn.facebook {
  background: #1877f2;
  color: white;
}

.share-btn.facebook:hover {
  background: #0d65d9;
}

.share-btn.twitter {
  background: #000000;
  color: white;
}

.share-btn.twitter:hover {
  background: #333333;
}

.share-btn.zalo {
  background: #0068ff;
  color: white;
}

.share-btn.zalo:hover {
  background: #0052cc;
}

.zalo-icon {
  font-weight: 700;
  font-size: 14px;
}

.share-btn.copy {
  background: #6c757d;
  color: white;
}

.share-btn.copy:hover {
  background: #5a6268;
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #28a745;
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: 0 8px 24px rgba(40, 167, 69, 0.3);
  z-index: 9999;
}

.toast-notification i {
  font-size: 18px;
}

/* Toast animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* Responsive */
@media (max-width: 991.98px) {
  .program-image {
    min-height: 250px;
  }

  .program-content {
    padding: var(--spacing-xl);
  }

  .program-title {
    font-size: var(--font-size-xl);
  }

  .program-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .share-buttons {
    margin-top: var(--spacing-sm);
  }
}
</style>
