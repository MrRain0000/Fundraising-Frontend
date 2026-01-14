<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  year: {
    type: String,
    default: "2024",
  },
});

const emit = defineEmits(["close"]);

// Open preview in new tab
const openPreview = () => {
  window.open("/report-template.html", "_blank");
};

// Download PDF - opens print dialog
const downloadPDF = () => {
  const printWindow = window.open("/report-template.html", "_blank");
  printWindow.onload = () => {
    printWindow.print();
  };
};

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <div class="pdf-modal-overlay" @click.self="closeModal">
    <div class="pdf-modal">
      <div class="modal-header">
        <h3>Xuất báo cáo PDF</h3>
        <button class="btn-close-modal" @click="closeModal">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="preview-info">
          <i class="bi bi-file-earmark-pdf pdf-icon"></i>
          <div>
            <h4>Báo cáo tài chính năm {{ year }}</h4>
            <p>File PDF gồm 3 trang với đầy đủ thông tin thu chi và dự án</p>
          </div>
        </div>

        <div class="instructions">
          <p><strong>Hướng dẫn tải PDF:</strong></p>
          <ol>
            <li>Nhấn "Tải xuống PDF"</li>
            <li>
              Trong hộp thoại in, chọn "Save as PDF" hoặc "Lưu dưới dạng PDF"
            </li>
            <li>Nhấn "Save" để lưu file</li>
          </ol>
        </div>

        <div class="action-buttons">
          <button class="btn-preview" @click="openPreview">
            <i class="bi bi-eye"></i> Xem trước
          </button>
          <button class="btn-download" @click="downloadPDF">
            <i class="bi bi-download"></i> Tải xuống PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.pdf-modal {
  background: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 480px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.btn-close-modal {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
}

.btn-close-modal:hover {
  color: #1f2937;
}

.modal-body {
  padding: 1.5rem;
}

.preview-info {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  background: #fef2f2;
  border-radius: 12px;
  margin-bottom: 1.25rem;
}

.pdf-icon {
  font-size: 2.5rem;
  color: #ef4444;
}

.preview-info h4 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: #1f2937;
}

.preview-info p {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.instructions {
  background: #f8fafc;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.25rem;
}

.instructions p {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
}

.instructions ol {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: #4b5563;
}

.instructions li {
  margin-bottom: 0.25rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn-preview,
.btn-download {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-preview {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #374151;
}

.btn-preview:hover {
  background: #e5e7eb;
}

.btn-download {
  background: #3b82f6;
  border: none;
  color: #fff;
}

.btn-download:hover {
  background: #2563eb;
}
</style>
