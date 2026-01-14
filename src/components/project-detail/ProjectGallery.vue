<script setup>
import { ref } from "vue";

defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const lightboxOpen = ref(false);
const currentImageIndex = ref(0);

const openLightbox = (index) => {
  currentImageIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = "";
};

const nextImage = (gallery) => {
  currentImageIndex.value = (currentImageIndex.value + 1) % gallery.length;
};

const prevImage = (gallery) => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + gallery.length) % gallery.length;
};
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

    <div class="gallery-grid">
      <div
        v-for="(image, index) in project.gallery"
        :key="index"
        class="gallery-item"
        @click="openLightbox(index)"
      >
        <img :src="image" :alt="`Ảnh dự án ${index + 1}`" />
        <div class="gallery-overlay">
          <i class="bi bi-zoom-in"></i>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxOpen" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">
          <i class="bi bi-x-lg"></i>
        </button>
        <button
          class="lightbox-nav lightbox-prev"
          @click="prevImage(project.gallery)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="lightbox-content">
          <img
            :src="project.gallery[currentImageIndex]"
            :alt="`Ảnh dự án ${currentImageIndex + 1}`"
          />
          <div class="lightbox-counter">
            {{ currentImageIndex + 1 }} / {{ project.gallery.length }}
          </div>
        </div>
        <button
          class="lightbox-nav lightbox-next"
          @click="nextImage(project.gallery)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </Teleport>
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

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.gallery-overlay i {
  font-size: 2rem;
  color: #fff;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-prev {
  left: var(--spacing-lg);
}

.lightbox-next {
  right: var(--spacing-lg);
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: calc(100vh - 120px);
  object-fit: contain;
  border-radius: var(--radius-md);
}

.lightbox-counter {
  margin-top: var(--spacing-md);
  color: rgba(255, 255, 255, 0.7);
  font-size: var(--font-size-sm);
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .lightbox-nav {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .lightbox-prev {
    left: var(--spacing-sm);
  }

  .lightbox-next {
    right: var(--spacing-sm);
  }
}
</style>
