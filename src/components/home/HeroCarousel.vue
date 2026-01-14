<script setup>
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";

const slides = [
  {
    id: 1,
    title: "Thắp sáng nụ cười,",
    subtitle: "ươm mầm tương lai",
    description:
      "Chúng tôi cam kết 100% minh bạch trong từng khoản đóng góp, mang lại sự hỗ trợ thiết thực nhất cho những mảnh đời khó khăn trên khắp Việt Nam.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80",
    alt: "Hoạt động thiện nguyện",
  },
  {
    id: 2,
    title: "Giáo dục",
    subtitle: "là chìa khóa tương lai",
    description:
      "Hỗ trợ học bổng, xây dựng trường học và cung cấp tài liệu học tập cho học sinh có hoàn cảnh khó khăn.",
    image:
      "https://nld.mediacdn.vn/291774122806476800/2021/8/21/5-hinh-them-1-16295530578591473130841.jpg",
    alt: "Hỗ trợ giáo dục",
  },
  {
    id: 3,
    title: "Sức khỏe",
    subtitle: "cho cộng đồng",
    description:
      "Chương trình khám bệnh, phát thuốc miễn phí và hỗ trợ chi phí điều trị cho những người cần giúp đỡ.",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&q=80",
    alt: "Hoạt động y tế",
  },
];

const carouselRef = ref(null);
let carouselInstance = null;

onMounted(() => {
  // Import Bootstrap Carousel and initialize
  import("bootstrap").then((bootstrap) => {
    if (carouselRef.value) {
      carouselInstance = new bootstrap.Carousel(carouselRef.value, {
        interval: 5000,
        touch: true,
        wrap: true,
        ride: "carousel",
      });
      // Start cycling
      carouselInstance.cycle();
    }
  });
});

const prevSlide = () => {
  if (carouselInstance) {
    carouselInstance.prev();
  }
};

const nextSlide = () => {
  if (carouselInstance) {
    carouselInstance.next();
  }
};
</script>

<template>
  <section class="hero-carousel">
    <div ref="carouselRef" id="heroCarousel" class="carousel slide">
      <!-- Indicators -->
      <div class="carousel-indicators">
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          type="button"
          data-bs-target="#heroCarousel"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0"
          :aria-label="`Slide ${index + 1}`"
        ></button>
      </div>

      <!-- Slides -->
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <!-- Background Image -->
          <div
            class="carousel-bg"
            :style="{ backgroundImage: `url(${slide.image})` }"
          ></div>

          <!-- Overlay -->
          <div class="carousel-overlay"></div>

          <!-- Content -->
          <div class="carousel-caption-custom">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-10 col-xl-8 text-center">
                  <h1 class="carousel-title">
                    {{ slide.title }}<br />
                    <span class="carousel-subtitle">{{ slide.subtitle }}</span>
                  </h1>
                  <p class="carousel-description">
                    {{ slide.description }}
                  </p>
                  <div class="carousel-buttons">
                    <RouterLink to="/gioi-thieu" class="btn btn-learn-more">
                      Tìm hiểu thêm
                    </RouterLink>
                  </div>
                  <!-- Trust Signals -->
                  <div class="trust-signals">
                    <div class="trust-item">
                      <i class="bi bi-file-earmark-check"></i>
                      <span>Công khai sao kê hàng tháng</span>
                    </div>
                    <div class="trust-item">
                      <i class="bi bi-geo-alt-fill"></i>
                      <span>Hoạt động tại Việt Nam từ 2021</span>
                    </div>
                    <div class="trust-item mobile-hide">
                      <i class="bi bi-heart-fill"></i>
                      <span>Đã hỗ trợ 1.000+ hoàn cảnh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls - Hidden by default, show on hover -->
      <button class="carousel-control-prev" type="button" @click="prevSlide">
        <span class="control-icon">
          <i class="bi bi-chevron-left"></i>
        </span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" @click="nextSlide">
        <span class="control-icon">
          <i class="bi bi-chevron-right"></i>
        </span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero-carousel {
  position: relative;
  overflow: hidden;
}

.carousel-item {
  position: relative;
  height: 100vh;
  min-height: 600px;
  max-height: 1000px;
}

.carousel-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.carousel-caption-custom {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 10;
  padding: 0 var(--spacing-md);
}

.carousel-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.carousel-subtitle {
  display: block;
  color: var(--color-white);
}

.carousel-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto var(--spacing-xl);
  line-height: 1.6;
}

.carousel-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.btn-donate-hero {
  background-color: var(--color-primary);
  color: var(--color-white) !important;
  font-weight: var(--font-weight-semibold);
  padding: 1rem 2rem;
  border-radius: var(--radius-full);
  border: none;
  font-size: var(--font-size-lg);
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn-donate-hero:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(177, 32, 41, 0.4);
}

.btn-learn-more {
  background-color: transparent;
  color: var(--color-white) !important;
  font-weight: var(--font-weight-semibold);
  padding: 1rem 2rem;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-white);
  font-size: var(--font-size-lg);
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn-learn-more:hover {
  background-color: var(--color-white);
  color: var(--color-text) !important;
  transform: translateY(-3px);
}

.carousel-indicators {
  margin-bottom: 2rem;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 6px;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  transition: all var(--transition-base);
}

.carousel-indicators button.active {
  background-color: var(--color-primary);
  transform: scale(1.2);
}

/* Carousel Controls - Hidden by default, show on hover */
.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  background: none;
  border: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 20;
  cursor: pointer;
  padding: 0;
}

.carousel-control-prev {
  left: 20px;
}

.carousel-control-next {
  right: 20px;
}

.hero-carousel:hover .carousel-control-prev,
.hero-carousel:hover .carousel-control-next {
  opacity: 1;
}

.control-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.control-icon i {
  font-size: 1rem;
  color: var(--color-white);
}

.carousel-control-prev:hover .control-icon,
.carousel-control-next:hover .control-icon {
  background: rgba(255, 255, 255, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-item {
    height: 80vh;
    min-height: 500px;
  }

  .carousel-title {
    display: none;
  }

  .btn-donate-hero,
  .btn-learn-more {
    padding: 0.75rem 1.5rem;
    font-size: var(--font-size-base);
  }

  /* Hide controls on mobile - use swipe instead */
  .carousel-control-prev,
  .carousel-control-next {
    display: none;
  }

  /* Trust signals mobile - chỉ hiện 2 ý, xếp dọc */
  .trust-signals {
    flex-direction: column;
    gap: 0.5rem;
  }

  .trust-item.mobile-hide {
    display: none;
  }
}

/* Trust Signals */
.trust-signals {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
}

.trust-item i {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.trust-item span {
  font-weight: 500;
}
</style>
