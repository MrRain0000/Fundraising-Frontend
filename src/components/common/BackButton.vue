<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  variant: {
    type: String,
    default: "default", // 'light' for red header, 'dark' for dark header, 'default' for normal pages
    validator: (value) => ["light", "dark", "default"].includes(value),
  },
});

const router = useRouter();
const goBack = () => router.back();
</script>

<template>
  <button
    class="back-btn"
    :class="`back-btn--${variant}`"
    @click="goBack"
    title="Quay lại"
    aria-label="Quay lại trang trước"
  >
    <i class="bi bi-arrow-left"></i>
  </button>
</template>

<style scoped>
.back-btn {
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.back-btn i {
  font-size: 1.1rem;
}

/* Default variant - for normal pages with light background */
.back-btn--default {
  color: #6b7280;
}

.back-btn--default:hover {
  background: #f3f4f6;
  color: #374151;
}

/* Light variant - for red/primary colored headers */
.back-btn--light {
  color: #fff;
}

.back-btn--light:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* Dark variant - for dark/blue headers */
.back-btn--dark {
  color: rgba(255, 255, 255, 0.9);
}

.back-btn--dark:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>
