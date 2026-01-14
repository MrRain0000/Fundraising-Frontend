<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import BackButton from "@/components/common/BackButton.vue";
import CategoryLegend from "@/components/common/CategoryLegend.vue";
import PdfExport from "@/components/reports/PdfExport.vue";

// PDF Modal state
const showPdfModal = ref(false);

// Selected filters
const selectedYear = ref("2025");
const selectedCategory = ref("all");

const years = ["2025", "2024", "2023", "2022", "2021"];
const categories = [
  { key: "all", label: "Tất cả các quý" },
  { key: "q1", label: "Quý 1" },
  { key: "q2", label: "Quý 2" },
  { key: "q3", label: "Quý 3" },
  { key: "q4", label: "Quý 4" },
];

// Stats data
const stats = ref({
  totalIncome: "12,500,000,000",
  totalIncomeRaw: 12500000000,
  incomeChange: "+8%",
  totalExpense: "9,200,000,000",
  totalExpenseRaw: 9200000000,
  expensePercent: "73.6%",
  remaining: "3,300,000,000",
  remainingNote: "Sẵn sàng cho dự án Quý 4",
});

// Fund distribution for pie chart - with actual amounts
const totalExpenseAmount = 9200000000; // 9.2 tỷ
const distribution = ref([
  {
    label: "Giáo dục & Học bổng",
    percent: 45,
    color: "#3b82f6",
    amount: Math.round(totalExpenseAmount * 0.45),
  },
  {
    label: "Y tế & Sức khỏe",
    percent: 30,
    color: "#10b981",
    amount: Math.round(totalExpenseAmount * 0.3),
  },
  {
    label: "Cứu trợ khẩn cấp",
    percent: 15,
    color: "#f59e0b",
    amount: Math.round(totalExpenseAmount * 0.15),
  },
  {
    label: "Vận hành & QL",
    percent: 10,
    color: "#6b7280",
    amount: Math.round(totalExpenseAmount * 0.1),
  },
]);

// Format currency helper - with decimal support for accuracy
const formatAmount = (value) => {
  if (value >= 1000000000) {
    const billions = value / 1000000000;
    return (
      (Number.isInteger(billions) ? billions : billions.toFixed(1)) + " tỷ"
    );
  } else if (value >= 1000000) {
    const millions = value / 1000000;
    // Show decimal only if not a round number
    if (Number.isInteger(millions)) {
      return millions + " triệu";
    } else {
      return millions.toFixed(1).replace(".0", "") + " triệu";
    }
  }
  return value.toLocaleString("vi-VN") + " đ";
};

// Monthly income/expense chart data - with real amounts (in millions VNĐ)
const monthlyData = ref([
  {
    month: "T1",
    income: 850,
    expense: 620,
    incomeRaw: 850000000,
    expenseRaw: 620000000,
  },
  {
    month: "T2",
    income: 720,
    expense: 550,
    incomeRaw: 720000000,
    expenseRaw: 550000000,
  },
  {
    month: "T3",
    income: 980,
    expense: 780,
    incomeRaw: 980000000,
    expenseRaw: 780000000,
  },
  {
    month: "T4",
    income: 890,
    expense: 690,
    incomeRaw: 890000000,
    expenseRaw: 690000000,
  },
  {
    month: "T5",
    income: 1200,
    expense: 950,
    incomeRaw: 1200000000,
    expenseRaw: 950000000,
  },
  {
    month: "T6",
    income: 780,
    expense: 620,
    incomeRaw: 780000000,
    expenseRaw: 620000000,
  },
  {
    month: "T7",
    income: 920,
    expense: 720,
    incomeRaw: 920000000,
    expenseRaw: 720000000,
  },
  {
    month: "T8",
    income: 1050,
    expense: 850,
    incomeRaw: 1050000000,
    expenseRaw: 850000000,
  },
  {
    month: "T9",
    income: 1100,
    expense: 880,
    incomeRaw: 1100000000,
    expenseRaw: 880000000,
  },
  {
    month: "T10",
    income: 1250,
    expense: 980,
    incomeRaw: 1250000000,
    expenseRaw: 980000000,
  },
  {
    month: "T11",
    income: 1380,
    expense: 1100,
    incomeRaw: 1380000000,
    expenseRaw: 1100000000,
  },
  {
    month: "T12",
    income: 1380,
    expense: 1060,
    incomeRaw: 1380000000,
    expenseRaw: 1060000000,
  },
]);

// Transaction log - synced with project expenses
const transactions = ref([
  // Dự án 1: Xây trường vùng cao Hà Giang (đã chi 680 triệu)
  {
    id: 1,
    date: "25/11/2024",
    description: "Mua vật liệu xây dựng đợt 3 - Điểm trường Hà Giang",
    project: "Xây trường vùng cao Hà Giang",
    category: "Giáo dục",
    categoryType: "education",
    amount: "- 120,000,000 đ",
    amountType: "expense",
    document: "CT-2024-156",
  },
  {
    id: 2,
    date: "20/11/2024",
    description: "Thanh toán nhân công thi công tháng 11",
    project: "Xây trường vùng cao Hà Giang",
    category: "Giáo dục",
    categoryType: "education",
    amount: "- 60,000,000 đ",
    amountType: "expense",
    document: "CT-2024-152",
  },
  {
    id: 3,
    date: "15/11/2024",
    description: "Mua bàn ghế, bảng viết cho phòng học",
    project: "Xây trường vùng cao Hà Giang",
    category: "Giáo dục",
    categoryType: "education",
    amount: "- 80,000,000 đ",
    amountType: "expense",
    document: "CT-2024-148",
  },
  // Dự án 2: Trái tim cho em 2024 (đã chi 1.62 tỷ)
  {
    id: 4,
    date: "10/11/2024",
    description: "Chi phí phẫu thuật tim cho bé Nguyễn Văn A",
    project: "Trái tim cho em 2024",
    category: "Y tế",
    categoryType: "health",
    amount: "- 85,000,000 đ",
    amountType: "expense",
    document: "CT-2024-145",
  },
  {
    id: 5,
    date: "05/11/2024",
    description: "Thuốc hậu phẫu và dinh dưỡng cho 3 bệnh nhi",
    project: "Trái tim cho em 2024",
    category: "Y tế",
    categoryType: "health",
    amount: "- 28,000,000 đ",
    amountType: "expense",
    document: "CT-2024-140",
  },
  // Dự án 3: Bữa cơm 0 đồng (đã chi 58.5 triệu)
  {
    id: 6,
    date: "01/11/2024",
    description: "Mua nguyên liệu thực phẩm tháng 11",
    project: "Bữa cơm 0 đồng",
    category: "Cứu trợ",
    categoryType: "relief",
    amount: "- 15,000,000 đ",
    amountType: "expense",
    document: "CT-2024-138",
  },
  // Các khoản thu
  {
    id: 7,
    date: "28/10/2024",
    description: "Quyên góp từ Công ty ABC cho dự án Hà Giang",
    project: "Xây trường vùng cao Hà Giang",
    category: "Ủng hộ",
    categoryType: "donation",
    amount: "+ 200,000,000 đ",
    amountType: "income",
    document: "PT-2024-320",
  },
  {
    id: 8,
    date: "25/10/2024",
    description: "Quyên góp từ cá nhân cho Trái tim cho em",
    project: "Trái tim cho em 2024",
    category: "Ủng hộ",
    categoryType: "donation",
    amount: "+ 50,000,000 đ",
    amountType: "income",
    document: "PT-2024-318",
  },
]);

// Featured projects with expense details
const featuredProjects = ref([
  {
    id: 1,
    title: "Xây trường vùng cao Hà Giang",
    description:
      "Dự án xây mới 5 phòng học và khu vệ sinh cho điểm trường Xín Mần.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format",
    status: "Đang thực hiện",
    statusType: "active",
    progress: 75,
    raised: "850tr (1.2 tỷ)",
    budget: 1200000000,
    spent: 680000000,
    expenses: [
      { item: "Vật liệu xây dựng", amount: 320000000, percent: 47 },
      { item: "Nhân công thi công", amount: 180000000, percent: 26 },
      { item: "Thiết bị nội thất", amount: 120000000, percent: 18 },
      { item: "Vận chuyển & khác", amount: 60000000, percent: 9 },
    ],
  },
  {
    id: 2,
    title: "Trái tim cho em 2024",
    description: "Hỗ trợ chi phí phẫu thuật tim bẩm sinh cho 20 em nhỏ.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&auto=format",
    status: "Hoàn thành 90%",
    statusType: "completing",
    progress: 90,
    raised: "1.8 tỷ / 2 tỷ",
    budget: 2000000000,
    spent: 1620000000,
    expenses: [
      { item: "Chi phí phẫu thuật", amount: 1200000000, percent: 74 },
      { item: "Hậu phẫu & thuốc", amount: 280000000, percent: 17 },
      { item: "Chi phí đi lại", amount: 100000000, percent: 6 },
      { item: "Hỗ trợ gia đình", amount: 40000000, percent: 3 },
    ],
  },
  {
    id: 3,
    title: "Bữa cơm 0 đồng",
    description: "Duy trì bếp ăn từ thiện phục vụ 500 suất cơm mỗi ngày.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format",
    status: "Đã hoàn thành",
    statusType: "completed",
    progress: 100,
    raised: "60tr / 60tr",
    budget: 60000000,
    spent: 58500000,
    expenses: [
      { item: "Nguyên liệu thực phẩm", amount: 42000000, percent: 72 },
      { item: "Gas & điện", amount: 8000000, percent: 14 },
      { item: "Hộp đựng & dụng cụ", amount: 5500000, percent: 9 },
      { item: "Vận hành khác", amount: 3000000, percent: 5 },
    ],
  },
]);

// Computed max for chart
const maxChartValue = computed(() => {
  return Math.max(
    ...monthlyData.value.map((d) => Math.max(d.income, d.expense))
  );
});

// Category legend items for transactions
const categoryLegendItems = ref([
  { key: "education", label: "Giáo dục", color: "#3b82f6" },
  { key: "health", label: "Y tế", color: "#ef4444" },
  { key: "relief", label: "Cứu trợ", color: "#f59e0b" },
  { key: "donation", label: "Ủng hộ", color: "#10b981" },
]);

// Report data for PDF
const reportData = computed(() => ({
  stats: stats.value,
  distribution: distribution.value,
  transactions: transactions.value,
  projects: featuredProjects.value,
}));

// Open PDF Modal
const downloadReport = () => {
  showPdfModal.value = true;
};
</script>

<template>
  <div class="reports-page">
    <section class="content-section">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-nav">
          <BackButton variant="default" />
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <RouterLink to="/">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active">Báo cáo tài chính</li>
          </ol>
        </nav>

        <!-- Page Header -->
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Báo cáo Quỹ {{ selectedYear }}</h1>
            <p class="page-subtitle">
              Minh bạch tài chính và hiệu quả hoạt động là ưu tiên hàng đầu.
            </p>
          </div>
          <button class="btn-download" @click="downloadReport">
            <i class="bi bi-download"></i> Tải báo cáo (PDF)
          </button>
        </div>

        <!-- Filters -->
        <div class="filters-row">
          <select v-model="selectedYear" class="filter-select">
            <option v-for="year in years" :key="year" :value="year">
              Năm {{ year }}
            </option>
          </select>
          <select v-model="selectedCategory" class="filter-select">
            <option v-for="cat in categories" :key="cat.key" :value="cat.key">
              {{ cat.label }}
            </option>
          </select>
          <button class="btn-apply">
            <i class="bi bi-funnel"></i> Áp dụng
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon green">
              <i class="bi bi-arrow-down-circle"></i>
            </div>
            <div>
              <p class="stat-label">TỔNG THU NĂM NAY</p>
              <h2 class="stat-value">{{ stats.totalIncome }} đ</h2>
              <span class="stat-change green"
                >{{ stats.incomeChange }} so với cùng kỳ</span
              >
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon orange">
              <i class="bi bi-arrow-up-circle"></i>
            </div>
            <div>
              <p class="stat-label">TỔNG CHI DỰ ÁN</p>
              <h2 class="stat-value">{{ stats.totalExpense }} đ</h2>
              <span class="stat-note"
                >{{ stats.expensePercent }} tổng ngân sách</span
              >
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon blue"><i class="bi bi-wallet2"></i></div>
            <div>
              <p class="stat-label">SỐ DƯ HIỆN TẠI</p>
              <h2 class="stat-value">{{ stats.remaining }} đ</h2>
              <span class="stat-note">{{ stats.remainingNote }}</span>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="charts-row">
          <!-- Pie Chart -->
          <div class="chart-box">
            <h3 class="chart-title">Phân bổ nguồn vốn (Chi tiết số tiền)</h3>
            <div class="pie-chart-container">
              <div class="pie-wrapper">
                <svg viewBox="0 0 36 36" class="pie-svg">
                  <circle cx="18" cy="18" r="15.9" class="pie-bg" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    class="pie-segment seg1"
                    stroke-dasharray="45 100"
                    stroke-dashoffset="0"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    class="pie-segment seg2"
                    stroke-dasharray="30 100"
                    stroke-dashoffset="-45"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    class="pie-segment seg3"
                    stroke-dasharray="15 100"
                    stroke-dashoffset="-75"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    class="pie-segment seg4"
                    stroke-dasharray="10 100"
                    stroke-dashoffset="-90"
                  />
                </svg>
                <div class="pie-center">
                  <span class="pie-percent">9.2 tỷ</span>
                  <span class="pie-label">Tổng chi</span>
                </div>
              </div>
              <div class="pie-legend">
                <div
                  v-for="item in distribution"
                  :key="item.label"
                  class="legend-row-detailed"
                >
                  <div class="legend-left">
                    <span
                      class="legend-dot"
                      :style="{ background: item.color }"
                    ></span>
                    <span class="legend-text">{{ item.label }}</span>
                  </div>
                  <div class="legend-right">
                    <span class="legend-amount">{{
                      formatAmount(item.amount)
                    }}</span>
                    <span class="legend-percent">{{ item.percent }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bar Chart -->
          <div class="chart-box">
            <div class="chart-header">
              <h3 class="chart-title">Xu hướng Thu/Chi (12 tháng)</h3>
              <div class="chart-legend">
                <span class="legend-item"
                  ><span class="dot green"></span>Thu</span
                >
                <span class="legend-item"
                  ><span class="dot orange"></span>Chi</span
                >
              </div>
            </div>
            <div class="bar-scroll-container">
              <div class="bar-chart">
                <div
                  v-for="item in monthlyData"
                  :key="item.month"
                  class="bar-group"
                >
                  <div class="bar-pair">
                    <div
                      class="bar green"
                      :style="{
                        height: (item.income / maxChartValue) * 100 + '%',
                      }"
                      :title="`Thu: ${formatAmount(item.incomeRaw)}`"
                    >
                      <span class="bar-tooltip"
                        >{{ Math.round(item.income) }}tr</span
                      >
                    </div>
                    <div
                      class="bar orange"
                      :style="{
                        height: (item.expense / maxChartValue) * 100 + '%',
                      }"
                      :title="`Chi: ${formatAmount(item.expenseRaw)}`"
                    >
                      <span class="bar-tooltip"
                        >{{ Math.round(item.expense) }}tr</span
                      >
                    </div>
                  </div>
                  <span class="bar-label">{{ item.month }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transaction Log -->
        <div class="transactions-box">
          <div class="section-header">
            <h3>Nhật ký giao dịch gần đây</h3>
            <RouterLink to="#" class="link-all">Xem tất cả →</RouterLink>
          </div>
          <div class="table-scroll">
            <table class="tx-table">
              <thead>
                <tr>
                  <th>NGÀY</th>
                  <th>MÔ TẢ</th>
                  <th class="hide-mobile">DỰ ÁN</th>
                  <th>DANH MỤC</th>
                  <th>SỐ TIỀN</th>
                  <th class="hide-mobile">CHỨNG TỪ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tx in transactions" :key="tx.id">
                  <td>{{ tx.date }}</td>
                  <td>{{ tx.description }}</td>
                  <td class="hide-mobile project-cell">{{ tx.project }}</td>
                  <td>
                    <span class="cat-dot" :class="tx.categoryType"></span>
                    <span class="cat-text desktop-only">{{ tx.category }}</span>
                  </td>
                  <td :class="tx.amountType">{{ tx.amount }}</td>
                  <td class="hide-mobile">{{ tx.document }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Category Legend for Mobile -->
          <CategoryLegend :items="categoryLegendItems" class="mobile-only" />
        </div>

        <!-- Projects with Expense Details -->
        <div class="projects-section">
          <div class="section-header-projects">
            <h3>Chi tiết chi tiêu theo dự án</h3>
            <p class="section-subtitle-small">
              Minh bạch từng khoản chi cho mỗi dự án
            </p>
          </div>
          <div class="projects-grid-detailed">
            <div
              v-for="project in featuredProjects"
              :key="project.id"
              class="project-card-detailed"
            >
              <div class="project-header-row">
                <div class="project-img-small">
                  <img :src="project.image" :alt="project.title" />
                </div>
                <div class="project-info-main">
                  <span class="status-badge" :class="project.statusType">{{
                    project.status
                  }}</span>
                  <h4>{{ project.title }}</h4>
                  <p class="project-desc">{{ project.description }}</p>
                </div>
              </div>

              <!-- Budget Summary -->
              <div class="budget-summary">
                <div class="budget-item">
                  <span class="budget-label">Ngân sách</span>
                  <span class="budget-value">{{
                    formatAmount(project.budget)
                  }}</span>
                </div>
                <div class="budget-item">
                  <span class="budget-label">Đã chi</span>
                  <span class="budget-value spent">{{
                    formatAmount(project.spent)
                  }}</span>
                </div>
                <div class="budget-item">
                  <span class="budget-label">Còn lại</span>
                  <span class="budget-value remaining">{{
                    formatAmount(project.budget - project.spent)
                  }}</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="project-progress">
                <div class="progress-info">
                  <span>Tiến độ giải ngân</span>
                  <span
                    >{{
                      Math.round((project.spent / project.budget) * 100)
                    }}%</span
                  >
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{
                      width: (project.spent / project.budget) * 100 + '%',
                    }"
                  ></div>
                </div>
              </div>

              <!-- Expense Breakdown -->
              <div class="expense-breakdown">
                <h5><i class="bi bi-list-check"></i> Chi tiết các khoản chi</h5>
                <div class="expense-list">
                  <div
                    v-for="(expense, idx) in project.expenses"
                    :key="idx"
                    class="expense-item"
                  >
                    <div class="expense-info">
                      <span class="expense-name">{{ expense.item }}</span>
                      <div class="expense-bar">
                        <div
                          class="expense-bar-fill"
                          :style="{ width: expense.percent + '%' }"
                        ></div>
                      </div>
                    </div>
                    <div class="expense-values">
                      <span class="expense-amount">{{
                        formatAmount(expense.amount)
                      }}</span>
                      <span class="expense-percent"
                        >{{ expense.percent }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <RouterLink to="#" class="btn-detail-full">
                <i class="bi bi-file-earmark-text"></i>
                Xem chứng từ đầy đủ
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PDF Export Modal -->
    <PdfExport
      v-if="showPdfModal"
      :report-data="reportData"
      :year="selectedYear"
      @close="showPdfModal = false"
    />
  </div>
</template>

<style scoped>
.reports-page {
  min-height: 100vh;
  background: #f8fafc;
}

.content-section {
  padding: 2rem 0 4rem;
}

/* Breadcrumb */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.breadcrumb {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}

.breadcrumb-item a {
  color: #6b7280;
  text-decoration: none;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  padding: 0 0.5rem;
  color: #9ca3af;
}

.breadcrumb-item.active {
  color: #374151;
}

/* Page Header */
.page-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem;
}

.page-subtitle {
  color: #6b7280;
  margin: 0;
}

.btn-download {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: transparent;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;
}

/* Filters */
.filters-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 0.85rem;
}

.btn-apply {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
}

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  display: flex;
  gap: 1rem;
  background: #fff;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.stat-icon.green {
  background: #d1fae5;
  color: #059669;
}
.stat-icon.orange {
  background: #fed7aa;
  color: #ea580c;
}
.stat-icon.blue {
  background: #dbeafe;
  color: #2563eb;
}

.stat-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.5px;
  margin: 0;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0.25rem 0;
}

.stat-change {
  font-size: 0.75rem;
}
.stat-change.green {
  color: #10b981;
}
.stat-note {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Charts Row */
.charts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.chart-box {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: #1f2937;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-header .chart-title {
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.dot.green {
  background: #10b981;
}
.dot.orange {
  background: #f97316;
}

/* Pie Chart */
.pie-chart-container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.pie-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  flex-shrink: 0;
}

.pie-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.pie-bg {
  fill: none;
  stroke: #e5e7eb;
  stroke-width: 3;
}

.pie-segment {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
}

.seg1 {
  stroke: #3b82f6;
}
.seg2 {
  stroke: #10b981;
}
.seg3 {
  stroke: #f59e0b;
}
.seg4 {
  stroke: #6b7280;
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.pie-percent {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.pie-label {
  font-size: 0.75rem;
  color: #9ca3af;
}

.pie-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legend-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-text {
  flex: 1;
  font-size: 0.8rem;
  color: #374151;
}

.legend-value {
  font-weight: 600;
  font-size: 0.8rem;
  color: #1f2937;
}

/* Bar Chart with Horizontal Scroll */
.bar-scroll-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.5rem;
}

.bar-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.bar-scroll-container::-webkit-scrollbar-track {
  background: #e5e7eb;
  border-radius: 3px;
}

.bar-scroll-container::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 3px;
}

.bar-chart {
  display: flex;
  gap: 0.5rem;
  min-width: max-content;
  height: 140px;
  align-items: flex-end;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 45px;
}

.bar-pair {
  display: flex;
  gap: 3px;
  height: 110px;
  align-items: flex-end;
}

.bar {
  width: 14px;
  border-radius: 3px 3px 0 0;
  min-height: 4px;
}

.bar.green {
  background: #10b981;
}
.bar.orange {
  background: #f97316;
}

.bar-label {
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 0.4rem;
}

/* Transactions */
.transactions-box {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.link-all {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.85rem;
}

.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tx-table {
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
}

.tx-table th {
  text-align: left;
  font-size: 0.65rem;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.5px;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.tx-table td {
  padding: 0.75rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
}

.cat-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  vertical-align: middle;
}

.cat-dot.education {
  background: #3b82f6;
}
.cat-dot.donation {
  background: #10b981;
}
.cat-dot.health {
  background: #ef4444;
}
.cat-dot.relief {
  background: #f59e0b;
}

.cat-text {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  color: #374151;
}

.project-cell {
  max-width: 150px;
  font-size: 0.8rem;
  color: #6b7280;
}

/* Mobile / Desktop utilities */
.mobile-only {
  display: none;
}
.desktop-only {
  display: inline;
}
.hide-mobile {
  display: table-cell;
}

.tx-table .income,
td.income {
  color: #10b981 !important;
  font-weight: 600;
}

.tx-table .expense,
td.expense {
  color: #ef4444 !important;
  font-weight: 600;
}

/* Projects */
.projects-section {
  margin-bottom: 2rem;
}

.projects-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.project-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.project-img {
  position: relative;
  height: 140px;
}

.project-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 600;
}

.status-badge.active {
  background: #dbeafe;
  color: #2563eb;
}
.status-badge.completing {
  background: #fef3c7;
  color: #d97706;
}
.status-badge.completed {
  background: #d1fae5;
  color: #059669;
}

.project-body {
  padding: 1rem;
}

.project-body h4 {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.project-body p {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0 0 0.75rem;
  line-height: 1.4;
}

.progress-row {
  margin-bottom: 0.75rem;
}

.progress-row span {
  font-size: 0.75rem;
  color: #6b7280;
}

.progress-bar {
  height: 5px;
  background: #e5e7eb;
  border-radius: 3px;
  margin: 0.25rem 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 3px;
}

.btn-detail {
  display: block;
  text-align: center;
  padding: 0.5rem;
  background: #f3f4f6;
  color: #374151;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Mobile */
@media (max-width: 768px) {
  .page-header-row {
    flex-direction: column;
  }

  .btn-download {
    width: 100%;
    justify-content: center;
  }

  .pie-chart-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .pie-wrapper {
    margin: 0 auto;
  }

  .pie-legend {
    width: 100%;
  }

  /* Show/hide utilities on mobile */
  .mobile-only {
    display: block;
  }
  .desktop-only {
    display: none !important;
  }
  .hide-mobile {
    display: none !important;
  }

  .projects-grid-detailed {
    grid-template-columns: 1fr;
  }
}

/* Detailed Legend Styles */
.legend-row-detailed {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.legend-row-detailed:last-child {
  border-bottom: none;
}

.legend-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legend-amount {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1f2937;
}

.legend-percent {
  font-size: 0.75rem;
  color: #9ca3af;
  background: #f3f4f6;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

/* Bar Chart Tooltips */
.bar {
  position: relative;
}

.bar-tooltip {
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #1f2937;
  color: #fff;
  font-size: 0.65rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  white-space: nowrap;
  margin-bottom: 4px;
}

.bar:hover .bar-tooltip {
  display: block;
}

/* Detailed Project Cards */
.section-header-projects {
  margin-bottom: 1.25rem;
}

.section-header-projects h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.section-subtitle-small {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.projects-grid-detailed {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.project-card-detailed {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.project-header-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.project-img-small {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.project-img-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-info-main {
  flex: 1;
}

.project-info-main .status-badge {
  position: static;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.project-info-main h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: #1f2937;
}

.project-desc {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

/* Budget Summary */
.budget-summary {
  display: flex;
  gap: 1rem;
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.budget-item {
  flex: 1;
  text-align: center;
}

.budget-label {
  display: block;
  font-size: 0.7rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.budget-value {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 0.25rem;
}

.budget-value.spent {
  color: #ef4444;
}

.budget-value.remaining {
  color: #10b981;
}

/* Project Progress */
.project-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

/* Expense Breakdown */
.expense-breakdown {
  background: #fafafa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.expense-breakdown h5 {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.expense-breakdown h5 i {
  color: #3b82f6;
}

.expense-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.expense-info {
  flex: 1;
}

.expense-name {
  display: block;
  font-size: 0.8rem;
  color: #374151;
  margin-bottom: 0.25rem;
}

.expense-bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.expense-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 2px;
}

.expense-values {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.expense-amount {
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f2937;
}

.expense-percent {
  font-size: 0.7rem;
  color: #9ca3af;
  background: #e5e7eb;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}

.btn-detail-full {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem;
  background: #3b82f6;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-detail-full:hover {
  background: #2563eb;
  color: #fff;
}
</style>
