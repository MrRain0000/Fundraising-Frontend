<script setup>
import { ref } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const copied = ref(false);

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Share functions
const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    "_blank",
    "width=600,height=400"
  );
};

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(props.project.title);
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    "_blank",
    "width=600,height=400"
  );
};

const shareToLinkedIn = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    "_blank",
    "width=600,height=400"
  );
};

const shareToZalo = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://zalo.me/share?url=${url}`, "_blank");
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};
</script>

<template>
  <section class="project-header-section">
    <div class="container">
      <!-- Title -->
      <h1 class="project-title">{{ project.title }}</h1>

      <!-- Short Description -->
      <p class="project-subtitle">{{ project.shortDescription }}</p>

      <!-- Author & Date Info -->
      <div class="project-meta">
        <div class="author-info">
          <img
            :src="
              project.organizer?.logo ||
              'https://littlerosesfoundation.org/wp-content/uploads/2022/09/Asset-1.png'
            "
            :alt="project.organizer?.name || 'Quỹ Bông Hồng Nhỏ'"
            class="author-avatar"
          />
          <div class="author-details">
            <span class="author-name">{{
              project.organizer?.name || "Quỹ Bông Hồng Nhỏ"
            }}</span>
          </div>
        </div>
        <div class="date-info">
          <i class="bi bi-calendar3"></i>
          <span>{{ formatDate(project.startDate) }}</span>
        </div>
        <!-- Days Remaining Badge -->
        <div v-if="project.status === 'active'" class="days-remaining">
          <i class="bi bi-hourglass-split"></i>
          <span>Còn {{ project.daysLeft }} ngày</span>
        </div>
        <div v-else class="completed-badge">
          <i class="bi bi-check-circle-fill"></i>
          <span>Đã hoàn thành {{ project.completedDate }}</span>
        </div>
      </div>

      <!-- Share Section -->
      <div class="share-section">
        <div class="share-label">
          <i class="bi bi-share"></i>
          <span>Chia sẻ dự án:</span>
        </div>
        <div class="share-buttons">
          <button class="share-btn facebook" @click="shareToFacebook">
            <i class="bi bi-facebook"></i>
            <span>Facebook</span>
          </button>
          <button class="share-btn twitter" @click="shareToTwitter">
            <i class="bi bi-twitter-x"></i>
            <span>Twitter</span>
          </button>
          <button class="share-btn linkedin" @click="shareToLinkedIn">
            <i class="bi bi-linkedin"></i>
            <span>LinkedIn</span>
          </button>
          <button class="share-btn zalo" @click="shareToZalo">
            <span class="zalo-icon">Z</span>
            <span>Zalo</span>
          </button>
          <button class="share-btn copy" @click="copyLink">
            <i class="bi bi-clipboard"></i>
            <span>{{ copied ? "Đã sao chép!" : "Sao chép link" }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-header-section {
  background: var(--color-white);
  padding: var(--spacing-2xl) 0;
  border-bottom: 1px solid var(--color-background-alt);
}

.project-title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  color: #2a7050;
  line-height: 1.3;
  margin: 0 0 var(--spacing-md) 0;
  max-width: 900px;
}

.project-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  line-height: 1.7;
  margin: 0 0 var(--spacing-xl) 0;
  max-width: 800px;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-background-alt);
}

.author-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-background-alt);
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.date-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.date-info i {
  font-size: 1rem;
}

.days-remaining {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(177, 32, 41, 0.1);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.days-remaining i {
  font-size: 0.9rem;
}

.completed-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(25, 135, 84, 0.1);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #198754;
}

.completed-badge i {
  font-size: 0.9rem;
}

/* Share Section */
.share-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.share-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-base);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.share-label i {
  font-size: 1.2rem;
}

.share-buttons {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-background-alt);
  background: var(--color-white);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.share-btn:hover {
  border-color: var(--color-text-muted);
  background: var(--color-background-alt);
}

.share-btn i {
  font-size: 1rem;
}

.share-btn.facebook:hover {
  border-color: #1877f2;
  color: #1877f2;
  background: rgba(24, 119, 242, 0.05);
}

.share-btn.twitter:hover {
  border-color: #000;
  color: #000;
  background: rgba(0, 0, 0, 0.05);
}

.share-btn.linkedin:hover {
  border-color: #0077b5;
  color: #0077b5;
  background: rgba(0, 119, 181, 0.05);
}

.share-btn.zalo:hover {
  border-color: #0068ff;
  color: #0068ff;
  background: rgba(0, 104, 255, 0.05);
}

.share-btn.copy:hover {
  border-color: #198754;
  color: #198754;
  background: rgba(25, 135, 84, 0.05);
}

.zalo-icon {
  font-weight: var(--font-weight-bold);
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .project-title {
    font-size: 1.75rem;
  }

  .project-subtitle {
    font-size: var(--font-size-base);
  }

  .project-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .share-section {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .share-buttons {
    width: 100%;
  }

  .share-btn {
    flex: 1;
    justify-content: center;
    min-width: auto;
  }

  .share-btn span:not(.zalo-icon) {
    display: none;
  }

  .share-btn {
    padding: 10px;
  }
}
</style>
