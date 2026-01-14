<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Fake donors data
const donors = [
  {
    id: 1,
    name: "Đặng Văn Hải",
    amount: "2,500,000",
    time: "Vừa xong",
    initial: "Đ",
    color: "purple",
  },
  {
    id: 2,
    name: "Huỳnh Thị Mai",
    amount: "1,200,000",
    time: "1 phút trước",
    initial: "H",
    color: "blue",
  },
  {
    id: 3,
    name: "Bùi Văn Sơn",
    amount: "7,000,000",
    time: "2 phút trước",
    initial: "B",
    color: "orange",
  },
  {
    id: 4,
    name: "Nguyễn Văn An",
    amount: "5,000,000",
    time: "5 phút trước",
    initial: "N",
    color: "teal",
  },
  {
    id: 5,
    name: "Trần Thị Bích",
    amount: "2,000,000",
    time: "10 phút trước",
    initial: "T",
    color: "pink",
  },
  {
    id: 6,
    name: "Lê Thị Mai",
    amount: "200,000",
    time: "15 phút trước",
    initial: "L",
    color: "green",
  },
  {
    id: 7,
    name: "Công ty TNHH ABC",
    amount: "50,000,000",
    time: "20 phút trước",
    initial: "C",
    color: "indigo",
  },
  {
    id: 8,
    name: "Nhà hảo tâm ẩn danh",
    amount: "1,000,000",
    time: "30 phút trước",
    initial: "?",
    color: "gray",
  },
];

const stats = [
  { icon: "bi-people-fill", value: "5,000+", label: "Trẻ em hỗ trợ" },
  { icon: "bi-check-circle-fill", value: "120", label: "Dự án hoàn thành" },
  { icon: "bi-geo-alt-fill", value: "25", label: "Tỉnh thành" },
];

const totalDonation = "5.560.875.448";
const currentYear = 2025;
</script>

<template>
  <section class="donation-stats-section">
    <div class="container">
      <div class="donation-wrapper">
        <div class="row g-4 align-items-stretch">
          <!-- Left: Total Donation -->
          <div class="col-lg-7">
            <div class="total-box">
              <!-- Main Amount -->
              <div class="amount-section">
                <div class="amount-header">
                  <span class="header-text"
                    >Tổng tiền quyên góp {{ currentYear }}</span
                  >
                </div>
                <h2 class="amount-value">
                  <span class="amount-main">5.560</span
                  ><span class="amount-highlight">.875.448</span>
                  <span class="amount-currency">VND</span>
                </h2>
                <p class="amount-label">TỔNG CỘNG</p>
              </div>

              <!-- Stats Grid -->
              <div class="stats-grid">
                <div v-for="stat in stats" :key="stat.label" class="stat-card">
                  <div class="stat-icon">
                    <i :class="`bi ${stat.icon}`"></i>
                  </div>
                  <p class="stat-value">{{ stat.value }}</p>
                  <p class="stat-label">{{ stat.label }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Donors List -->
          <div class="col-lg-5">
            <div class="donors-box">
              <div class="donors-header">
                <div class="header-left">
                  <i class="bi bi-people-fill"></i>
                  <span>Nhà hảo tâm gần đây</span>
                </div>
                <div class="live-badge">
                  <span class="pulse-dot"></span>
                  <span>Trực tuyến</span>
                </div>
              </div>

              <div class="donors-scroll-container">
                <div class="donors-scroll-content">
                  <!-- First set -->
                  <div
                    v-for="donor in donors"
                    :key="donor.id"
                    class="donor-item"
                  >
                    <div class="donor-avatar" :class="`avatar-${donor.color}`">
                      {{ donor.initial }}
                    </div>
                    <div class="donor-info">
                      <p class="donor-name">{{ donor.name }}</p>
                      <p class="donor-time">{{ donor.time }}</p>
                    </div>
                    <div class="donor-amount">{{ donor.amount }} VND</div>
                  </div>
                  <!-- Duplicate for seamless loop -->
                  <div
                    v-for="donor in donors"
                    :key="`dup-${donor.id}`"
                    class="donor-item"
                  >
                    <div class="donor-avatar" :class="`avatar-${donor.color}`">
                      {{ donor.initial }}
                    </div>
                    <div class="donor-info">
                      <p class="donor-name">{{ donor.name }}</p>
                      <p class="donor-time">{{ donor.time }}</p>
                    </div>
                    <div class="donor-amount">{{ donor.amount }} VND</div>
                  </div>
                </div>
              </div>

              <div class="donors-footer">
                <a href="/thong-ke-quyen-gop" class="view-all-link">
                  Xem tất cả đóng góp
                  <i class="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.donation-stats-section {
  background-color: var(--color-white);
  padding: var(--spacing-2xl) 0;
  border-bottom: 1px solid #f0f0f0;
}

.donation-wrapper {
  /* No extra wrapper styling needed */
}

/* Left: Total Box */
.total-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.amount-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  padding: 100px;
}

.amount-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.header-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.amount-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-sm);
}

.amount-main {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-weight-bold);
  color: #c62828;
  letter-spacing: -1px;
}

.amount-highlight {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-weight-bold);
  color: #c62828;
  letter-spacing: -1px;
}

.amount-currency {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-light);
  margin-left: var(--spacing-xs);
}

.amount-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 0;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.stat-card {
  background: #f8f9fa;
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  transition: all var(--transition-base);
  border: 1px solid transparent;
}

.stat-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.stat-icon {
  color: var(--color-primary);
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-light);
  text-transform: uppercase;
  margin-bottom: 0;
}

/* Right: Donors Box */
.donors-box {
  background: var(--color-white);
  border: 1px solid #e5e5e5;
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 550px;
  min-height: 600px;
  box-shadow: var(--shadow-md);
}

.donors-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: #f8f9fa;
  border-bottom: 1px solid #e5e5e5;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.header-left i {
  color: var(--color-primary);
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: var(--color-white);
  border-radius: var(--radius-full);
  border: 1px solid #e5e5e5;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: #16a34a;
}

.pulse-dot {
  position: relative;
  width: 8px;
  height: 8px;
}

.pulse-dot::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.pulse-dot::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #22c55e;
  border-radius: 50%;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Donors Scroll */
.donors-scroll-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.donors-scroll-content {
  animation: scrollUp 20s linear infinite;
}

@keyframes scrollUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.donors-scroll-container:hover .donors-scroll-content {
  animation-play-state: paused;
}

.donor-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid #f0f0f0;
  transition: background var(--transition-fast);
}

.donor-item:hover {
  background: #f8f9fa;
}

.donor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  flex-shrink: 0;
}

.avatar-purple {
  background: #f3e8ff;
  color: #9333ea;
}
.avatar-blue {
  background: #dbeafe;
  color: #2563eb;
}
.avatar-orange {
  background: #ffedd5;
  color: #ea580c;
}
.avatar-teal {
  background: #ccfbf1;
  color: #0d9488;
}
.avatar-pink {
  background: #fce7f3;
  color: #db2777;
}
.avatar-green {
  background: #dcfce7;
  color: #16a34a;
}
.avatar-indigo {
  background: #e0e7ff;
  color: #4f46e5;
}
.avatar-gray {
  background: #f3f4f6;
  color: #6b7280;
}

.donor-info {
  flex: 1;
  min-width: 0;
}

.donor-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  margin-bottom: 2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.donor-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0;
}

.donor-amount {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.donors-footer {
  padding: var(--spacing-md);
  text-align: center;
  background: #f8f9fa;
  border-top: 1px solid #e5e5e5;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: gap var(--transition-fast);
}

.view-all-link:hover {
  gap: var(--spacing-sm);
}

/* Responsive */
@media (max-width: 991.98px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .amount-section {
    padding: 45px;
  }
  .amount-main,
  .amount-highlight {
    font-size: 2rem;
  }

  .amount-currency {
    font-size: 1.25rem;
  }

  .donors-box {
    min-height: 350px;
  }
}

@media (max-width: 575.98px) {
  .stat-card {
    padding: var(--spacing-md);
  }

  .stat-value {
    font-size: var(--font-size-xl);
  }
}
</style>
