<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import BackButton from "@/components/common/BackButton.vue";

// Partnership types
const partnershipTypes = ref([
  {
    id: 1,
    title: "Tài trợ dự án",
    icon: "coin",
    description:
      "Đóng góp tài chính cho các dự án giáo dục, y tế và cứu trợ cộng đồng",
    benefits: [
      "Logo hiển thị trên website và ấn phẩm",
      "Báo cáo chi tiết việc sử dụng nguồn tài trợ",
      "Giấy chứng nhận đóng góp từ thiện",
      "Tham gia các sự kiện của Quỹ",
    ],
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "Hợp tác chuyên môn",
    icon: "mortarboard",
    description:
      "Đóng góp kiến thức, kỹ năng chuyên môn trong lĩnh vực giáo dục, y tế",
    benefits: [
      "Tham gia giảng dạy, tập huấn",
      "Tư vấn chuyên môn cho các dự án",
      "Nghiên cứu đánh giá tác động",
      "Kết nối mạng lưới chuyên gia",
    ],
    color: "#10b981",
  },
  {
    id: 3,
    title: "Đối tác truyền thông",
    icon: "megaphone",
    description: "Hỗ trợ lan tỏa thông điệp, nâng cao nhận thức cộng đồng",
    benefits: [
      "Đồng hành trong các chiến dịch",
      "Hỗ trợ sản xuất nội dung",
      "Chia sẻ kênh truyền thông",
      "Tổ chức sự kiện chung",
    ],
    color: "#f59e0b",
  },
]);

// Current partners
const partners = ref([
  { name: "Đại học Y Hà Nội", logo: "🏥", type: "Chuyên môn" },
  { name: "Công ty ABC", logo: "🏢", type: "Tài trợ" },
  { name: "Báo Tuổi Trẻ", logo: "📰", type: "Truyền thông" },
  { name: "VTV", logo: "📺", type: "Truyền thông" },
  { name: "Bệnh viện Nhi TW", logo: "🏨", type: "Chuyên môn" },
  { name: "FPT Software", logo: "💻", type: "Tài trợ" },
]);

// Form data
const partnerForm = ref({
  organizationName: "",
  contactPerson: "",
  position: "",
  email: "",
  phone: "",
  partnershipType: "",
  message: "",
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);

const submitForm = () => {
  isSubmitting.value = true;
  setTimeout(() => {
    console.log("Partner form submitted:", partnerForm.value);
    isSubmitting.value = false;
    submitSuccess.value = true;
  }, 1500);
};
</script>

<template>
  <div class="partnership-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="container">
        <nav class="breadcrumb-nav">
          <BackButton variant="light" />
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <RouterLink to="/">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active">Hợp tác</li>
          </ol>
        </nav>

        <div class="hero-content">
          <span class="hero-badge">
            <i class="bi bi-handshake"></i>
            Cùng nhau tạo tác động
          </span>
          <h1>Hợp tác cùng chúng tôi</h1>
          <p>
            Kết nối với Quỹ Bông Hồng Nhỏ để tạo ra những thay đổi tích cực cho
            cộng đồng
          </p>
          <div class="hero-actions">
            <a href="#partnership-form" class="btn-primary">
              <i class="bi bi-envelope"></i>
              Gửi đề xuất hợp tác
            </a>
            <RouterLink to="/dang-ky-chuyen-gia" class="btn-secondary">
              <i class="bi bi-person-badge"></i>
              Đăng ký Chuyên gia
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Partner Section -->
    <section class="why-partner-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="section-content">
              <span class="section-badge">
                <i class="bi bi-star-fill"></i>
                Tại sao chọn chúng tôi?
              </span>
              <h2>Đối tác tin cậy cho trách nhiệm xã hội</h2>
              <p>
                Quỹ Bông Hồng Nhỏ cam kết minh bạch 100% trong mọi hoạt động,
                đảm bảo mỗi đồng đóng góp đều đến đúng người cần.
              </p>
              <ul class="benefits-list">
                <li>
                  <i class="bi bi-check-circle-fill"></i>
                  Báo cáo tài chính công khai hàng tháng
                </li>
                <li>
                  <i class="bi bi-check-circle-fill"></i>
                  Hơn 5 năm kinh nghiệm hoạt động
                </li>
                <li>
                  <i class="bi bi-check-circle-fill"></i>
                  Mạng lưới 85+ tình nguyện viên
                </li>
                <li>
                  <i class="bi bi-check-circle-fill"></i>
                  Hoạt động tại 25+ tỉnh thành
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-value">5.5 tỷ+</span>
                <span class="stat-label">Tổng quyên góp</span>
              </div>
              <div class="stat-card">
                <span class="stat-value">120+</span>
                <span class="stat-label">Dự án hoàn thành</span>
              </div>
              <div class="stat-card">
                <span class="stat-value">5,000+</span>
                <span class="stat-label">Người thụ hưởng</span>
              </div>
              <div class="stat-card">
                <span class="stat-value">100%</span>
                <span class="stat-label">Minh bạch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partnership Types -->
    <section class="partnership-types-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-diagram-3"></i>
            Hình thức hợp tác
          </span>
          <h2>Chọn hình thức phù hợp với bạn</h2>
        </div>

        <div class="row g-4">
          <div v-for="type in partnershipTypes" :key="type.id" class="col-lg-4">
            <div class="partnership-card">
              <div class="card-icon" :style="{ background: type.color }">
                <i :class="`bi bi-${type.icon}`"></i>
              </div>
              <h3>{{ type.title }}</h3>
              <p>{{ type.description }}</p>
              <ul class="card-benefits">
                <li v-for="benefit in type.benefits" :key="benefit">
                  <i class="bi bi-check2"></i>
                  {{ benefit }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Current Partners -->
    <section class="current-partners-section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">
            <i class="bi bi-people"></i>
            Đối tác của chúng tôi
          </span>
          <h2>Những đối tác đồng hành</h2>
        </div>

        <div class="partners-grid">
          <div
            v-for="partner in partners"
            :key="partner.name"
            class="partner-item"
          >
            <span class="partner-logo">{{ partner.logo }}</span>
            <span class="partner-name">{{ partner.name }}</span>
            <span class="partner-type">{{ partner.type }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Partnership Form -->
    <section id="partnership-form" class="form-section">
      <div class="container">
        <div class="form-wrapper">
          <div class="row">
            <div class="col-lg-5">
              <div class="form-info">
                <h3>Liên hệ hợp tác</h3>
                <p>
                  Gửi thông tin để chúng tôi liên hệ lại với bạn trong 24-48 giờ
                  làm việc.
                </p>
                <div class="contact-methods">
                  <div class="contact-item">
                    <i class="bi bi-envelope"></i>
                    <span>partnership@bonghongnho.org</span>
                  </div>
                  <div class="contact-item">
                    <i class="bi bi-telephone"></i>
                    <span>(+84) 906.22.04.22</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-7">
              <div v-if="submitSuccess" class="success-message">
                <i class="bi bi-check-circle-fill"></i>
                <h4>Cảm ơn bạn đã liên hệ!</h4>
                <p>Chúng tôi sẽ phản hồi trong vòng 24-48 giờ làm việc.</p>
              </div>

              <form v-else @submit.prevent="submitForm" class="partner-form">
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label"
                      >Tên tổ chức / Doanh nghiệp *</label
                    >
                    <input
                      v-model="partnerForm.organizationName"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Người liên hệ *</label>
                    <input
                      v-model="partnerForm.contactPerson"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Chức vụ</label>
                    <input
                      v-model="partnerForm.position"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Email *</label>
                    <input
                      v-model="partnerForm.email"
                      type="email"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Số điện thoại *</label>
                    <input
                      v-model="partnerForm.phone"
                      type="tel"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="col-12">
                    <label class="form-label"
                      >Hình thức hợp tác quan tâm *</label
                    >
                    <select
                      v-model="partnerForm.partnershipType"
                      class="form-select"
                      required
                    >
                      <option value="">Chọn hình thức</option>
                      <option value="sponsor">Tài trợ dự án</option>
                      <option value="expert">Hợp tác chuyên môn</option>
                      <option value="media">Đối tác truyền thông</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Nội dung đề xuất</label>
                    <textarea
                      v-model="partnerForm.message"
                      class="form-control"
                      rows="4"
                      placeholder="Mô tả chi tiết về đề xuất hợp tác của bạn..."
                    ></textarea>
                  </div>
                  <div class="col-12">
                    <button
                      type="submit"
                      class="btn-submit"
                      :disabled="isSubmitting"
                    >
                      <span v-if="isSubmitting">
                        <i class="bi bi-arrow-repeat spin"></i>
                        Đang gửi...
                      </span>
                      <span v-else>
                        <i class="bi bi-send"></i>
                        Gửi đề xuất hợp tác
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Bạn là chuyên gia muốn đóng góp?</h2>
          <p>
            Đăng ký tham gia với tư cách bác sĩ, giáo viên, hoặc chuyên gia tư
            vấn
          </p>
          <RouterLink to="/dang-ky-chuyen-gia" class="btn-cta">
            <i class="bi bi-person-badge"></i>
            Đăng ký Chuyên gia
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.partnership-page {
  min-height: 100vh;
}

/* Hero */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
  padding: 2rem 0 5rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920")
    center/cover;
  opacity: 0.1;
}

.breadcrumb-nav {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.breadcrumb-item a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.breadcrumb-item.active {
  color: rgba(255, 255, 255, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.hero-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.hero-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  color: #fff;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

/* Why Partner */
.why-partner-section {
  padding: 5rem 0;
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

.section-content h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.section-content > p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefits-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #374151;
}

.benefits-list li i {
  color: #10b981;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Partnership Types */
.partnership-types-section {
  padding: 5rem 0;
  background: #f8fafc;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.partnership-card {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.partnership-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.card-icon i {
  font-size: 1.5rem;
  color: #fff;
}

.partnership-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.partnership-card > p {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.card-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-benefits li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0;
  font-size: 0.85rem;
  color: #374151;
}

.card-benefits li i {
  color: #10b981;
}

/* Current Partners */
.current-partners-section {
  padding: 5rem 0;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.partner-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  text-align: center;
  transition: all 0.2s;
}

.partner-item:hover {
  background: #f1f5f9;
}

.partner-logo {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.partner-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.partner-type {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Form Section */
.form-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
}

.form-wrapper {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
}

.form-info {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  padding: 2.5rem;
  height: 100%;
}

.form-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.form-info > p {
  opacity: 0.9;
  margin-bottom: 2rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-item i {
  font-size: 1.25rem;
}

.partner-form {
  padding: 2.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-control,
.form-select {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.btn-submit:disabled {
  opacity: 0.7;
}

.success-message {
  text-align: center;
  padding: 3rem;
}

.success-message i {
  font-size: 3rem;
  color: #10b981;
  margin-bottom: 1rem;
}

.success-message h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.success-message p {
  color: #6b7280;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background: #f8fafc;
}

.cta-content {
  text-align: center;
}

.cta-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.cta-content p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  color: #fff;
}

/* Responsive */
@media (max-width: 992px) {
  .form-info {
    border-radius: 20px 20px 0 0;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.75rem;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
