<script setup>
import { ref } from "vue";

const testimonials = ref([
  {
    id: 1,
    name: "Nguyễn Thị Mai",
    role: "Tình nguyện viên",
    organization: "Đại học Y Hà Nội",
    avatar: "M",
    color: "#ec4899",
    quote:
      "Tham gia cùng Quỹ Bông Hồng Nhỏ là trải nghiệm tuyệt vời nhất trong đời sinh viên của tôi. Được tận mắt chứng kiến nụ cười của các em nhỏ vùng cao khi nhận được sách vở mới, tôi cảm thấy mọi nỗ lực đều xứng đáng.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: 2,
    name: "Trần Văn Hùng",
    role: "Bác sĩ tình nguyện",
    organization: "Bệnh viện Nhi Trung ương",
    avatar: "H",
    color: "#3b82f6",
    quote:
      "Với vai trò bác sĩ, tôi rất trân trọng cơ hội được khám bệnh miễn phí cho các bé vùng sâu vùng xa. Sự chuyên nghiệp và tận tâm của đội ngũ Quỹ khiến tôi tin tưởng và gắn bó suốt 3 năm qua.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: 3,
    name: "Lê Hoàng Anh",
    role: "Nhà tài trợ",
    organization: "Công ty TNHH ABC",
    avatar: "A",
    color: "#10b981",
    quote:
      "Chúng tôi lựa chọn Quỹ Bông Hồng Nhỏ vì sự minh bạch tài chính và báo cáo chi tiết sau mỗi đợt quyên góp. Đây là đối tác đáng tin cậy để doanh nghiệp thực hiện trách nhiệm xã hội.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  },
  {
    id: 4,
    name: "Phạm Minh Tú",
    role: "Phụ huynh thụ hưởng",
    organization: "Hà Giang",
    avatar: "T",
    color: "#f59e0b",
    quote:
      "Con tôi được nhận học bổng từ Quỹ, giờ cháu đã là sinh viên năm thứ 2 Đại học Bách Khoa. Gia đình tôi mãi biết ơn những tấm lòng hảo tâm đã giúp con có cơ hội học tập.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
]);

const currentIndex = ref(0);

const nextTestimonial = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length;
};

const prevTestimonial = () => {
  currentIndex.value =
    (currentIndex.value - 1 + testimonials.value.length) %
    testimonials.value.length;
};

const goToTestimonial = (index) => {
  currentIndex.value = index;
};
</script>

<template>
  <section class="testimonials-section">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">
          <i class="bi bi-chat-quote-fill"></i>
          Cảm nhận
        </span>
        <h2>Họ nói gì về chúng tôi?</h2>
        <p>Chia sẻ từ tình nguyện viên, nhà tài trợ và người thụ hưởng</p>
      </div>

      <div class="testimonials-wrapper">
        <!-- Main testimonial card -->
        <div class="testimonial-card">
          <div class="quote-icon">
            <i class="bi bi-quote"></i>
          </div>

          <div class="testimonial-content">
            <p class="testimonial-quote">
              "{{ testimonials[currentIndex].quote }}"
            </p>

            <div class="testimonial-author">
              <div
                class="author-avatar"
                :style="{ background: testimonials[currentIndex].color }"
              >
                <img
                  v-if="testimonials[currentIndex].image"
                  :src="testimonials[currentIndex].image"
                  :alt="testimonials[currentIndex].name"
                />
                <span v-else>{{ testimonials[currentIndex].avatar }}</span>
              </div>
              <div class="author-info">
                <h5>{{ testimonials[currentIndex].name }}</h5>
                <p>
                  {{ testimonials[currentIndex].role }} •
                  {{ testimonials[currentIndex].organization }}
                </p>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="testimonial-nav">
            <button class="nav-btn" @click="prevTestimonial">
              <i class="bi bi-chevron-left"></i>
            </button>
            <div class="nav-dots">
              <button
                v-for="(_, index) in testimonials"
                :key="index"
                class="nav-dot"
                :class="{ active: index === currentIndex }"
                @click="goToTestimonial(index)"
              ></button>
            </div>
            <button class="nav-btn" @click="nextTestimonial">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- Thumbnail previews -->
        <div class="testimonial-thumbnails">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            class="thumbnail"
            :class="{ active: index === currentIndex }"
            @click="goToTestimonial(index)"
          >
            <div
              class="thumbnail-avatar"
              :style="{ background: testimonial.color }"
            >
              <img
                v-if="testimonial.image"
                :src="testimonial.image"
                :alt="testimonial.name"
              />
              <span v-else>{{ testimonial.avatar }}</span>
            </div>
            <div class="thumbnail-info">
              <span class="thumbnail-name">{{ testimonial.name }}</span>
              <span class="thumbnail-role">{{ testimonial.role }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  padding: 5rem 0;
  background: linear-gradient(180deg, #f8fafc 0%, #fff 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(177, 32, 41, 0.1);
  color: var(--color-primary);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #6b7280;
  font-size: 1rem;
}

.testimonials-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

/* Main Card */
.testimonial-card {
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  margin-bottom: 2rem;
}

.quote-icon {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  font-size: 3rem;
  color: rgba(177, 32, 41, 0.1);
}

.testimonial-content {
  padding-top: 1.5rem;
}

.testimonial-quote {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  font-style: italic;
  margin-bottom: 2rem;
  text-align: center;
  padding: 0 2rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-avatar span {
  color: #fff;
  font-weight: 700;
  font-size: 1.25rem;
}

.author-info h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.author-info p {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

/* Navigation */
.testimonial-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.nav-dots {
  display: flex;
  gap: 0.5rem;
}

.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-dot.active {
  background: var(--color-primary);
  transform: scale(1.2);
}

/* Thumbnails */
.testimonial-thumbnails {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.thumbnail {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.thumbnail:hover {
  border-color: #d1d5db;
}

.thumbnail.active {
  border-color: var(--color-primary);
  background: rgba(177, 32, 41, 0.02);
}

.thumbnail-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.thumbnail-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-avatar span {
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
}

.thumbnail-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.thumbnail-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thumbnail-role {
  font-size: 0.7rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive */
@media (max-width: 768px) {
  .testimonial-card {
    padding: 1.5rem;
  }

  .testimonial-quote {
    font-size: 1rem;
    padding: 0;
  }

  .quote-icon {
    display: none;
  }

  .testimonial-thumbnails {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .testimonial-thumbnails {
    grid-template-columns: 1fr;
  }
}
</style>
