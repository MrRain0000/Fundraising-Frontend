<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Câu hỏi thường gặp",
  },
  subtitle: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Number,
    default: 1, // 1 hoặc 2 cột
  },
});

const openFaq = ref(0);

// Chia items thành 2 cột nếu columns = 2
const leftColumn = computed(() => {
  if (props.columns === 2) {
    return props.items.slice(0, Math.ceil(props.items.length / 2));
  }
  return props.items;
});

const rightColumn = computed(() => {
  if (props.columns === 2) {
    return props.items.slice(Math.ceil(props.items.length / 2));
  }
  return [];
});

// Track open state per column
const openLeft = ref(0);
const openRight = ref(-1);

const toggleFaq = (column, index) => {
  if (column === "left") {
    openLeft.value = openLeft.value === index ? -1 : index;
  } else {
    openRight.value = openRight.value === index ? -1 : index;
  }
};
</script>

<template>
  <div class="faq-section" :class="{ 'two-columns': props.columns === 2 }">
    <div class="faq-header" v-if="title || subtitle">
      <h3 class="section-title">{{ title }}</h3>
      <p class="section-subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div>

    <!-- Single Column Layout -->
    <div v-if="props.columns === 1" class="faq-list">
      <div
        v-for="(faq, index) in items"
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

    <!-- Two Column Layout -->
    <div v-else class="faq-grid">
      <div class="faq-column">
        <div
          v-for="(faq, index) in leftColumn"
          :key="'left-' + index"
          class="faq-item"
          :class="{ open: openLeft === index }"
        >
          <button class="faq-question" @click="toggleFaq('left', index)">
            {{ faq.question }}
            <i
              class="faq-icon"
              :class="
                openLeft === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'
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
      <div class="faq-column">
        <div
          v-for="(faq, index) in rightColumn"
          :key="'right-' + index"
          class="faq-item"
          :class="{ open: openRight === index }"
        >
          <button class="faq-question" @click="toggleFaq('right', index)">
            {{ faq.question }}
            <i
              class="faq-icon"
              :class="
                openRight === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'
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
  </div>
</template>

<style scoped>
.faq-section {
  height: 100%;
}

.faq-header {
  margin-bottom: var(--spacing-lg, 1.5rem);
}

.faq-section.two-columns .faq-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: var(--font-size-2xl, 1.5rem);
  font-weight: var(--font-weight-bold, 700);
  color: var(--color-text, #333);
  margin: 0 0 0.5rem;
}

.faq-section.two-columns .section-title {
  font-size: 2rem;
}

.section-subtitle {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

/* Single Column List */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 0.5rem);
}

/* Two Column Grid */
.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.faq-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* FAQ Item */
.faq-item {
  background: var(--color-white, #fff);
  border-radius: var(--radius-md, 0.5rem);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.08));
  overflow: hidden;
}

.faq-section.two-columns .faq-item {
  border-left: 4px solid var(--color-primary, #b12029);
}

.faq-question {
  width: 100%;
  padding: var(--spacing-md, 1rem);
  border: none;
  background: transparent;
  text-align: left;
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-text, #333);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  transition: color var(--transition-fast, 0.15s);
  line-height: 1.4;
}

.faq-question:hover {
  color: var(--color-primary, #b12029);
}

.faq-icon {
  transition: transform 0.3s ease;
  flex-shrink: 0;
  color: var(--color-primary, #b12029);
}

.faq-item.open .faq-icon {
  transform: rotate(180deg);
}

/* Smooth accordion using grid */
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
  padding: 0 var(--spacing-md, 1rem);
  color: var(--color-text-light, #666);
  line-height: 1.7;
}

.faq-item.open .faq-answer {
  padding-bottom: var(--spacing-md, 1rem);
}

/* Responsive */
@media (max-width: 768px) {
  .faq-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .faq-section.two-columns .section-title {
    font-size: 1.5rem;
  }
}
</style>
