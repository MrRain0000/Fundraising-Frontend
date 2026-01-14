<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  projectSlug: {
    type: String,
    default: "",
  },
  projectTitle: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

// Bank info
const bankInfo = {
  bankName: "Ngân hàng Sacombank",
  accountNumber: "060289990456",
  accountName: "Quỹ Từ Thiện Bông Hồng Nhỏ",
  branch: "Tân Định",
  bankBin: "970403",
};

// Generate transaction code (mã GD) - random 6 character alphanumeric
const generateTransactionCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Transaction code for current session
const transactionCode = ref(generateTransactionCode());

// Regenerate when modal opens
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      transactionCode.value = generateTransactionCode();
    }
  }
);

// Donor info
const donorName = ref("");
const donorPhone = ref("");
const donationAmount = ref("");

// Generate transfer content for QR
const transferContent = computed(() => {
  let content = transactionCode.value;

  // Add project slug if provided
  if (props.projectSlug) {
    content += ` ${props.projectSlug}`;
  }

  // Add donor name if provided
  if (donorName.value.trim()) {
    content += ` ${donorName.value.trim()}`;
  }

  // Add phone if provided
  if (donorPhone.value.trim()) {
    content += ` ${donorPhone.value.trim()}`;
  }

  return content;
});

// VietQR URL generation
const vietQrUrl = computed(() => {
  const baseUrl = "https://img.vietqr.io/image";
  const template = "compact2";
  const bankBin = bankInfo.bankBin;
  const accountNo = bankInfo.accountNumber;

  let url = `${baseUrl}/${bankBin}-${accountNo}-${template}.png`;

  const params = new URLSearchParams();

  // Add amount if provided
  if (
    donationAmount.value &&
    !isNaN(parseInt(donationAmount.value.replace(/\D/g, "")))
  ) {
    params.append("amount", donationAmount.value.replace(/\D/g, ""));
  }

  // Add transfer content
  params.append("addInfo", transferContent.value);

  // Add account name
  params.append("accountName", bankInfo.accountName);

  return `${url}?${params.toString()}`;
});

// Copy functions
const copied = ref(false);
const copyAccountNumber = () => {
  navigator.clipboard.writeText(bankInfo.accountNumber);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const copiedContent = ref(false);
const copyTransferContent = () => {
  navigator.clipboard.writeText(transferContent.value);
  copiedContent.value = true;
  setTimeout(() => {
    copiedContent.value = false;
  }, 2000);
};

// Format amount for display
const formatInputAmount = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value) {
    donationAmount.value = parseInt(value).toLocaleString("vi-VN");
  } else {
    donationAmount.value = "";
  }
};

// Close modal
const closeModal = () => {
  emit("close");
};

// Close on escape key
const handleKeydown = (e) => {
  if (e.key === "Escape" && props.show) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

// Prevent body scroll when modal is open
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

// Download QR image
const downloadQR = async () => {
  try {
    const response = await fetch(vietQrUrl.value);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QR-BongHongNho-${transactionCode.value}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
    // Fallback: open in new tab
    window.open(vietQrUrl.value, "_blank");
  }
};

// Share QR via social or native share
const shareQR = async () => {
  const shareData = {
    title: "Quyên góp - Quỹ Bông Hồng Nhỏ",
    text: `Ủng hộ ${
      props.projectTitle ? "dự án: " + props.projectTitle : "Quỹ Bông Hồng Nhỏ"
    }. Nội dung CK: ${transferContent.value}`,
    url: window.location.href,
  };

  // Try native share API first
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Share cancelled or failed");
    }
  } else {
    // Fallback: copy link to clipboard
    navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
    alert("Đã copy nội dung chia sẻ vào clipboard!");
  }
};

// Share to Facebook
const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    `Ủng hộ ${
      props.projectTitle ? "dự án: " + props.projectTitle : "Quỹ Bông Hồng Nhỏ"
    }`
  );
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
    "_blank",
    "width=600,height=400"
  );
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="donation-modal-overlay" @click.self="closeModal">
        <div class="donation-modal">
          <!-- Header -->
          <div class="modal-header">
            <div class="header-content">
              <h3 class="modal-title">
                <i class="bi bi-heart-fill"></i>
                Quyên góp
              </h3>
              <p class="modal-subtitle" v-if="projectTitle">
                Dự án: <strong>{{ projectTitle }}</strong>
              </p>
            </div>
            <button class="close-btn" @click="closeModal">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <div class="modal-layout">
              <!-- Left: QR Code -->
              <div class="qr-section">
                <div class="qr-container">
                  <img :src="vietQrUrl" alt="VietQR Code" class="qr-image" />
                  <p class="qr-note">
                    <i class="bi bi-info-circle"></i>
                    Mã QR tự động tạo bởi VietQR
                  </p>

                  <!-- QR Action Buttons -->
                  <div class="qr-actions">
                    <button class="qr-action-btn download" @click="downloadQR">
                      <i class="bi bi-download"></i>
                      Tải QR
                    </button>
                    <button class="qr-action-btn share" @click="shareQR">
                      <i class="bi bi-share"></i>
                      Chia sẻ
                    </button>
                    <button
                      class="qr-action-btn facebook"
                      @click="shareToFacebook"
                    >
                      <i class="bi bi-facebook"></i>
                    </button>
                  </div>
                </div>

                <!-- Amount Input -->
                <div class="input-group">
                  <label>Số tiền (tùy chọn)</label>
                  <div class="input-wrapper">
                    <input
                      type="text"
                      :value="donationAmount"
                      @input="formatInputAmount"
                      placeholder="Nhập số tiền"
                    />
                    <span class="suffix">VNĐ</span>
                  </div>
                </div>

                <!-- Donor Info -->
                <div class="input-group">
                  <label>Thông tin người ủng hộ (tùy chọn)</label>
                  <div class="donor-inputs">
                    <div class="input-wrapper icon">
                      <i class="bi bi-person-fill"></i>
                      <input
                        type="text"
                        v-model="donorName"
                        placeholder="Họ và tên"
                      />
                    </div>
                    <div class="input-wrapper icon">
                      <i class="bi bi-telephone-fill"></i>
                      <input
                        type="tel"
                        v-model="donorPhone"
                        placeholder="Số điện thoại"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Bank Info -->
              <div class="bank-section">
                <h4 class="section-title">
                  <i class="bi bi-bank"></i>
                  Thông tin chuyển khoản
                </h4>

                <div class="bank-info">
                  <div class="info-row">
                    <span class="label">Ngân hàng:</span>
                    <span class="value">{{ bankInfo.bankName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">Số tài khoản:</span>
                    <span class="value account-row">
                      <span class="account-number">{{
                        bankInfo.accountNumber
                      }}</span>
                      <button
                        class="copy-btn"
                        @click="copyAccountNumber"
                        :title="copied ? 'Đã copy!' : 'Copy'"
                      >
                        <i
                          :class="copied ? 'bi bi-check-lg' : 'bi bi-copy'"
                        ></i>
                      </button>
                    </span>
                  </div>
                  <div class="info-row">
                    <span class="label">Chủ tài khoản:</span>
                    <span class="value">{{ bankInfo.accountName }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">Chi nhánh:</span>
                    <span class="value">{{ bankInfo.branch }}</span>
                  </div>
                </div>

                <!-- Transfer Content -->
                <div class="transfer-content-box">
                  <div class="transfer-header">
                    <i class="bi bi-chat-left-text-fill"></i>
                    <strong>Nội dung chuyển khoản</strong>
                    <span class="auto-badge">Tự động</span>
                  </div>
                  <div class="transfer-display">
                    <code>{{ transferContent }}</code>
                    <button
                      class="copy-btn-lg"
                      @click="copyTransferContent"
                      :class="{ copied: copiedContent }"
                    >
                      <i
                        :class="copiedContent ? 'bi bi-check-lg' : 'bi bi-copy'"
                      ></i>
                      {{ copiedContent ? "Đã copy!" : "Copy" }}
                    </button>
                  </div>
                  <div class="transfer-info">
                    <div class="info-tag green">
                      <span class="info-label">Mã GD:</span>
                      <span>{{ transactionCode }}</span>
                    </div>
                    <div class="info-tag red" v-if="projectSlug">
                      <span class="info-label">Mã DA:</span>
                      <span>{{ projectSlug }}</span>
                    </div>
                    <div class="info-tag blue" v-if="donorName.trim()">
                      <span class="info-label">Tên:</span>
                      <span>{{ donorName.trim() }}</span>
                    </div>
                    <div class="info-tag purple" v-if="donorPhone.trim()">
                      <span class="info-label">SĐT:</span>
                      <span>{{ donorPhone.trim() }}</span>
                    </div>
                  </div>
                  <p class="transfer-note">
                    <i class="bi bi-lightbulb-fill"></i>
                    Giữ nguyên nội dung để Quỹ phân bổ đóng góp chính xác.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Modal Overlay */
.donation-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

/* Modal Container */
.donation-modal {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Modal Header */
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--spacing-lg);
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-primary-dark)
  );
  color: var(--color-white);
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: white;
}

.modal-subtitle {
  margin: var(--spacing-xs) 0 0;
  font-size: var(--font-size-sm);
  opacity: 0.9;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Modal Body */
.modal-body {
  padding: var(--spacing-lg);
  overflow-y: auto;
  flex: 1;
}

.modal-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--spacing-xl);
}

/* QR Section */
.qr-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.qr-container {
  text-align: center;
}

.qr-image {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}

.qr-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  margin-top: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

/* QR Action Buttons */
.qr-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.qr-action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
}

.qr-action-btn.download {
  background: #059669;
  color: white;
}

.qr-action-btn.download:hover {
  background: #047857;
}

.qr-action-btn.share {
  background: var(--color-primary);
  color: white;
}

.qr-action-btn.share:hover {
  background: var(--color-primary-dark);
}

.qr-action-btn.facebook {
  background: #1877f2;
  color: white;
}

.qr-action-btn.facebook:hover {
  background: #166fe5;
}

/* Input Groups */
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-group label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-white);
  transition: border-color var(--transition-fast);
}

.input-wrapper:focus-within {
  border-color: var(--color-primary);
}

.input-wrapper.icon i {
  padding: var(--spacing-sm);
  color: var(--color-text-light);
  background: var(--color-background-alt);
}

.input-wrapper input {
  flex: 1;
  border: none;
  padding: var(--spacing-sm);
  font-size: var(--font-size-sm);
  outline: none;
}

.input-wrapper .suffix {
  padding: var(--spacing-sm);
  background: var(--color-background-alt);
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
}

.donor-inputs {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* Bank Section */
.bank-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.section-title i {
  color: var(--color-primary);
}

.bank-info {
  background: var(--color-background-alt);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
}

.info-row .value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  font-size: var(--font-size-sm);
}

.account-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.account-number {
  font-family: monospace;
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}

.copy-btn {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  width: 26px;
  height: 26px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-btn:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

/* Transfer Content Box */
.transfer-content-box {
  background: linear-gradient(
    135deg,
    rgba(177, 32, 41, 0.05),
    rgba(177, 32, 41, 0.02)
  );
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  border: 1px solid rgba(177, 32, 41, 0.1);
}

.transfer-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
  flex-wrap: wrap;
}

.transfer-header i {
  color: var(--color-primary);
}

.auto-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  padding: 2px 6px;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-primary-dark)
  );
  color: var(--color-white);
  border-radius: 8px;
  font-weight: var(--font-weight-medium);
}

.transfer-display {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  border: 2px dashed var(--color-primary);
}

.transfer-display code {
  flex: 1;
  font-family: "Courier New", monospace;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  word-break: break-all;
}

.copy-btn-lg {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.copy-btn-lg:hover {
  background: var(--color-primary-dark);
}

.copy-btn-lg.copied {
  background: #059669;
}

.transfer-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.info-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-family: "Courier New", monospace;
}

.info-tag .info-label {
  font-weight: normal;
  opacity: 0.8;
}

.info-tag.green {
  background: rgba(5, 150, 105, 0.1);
  color: #059669;
}

.info-tag.red {
  background: rgba(177, 32, 41, 0.1);
  color: var(--color-primary);
}

.info-tag.blue {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
}

.info-tag.purple {
  background: rgba(124, 58, 237, 0.1);
  color: #7c3aed;
}

.transfer-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  margin: 0;
  padding-top: var(--spacing-xs);
  border-top: 1px solid rgba(177, 32, 41, 0.1);
}

.transfer-note i {
  color: #f59e0b;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .donation-modal,
.modal-leave-active .donation-modal {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .donation-modal,
.modal-leave-to .donation-modal {
  transform: scale(0.9) translateY(20px);
}

/* Responsive */
@media (max-width: 767.98px) {
  .donation-modal-overlay {
    align-items: flex-start;
    padding: 80px var(--spacing-sm) var(--spacing-sm);
  }

  .donation-modal {
    max-height: calc(100vh - 100px);
    border-radius: var(--radius-md);
  }

  .modal-header {
    padding-top: 40px;
  }

  .modal-title {
    font-size: var(--font-size-lg);
  }

  .modal-body {
    padding: var(--spacing-md);
  }

  .modal-layout {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .qr-section {
    order: 2;
  }

  .bank-section {
    order: 1;
  }

  .qr-image {
    max-width: 200px;
    margin: 0 auto;
    display: block;
  }

  .transfer-display {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-xs);
  }

  .transfer-display code {
    text-align: center;
  }

  .copy-btn-lg {
    justify-content: center;
  }
}
</style>
