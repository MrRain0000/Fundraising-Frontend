<script setup>
import { ref } from "vue";

const isPlaying = ref(false);

const playVideo = () => {
  isPlaying.value = true;
};
</script>

<template>
  <section class="video-section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">
          <i class="bi bi-play-circle"></i>
          Video giới thiệu
        </span>
        <h2 class="section-title">Câu chuyện của chúng tôi</h2>
        <p class="section-desc">
          Hãy cùng lắng nghe những câu chuyện đầy cảm hứng về hành trình mang
          yêu thương đến với những mảnh đời khó khăn trên khắp Việt Nam.
        </p>
      </div>

      <div class="video-container">
        <!-- Thumbnail with Play Button -->
        <div v-if="!isPlaying" class="video-thumbnail" @click="playVideo">
          <img
            :src="`https://littlerosesfoundation.org/wp-content/uploads/2023/03/cover-lrf-ra-mat-1.jpg`"
            alt="Video thumbnail"
            class="thumbnail-img"
          />
          <div class="play-overlay">
            <button class="play-button" aria-label="Phát video">
              <i class="bi bi-play-fill"></i>
            </button>
          </div>
          <div class="video-duration">
            <i class="bi bi-clock"></i>
            5:32
          </div>
        </div>

        <!-- YouTube Embed -->
        <div v-else class="video-embed">
          <iframe
            :src="`https://www.youtube.com/embed/N93L_Ibeelk?autoplay=1&rel=0`"
            title="Video giới thiệu Quỹ Bông Hồng Nhỏ"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Video Features -->
      <div class="video-features">
        <div class="feature-item">
          <div class="feature-icon">
            <i class="bi bi-heart-fill"></i>
          </div>
          <div class="feature-text">
            <h4>1.000+ hoàn cảnh</h4>
            <p>Đã được hỗ trợ</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <div class="feature-text">
            <h4>20+ tỉnh thành</h4>
            <p>Trên khắp Việt Nam</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <i class="bi bi-people-fill"></i>
          </div>
          <div class="feature-text">
            <h4>500+ tình nguyện viên</h4>
            <p>Đồng hành cùng chúng tôi</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-section {
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
  padding: var(--spacing-3xl) 0;
  position: relative;
  overflow: hidden;
}

.video-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(
    180deg,
    rgba(177, 32, 41, 0.03) 0%,
    transparent 100%
  );
  pointer-events: none;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  position: relative;
  z-index: 1;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  background: rgba(177, 32, 41, 0.1);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-md);
}

.section-badge i {
  font-size: 1rem;
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0 0 var(--spacing-sm) 0;
  line-height: 1.2;
}

.section-desc {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Video Container */
.video-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto var(--spacing-2xl);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1);
}

.video-thumbnail {
  position: relative;
  cursor: pointer;
  aspect-ratio: 16 / 9;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.video-thumbnail:hover .thumbnail-img {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  transition: background 0.3s ease;
}

.video-thumbnail:hover .play-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.play-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-primary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(177, 32, 41, 0.4);
}

.play-button i {
  font-size: 2.5rem;
  color: #fff;
  margin-left: 4px;
}

.play-button:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 40px rgba(177, 32, 41, 0.5);
}

.video-duration {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* Video Embed */
.video-embed {
  position: relative;
  aspect-ratio: 16 / 9;
}

.video-embed iframe {
  width: 100%;
  height: 100%;
}

/* Video Features */
.video-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  max-width: 800px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff5f5 0%, #ffe5e7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon i {
  font-size: 1.25rem;
  color: var(--color-primary);
}

.feature-text h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0 0 2px 0;
}

.feature-text p {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin: 0;
}

/* Responsive */
@media (max-width: 991.98px) {
  .video-features {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-md);
  }

  .feature-item {
    flex-direction: column;
    text-align: center;
    padding: var(--spacing-md);
  }
}

@media (max-width: 767.98px) {
  .video-section {
    padding: var(--spacing-2xl) 0;
  }

  .section-title {
    font-size: var(--font-size-2xl);
  }

  .section-desc {
    font-size: var(--font-size-base);
  }

  .play-button {
    width: 60px;
    height: 60px;
  }

  .play-button i {
    font-size: 1.75rem;
  }

  .video-features {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  .feature-item {
    flex-direction: row;
    text-align: left;
  }

  .feature-icon {
    width: 44px;
    height: 44px;
  }
}
</style>
