<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

// Placeholder activities - user will add images later
const activities = [
  {
    id: 1,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/nts.png",
    alt: "Hoạt động 1",
  },
  {
    id: 2,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/pvi.png",
    alt: "Hoạt động 2",
  },
  {
    id: 3,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/pwc.png",
    alt: "Hoạt động 3",
  },
  {
    id: 4,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/thp.png",
    alt: "Hoạt động 4",
  },
  {
    id: 5,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/vvn.png",
    alt: "Hoạt động 5",
  },
  {
    id: 6,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/luatviet.png",
    alt: "Hoạt động 6",
  },
  {
    id: 7,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/vietthuong.png",
    alt: "Hoạt động 7",
  },
  {
    id: 8,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/bravo.png",
    alt: "Hoạt động 8",
  },
  {
    id: 9,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/scb.png",
    alt: "Hoạt động 9",
  },
  {
    id: 10,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/truong-hoang-phat.png",
    alt: "Hoạt động 10",
  },
  {
    id: 11,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/indochine.png",
    alt: "Hoạt động 11",
  },
  {
    id: 12,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/deloitte.png",
    alt: "Hoạt động 12",
  },
  {
    id: 13,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/kamala.png",
    alt: "Hoạt động 13",
  },
  {
    id: 14,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/mia.png",
    alt: "Hoạt động 14",
  },
  {
    id: 15,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/msb.png",
    alt: "Hoạt động 15",
  },
  {
    id: 16,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/scb.png",
    alt: "Hoạt động 16",
  },
];

const modules = [Navigation, Autoplay];

// Custom navigation refs
const prevEl = ref(null);
const nextEl = ref(null);
</script>

<template>
  <section class="activities-slider section-padding">
    <div class="container">
      <div class="section-header text-center mb-5">
        <h2 class="section-title">Các đối tác & Nhà hảo tâm</h2>
      </div>

      <div class="slider-wrapper">
        <!-- Custom Prev Button -->
        <button ref="prevEl" class="nav-btn nav-prev">
          <i class="bi bi-chevron-left"></i>
        </button>

        <!-- Swiper -->
        <div class="swiper-area">
          <Swiper
            :modules="modules"
            :slides-per-view="3"
            :space-between="20"
            :navigation="{
              prevEl: prevEl,
              nextEl: nextEl,
            }"
            :loop="true"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
            }"
            :breakpoints="{
              320: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }"
            class="activities-swiper"
          >
            <SwiperSlide v-for="activity in activities" :key="activity.id">
              <div class="activity-card">
                <div class="activity-image">
                  <img
                    v-if="activity.image"
                    :src="activity.image"
                    :alt="activity.alt"
                  />
                  <div v-else class="image-placeholder">
                    <i class="bi bi-image"></i>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- Custom Next Button -->
        <button ref="nextEl" class="nav-btn nav-next">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.activities-slider {
  background: var(--color-background-alt);
  padding: 80px 0;
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
  font-size: 45px;
  font-weight: var(--font-weight-bold);
  color: #247241;
}

.slider-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.swiper-area {
  flex: 1;
  overflow: hidden;
}

.nav-btn {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--color-text-light);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  color: var(--color-primary);
}

.activity-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-md);
  transition: all var(--transition-base);
}

.activity-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.activity-image {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder i {
  font-size: 2.5rem;
  color: #bbb;
}

/* Responsive */
@media (max-width: 767.98px) {
  .section-title {
    font-size: var(--font-size-2xl);
  }

  .nav-btn {
    width: 30px;
    height: 30px;
    font-size: 1.25rem;
  }

  .image-placeholder i {
    font-size: 1.5rem;
  }
}
</style>
