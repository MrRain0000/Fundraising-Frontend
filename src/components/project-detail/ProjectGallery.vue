<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const currentImageIndex = ref(0);
const isAutoPlaying = ref(true);
const autoPlayInterval = ref(null);
const progressIntervals = ref([]);
const imageLikes = ref([]);

// Auto-play duration for each image (7 seconds)
const AUTO_PLAY_DURATION = 7000;

// Initialize like states for all images
const initializeLikes = () => {
  if (props.project.gallery) {
    imageLikes.value = new Array(props.project.gallery.length).fill(false);
  }
};

const toggleLike = () => {
  if (imageLikes.value[currentImageIndex.value] !== undefined) {
    imageLikes.value[currentImageIndex.value] = !imageLikes.value[currentImageIndex.value];
  }
};

const isCurrentImageLiked = computed(() => {
  return imageLikes.value[currentImageIndex.value] || false;
});

const shareImage = async () => {
  const currentImage = props.project.gallery[currentImageIndex.value];
  const shareData = {
    title: `${props.project.title} - Ảnh ${currentImageIndex.value + 1}`,
    text: `Xem ảnh ${currentImageIndex.value + 1} của dự án "${props.project.title}" tại Quỹ Bông Hồng Nhỏ`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback: Copy link to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert(`Đã sao chép link ảnh ${currentImageIndex.value + 1} vào clipboard!`);
    }
  } catch (err) {
    console.log('Error sharing:', err);
  }
};

const startAutoPlay = () => {
  if (!props.project.gallery || props.project.gallery.length <= 1) return;
  
  stopAutoPlay();
  isAutoPlaying.value = true;
  
  autoPlayInterval.value = setInterval(() => {
    nextImage();
  }, AUTO_PLAY_DURATION);
};

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
  isAutoPlaying.value = false;
};

const toggleAutoPlay = () => {
  if (isAutoPlaying.value) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
};

const nextImage = () => {
  if (!props.project.gallery) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % props.project.gallery.length;
};

const prevImage = () => {
  if (!props.project.gallery) return;
  currentImageIndex.value =
    (currentImageIndex.value - 1 + props.project.gallery.length) % props.project.gallery.length;
};

const goToImage = (index) => {
  currentImageIndex.value = index;
  // Restart auto-play when manually changing image
  if (isAutoPlaying.value) {
    startAutoPlay();
  }
};

// Watch for image changes to restart auto-play timer
watch(currentImageIndex, () => {
  if (isAutoPlaying.value) {
    startAutoPlay();
  }
});

onMounted(() => {
  initializeLikes();
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <section v-if="project.gallery?.length" class="gallery-section">
    <div class="section-header">
      <h2 class="section-title">
        <i class="bi bi-images"></i>
        Hình ảnh dự án
      </h2>
      <span class="gallery-count">{{ project.gallery.length }} ảnh</span>
    </div>

    <!-- Story-style Gallery -->
    <div class="story-gallery">
      <!-- Progress bars at top -->
      <div class="progress-bars">
        <div
          v-for="(image, index) in project.gallery"
          :key="index"
          class="progress-bar-item"
        >
          <div
            class="progress-bar-fill"
            :class="{ 
              active: index === currentImageIndex,
              completed: index < currentImageIndex 
            }"
          ></div>
        </div>
      </div>

      <!-- Main image display -->
      <div class="image-container">
        <!-- Navigation buttons -->
        <button
          v-if="project.gallery.length > 1"
          class="nav-button nav-prev"
          @click="prevImage"
          aria-label="Previous image"
        >
          <i class="bi bi-chevron-left"></i>
        </button>

        <div class="main-image">
          <img
            :src="project.gallery[currentImageIndex]"
            :alt="`Ảnh dự án ${currentImageIndex + 1}`"
          />
        </div>

        <button
          v-if="project.gallery.length > 1"
          class="nav-button nav-next"
          @click="nextImage"
          aria-label="Next image"
        >
          <i class="bi bi-chevron-right"></i>
        </button>

        <!-- Auto-play toggle -->
        <button
          v-if="project.gallery.length > 1"
          class="autoplay-toggle"
          @click="toggleAutoPlay"
          :aria-label="isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'"
        >
          <i :class="isAutoPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
        </button>
      </div>

      <!-- Image counter -->
      <div class="image-counter">
        {{ currentImageIndex + 1 }} / {{ project.gallery.length }}
      </div>

      <!-- Image caption -->
      <div class="image-caption">
        {{ project.title }}
      </div>

      <!-- Action buttons -->
      <div class="action-buttons">
        <button 
          class="action-btn like-btn"
          @click="toggleLike"
          :class="{ liked: isCurrentImageLiked }"
          aria-label="Yêu thích ảnh này"
        >
          <i :class="isCurrentImageLiked ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
          <span>{{ isCurrentImageLiked ? 'Đã thích' : 'Yêu thích' }}</span>
        </button>
        <button 
          class="action-btn share-btn"
          @click="shareImage"
          aria-label="Chia sẻ ảnh này"
        >
          <i class="bi bi-share"></i>
          <span>Chia sẻ</span>
        </button>
      </div>

      <!-- Thumbnail navigation (optional) -->
      <div v-if="project.gallery.length > 1" class="thumbnail-nav">
        <button
          v-for="(image, index) in project.gallery"
          :key="index"
          class="thumbnail-dot"
          :class="{ active: index === currentImageIndex }"
          @click="goToImage(index)"
          :aria-label="`Go to image ${index + 1}`"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-section {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 2px solid var(--color-background-alt);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
}

.section-title i {
  color: var(--color-primary);
  font-size: 1.3rem;
}

.gallery-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  background: var(--color-background-alt);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
}

/* Story Gallery Styles */
.story-gallery {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Progress bars */
.progress-bars {
  display: flex;
  gap: 6px;
  height: 3px;
}

.progress-bar-item {
  flex: 1;
  background: rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  width: 0;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

.progress-bar-fill.completed {
  width: 100%;
}

.progress-bar-fill.active {
  animation: fillProgress 7s linear forwards;
}

@keyframes fillProgress {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Image container */
.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-background-alt);
}

.main-image {
  width: 100%;
  height: 100%;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

/* Navigation buttons */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-text);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  z-index: 10;
}

.nav-button:hover {
  background: var(--color-white);
  transform: translateY(-50%) scale(1.1);
}

.nav-prev {
  left: var(--spacing-md);
}

.nav-next {
  right: var(--spacing-md);
}

/* Auto-play toggle */
.autoplay-toggle {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: var(--color-white);
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.autoplay-toggle:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

/* Image counter */
.image-counter {
  text-align: center;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

/* Image caption */
.image-caption {
  text-align: center;
  font-size: var(--font-size-base);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
}

/* Action buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  border: 1px solid var(--color-background-alt);
  background: var(--color-white);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.like-btn i {
  font-size: 1.1rem;
  transition: all var(--transition-fast);
}

.like-btn.liked {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.like-btn.liked i {
  color: var(--color-primary);
  animation: heartBeat 0.3s ease;
}

@keyframes heartBeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

.share-btn:hover {
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

/* Thumbnail navigation */
.thumbnail-nav {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: var(--spacing-sm);
}

.thumbnail-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: var(--color-background-alt);
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
}

.thumbnail-dot:hover {
  background: rgba(220, 38, 38, 0.5);
  transform: scale(1.2);
}

.thumbnail-dot.active {
  background: var(--color-primary);
  width: 24px;
  border-radius: var(--radius-full);
}

/* Responsive */
@media (max-width: 768px) {
  .image-container {
    aspect-ratio: 4/3;
  }

  .nav-button {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .nav-prev {
    left: var(--spacing-sm);
  }

  .nav-next {
    right: var(--spacing-sm);
  }

  .autoplay-toggle {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }

  .image-counter {
    font-size: var(--font-size-base);
  }

  .image-caption {
    font-size: var(--font-size-sm);
    padding: 0 var(--spacing-sm);
  }

  .action-buttons {
    gap: var(--spacing-sm);
  }

  .action-btn {
    font-size: var(--font-size-xs);
    padding: 6px var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .progress-bars {
    gap: 4px;
    height: 2px;
  }

  .nav-button {
    width: 30px;
    height: 30px;
    font-size: 0.9rem;
  }
}
</style>
