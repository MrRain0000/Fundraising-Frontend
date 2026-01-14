<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

// Volunteer statistics
const stats = ref({
  totalVolunteers: 85,
  activeProjects: 3,
  totalHours: 2450,
  beneficiaries: 1500,
});

// Projects needing volunteers
const projects = ref([
  {
    id: 1,
    title: "Chương trình sức khỏe học đường và cộng đồng",
    description:
      "Phối hợp khám, chăm sóc sức khỏe cho trẻ em, người khuyết tật và người nghèo tại vùng sâu vùng xa.",
    image:
      "https://t3.ftcdn.net/jpg/01/55/60/16/360_F_155601656_lRZeta9aLJQ0yeqjrWSyWw4iXqsmTlF5.jpg",
    volunteers: 28,
    neededVolunteers: 40,
    skills: ["Y tế / Sức khỏe", "Tư vấn tâm lý", "Tổ chức sự kiện"],
    location: "Hà Giang, Lai Châu",
    startDate: "15/01/2025",
    status: "active",
  },
  {
    id: 2,
    title: "Nâng cao nhận thức phòng ngừa tật bệnh",
    description:
      "Triển khai các chương trình giáo dục sức khỏe, tham vấn y tế học đường miễn phí.",
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/06/Dear-Future-1024x683.jpg",
    volunteers: 15,
    neededVolunteers: 25,
    skills: ["Giảng dạy / Hướng dẫn", "Truyền thông / Marketing", "Dịch thuật"],
    location: "TP.HCM, Đồng Nai",
    startDate: "01/02/2025",
    status: "active",
  },
  {
    id: 3,
    title: "Chương trình cứu trợ khẩn cấp",
    description:
      "Đáp ứng nhanh chóng các nhu cầu cấp bách trong thiên tai, bão lũ, dịch bệnh.",
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/06/Remini20210628065621328sdsd-1024x683.jpg",
    volunteers: 42,
    neededVolunteers: 50,
    skills: ["Nhiếp ảnh / Quay phim", "Tổ chức sự kiện", "Sức khỏe"],
    location: "Miền Trung",
    startDate: "Linh hoạt",
    status: "urgent",
  },
]);

// Top volunteers
const topVolunteers = ref([
  {
    id: 1,
    name: "Nguyễn Thị Mai",
    hours: 156,
    projects: 5,
    avatar: "M",
    color: "#ec4899",
  },
  {
    id: 2,
    name: "Trần Văn Hùng",
    hours: 142,
    projects: 4,
    avatar: "H",
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Lê Hoàng Anh",
    hours: 128,
    projects: 6,
    avatar: "A",
    color: "#10b981",
  },
  {
    id: 4,
    name: "Phạm Minh Tú",
    hours: 115,
    projects: 3,
    avatar: "T",
    color: "#f59e0b",
  },
  {
    id: 5,
    name: "Võ Thanh Tâm",
    hours: 98,
    projects: 4,
    avatar: "T",
    color: "#8b5cf6",
  },
]);

// Benefits
const benefits = [
  {
    icon: "mortarboard",
    title: "Đào tạo kỹ năng",
    description: "Được đào tạo kỹ năng chuyên môn và kỹ năng mềm",
  },
  {
    icon: "award",
    title: "Chứng nhận",
    description: "Cấp giấy chứng nhận tình nguyện viên chính thức",
  },
  {
    icon: "people",
    title: "Kết nối cộng đồng",
    description: "Tham gia network tình nguyện viên toàn quốc",
  },
  {
    icon: "heart",
    title: "Tạo tác động",
    description: "Đóng góp trực tiếp vào các hoạt động thiện nguyện",
  },
];
</script>

<template>
  <div class="volunteers-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">
            <i class="bi bi-heart-fill"></i>
            Cùng nhau tạo nên sự khác biệt
          </span>
          <h1>Trở thành Tình nguyện viên</h1>
          <p>
            Tham gia cùng hơn {{ stats.totalVolunteers }} tình nguyện viên đang
            hoạt động tại {{ stats.activeProjects }} dự án trên khắp Việt Nam
          </p>
          <div class="hero-actions">
            <RouterLink to="/dang-ky-tinh-nguyen-vien" class="btn-register">
              <i class="bi bi-person-plus"></i>
              Đăng ký ngay
            </RouterLink>
            <a href="#projects" class="btn-explore">
              <i class="bi bi-arrow-down"></i>
              Khám phá dự án
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon blue">
              <i class="bi bi-people-fill"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">{{ stats.totalVolunteers }}</span>
              <span class="stat-label">Tình nguyện viên</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon green">
              <i class="bi bi-flag-fill"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">{{ stats.activeProjects }}</span>
              <span class="stat-label">Dự án hoạt động</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon orange">
              <i class="bi bi-clock-fill"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">{{
                stats.totalHours.toLocaleString()
              }}</span>
              <span class="stat-label">Giờ tình nguyện</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon pink">
              <i class="bi bi-emoji-smile-fill"></i>
            </div>
            <div class="stat-info">
              <span class="stat-number">{{
                stats.beneficiaries.toLocaleString()
              }}</span>
              <span class="stat-label">Người thụ hưởng</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section">
      <div class="container">
        <div class="section-header">
          <h2>Dự án đang tuyển tình nguyện viên</h2>
          <p>Lựa chọn dự án phù hợp với kỹ năng và thời gian của bạn</p>
        </div>

        <div class="projects-grid">
          <div
            v-for="project in projects"
            :key="project.id"
            class="project-card"
          >
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
              <span class="project-status" :class="project.status">
                {{ project.status === "urgent" ? "🔥 Cần gấp" : "Đang tuyển" }}
              </span>
            </div>
            <div class="project-content">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>

              <div class="project-meta">
                <div class="meta-item">
                  <i class="bi bi-geo-alt"></i>
                  {{ project.location }}
                </div>
                <div class="meta-item">
                  <i class="bi bi-calendar"></i>
                  {{ project.startDate }}
                </div>
              </div>

              <div class="skills-needed">
                <span class="skills-label">Kỹ năng cần:</span>
                <div class="skills-tags">
                  <span
                    v-for="skill in project.skills"
                    :key="skill"
                    class="skill-tag"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>

              <div class="volunteer-progress">
                <div class="progress-info">
                  <span
                    >{{ project.volunteers }}/{{
                      project.neededVolunteers
                    }}
                    tình nguyện viên</span
                  >
                  <span
                    >{{
                      Math.round(
                        (project.volunteers / project.neededVolunteers) * 100
                      )
                    }}%</span
                  >
                </div>
                <div class="progress-bar">
                  <div
                    class="progress-fill"
                    :style="{
                      width:
                        (project.volunteers / project.neededVolunteers) * 100 +
                        '%',
                    }"
                  ></div>
                </div>
              </div>

              <RouterLink to="/dang-ky-tinh-nguyen-vien" class="btn-join">
                <i class="bi bi-hand-thumbs-up"></i>
                Tham gia dự án này
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
      <div class="container">
        <div class="section-header">
          <h2>Quyền lợi khi tham gia</h2>
          <p>Bạn được gì khi trở thành tình nguyện viên?</p>
        </div>

        <div class="benefits-grid">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="benefit-card"
          >
            <div class="benefit-icon">
              <i :class="`bi bi-${benefit.icon}`"></i>
            </div>
            <h4>{{ benefit.title }}</h4>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Volunteers Section -->
    <section class="top-volunteers-section">
      <div class="container">
        <div class="section-header">
          <h2>Vinh danh tình nguyện viên</h2>
          <p>Những cá nhân có đóng góp nổi bật trong năm 2024</p>
        </div>

        <div class="volunteers-list">
          <div
            v-for="(volunteer, index) in topVolunteers"
            :key="volunteer.id"
            class="volunteer-card"
          >
            <div
              class="rank"
              :class="{
                gold: index === 0,
                silver: index === 1,
                bronze: index === 2,
              }"
            >
              {{ index + 1 }}
            </div>
            <div
              class="volunteer-avatar"
              :style="{ background: volunteer.color }"
            >
              {{ volunteer.avatar }}
            </div>
            <div class="volunteer-info">
              <h5>{{ volunteer.name }}</h5>
              <div class="volunteer-stats">
                <span
                  ><i class="bi bi-clock"></i> {{ volunteer.hours }} giờ</span
                >
                <span
                  ><i class="bi bi-flag"></i> {{ volunteer.projects }} dự
                  án</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Sẵn sàng tạo sự khác biệt?</h2>
          <p>Đăng ký ngay hôm nay và bắt đầu hành trình tình nguyện của bạn</p>
          <RouterLink to="/dang-ky-tinh-nguyen-vien" class="btn-cta">
            <i class="bi bi-rocket-takeoff"></i>
            Đăng ký tình nguyện viên
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.volunteers-page {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
  padding: 6rem 0 4rem;
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
  opacity: 0.15;
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
  margin-bottom: 1.5rem;
}

.hero-badge i {
  color: #f87171;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-register {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: #fff;
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  color: #fff;
}

.btn-explore {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #fff;
  padding: 0.875rem 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-explore:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Stats Section */
.stats-section {
  margin-top: -2rem;
  position: relative;
  z-index: 2;
  padding-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.stat-item {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-icon.blue {
  background: #dbeafe;
  color: #3b82f6;
}

.stat-icon.green {
  background: #d1fae5;
  color: #10b981;
}

.stat-icon.orange {
  background: #fed7aa;
  color: #f97316;
}

.stat-icon.pink {
  background: #fce7f3;
  color: #ec4899;
}

.stat-number {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Projects Section */
.projects-section {
  padding: 4rem 0;
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
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #6b7280;
  font-size: 1rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  height: 200px;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-status {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}

.project-status.active {
  background: #d1fae5;
  color: #059669;
}

.project-status.urgent {
  background: #fef3c7;
  color: #d97706;
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.project-content > p {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #6b7280;
}

.meta-item i {
  color: #3b82f6;
}

.skills-needed {
  margin-bottom: 1rem;
}

.skills-label {
  font-size: 0.75rem;
  color: #9ca3af;
  display: block;
  margin-bottom: 0.5rem;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skill-tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
}

.volunteer-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 0.4rem;
}

.progress-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 3px;
}

.btn-join {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-join:hover {
  background: #2563eb;
  color: #fff;
}

/* Benefits Section */
.benefits-section {
  padding: 4rem 0;
  background: #fff;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.benefit-card {
  text-align: center;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fafc, #fff);
  border: 1px solid #e5e7eb;
}

.benefit-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #fff;
}

.benefit-card h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.benefit-card p {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

/* Top Volunteers Section */
.top-volunteers-section {
  padding: 4rem 0;
  background: #f8fafc;
}

.volunteers-list {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.volunteer-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #fff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.rank {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.rank.gold {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #fff;
}

.rank.silver {
  background: linear-gradient(135deg, #9ca3af, #6b7280);
  color: #fff;
}

.rank.bronze {
  background: linear-gradient(135deg, #d97706, #b45309);
  color: #fff;
}

.volunteer-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 1.125rem;
}

.volunteer-info {
  flex: 1;
}

.volunteer-info h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem;
}

.volunteer-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #6b7280;
}

.volunteer-stats span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.volunteer-stats i {
  color: #3b82f6;
}

/* CTA Section */
.cta-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.cta-content p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.5);
  color: #fff;
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
