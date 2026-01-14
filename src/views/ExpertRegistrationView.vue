<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import BackButton from "@/components/common/BackButton.vue";

// Form data
const expertForm = ref({
  fullName: "",
  email: "",
  phone: "",
  expertise: "",
  organization: "",
  position: "",
  experience: "",
  qualifications: "",
  specialties: [],
  availability: "",
  motivation: "",
  agreeTerms: false,
});

const expertiseOptions = [
  { value: "medical", label: "Y tế / Sức khỏe" },
  { value: "education", label: "Giáo dục / Đào tạo" },
  { value: "psychology", label: "Tâm lý / Tư vấn" },
  { value: "nutrition", label: "Dinh dưỡng" },
  { value: "social-work", label: "Công tác xã hội" },
  { value: "legal", label: "Pháp lý" },
  { value: "finance", label: "Tài chính / Kế toán" },
  { value: "it", label: "Công nghệ thông tin" },
  { value: "communication", label: "Truyền thông / Marketing" },
  { value: "other", label: "Khác" },
];

const specialtyOptions = [
  "Khám bệnh tổng quát",
  "Nhi khoa",
  "Mắt",
  "Răng hàm mặt",
  "Tâm lý trẻ em",
  "Dinh dưỡng",
  "Giảng dạy tiểu học",
  "Giảng dạy THCS/THPT",
  "Dạy kỹ năng sống",
  "Hướng nghiệp",
  "Tư vấn pháp lý",
  "Kế toán",
  "Thiết kế đồ họa",
  "Lập trình web/mobile",
  "Khác",
];

const availabilityOptions = [
  { value: "monthly", label: "Hàng tháng (1-2 lần/tháng)" },
  { value: "quarterly", label: "Hàng quý (3-4 lần/năm)" },
  { value: "project", label: "Theo dự án cụ thể" },
  { value: "remote", label: "Tư vấn từ xa / Online" },
  { value: "flexible", label: "Linh hoạt" },
];

const isSubmitting = ref(false);
const submitSuccess = ref(false);

const submitForm = () => {
  isSubmitting.value = true;
  setTimeout(() => {
    console.log("Expert form submitted:", expertForm.value);
    isSubmitting.value = false;
    submitSuccess.value = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1500);
};

const resetForm = () => {
  expertForm.value = {
    fullName: "",
    email: "",
    phone: "",
    expertise: "",
    organization: "",
    position: "",
    experience: "",
    qualifications: "",
    specialties: [],
    availability: "",
    motivation: "",
    agreeTerms: false,
  };
  submitSuccess.value = false;
};
</script>

<template>
  <div class="expert-registration-page">
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
            <li class="breadcrumb-item">
              <RouterLink to="/hop-tac">Hợp tác</RouterLink>
            </li>
            <li class="breadcrumb-item active">Đăng ký Chuyên gia</li>
          </ol>
        </nav>

        <div class="hero-content">
          <span class="hero-badge">
            <i class="bi bi-person-badge"></i>
            Dành cho chuyên gia
          </span>
          <h1>Đăng ký Chuyên gia / Cố vấn</h1>
          <p>
            Đóng góp kiến thức và kinh nghiệm chuyên môn của bạn để hỗ trợ cộng
            đồng
          </p>
        </div>
      </div>
    </section>

    <!-- Form Section -->
    <section class="form-section">
      <div class="container">
        <!-- Success Message -->
        <div v-if="submitSuccess" class="success-card">
          <div class="success-icon">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <h2>Đăng ký thành công!</h2>
          <p>
            Cảm ơn bạn đã đăng ký tham gia với tư cách chuyên gia. Chúng tôi sẽ
            liên hệ trong vòng 3-5 ngày làm việc để trao đổi chi tiết.
          </p>
          <div class="success-actions">
            <RouterLink to="/hop-tac" class="btn-secondary">
              <i class="bi bi-arrow-left"></i>
              Về trang Hợp tác
            </RouterLink>
            <button @click="resetForm" class="btn-primary">
              <i class="bi bi-plus-circle"></i>
              Đăng ký thêm
            </button>
          </div>
        </div>

        <!-- Registration Form -->
        <div v-else class="form-wrapper">
          <div class="row">
            <!-- Sidebar -->
            <div class="col-lg-4">
              <div class="form-sidebar">
                <h4>
                  <i class="bi bi-lightbulb"></i>
                  Lĩnh vực cần chuyên gia
                </h4>
                <ul class="needs-list">
                  <li>
                    <i class="bi bi-heart-pulse"></i>
                    <span>Bác sĩ, y tá cho khám bệnh miễn phí</span>
                  </li>
                  <li>
                    <i class="bi bi-book"></i>
                    <span>Giáo viên dạy kèm, hướng dẫn học tập</span>
                  </li>
                  <li>
                    <i class="bi bi-emoji-smile"></i>
                    <span>Chuyên gia tâm lý tư vấn trẻ em</span>
                  </li>
                  <li>
                    <i class="bi bi-briefcase"></i>
                    <span>Cố vấn hướng nghiệp cho học sinh</span>
                  </li>
                  <li>
                    <i class="bi bi-palette"></i>
                    <span>Thiết kế, truyền thông</span>
                  </li>
                </ul>

                <div class="contact-box">
                  <h5>Liên hệ hỗ trợ</h5>
                  <a href="tel:+84906220422" class="phone-link">
                    <i class="bi bi-telephone"></i>
                    (+84) 906.22.04.22
                  </a>
                  <a href="mailto:expert@bonghongnho.org" class="email-link">
                    <i class="bi bi-envelope"></i>
                    expert@bonghongnho.org
                  </a>
                </div>
              </div>
            </div>

            <!-- Form -->
            <div class="col-lg-8">
              <form @submit.prevent="submitForm" class="expert-form">
                <!-- Personal Info -->
                <div class="form-section-header">
                  <i class="bi bi-person"></i>
                  <h5>Thông tin cá nhân</h5>
                </div>

                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Họ và tên *</label>
                    <input
                      v-model="expertForm.fullName"
                      type="text"
                      class="form-control"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Email *</label>
                    <input
                      v-model="expertForm.email"
                      type="email"
                      class="form-control"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Số điện thoại *</label>
                    <input
                      v-model="expertForm.phone"
                      type="tel"
                      class="form-control"
                      placeholder="0901234567"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Lĩnh vực chuyên môn *</label>
                    <select
                      v-model="expertForm.expertise"
                      class="form-select"
                      required
                    >
                      <option value="">Chọn lĩnh vực</option>
                      <option
                        v-for="opt in expertiseOptions"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        {{ opt.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Professional Info -->
                <div class="form-section-header mt-4">
                  <i class="bi bi-briefcase"></i>
                  <h5>Thông tin chuyên môn</h5>
                </div>

                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Đơn vị công tác *</label>
                    <input
                      v-model="expertForm.organization"
                      type="text"
                      class="form-control"
                      placeholder="VD: Bệnh viện Nhi Trung ương"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Chức vụ / Vị trí</label>
                    <input
                      v-model="expertForm.position"
                      type="text"
                      class="form-control"
                      placeholder="VD: Bác sĩ chuyên khoa II"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Số năm kinh nghiệm *</label>
                    <select
                      v-model="expertForm.experience"
                      class="form-select"
                      required
                    >
                      <option value="">Chọn kinh nghiệm</option>
                      <option value="1-3">1-3 năm</option>
                      <option value="3-5">3-5 năm</option>
                      <option value="5-10">5-10 năm</option>
                      <option value="10+">Trên 10 năm</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label"
                      >Thời gian có thể tham gia *</label
                    >
                    <select
                      v-model="expertForm.availability"
                      class="form-select"
                      required
                    >
                      <option value="">Chọn thời gian</option>
                      <option
                        v-for="opt in availabilityOptions"
                        :key="opt.value"
                        :value="opt.value"
                      >
                        {{ opt.label }}
                      </option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Bằng cấp / Chứng chỉ</label>
                    <textarea
                      v-model="expertForm.qualifications"
                      class="form-control"
                      rows="2"
                      placeholder="VD: Tiến sĩ Y khoa, Chứng chỉ hành nghề..."
                    ></textarea>
                  </div>
                </div>

                <!-- Specialties -->
                <div class="form-section-header mt-4">
                  <i class="bi bi-star"></i>
                  <h5>Chuyên môn cụ thể có thể đóng góp</h5>
                </div>

                <p class="form-help-text">
                  Chọn một hoặc nhiều lĩnh vực bạn có thể hỗ trợ
                </p>
                <div class="specialties-grid">
                  <div
                    v-for="specialty in specialtyOptions"
                    :key="specialty"
                    class="specialty-checkbox"
                  >
                    <input
                      type="checkbox"
                      :id="`specialty-${specialty}`"
                      :value="specialty"
                      v-model="expertForm.specialties"
                      class="form-check-input"
                    />
                    <label
                      :for="`specialty-${specialty}`"
                      class="form-check-label"
                    >
                      {{ specialty }}
                    </label>
                  </div>
                </div>

                <!-- Motivation -->
                <div class="form-section-header mt-4">
                  <i class="bi bi-chat-heart"></i>
                  <h5>Chia sẻ thêm</h5>
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Lý do bạn muốn tham gia và đóng góp chuyên môn
                  </label>
                  <textarea
                    v-model="expertForm.motivation"
                    class="form-control"
                    rows="3"
                    placeholder="Chia sẻ động lực và mong muốn của bạn..."
                  ></textarea>
                </div>

                <!-- Terms -->
                <div class="terms-checkbox">
                  <input
                    type="checkbox"
                    v-model="expertForm.agreeTerms"
                    id="agreeTerms"
                    class="form-check-input"
                    required
                  />
                  <label for="agreeTerms" class="form-check-label">
                    Tôi xác nhận thông tin trên là chính xác và cam kết tham gia
                    các hoạt động với tinh thần trách nhiệm
                  </label>
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  class="btn-submit"
                  :disabled="isSubmitting || !expertForm.agreeTerms"
                >
                  <span v-if="isSubmitting">
                    <i class="bi bi-arrow-repeat spin"></i>
                    Đang gửi...
                  </span>
                  <span v-else>
                    <i class="bi bi-send-fill"></i>
                    Gửi đăng ký
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.expert-registration-page {
  min-height: 100vh;
  background: #f1f5f9;
}

/* Hero */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  padding: 2rem 0 4rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920")
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
  max-width: 600px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.hero-content h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.hero-content p {
  color: rgba(255, 255, 255, 0.9);
}

/* Form Section */
.form-section {
  padding: 0 0 4rem;
  margin-top: -2rem;
  position: relative;
  z-index: 2;
}

.form-wrapper {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Sidebar */
.form-sidebar {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  padding: 2rem;
  height: 100%;
}

.form-sidebar h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
}

.needs-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.needs-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.needs-list li i {
  margin-top: 2px;
  opacity: 0.8;
}

.contact-box {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.25rem;
}

.contact-box h5 {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.phone-link,
.email-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  text-decoration: none;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.phone-link:hover,
.email-link:hover {
  opacity: 0.9;
}

/* Expert Form */
.expert-form {
  padding: 2rem;
}

.form-section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.form-section-header i {
  font-size: 1.25rem;
  color: #10b981;
}

.form-section-header h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.form-help-text {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-control,
.form-select {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Specialties Grid */
.specialties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.5rem;
}

.specialty-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
}

.specialty-checkbox:has(input:checked) {
  background: #ecfdf5;
  border-color: #10b981;
}

.specialty-checkbox .form-check-input {
  margin: 0;
}

.specialty-checkbox .form-check-label {
  font-size: 0.8rem;
  cursor: pointer;
}

/* Terms */
.terms-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 8px;
}

.terms-checkbox .form-check-input {
  margin-top: 3px;
  flex-shrink: 0;
}

.terms-checkbox .form-check-label {
  font-size: 0.85rem;
  color: #78350f;
}

/* Submit Button */
.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

/* Success Card */
.success-card {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  background: #fff;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon i {
  font-size: 2.5rem;
  color: #10b981;
}

.success-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
}

.success-card p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.success-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-secondary,
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-primary {
  background: #10b981;
  color: #fff;
}

.btn-primary:hover {
  background: #059669;
}

/* Responsive */
@media (max-width: 992px) {
  .form-sidebar {
    border-radius: 16px 16px 0 0;
    margin: -2rem -2rem 2rem;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.75rem;
  }

  .expert-form {
    padding: 1.5rem;
  }

  .specialties-grid {
    grid-template-columns: 1fr;
  }
}
</style>
