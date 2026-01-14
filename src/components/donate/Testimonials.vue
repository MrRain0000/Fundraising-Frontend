<script setup>
import { ref } from "vue";

const testimonials = [
  {
    quote:
      "Là một nhà tài trợ, điều tôi quan tâm nhất là sự minh bạch. Bông Hồng Nhỏ luôn cập nhật sao kẻ đầy đủ và gửi hình ảnh thực tế của các em nhỏ. Tôi rất yên tâm khi đồng hành cùng quỹ.",
    name: "Chị Minh Anh",
    role: "Giám đốc Marketing - Đối tác doanh nghiệp",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "Tôi đã tham gia nhiều chuyến từ thiện cùng quỹ và thấy được tấm lòng của mọi người. Mỗi em nhỏ được giúp đỡ là một niềm vui lớn.",
    name: "Anh Tuấn Kiệt",
    role: "Tình nguyện viên",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const current = ref(0);
</script>

<template>
  <div class="testimonials">
    <h3 class="section-title">Cảm nhận từ cộng đồng</h3>

    <div class="testimonial-card">
      <div class="quote-icon">
        <i class="bi bi-quote"></i>
      </div>
      <p class="testimonial-quote">"{{ testimonials[current].quote }}"</p>
      <div class="testimonial-author">
        <img
          :src="testimonials[current].avatar"
          :alt="testimonials[current].name"
          class="author-avatar"
        />
        <div class="author-info">
          <strong>{{ testimonials[current].name }}</strong>
          <span>{{ testimonials[current].role }}</span>
        </div>
      </div>
      <div class="testimonial-dots">
        <button
          v-for="(_, index) in testimonials"
          :key="index"
          class="dot"
          :class="{ active: current === index }"
          @click="current = index"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.testimonials {
  height: 100%;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
}

.testimonial-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--color-primary);
}

.quote-icon {
  color: var(--color-primary);
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
}

.testimonial-quote {
  font-size: var(--font-size-base);
  color: var(--color-text);
  line-height: 1.8;
  font-style: italic;
  margin-bottom: var(--spacing-lg);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-info strong {
  color: var(--color-text);
}

.author-info span {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.testimonial-dots {
  display: flex;
  gap: var(--spacing-xs);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #ddd;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.dot.active {
  background: var(--color-primary);
}
</style>
