<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import ProcessSteps from "@/components/donate/ProcessSteps.vue";
import Testimonials from "@/components/donate/Testimonials.vue";
import FAQ from "@/components/donate/FAQ.vue";
import BackButton from "@/components/common/BackButton.vue";
import projectsData from "@/data/projects.json";

// Router
const router = useRouter();

// Active tab
const activeTab = ref("info");

// Total donation
const totalRaised = "3.809.128.440";

// Bank info
const bankInfo = {
  bankName: "Ngân hàng Sacombank",
  accountNumber: "060289990456",
  accountName: "Quỹ Từ Thiện Bông Hồng Nhỏ",
  branch: "Tân Định",
  bankBin: "970403", // Sacombank correct BIN code for VietQR
};

// Projects - only show active projects
const activeProjects = computed(() => {
  return projectsData.filter((p) => p.status === "active");
});

// Selected project
const selectedProject = ref(null);
const showProjectDropdown = ref(false);

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

// Regenerate transaction code when project changes
const regenerateTransactionCode = () => {
  transactionCode.value = generateTransactionCode();
};

// Select a project
const selectProject = (project) => {
  selectedProject.value = project;
  showProjectDropdown.value = false;
  regenerateTransactionCode();
};

// Clear project selection
const clearProject = () => {
  selectedProject.value = null;
  regenerateTransactionCode();
};

// Donor info
const donorName = ref("");
const donorPhone = ref("");

// Generate transfer content for QR
const transferContent = computed(() => {
  let content = transactionCode.value;

  // Add project slug if selected
  if (selectedProject.value) {
    content += ` ${selectedProject.value.slug}`;
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

// Amount input (optional - user can set amount for QR)
const donationAmount = ref("");

// VietQR URL generation
// VietQR format: https://img.vietqr.io/image/<BANK_BIN>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<CONTENT>&accountName=<NAME>
const vietQrUrl = computed(() => {
  const baseUrl = "https://img.vietqr.io/image";
  const template = "compact2"; // Options: compact, compact2, qr_only, print
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

// Copy function
const copied = ref(false);
const copyAccountNumber = () => {
  navigator.clipboard.writeText(bankInfo.accountNumber);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

// Copy transfer content
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

// Close dropdown when clicking outside
const handleClickOutside = (e) => {
  if (!e.target.closest(".project-selector")) {
    showProjectDropdown.value = false;
  }
};

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
    window.open(vietQrUrl.value, "_blank");
  }
};

// Share QR
const shareQR = async () => {
  const projectName = selectedProject.value
    ? selectedProject.value.title
    : "Quỹ Bông Hồng Nhỏ";
  const shareData = {
    title: "Quyên góp - Quỹ Bông Hồng Nhỏ",
    text: `Ủng hộ ${projectName}. Nội dung CK: ${transferContent.value}`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Share cancelled");
    }
  } else {
    navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
    alert("Đã copy nội dung chia sẻ vào clipboard!");
  }
};

// Share to Facebook
const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  const projectName = selectedProject.value
    ? selectedProject.value.title
    : "Quỹ Bông Hồng Nhỏ";
  const text = encodeURIComponent(`Ủng hộ ${projectName}`);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
    "_blank",
    "width=600,height=400"
  );
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Format currency for project display
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

// Calculate progress percentage
const getProgress = (raised, target) => {
  return Math.min(Math.round((raised / target) * 100), 100);
};

// Generate 60 fake donors
const allDonors = [];
const names = [
  "Công ty Trương Hoàng Phát",
  "CTY TNHH TMDV Tân Hiệp Phát",
  "Bùi Quang Nam",
  "Nguyễn Đức Thạch Diễm",
  "Trương Hoàng Thảo Nhi",
  "Hoàng Thị Lệ Trinh",
  "Ms. Hải Lý",
  "Nguyễn Mai Chinh",
  "Hoàng Quốc Anh Tuấn",
  "Trần Duy Cảnh",
  "Cha Trần Lê Khánh",
  "Hoàng Nguyễn Thu Thảo",
  "Nguyễn Hoàng Phi",
  "Lê Văn Minh",
  "Phạm Thị Hương",
  "Võ Thanh Tùng",
  "Đỗ Hoàng Nam",
  "Trịnh Văn Hải",
  "Ngô Thị Lan",
  "Đặng Quốc Việt",
];
const companies = [
  "",
  "Sacombank",
  "Cty Luật Việt",
  "Phụ huynh Brian Nguyễn UKA Bình Thạnh",
  "",
];
const notes = [
  "",
  "Đấu giá tượng Đức Mẹ và BST Hoa hồng",
  "Đấu giá chuỗi hạt hoa hồng",
  "Đấu giá áo dài",
  "Sách",
  "",
];
const amounts = [
  750000000, 650000000, 510000000, 500000000, 300000000, 121000000, 120000000,
  100000000, 50000000, 30000000, 20000000, 10000000, 5000000, 2000000, 1000000,
];

for (let i = 0; i < 60; i++) {
  allDonors.push({
    id: i + 1,
    name: names[i % names.length],
    company: companies[Math.floor(Math.random() * companies.length)],
    phone:
      Math.random() > 0.5
        ? "*"
        : `*******${Math.floor(Math.random() * 900 + 100)}`,
    amount: amounts[i % amounts.length],
    note: notes[Math.floor(Math.random() * notes.length)],
  });
}

// Pagination
const currentPage = ref(1);
const itemsPerPage = 30;
const totalPages = computed(() => Math.ceil(allDonors.length / itemsPerPage));

const paginatedDonors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return allDonors.slice(start, start + itemsPerPage);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const formatAmount = (amount) => {
  return amount.toLocaleString("vi-VN") + " đ";
};
</script>

<template>
  <div class="donate-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <nav aria-label="breadcrumb" class="breadcrumb-nav">
          <BackButton variant="light" />
          <ol class="breadcrumb mb-2">
            <li class="breadcrumb-item">
              <RouterLink to="/">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active">Quyên góp</li>
          </ol>
        </nav>
        <h1 class="page-title">Đóng góp cho Quỹ</h1>
        <p class="page-subtitle">
          Mỗi đóng góp của bạn là một nụ cười cho trẻ em
        </p>
      </div>
    </section>

    <!-- Tabs Navigation -->
    <section class="tabs-section">
      <div class="container">
        <div class="tabs-nav">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'info' }"
            @click="activeTab = 'info'"
          >
            <i class="bi bi-info-circle me-2"></i>Thông tin
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'donors' }"
            @click="activeTab = 'donors'"
          >
            <i class="bi bi-list-ul me-2"></i>Danh sách Đóng Góp
          </button>
        </div>
      </div>
    </section>

    <!-- Tab: Thông tin -->
    <section v-if="activeTab === 'info'" class="page-content section-padding">
      <div class="container">
        <!-- Project Selection -->
        <div class="project-selection-card mb-4">
          <h3 class="card-title">
            <i class="bi bi-heart-fill me-2"></i>
            Chọn dự án muốn ủng hộ
          </h3>
          <p class="card-description">
            Chọn một dự án để nội dung chuyển khoản được tự động điền sẵn, giúp
            Quỹ dễ dàng phân bổ đóng góp của bạn.
          </p>

          <!-- Project Selector -->
          <div class="project-selector" @click.stop>
            <div
              class="selector-trigger"
              :class="{ 'has-selection': selectedProject }"
              @click="showProjectDropdown = !showProjectDropdown"
            >
              <div v-if="selectedProject" class="selected-project">
                <div class="selected-project-info">
                  <img
                    :src="selectedProject.image"
                    :alt="selectedProject.title"
                    class="project-thumb"
                  />
                  <div class="project-details">
                    <span class="project-name">{{
                      selectedProject.title
                    }}</span>
                    <span class="project-location">
                      <i class="bi bi-geo-alt-fill"></i>
                      {{ selectedProject.location }}
                    </span>
                  </div>
                </div>
                <button
                  class="clear-btn"
                  @click.stop="clearProject"
                  title="Bỏ chọn"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <div v-else class="placeholder">
                <i class="bi bi-folder2-open me-2"></i>
                Chọn dự án để ủng hộ (tùy chọn)
                <i class="bi bi-chevron-down ms-auto"></i>
              </div>
            </div>

            <!-- Dropdown List -->
            <div v-if="showProjectDropdown" class="project-dropdown">
              <div class="dropdown-header">
                <span>Danh sách dự án đang gây quỹ</span>
                <span class="project-count"
                  >{{ activeProjects.length }} dự án</span
                >
              </div>
              <div class="dropdown-list">
                <div
                  v-for="project in activeProjects"
                  :key="project.id"
                  class="project-item"
                  :class="{ selected: selectedProject?.id === project.id }"
                  @click="selectProject(project)"
                >
                  <img
                    :src="project.image"
                    :alt="project.title"
                    class="project-thumb"
                  />
                  <div class="project-info">
                    <div class="project-name">{{ project.title }}</div>
                    <div class="project-meta">
                      <span class="tag" :class="project.tag">{{
                        project.tagLabel
                      }}</span>
                      <span class="location">
                        <i class="bi bi-geo-alt"></i> {{ project.location }}
                      </span>
                      <span class="days-left">
                        <i class="bi bi-clock"></i> còn
                        {{ project.daysLeft }} ngày
                      </span>
                    </div>
                    <div class="progress-bar-mini">
                      <div
                        class="progress-fill"
                        :style="{
                          width:
                            getProgress(project.raised, project.target) + '%',
                        }"
                      ></div>
                    </div>
                    <div class="project-stats">
                      <span class="raised"
                        >{{ formatCurrency(project.raised) }}đ</span
                      >
                      <span class="target"
                        >/ {{ formatCurrency(project.target) }}đ</span
                      >
                    </div>
                  </div>
                  <i
                    v-if="selectedProject?.id === project.id"
                    class="bi bi-check-circle-fill check-icon"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- QR & Bank Info -->
        <div class="payment-card mb-5">
          <h3 class="card-title">
            <i class="bi bi-qr-code me-2"></i>
            Quét mã QR để chuyển khoản
          </h3>
          <div class="row align-items-start">
            <div class="col-lg-5 text-center mb-4 mb-lg-0">
              <div class="qr-container">
                <img :src="vietQrUrl" alt="VietQR Code" class="qr-image" />
                <p class="qr-note mt-2">
                  <i class="bi bi-info-circle me-1"></i>
                  Mã QR tự động tạo bởi VietQR
                </p>
              </div>

              <!-- Optional Amount Input -->
              <div class="amount-input-wrapper mt-3">
                <label class="amount-label"
                  >Số tiền muốn ủng hộ (tùy chọn)</label
                >
                <div class="amount-input-group">
                  <input
                    type="text"
                    class="amount-input"
                    :value="donationAmount"
                    @input="formatInputAmount"
                    placeholder="Nhập số tiền"
                  />
                  <span class="currency-suffix">VNĐ</span>
                </div>
              </div>

              <!-- Donor Info Inputs -->
              <div class="donor-info-wrapper mt-3">
                <label class="donor-label"
                  >Thông tin người ủng hộ (tùy chọn)</label
                >
                <div class="donor-input-group">
                  <div class="donor-input-item">
                    <i class="bi bi-person-fill"></i>
                    <input
                      type="text"
                      class="donor-input"
                      v-model="donorName"
                      placeholder="Họ và tên"
                    />
                  </div>
                  <div class="donor-input-item">
                    <i class="bi bi-telephone-fill"></i>
                    <input
                      type="tel"
                      class="donor-input"
                      v-model="donorPhone"
                      placeholder="Số điện thoại"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-7">
              <div class="bank-info">
                <div class="info-row">
                  <span class="label">Ngân hàng:</span>
                  <span class="value">{{ bankInfo.bankName }}</span>
                </div>
                <div class="info-row">
                  <span class="label">Số tài khoản:</span>
                  <span class="value account-number-row">
                    <span class="account-number">{{
                      bankInfo.accountNumber
                    }}</span>
                    <button
                      class="copy-btn"
                      @click="copyAccountNumber"
                      :title="copied ? 'Đã copy!' : 'Copy số tài khoản'"
                    >
                      <i :class="copied ? 'bi bi-check-lg' : 'bi bi-copy'"></i>
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

              <!-- Transfer Content Section -->
              <div class="transfer-content-box mt-4">
                <div class="transfer-label">
                  <i class="bi bi-chat-left-text-fill me-2"></i>
                  <strong>Nội dung chuyển khoản</strong>
                  <span class="auto-badge" v-if="selectedProject">
                    Tự động tạo
                  </span>
                </div>
                <div class="transfer-content-display">
                  <code class="transfer-code">{{ transferContent }}</code>
                  <button
                    class="copy-btn-large"
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
                  <div class="info-item">
                    <span class="info-label">Mã giao dịch:</span>
                    <span class="info-value transaction-code">{{
                      transactionCode
                    }}</span>
                  </div>
                  <div class="info-item" v-if="selectedProject">
                    <span class="info-label">Mã dự án:</span>
                    <span class="info-value project-slug">{{
                      selectedProject.slug
                    }}</span>
                  </div>
                  <div class="info-item" v-if="donorName.trim()">
                    <span class="info-label">Tên:</span>
                    <span class="info-value donor-name">{{
                      donorName.trim()
                    }}</span>
                  </div>
                  <div class="info-item" v-if="donorPhone.trim()">
                    <span class="info-label">SĐT:</span>
                    <span class="info-value donor-phone">{{
                      donorPhone.trim()
                    }}</span>
                  </div>
                </div>
                <p class="transfer-note-text">
                  <i class="bi bi-lightbulb-fill me-1"></i>
                  Hãy giữ nguyên nội dung chuyển khoản để Quỹ có thể theo dõi và
                  phân bổ đóng góp của bạn chính xác.
                </p>

                <!-- QR Action Buttons -->
                <div class="qr-actions mt-3">
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
            </div>
          </div>
        </div>

        <!-- Total Stats -->
        <div class="total-stats-section">
          <h2 class="total-title">TỔNG SỐ TIỀN</h2>
          <div class="total-divider"></div>
          <p class="total-quote">
            "Mọi đóng góp của bạn đều được chúng tôi trân trọng, sử dụng đúng
            mục đích và công khai minh bạch."
          </p>
          <p class="total-update">Cập nhật đến ngày: 19/12/2025</p>
          <div class="total-amount-box">
            <span class="total-number">{{ totalRaised }}</span>
            <span class="total-currency">đ</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Steps -->
    <ProcessSteps v-if="activeTab === 'info'" />

    <!-- Testimonials & FAQ Section -->
    <section
      v-if="activeTab === 'info'"
      class="feedback-section section-padding"
    >
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-6">
            <Testimonials />
          </div>
          <div class="col-lg-6">
            <FAQ />
          </div>
        </div>
      </div>
    </section>

    <!-- Tab: Danh sách Đóng Góp -->
    <section v-if="activeTab === 'donors'" class="page-content section-padding">
      <div class="container">
        <div class="text-center mb-4">
          <h2 class="donors-title">DANH SÁCH ĐÓNG GÓP</h2>
          <p class="donors-subtitle">
            "Không nên bỏ lỡ bất cứ cơ hội nào mà không làm một hy sinh nhỏ, ở
            đây bằng gương mặt tươi cười, ở kia bằng một lời khả ái, luôn luôn
            làm việc đúng đắn dù nhỏ bé nhất và làm vì tình yêu."
          </p>
          <div class="total-stats-inline">
            <span class="total-label">Tổng quyên góp:</span>
            <span class="total-amount-inline">{{ totalRaised }} VNĐ</span>
          </div>
        </div>

        <!-- Donors Table -->
        <div class="donors-table-wrapper">
          <table class="donors-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Đơn vị</th>
                <th>Điện thoại</th>
                <th>Số tiền ủng hộ</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(donor, index) in paginatedDonors" :key="donor.id">
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td class="donor-name-cell">{{ donor.name }}</td>
                <td>{{ donor.company }}</td>
                <td>{{ donor.phone }}</td>
                <td class="amount-cell">{{ formatAmount(donor.amount) }}</td>
                <td>{{ donor.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-wrapper">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="goToPage(1)"
          >
            « Trang trước
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="page-btn page-number"
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Trang tiếp theo »
          </button>
          <button
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="goToPage(totalPages)"
          >
            Trang cuối »
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Page Header */
.page-header {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );
  padding: var(--spacing-2xl) 0;
  color: var(--color-white);
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.breadcrumb-item a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.breadcrumb-item.active {
  color: rgba(255, 255, 255, 0.6);
}

.breadcrumb-nav .breadcrumb {
  margin-bottom: 0;
}

.page-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
  color: var(--color-white);
}

.page-subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  margin-bottom: 0;
}

/* Tabs */
.tabs-section {
  background: var(--color-white);
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 95px;
  z-index: 100;
}

.tabs-nav {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) 0;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--color-text-light);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  color: var(--color-primary);
  background: rgba(177, 32, 41, 0.05);
}

.tab-btn.active {
  background: var(--color-primary);
  color: var(--color-white);
}

/* Payment Card */
.payment-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
}

.card-title i {
  color: var(--color-primary);
}

.qr-container {
  padding: var(--spacing-md);
}

.qr-image {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
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
}

.info-row .value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.account-number-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.account-number {
  font-family: monospace;
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
}

.copy-btn {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.copy-btn:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.transfer-note {
  background: rgba(177, 32, 41, 0.05);
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
}

/* QR Action Buttons */
.qr-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.qr-action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
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
  transform: translateY(-2px);
}

.qr-action-btn.share {
  background: var(--color-primary);
  color: white;
}

.qr-action-btn.share:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
}

.qr-action-btn.facebook {
  background: #1877f2;
  color: white;
}

.qr-action-btn.facebook:hover {
  background: #166fe5;
  transform: translateY(-2px);
}

/* Project Selection Card */
.project-selection-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--color-primary);
}

.project-selection-card .card-title {
  color: var(--color-primary);
}

.card-description {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-lg);
}

/* Project Selector */
.project-selector {
  position: relative;
}

.selector-trigger {
  border: 2px dashed #ddd;
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--color-background-alt);
}

.selector-trigger:hover {
  border-color: var(--color-primary);
  background: rgba(177, 32, 41, 0.02);
}

.selector-trigger.has-selection {
  border-style: solid;
  border-color: var(--color-primary);
  background: rgba(177, 32, 41, 0.05);
}

.placeholder {
  display: flex;
  align-items: center;
  color: var(--color-text-light);
  font-size: var(--font-size-base);
}

.selected-project {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.selected-project-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.project-thumb {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.project-details {
  display: flex;
  flex-direction: column;
}

.project-details .project-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.project-details .project-location {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.project-details .project-location i {
  color: var(--color-primary);
}

.clear-btn {
  background: transparent;
  border: none;
  color: var(--color-text-light);
  padding: var(--spacing-xs);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.clear-btn:hover {
  color: var(--color-primary);
}

/* Project Dropdown */
.project-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-white);
  border: 1px solid #ddd;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 200;
  margin-top: var(--spacing-xs);
  max-height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-background-alt);
  border-bottom: 1px solid #eee;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.project-count {
  color: var(--color-primary);
}

.dropdown-list {
  overflow-y: auto;
  max-height: 350px;
}

.project-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: background var(--transition-fast);
  border-bottom: 1px solid #f5f5f5;
}

.project-item:hover {
  background: rgba(177, 32, 41, 0.03);
}

.project-item.selected {
  background: rgba(177, 32, 41, 0.08);
}

.project-item .project-thumb {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.project-item .project-info {
  flex: 1;
  min-width: 0;
}

.project-item .project-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  margin-bottom: 6px;
}

.project-meta .tag {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: var(--font-weight-medium);
}

.project-meta .tag.education {
  background: #e3f2fd;
  color: #1565c0;
}

.project-meta .tag.health {
  background: #fff3e0;
  color: #e65100;
}

.project-meta .tag.social {
  background: #e8f5e9;
  color: #2e7d32;
}

.project-meta .tag.fundraising {
  background: #fce4ec;
  color: #c2185b;
}

.project-meta .location,
.project-meta .days-left {
  color: var(--color-text-light);
}

.progress-bar-mini {
  height: 4px;
  background: #eee;
  border-radius: 2px;
  margin-bottom: 4px;
  overflow: hidden;
}

.progress-bar-mini .progress-fill {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-primary-dark)
  );
  border-radius: 2px;
  transition: width 0.5s ease;
}

.project-stats {
  font-size: var(--font-size-sm);
}

.project-stats .raised {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.project-stats .target {
  color: var(--color-text-light);
}

.check-icon {
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

/* QR Note */
.qr-note {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-bottom: 0;
}

/* Amount Input */
.amount-input-wrapper {
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
}

.amount-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-bottom: var(--spacing-xs);
}

.amount-input-group {
  display: flex;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-white);
  transition: border-color var(--transition-fast);
}

.amount-input-group:focus-within {
  border-color: var(--color-primary);
}

.amount-input {
  flex: 1;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  outline: none;
}

.currency-suffix {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-background-alt);
  color: var(--color-text-light);
  font-weight: var(--font-weight-medium);
  flex-shrink: 0;
  white-space: nowrap;
}

/* Donor Info Inputs */
.donor-info-wrapper {
  text-align: left;
  max-width: 280px;
  margin: 0 auto;
}

.donor-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-bottom: var(--spacing-xs);
}

.donor-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.donor-input-item {
  display: flex;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-white);
  transition: border-color var(--transition-fast);
}

.donor-input-item:focus-within {
  border-color: var(--color-primary);
}

.donor-input-item i {
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-light);
  background: var(--color-background-alt);
}

.donor-input {
  flex: 1;
  border: none;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  outline: none;
}

/* Transfer Content Box */
.transfer-content-box {
  background: linear-gradient(
    135deg,
    rgba(177, 32, 41, 0.05),
    rgba(177, 32, 41, 0.02)
  );
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  border: 1px solid rgba(177, 32, 41, 0.1);
}

.transfer-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.transfer-label i {
  color: var(--color-primary);
}

.auto-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  padding: 2px 8px;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-primary-dark)
  );
  color: var(--color-white);
  border-radius: 10px;
  font-weight: var(--font-weight-medium);
}

.transfer-content-display {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  border: 2px dashed var(--color-primary);
}

.transfer-code {
  flex: 1;
  font-family: "Courier New", monospace;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  background: transparent;
  word-break: break-all;
}

.copy-btn-large {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.copy-btn-large:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}

.copy-btn-large.copied {
  background: #059669;
}

.transfer-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.transfer-info .info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.transfer-info .info-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.transfer-info .info-value {
  font-weight: var(--font-weight-semibold);
  font-family: "Courier New", monospace;
}

.transfer-info .transaction-code {
  color: #059669;
  background: rgba(5, 150, 105, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.transfer-info .project-slug {
  color: var(--color-primary);
  background: rgba(177, 32, 41, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.transfer-info .donor-name {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.transfer-info .donor-phone {
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
}

.transfer-note-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-bottom: 0;
  padding-top: var(--spacing-sm);
  border-top: 1px solid rgba(177, 32, 41, 0.1);
}

.transfer-note-text i {
  color: #f59e0b;
}

/* Feedback Section (Testimonials & FAQ) */
.feedback-section {
  background: var(--color-background-alt);
  padding: 90px 0;
}

/* Donors Table */
.donors-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.donors-subtitle {
  color: var(--color-text-light);
  font-style: italic;
  max-width: 800px;
  margin: 10px auto;
}

/* Total Stats Section */
.total-stats-section {
  text-align: center;
  padding: var(--spacing-3xl) 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin: var(--spacing-xl) 0;
}

.total-title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: var(--spacing-sm);
}

.total-divider {
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  margin: 0 auto var(--spacing-lg);
}

.total-quote {
  font-style: italic;
  color: var(--color-text-light);
  max-width: 700px;
  margin: 0 auto var(--spacing-xl);
  line-height: 1.8;
}

.total-update {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.total-amount-box {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.total-number {
  font-size: 3rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
}

.total-currency {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-left: 4px;
  position: relative;
  top: 5px;
}

/* Tab Donors - inline stats */
.total-stats-inline {
  margin-top: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.total-amount-inline {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.donors-table-wrapper {
  overflow-x: auto;
  margin-top: var(--spacing-xl);
}

.donors-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-white);
}

.donors-table th,
.donors-table td {
  padding: var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid #eee;
}

.donors-table th {
  background: var(--color-background-alt);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.donor-name-cell {
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.amount-cell {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

/* Pagination */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xl);
  flex-wrap: wrap;
}

.page-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: var(--color-white);
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.page-btn:hover:not(:disabled) {
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.active {
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

/* Responsive */
@media (max-width: 767.98px) {
  .tabs-nav {
    flex-direction: column;
  }

  .tab-btn {
    width: 100%;
    text-align: center;
  }

  .pagination-wrapper {
    gap: var(--spacing-xs);
  }

  .page-btn {
    padding: 0.4rem 0.8rem;
    font-size: var(--font-size-sm);
  }

  /* Project Selection Mobile */
  .project-selection-card {
    padding: var(--spacing-md);
  }

  .project-dropdown {
    max-height: 350px;
  }

  .project-item .project-thumb {
    width: 50px;
    height: 50px;
  }

  .project-meta {
    gap: 4px;
  }

  .project-meta .days-left {
    display: none;
  }

  /* Transfer Content Mobile */
  .transfer-content-display {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-sm);
  }

  .transfer-code {
    text-align: center;
    font-size: var(--font-size-base);
  }

  .copy-btn-large {
    justify-content: center;
  }

  .transfer-info {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  /* Amount Input Mobile */
  .amount-input-wrapper {
    max-width: 100%;
  }

  /* QR Container Mobile */
  .qr-container {
    padding: var(--spacing-sm);
  }

  .qr-image {
    max-width: 280px;
  }
}
</style>
