<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  year: {
    type: String,
    default: "2022",
  },
});

// Mock data các khoản đóng góp
const donations = ref([
  {
    id: 1,
    date: "12/1/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Hoàng Thị Lệ Trinh",
    amount: 98000000,
  },
  {
    id: 2,
    date: "19/8/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Cty The Caterers",
    amount: 5000000,
  },
  {
    id: 3,
    date: "19/8/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Mr Joe Global cafe",
    amount: 5000000,
  },
  {
    id: 4,
    date: "20/8/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Tuyết Lan",
    amount: 5000000,
  },
  {
    id: 5,
    date: "20/8/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Nguyễn Thị Phụng",
    amount: 2000000,
  },
  {
    id: 6,
    date: "22/8/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Cty Education Solutions VN",
    amount: 1000000,
  },
  {
    id: 7,
    date: "23/8/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - từ chương trình sinh nhật NHG",
    amount: 39500000,
  },
  {
    id: 8,
    date: "6/9/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Hoàng Quốc Anh Tuấn",
    amount: 7300000,
  },
  {
    id: 9,
    date: "6/9/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Trang Minh Hà",
    amount: 730000,
  },
  {
    id: 10,
    date: "7/9/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Hoàng Quốc Anh Tuấn",
    amount: 73000000,
  },
  {
    id: 11,
    date: "7/9/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Nguyễn Mai Chinh",
    amount: 100000000,
  },
  {
    id: 12,
    date: "29/9/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Hoàng Thị Lệ Trinh",
    amount: 20000000,
  },
  {
    id: 13,
    date: "29/9/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Trần Nguyễn Thị Mai Sương",
    amount: 2000000,
  },
  {
    id: 14,
    date: "30/9/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Đặng Thế Đức",
    amount: 10000000,
  },
  {
    id: 15,
    date: "30/9/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Tô Thanh Hiệp",
    amount: 999999,
  },
  {
    id: 16,
    date: "1/10/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Công ty ABC",
    amount: 50000000,
  },
  {
    id: 17,
    date: "5/10/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Nguyễn Văn An",
    amount: 15000000,
  },
  {
    id: 18,
    date: "10/10/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Trần Thị Bình",
    amount: 8500000,
  },
  {
    id: 19,
    date: "15/10/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Lê Hoàng Cường",
    amount: 25000000,
  },
  {
    id: 20,
    date: "20/10/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Phạm Thị Dung",
    amount: 12000000,
  },
  {
    id: 21,
    date: "25/10/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Võ Minh Hiếu",
    amount: 35000000,
  },
  {
    id: 22,
    date: "1/11/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Công ty XYZ",
    amount: 80000000,
  },
  {
    id: 23,
    date: "5/11/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Nguyễn Thị Hương",
    amount: 4500000,
  },
  {
    id: 24,
    date: "10/11/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Đinh Văn Khoa",
    amount: 6000000,
  },
  {
    id: 25,
    date: "15/11/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Hoàng Thị Lan",
    amount: 9000000,
  },
  {
    id: 26,
    date: "20/11/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Bùi Minh Long",
    amount: 18000000,
  },
  {
    id: 27,
    date: "25/11/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Đỗ Thị Mai",
    amount: 7500000,
  },
  {
    id: 28,
    date: "1/12/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Lý Văn Nam",
    amount: 22000000,
  },
  {
    id: 29,
    date: "5/12/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Cao Thị Oanh",
    amount: 3000000,
  },
  {
    id: 30,
    date: "10/12/2022",
    description: "Thu tiền ủng hộ Quỹ BHN - Trịnh Văn Phát",
    amount: 45000000,
  },
]);

// Pagination
const itemsPerPage = 15;
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(donations.value.length / itemsPerPage)
);

const paginatedDonations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return donations.value.slice(start, end);
});

// Format số tiền
const formatCurrency = (amount) => {
  return amount.toLocaleString("vi-VN");
};

// Tổng tiền đóng góp
const totalAmount = computed(() => {
  return donations.value.reduce((sum, d) => sum + d.amount, 0);
});

// Change page
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Scroll to top of table
    const tableEl = document.querySelector(".donor-table-wrapper");
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};
</script>

<template>
  <div class="donor-table-wrapper">
    <!-- Header -->
    <div class="table-header">
      <h2 class="table-title">CÁC KHOẢN ĐÓNG GÓP TRONG NĂM {{ year }}</h2>
      <p class="table-subtitle">QUỸ TỪ THIỆN BÔNG HỒNG NHỎ</p>
    </div>

    <!-- Summary -->
    <div class="summary-row">
      <div class="summary-item">
        <i class="bi bi-people-fill"></i>
        <span>{{ donations.length }} lượt đóng góp</span>
      </div>
      <div class="summary-item total">
        <i class="bi bi-cash-stack"></i>
        <span>Tổng: {{ formatCurrency(totalAmount) }} VNĐ</span>
      </div>
    </div>

    <!-- Table -->
    <div class="table-scroll">
      <table class="donor-table">
        <thead>
          <tr>
            <th class="col-stt">STT</th>
            <th class="col-date">Ngày</th>
            <th class="col-description">Danh sách Nhà hảo tâm</th>
            <th class="col-amount">Số tiền (VNĐ)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(donation, index) in paginatedDonations"
            :key="donation.id"
          >
            <td class="col-stt">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </td>
            <td class="col-date">{{ donation.date }}</td>
            <td class="col-description">{{ donation.description }}</td>
            <td class="col-amount">{{ formatCurrency(donation.amount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        class="page-btn"
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
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.donor-table-wrapper {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Header */
.table-header {
  background: linear-gradient(
    135deg,
    var(--color-primary, #b12029),
    var(--color-primary-dark, #8a1820)
  );
  color: #fff;
  padding: 1.5rem 2rem;
  text-align: center;
}

.table-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  letter-spacing: 0.5px;
  color: #fff;
}

.table-subtitle {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
}

/* Summary */
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.summary-item i {
  color: var(--color-primary, #b12029);
}

.summary-item.total {
  font-weight: 600;
  color: var(--color-secondary, #2a7050);
}

.summary-item.total i {
  color: var(--color-secondary, #2a7050);
}

/* Table Scroll */
.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Table */
.donor-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.donor-table thead {
  background: #f1f5f9;
}

.donor-table th {
  padding: 1rem;
  text-align: left;
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e2e8f0;
}

.donor-table td {
  padding: 0.875rem 1rem;
  font-size: 0.9rem;
  color: #1f2937;
  border-bottom: 1px solid #f1f5f9;
}

.donor-table tbody tr:hover {
  background: #fef7f7;
}

.donor-table tbody tr:nth-child(even) {
  background: #fafafa;
}

.donor-table tbody tr:nth-child(even):hover {
  background: #fef7f7;
}

/* Column widths */
.col-stt {
  width: 60px;
  text-align: center !important;
}

.col-date {
  width: 100px;
  white-space: nowrap;
  color: var(--color-primary, #b12029) !important;
  font-weight: 500;
}

.col-description {
  min-width: 300px;
}

.col-amount {
  width: 140px;
  text-align: right !important;
  font-weight: 600;
  color: var(--color-secondary, #2a7050) !important;
  white-space: nowrap;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-top: 1px solid #e5e7eb;
}

.page-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 0.5rem;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #6b7280;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--color-primary, #b12029);
  color: var(--color-primary, #b12029);
}

.page-btn.active {
  background: var(--color-primary, #b12029);
  border-color: var(--color-primary, #b12029);
  color: #fff;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .table-header {
    padding: 1rem 1.25rem;
  }

  .table-title {
    font-size: 1rem;
  }

  .table-subtitle {
    font-size: 0.8rem;
  }

  .summary-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .donor-table th,
  .donor-table td {
    padding: 0.75rem 0.75rem;
    font-size: 0.85rem;
  }

  .col-stt {
    width: 40px;
  }

  .col-date {
    width: 80px;
  }
}
</style>

