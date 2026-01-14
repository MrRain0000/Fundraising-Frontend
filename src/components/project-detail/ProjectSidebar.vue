<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import DonationModal from "@/components/common/DonationModal.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

// Donation Modal state
const showDonationModal = ref(false);

const openDonationModal = () => {
  showDonationModal.value = true;
};

const closeDonationModal = () => {
  showDonationModal.value = false;
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Project duration
const projectDuration = computed(() => {
  if (!props.project.startDate) return "";
  const start = formatDate(props.project.startDate);
  const end = props.project.endDate
    ? formatDate(props.project.endDate)
    : "Đang thực hiện";
  return `${start} - ${end}`;
});
</script>

<template>
  <aside class="project-sidebar">
    <!-- Organizer Info -->
    <div class="sidebar-card organizer-card">
      <div class="organizer-header">
        <img
          :src="
            project.organizer?.logo ||
            'https://littlerosesfoundation.org/wp-content/uploads/2022/08/df.png'
          "
          :alt="project.organizer?.name || 'Quỹ Bông Hồng Nhỏ'"
          class="organizer-logo"
        />
        <div class="organizer-info">
          <span class="organizer-label">Đơn vị thực hiện</span>
          <h4 class="organizer-name">
            {{ project.organizer?.name || "Quỹ Bông Hồng Nhỏ" }}
          </h4>
        </div>
      </div>
      <div class="organizer-verified">
        <i class="bi bi-patch-check-fill"></i>
        Đã xác thực
      </div>
    </div>

    <!-- Project Info -->
    <div class="sidebar-card info-card">
      <h4 class="card-title">Thông tin dự án</h4>
      <ul class="info-list">
        <li>
          <i class="bi bi-geo-alt"></i>
          <div>
            <span class="info-label">Địa điểm</span>
            <span class="info-value">{{ project.location }}</span>
          </div>
        </li>
        <li>
          <i class="bi bi-calendar-event"></i>
          <div>
            <span class="info-label">Thời gian</span>
            <span class="info-value">{{ projectDuration }}</span>
          </div>
        </li>
        <li v-if="project.status === 'active'">
          <i class="bi bi-hourglass-split"></i>
          <div>
            <span class="info-label">Còn lại</span>
            <span class="info-value info-highlight"
              >{{ project.daysLeft }} ngày</span
            >
          </div>
        </li>
        <li v-else>
          <i class="bi bi-check-circle-fill"></i>
          <div>
            <span class="info-label">Hoàn thành</span>
            <span class="info-value info-success">{{
              project.completedDate
            }}</span>
          </div>
        </li>
        <li>
          <i class="bi bi-people"></i>
          <div>
            <span class="info-label">Lượt đóng góp</span>
            <span class="info-value"
              >{{ project.donorCount?.toLocaleString() || 0 }} người</span
            >
          </div>
        </li>
        <li>
          <i class="bi bi-tag"></i>
          <div>
            <span class="info-label">Danh mục</span>
            <span class="info-value">{{ project.tagLabel }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- CTA Button -->
    <div class="sidebar-card cta-card">
      <button
        v-if="project.status === 'active'"
        class="btn-donate"
        @click="openDonationModal"
      >
        <i class="bi bi-heart-fill"></i>
        Quyên góp ngay
      </button>
      <div v-else class="completed-message">
        <i class="bi bi-check-circle-fill"></i>
        <span>Dự án đã hoàn thành</span>
        <p>Cảm ơn tất cả các nhà hảo tâm đã đóng góp!</p>
      </div>

      <div class="share-section">
        <span class="share-label">Chia sẻ dự án</span>
        <div class="share-buttons">
          <button class="share-btn facebook">
            <i class="bi bi-facebook"></i>
          </button>
          <button class="share-btn twitter">
            <i class="bi bi-twitter-x"></i>
          </button>
          <button class="share-btn copy">
            <i class="bi bi-link-45deg"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Donation Modal -->
    <DonationModal
      :show="showDonationModal"
      :projectSlug="project.slug"
      :projectTitle="project.title"
      @close="closeDonationModal"
    />
  </aside>
</template>

<style scoped>
.project-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  position: sticky;
  top: 100px;
}

.sidebar-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

/* Organizer Card */
.organizer-card {
  border: 2px solid var(--color-background-alt);
}

.organizer-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.organizer-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: var(--radius-md);
  background: var(--color-background-alt);
  padding: var(--spacing-xs);
}

.organizer-info {
  flex: 1;
}

.organizer-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  display: block;
}

.organizer-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
}

.organizer-verified {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: var(--spacing-sm);
  background: rgba(25, 135, 84, 0.1);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #198754;
}

/* Info Card */
.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0 0 var(--spacing-md) 0;
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-background-alt);
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.info-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.info-list li i {
  font-size: 1.2rem;
  color: var(--color-primary);
  margin-top: 2px;
}

.info-list li div {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.info-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.info-highlight {
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}

.info-success {
  color: #198754;
  font-weight: var(--font-weight-bold);
}

/* CTA Card */
.btn-donate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-donate:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  color: #fff;
}

.completed-message {
  text-align: center;
  padding: var(--spacing-md);
  background: rgba(25, 135, 84, 0.1);
  border-radius: var(--radius-md);
}

.completed-message i {
  font-size: 2rem;
  color: #198754;
  display: block;
  margin-bottom: var(--spacing-sm);
}

.completed-message span {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: #198754;
  display: block;
}

.completed-message p {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin: var(--spacing-sm) 0 0;
}

.share-section {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-background-alt);
}

.share-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  display: block;
  margin-bottom: var(--spacing-sm);
}

.share-buttons {
  display: flex;
  gap: var(--spacing-sm);
}

.share-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-background-alt);
  background: var(--color-white);
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.share-btn.facebook:hover {
  background: #1877f2;
  border-color: #1877f2;
  color: #fff;
}

.share-btn.twitter:hover {
  background: #000;
  border-color: #000;
  color: #fff;
}
</style>
