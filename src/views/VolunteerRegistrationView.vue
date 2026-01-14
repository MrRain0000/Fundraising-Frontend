<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import BackButton from "@/components/common/BackButton.vue";

// Form data matching the official template
const volunteerForm = ref({
  // Thông tin cá nhân
  fullName: "",
  gender: "",
  birthDate: "",
  bloodType: "",
  ethnicity: "",
  nationality: "Việt Nam",
  phone: "",
  email: "",
  cccdNumber: "",
  cccdIssueDate: "",
  cccdIssuePlace: "",
  youthUnionDate: "",
  partyDate: "",
  permanentAddress: "",
  currentAddress: "",
  occupation: "",
  workplace: "",
  expertise: "",
  // Đăng ký tham gia
  programs: [],
  department: "",
  commitmentDuration: "",
  agreeTerms: false,
});

const genderOptions = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" },
];

const bloodTypeOptions = ["A", "B", "AB", "O", "Không rõ"];

const programOptions = [
  "Chương trình sức khỏe học đường và cộng đồng",
  "Nâng cao nhận thức phòng ngừa tật bệnh",
  "Chương trình cứu trợ khẩn cấp",
  "Chương trình giáo dục và học bổng",
  "Bữa cơm 0 đồng",
];

const departmentOptions = [
  "Truyền thông & Marketing",
  "Tổ chức sự kiện",
  "Y tế & Sức khỏe",
  "Giáo dục & Đào tạo",
  "Hậu cần & Vận chuyển",
  "Tài chính & Kế toán",
  "Công nghệ thông tin",
  "Nhiếp ảnh & Quay phim",
  "Thiết kế đồ họa",
  "Dịch thuật & Ngoại ngữ",
];

const durationOptions = [
  { value: "1-month", label: "1 tháng" },
  { value: "3-months", label: "3 tháng" },
  { value: "6-months", label: "6 tháng" },
  { value: "1-year", label: "1 năm" },
  { value: "long-term", label: "Dài hạn (trên 1 năm)" },
];

const isSubmitting = ref(false);
const submitSuccess = ref(false);

const submitVolunteerForm = () => {
  isSubmitting.value = true;

  setTimeout(() => {
    console.log("Volunteer form submitted:", volunteerForm.value);
    isSubmitting.value = false;
    submitSuccess.value = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1500);
};

const resetForm = () => {
  volunteerForm.value = {
    fullName: "",
    gender: "",
    birthDate: "",
    bloodType: "",
    ethnicity: "",
    nationality: "Việt Nam",
    phone: "",
    email: "",
    cccdNumber: "",
    cccdIssueDate: "",
    cccdIssuePlace: "",
    youthUnionDate: "",
    partyDate: "",
    permanentAddress: "",
    currentAddress: "",
    occupation: "",
    workplace: "",
    expertise: "",
    programs: [],
    department: "",
    commitmentDuration: "",
    agreeTerms: false,
  };
  submitSuccess.value = false;
};
</script>

<template>
  <div class="volunteer-registration-page">
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
              <RouterLink to="/tinh-nguyen-vien">Tình nguyện viên</RouterLink>
            </li>
            <li class="breadcrumb-item active">Đăng ký</li>
          </ol>
        </nav>

        <div class="hero-content">
          <span class="hero-badge">
            <i class="bi bi-heart-fill"></i>
            Quỹ Bông Hồng Nhỏ
          </span>
          <h1>Phiếu đăng ký Tình nguyện viên</h1>
          <p>
            Điền đầy đủ thông tin để hoàn tất đăng ký trở thành tình nguyện viên
          </p>
        </div>
      </div>
    </section>

    <!-- Registration Form Section -->
    <section class="form-section">
      <div class="container">
        <!-- Success Message -->
        <div v-if="submitSuccess" class="success-card">
          <div class="success-icon">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <h2>Đăng ký thành công!</h2>
          <p>
            Cảm ơn bạn đã đăng ký trở thành tình nguyện viên của Quỹ Bông Hồng
            Nhỏ. Chúng tôi sẽ liên hệ với bạn trong vòng 3-5 ngày làm việc.
          </p>
          <div class="success-actions">
            <RouterLink to="/tinh-nguyen-vien" class="btn-secondary">
              <i class="bi bi-arrow-left"></i>
              Xem các dự án
            </RouterLink>
            <button @click="resetForm" class="btn-primary">
              <i class="bi bi-plus-circle"></i>
              Đăng ký thêm
            </button>
          </div>
        </div>

        <!-- Registration Form -->
        <div v-else class="form-wrapper">
          <form @submit.prevent="submitVolunteerForm" class="registration-form">
            <!-- PHẦN I - THÔNG TIN CÁ NHÂN -->
            <div class="form-part">
              <div class="part-header">
                <span class="part-number">I</span>
                <h3>Thông tin cá nhân</h3>
              </div>

              <div class="row g-3">
                <!-- Họ và tên & Giới tính -->
                <div class="col-md-8">
                  <label class="form-label"
                    >Họ và tên <span class="required">*</span></label
                  >
                  <input
                    v-model="volunteerForm.fullName"
                    type="text"
                    class="form-control"
                    placeholder="Nhập đầy đủ họ và tên"
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label class="form-label"
                    >Giới tính <span class="required">*</span></label
                  >
                  <select
                    v-model="volunteerForm.gender"
                    class="form-select"
                    required
                  >
                    <option value="">Chọn giới tính</option>
                    <option
                      v-for="opt in genderOptions"
                      :key="opt.value"
                      :value="opt.value"
                    >
                      {{ opt.label }}
                    </option>
                  </select>
                </div>

                <!-- Ngày sinh & Nhóm máu -->
                <div class="col-md-6">
                  <label class="form-label"
                    >Ngày/tháng/năm sinh <span class="required">*</span></label
                  >
                  <input
                    v-model="volunteerForm.birthDate"
                    type="date"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Nhóm máu (nếu có)</label>
                  <select v-model="volunteerForm.bloodType" class="form-select">
                    <option value="">Chọn nhóm máu</option>
                    <option
                      v-for="type in bloodTypeOptions"
                      :key="type"
                      :value="type"
                    >
                      {{ type }}
                    </option>
                  </select>
                </div>

                <!-- Dân tộc & Quốc tịch -->
                <div class="col-md-6">
                  <label class="form-label">Dân tộc</label>
                  <input
                    v-model="volunteerForm.ethnicity"
                    type="text"
                    class="form-control"
                    placeholder="VD: Kinh"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Quốc tịch</label>
                  <input
                    v-model="volunteerForm.nationality"
                    type="text"
                    class="form-control"
                    placeholder="VD: Việt Nam"
                  />
                </div>

                <!-- Điện thoại & Email -->
                <div class="col-md-6">
                  <label class="form-label"
                    >Điện thoại liên lạc <span class="required">*</span></label
                  >
                  <input
                    v-model="volunteerForm.phone"
                    type="tel"
                    class="form-control"
                    placeholder="0901234567"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label"
                    >Email <span class="required">*</span></label
                  >
                  <input
                    v-model="volunteerForm.email"
                    type="email"
                    class="form-control"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <!-- CCCD -->
                <div class="col-md-4">
                  <label class="form-label"
                    >Số CCCD <span class="required">*</span></label
                  >
                  <input
                    v-model="volunteerForm.cccdNumber"
                    type="text"
                    class="form-control"
                    placeholder="Số căn cước công dân"
                    required
                  />
                </div>
                <div class="col-md-4">
                  <label class="form-label">Ngày cấp</label>
                  <input
                    v-model="volunteerForm.cccdIssueDate"
                    type="date"
                    class="form-control"
                  />
                </div>
                <div class="col-md-4">
                  <label class="form-label">Nơi cấp CCCD</label>
                  <input
                    v-model="volunteerForm.cccdIssuePlace"
                    type="text"
                    class="form-control"
                    placeholder="VD: Cục CS QLHC về TTXH"
                  />
                </div>

                <!-- Đoàn & Đảng -->
                <div class="col-md-6">
                  <label class="form-label"
                    >Ngày vào Đoàn TNCS Hồ Chí Minh</label
                  >
                  <input
                    v-model="volunteerForm.youthUnionDate"
                    type="date"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label"
                    >Ngày vào Đảng Cộng sản Việt Nam</label
                  >
                  <input
                    v-model="volunteerForm.partyDate"
                    type="date"
                    class="form-control"
                  />
                </div>

                <!-- Địa chỉ thường trú -->
                <div class="col-12">
                  <label class="form-label"
                    >Địa chỉ thường trú (Trên Hộ khẩu)
                    <span class="required">*</span></label
                  >
                  <textarea
                    v-model="volunteerForm.permanentAddress"
                    class="form-control"
                    rows="2"
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    required
                  ></textarea>
                </div>

                <!-- Địa chỉ hiện tại -->
                <div class="col-12">
                  <label class="form-label">Địa chỉ nơi ở hiện tại</label>
                  <textarea
                    v-model="volunteerForm.currentAddress"
                    class="form-control"
                    rows="2"
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  ></textarea>
                </div>

                <!-- Nghề nghiệp -->
                <div class="col-12">
                  <label class="form-label"
                    >Nghề nghiệp/công việc hiện tại</label
                  >
                  <input
                    v-model="volunteerForm.occupation"
                    type="text"
                    class="form-control"
                    placeholder="VD: Sinh viên, Nhân viên văn phòng, Giáo viên..."
                  />
                </div>

                <!-- Nơi công tác/học tập -->
                <div class="col-12">
                  <label class="form-label">Nơi công tác/học tập</label>
                  <textarea
                    v-model="volunteerForm.workplace"
                    class="form-control"
                    rows="2"
                    placeholder="Nếu là học sinh, sinh viên ghi rõ lớp, ngành, khoa, trường"
                  ></textarea>
                </div>

                <!-- Trình độ chuyên môn -->
                <div class="col-12">
                  <label class="form-label"
                    >Trình độ chuyên môn, sở trường có thể đóng góp</label
                  >
                  <textarea
                    v-model="volunteerForm.expertise"
                    class="form-control"
                    rows="3"
                    placeholder="VD: Kỹ năng giao tiếp, thiết kế đồ họa, chụp ảnh, viết bài truyền thông..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- PHẦN II - ĐĂNG KÝ THAM GIA -->
            <div class="form-part">
              <div class="part-header">
                <span class="part-number">II</span>
                <h3>Đăng ký tham gia</h3>
              </div>

              <div class="row g-3">
                <!-- Chương trình đăng ký -->
                <div class="col-12">
                  <label class="form-label"
                    >Đăng kí tham gia Chương trình, Chiến dịch, Dự án
                    <span class="required">*</span></label
                  >
                  <p class="form-help-text">
                    Chọn một hoặc nhiều chương trình bạn muốn tham gia
                  </p>
                  <div class="programs-grid">
                    <div
                      v-for="program in programOptions"
                      :key="program"
                      class="program-checkbox"
                    >
                      <input
                        type="checkbox"
                        :id="`program-${program}`"
                        :value="program"
                        v-model="volunteerForm.programs"
                        class="form-check-input"
                      />
                      <label
                        :for="`program-${program}`"
                        class="form-check-label"
                      >
                        {{ program }}
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Mảng đăng ký -->
                <div class="col-md-6">
                  <label class="form-label"
                    >Mảng đăng kí <span class="required">*</span></label
                  >
                  <select
                    v-model="volunteerForm.department"
                    class="form-select"
                    required
                  >
                    <option value="">Chọn mảng hoạt động</option>
                    <option
                      v-for="dept in departmentOptions"
                      :key="dept"
                      :value="dept"
                    >
                      {{ dept }}
                    </option>
                  </select>
                </div>

                <!-- Thời gian cam kết -->
                <div class="col-md-6">
                  <label class="form-label"
                    >Thời gian bạn cam kết có thể tham gia
                    <span class="required">*</span></label
                  >
                  <select
                    v-model="volunteerForm.commitmentDuration"
                    class="form-select"
                    required
                  >
                    <option value="">Chọn thời gian</option>
                    <option
                      v-for="dur in durationOptions"
                      :key="dur.value"
                      :value="dur.value"
                    >
                      {{ dur.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Terms -->
            <div class="terms-section">
              <div class="terms-checkbox">
                <input
                  type="checkbox"
                  v-model="volunteerForm.agreeTerms"
                  id="agreeTerms"
                  class="form-check-input"
                  required
                />
                <label for="agreeTerms" class="form-check-label">
                  Tôi xác nhận các thông tin trên là đúng sự thật và cam kết
                  tuân thủ
                  <a href="#" class="terms-link">quy chế hoạt động</a> của Quỹ
                  Bông Hồng Nhỏ.
                </label>
              </div>
            </div>

            <!-- Submit -->
            <div class="submit-section">
              <button
                type="submit"
                class="btn-submit"
                :disabled="isSubmitting || !volunteerForm.agreeTerms"
              >
                <span v-if="isSubmitting">
                  <i class="bi bi-arrow-repeat spin"></i>
                  Đang gửi đăng ký...
                </span>
                <span v-else>
                  <i class="bi bi-send-fill"></i>
                  Gửi phiếu đăng ký
                </span>
              </button>
              <p class="submit-note">
                <i class="bi bi-info-circle"></i>
                Sau khi gửi, chúng tôi sẽ liên hệ bạn trong 3-5 ngày làm việc
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.volunteer-registration-page {
  min-height: 100vh;
  background: #f1f5f9;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
  padding: 2rem 0 4rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920")
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

.breadcrumb {
  background: none;
}

.breadcrumb-item a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.breadcrumb-item a:hover {
  color: #fff;
}

.breadcrumb-item.active {
  color: rgba(255, 255, 255, 0.5);
}

.breadcrumb-item + .breadcrumb-item::before {
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
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.hero-badge i {
  color: #f87171;
}

.hero-content h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.hero-content p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
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

.registration-form {
  padding: 0;
}

/* Form Parts */
.form-part {
  padding: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.form-part:last-of-type {
  border-bottom: none;
}

.part-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.part-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
}

.part-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

/* Form Elements */
.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.required {
  color: #ef4444;
}

.form-control,
.form-select {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.form-control:focus,
.form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-control::placeholder {
  color: #9ca3af;
}

.form-help-text {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

/* Programs Grid */
.programs-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.program-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
}

.program-checkbox:has(input:checked) {
  background: #eff6ff;
  border-color: #3b82f6;
}

.program-checkbox .form-check-input {
  margin: 0;
  width: 18px;
  height: 18px;
}

.program-checkbox .form-check-label {
  font-size: 0.9rem;
  cursor: pointer;
  flex: 1;
}

/* Terms Section */
.terms-section {
  padding: 1.5rem 2rem;
  background: #fefce8;
  border-top: 1px solid #fcd34d;
}

.terms-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.terms-checkbox .form-check-input {
  margin-top: 3px;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}

.terms-checkbox .form-check-label {
  font-size: 0.9rem;
  color: #78350f;
  line-height: 1.5;
}

.terms-link {
  color: #3b82f6;
  text-decoration: underline;
}

/* Submit Section */
.submit-section {
  padding: 2rem;
  text-align: center;
  background: #f8fafc;
}

.btn-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 3rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.85rem;
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
  line-height: 1.6;
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
  color: #374151;
}

.btn-primary {
  background: #3b82f6;
  color: #fff;
}

.btn-primary:hover {
  background: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 1.75rem;
  }

  .form-part {
    padding: 1.5rem;
  }

  .terms-section,
  .submit-section {
    padding: 1.5rem;
  }

  .btn-submit {
    width: 100%;
  }
}
</style>
