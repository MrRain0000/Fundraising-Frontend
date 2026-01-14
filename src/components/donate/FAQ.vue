<script setup>
import { ref } from "vue";

const faqs = [
  {
    question: "Tôi có nhận được chứng từ quyên góp không?",
    answer:
      "Có. Sau khi xác nhận khoản đóng góp, Bông Hồng Nhỏ sẽ gửi thư xác nhận điện tử và hóa đơn chứng từ nếu quý nhà hảo tâm yêu cầu để phục vụ mục đích giảm trừ thuế thu nhập doanh nghiệp.",
  },
  {
    question: "Làm sao để biết tiền của tôi được sử dụng đúng mục đích?",
    answer:
      "Quỹ công khai báo cáo tài chính định kỳ hàng quý trên website. Ngoài ra, chúng tôi sẽ gửi email cập nhật về các chương trình mà bạn đã đóng góp.",
  },
  {
    question: "Tình nguyện viên cần điều kiện gì?",
    answer:
      "Bạn chỉ cần có tấm lòng và thời gian. Chúng tôi sẽ hướng dẫn và đào tạo đầy đủ trước mỗi chương trình.",
  },
];

const openFaq = ref(0);
</script>

<template>
  <div class="faq-section">
    <h3 class="section-title">Câu hỏi thường gặp</h3>

    <div class="faq-list">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="faq-item"
        :class="{ open: openFaq === index }"
      >
        <button
          class="faq-question"
          @click="openFaq = openFaq === index ? -1 : index"
        >
          {{ faq.question }}
          <i
            class="faq-icon"
            :class="
              openFaq === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'
            "
          ></i>
        </button>
        <div class="faq-answer-wrapper">
          <div class="faq-answer">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-section {
  height: 100%;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.faq-item {
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  padding: var(--spacing-md);
  border: none;
  background: transparent;
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color var(--transition-fast);
}

.faq-question:hover {
  color: var(--color-primary);
}

.faq-icon {
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-item.open .faq-icon {
  transform: rotate(180deg);
}

/* Smooth accordion using max-height */
.faq-answer-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

.faq-item.open .faq-answer-wrapper {
  grid-template-rows: 1fr;
}

.faq-answer {
  overflow: hidden;
  padding: 0 var(--spacing-md);
  color: var(--color-text-light);
  line-height: 1.7;
}

.faq-item.open .faq-answer {
  padding-bottom: var(--spacing-md);
}
</style>
