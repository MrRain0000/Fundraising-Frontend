<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import BackButton from "@/components/common/BackButton.vue";
import FAQSection from "@/components/common/FAQSection.vue";

// Active category filter
const activeCategory = ref("all");

const categories = [
  { key: "all", label: "Tất cả", icon: "grid" },
  { key: "news", label: "Tin tức", icon: "newspaper" },
  { key: "event", label: "Sự kiện", icon: "calendar-event" },
  { key: "success", label: "Câu chuyện thành công", icon: "trophy" },
];

// Mock articles data
const articles = ref([
  {
    id: 1,
    title: 'Tổng kết chiến dịch "Mùa Hè Xanh" tại tỉnh Hà Giang',
    excerpt:
      "Hơn 50 tình nguyện viên đã tham gia sửa chữa trường học và dạy học cho các em nhỏ trong suốt 2 tuần vừa qua.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format",
    category: "event",
    categoryLabel: "HOẠT ĐỘNG",
    date: "12 THÁNG 10, 2023",
    featured: false,
  },
  {
    id: 2,
    title: 'Chương trình "Áo ấm mùa đông" đạt 80% mục tiêu',
    excerpt:
      "Cảm ơn tấm lòng của các mạnh thường quân, chúng tôi đang gấp rút chuẩn bị những phần quà ý nghĩa nhất.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format",
    category: "news",
    categoryLabel: "QUYÊN GÓP",
    date: "08 THÁNG 10, 2023",
    featured: false,
  },
  {
    id: 3,
    title: "Lời cảm ơn từ Bà Tư - Người nhận hỗ trợ viện phí",
    excerpt:
      '"Nhờ có quỹ thì cô có thể phẫu thuật mắt và nhìn thấy con cháu mình ở ban sáng giờ nè"...',
    image:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&auto=format",
    category: "success",
    categoryLabel: "CÂU CHUYỆN",
    date: "01 THÁNG 10, 2023",
    featured: false,
  },
  {
    id: 4,
    title: "Khánh thành thư viện sách cộng đồng tại xã Y",
    excerpt:
      "Thư viện mới với hơn 1.000 đầu sách sẽ là một món quà ý nghĩa mừng trẻ em địa phương.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format",
    category: "event",
    categoryLabel: "GIÁO DỤC",
    date: "28 THÁNG 9, 2023",
    featured: false,
  },
]);

// Featured article
const featuredArticle = ref({
  id: 0,
  title: "Hành trình mang nụ cười đến vùng cao Tây Bắc",
  excerpt:
    "Câu chuyện nói bật về chuyến đi thiện nguyện mới nhất của chúng tôi, mang lại niềm vui, áo ấm và hy vọng cho hơn 200 trẻ em tại điểm trường X.",
  image:
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&auto=format",
  category: "success",
  categoryLabel: "TIÊU ĐIỂM",
  date: "15 THÁNG 10, 2023",
});

// Upcoming events
const upcomingEvents = ref([
  {
    id: 1,
    title: 'Đêm nhạc gây quỹ "Trái tim cho em"',
    location: "Nhà hát Lớn Hà Nội",
    month: "THÁNG 11",
    day: "20",
  },
  {
    id: 2,
    title: "Ngày hội hiến máu nhân đạo",
    location: "ĐH Y Hà Nội",
    month: "THÁNG 11",
    day: "05",
  },
  {
    id: 3,
    title: "Workshop làm đồ tái chế",
    location: "Sự kiện Online",
    month: "THÁNG 11",
    day: "15",
  },
]);

// Filtered articles
const filteredArticles = computed(() => {
  if (activeCategory.value === "all") {
    return articles.value;
  }
  return articles.value.filter((a) => a.category === activeCategory.value);
});

// Newsletter
const email = ref("");
const subscribed = ref(false);
const subscribe = () => {
  if (email.value) {
    subscribed.value = true;
    setTimeout(() => {
      subscribed.value = false;
      email.value = "";
    }, 3000);
  }
};

// FAQ data cho trang tin tức
const newsFaqs = ref([
  {
    question: "Làm sao để tôi liên hệ đưa tin về hoạt động của Quỹ?",
    answer:
      "Bạn có thể liên hệ bộ phận truyền thông qua email: media@bonghongnho.org hoặc hotline 1900.xxxx. Chúng tôi sẵn sàng hỗ trợ các cơ quan báo chí và truyền thông.",
  },
  {
    question:
      "Tôi muốn tham gia tình nguyện tại các sự kiện thì đăng ký ở đâu?",
    answer:
      "Bạn có thể đăng ký làm tình nguyện viên thông qua form trên website hoặc fanpage Facebook của Quỹ. Chúng tôi sẽ liên hệ xác nhận trong 2-3 ngày làm việc.",
  },
  {
    question: "Các tin tức và bài viết có được kiểm duyệt không?",
    answer:
      "Tất cả tin tức đều được Ban biên tập kiểm duyệt kỹ lưỡng về nội dung và hình ảnh trước khi đăng tải để đảm bảo tính chính xác và minh bạch.",
  },
  {
    question: "Tôi có thể đóng góp bài viết hoặc chia sẻ câu chuyện không?",
    answer:
      "Rất hoan nghênh! Nếu bạn có câu chuyện ý nghĩa muốn chia sẻ, hãy gửi về email: info@littlerosesfoundation.org. Những câu chuyện được chọn sẽ được đăng tải trên website.",
  },
]);
</script>

<template>
  <div class="news-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-nav" aria-label="breadcrumb">
          <BackButton variant="default" />
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <RouterLink to="/">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Tin tức</li>
          </ol>
        </nav>

        <h1 class="page-title">Tin tức & Hoạt động</h1>
        <p class="page-subtitle">
          Cập nhật những thông tin mới nhất về các chiến dịch, sự kiện và những
          câu chuyện ấm lòng từ cộng đồng.
        </p>

        <!-- Category Tabs -->
        <div class="category-tabs">
          <button
            v-for="cat in categories"
            :key="cat.key"
            class="category-tab"
            :class="{ active: activeCategory === cat.key }"
            @click="activeCategory = cat.key"
          >
            <i :class="`bi bi-${cat.icon}`"></i>
            {{ cat.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
      <div class="container">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <!-- Featured Article -->
            <article class="featured-article">
              <div class="featured-image">
                <img
                  :src="featuredArticle.image"
                  :alt="featuredArticle.title"
                />
              </div>
              <div class="featured-content">
                <span class="featured-badge">
                  <i class="bi bi-star-fill"></i>
                  {{ featuredArticle.categoryLabel }}
                </span>
                <h2 class="featured-title">{{ featuredArticle.title }}</h2>
                <p class="featured-excerpt">{{ featuredArticle.excerpt }}</p>
                <RouterLink to="#" class="btn-read-more">
                  Đọc toàn bộ câu chuyện
                </RouterLink>
              </div>
            </article>

            <!-- Latest Articles -->
            <div class="articles-section">
              <div class="section-header">
                <h3 class="section-title">Tin mới nhất</h3>
                <RouterLink to="#" class="view-all-link">
                  Xem tất cả <i class="bi bi-arrow-right"></i>
                </RouterLink>
              </div>

              <div class="articles-grid">
                <article
                  v-for="article in filteredArticles"
                  :key="article.id"
                  class="article-card"
                >
                  <div class="article-image">
                    <img :src="article.image" :alt="article.title" />
                  </div>
                  <div class="article-content">
                    <div class="article-meta">
                      <span class="article-category">{{
                        article.categoryLabel
                      }}</span>
                      <span class="article-date">{{ article.date }}</span>
                    </div>
                    <h4 class="article-title">{{ article.title }}</h4>
                    <p class="article-excerpt">{{ article.excerpt }}</p>
                  </div>
                </article>
              </div>

              <div class="load-more-wrapper">
                <button class="btn-load-more">
                  <i class="bi bi-plus-circle"></i>
                  Xem thêm tin cũ
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="sidebar">
            <!-- Upcoming Events -->
            <div class="sidebar-card events-card">
              <h4 class="sidebar-title">
                <i class="bi bi-calendar-event"></i>
                Sự kiện sắp tới
              </h4>
              <div class="events-list">
                <div
                  v-for="event in upcomingEvents"
                  :key="event.id"
                  class="event-item"
                >
                  <div class="event-date">
                    <span class="event-month">{{ event.month }}</span>
                    <span class="event-day">{{ event.day }}</span>
                  </div>
                  <div class="event-info">
                    <h5 class="event-title">{{ event.title }}</h5>
                    <p class="event-location">
                      <i class="bi bi-geo-alt"></i>
                      {{ event.location }}
                    </p>
                  </div>
                </div>
              </div>
              <RouterLink to="#" class="view-all-events">
                <i class="bi bi-calendar3"></i>
                Xem lịch sự kiện
              </RouterLink>
            </div>

            <!-- Newsletter -->
            <div class="sidebar-card newsletter-card">
              <div class="newsletter-icon">
                <i class="bi bi-envelope-heart"></i>
              </div>
              <h4 class="sidebar-title">Đăng ký nhận tin</h4>
              <p class="newsletter-text">
                Nhận thông báo về các hoạt động mới nhất của Quỹ Bông Hồng Nhỏ
                trực tiếp qua email của bạn. Minh bạch và không spam.
              </p>
              <div class="newsletter-form">
                <input
                  type="email"
                  v-model="email"
                  placeholder="Email của bạn"
                  class="newsletter-input"
                />
                <button
                  class="btn-subscribe"
                  @click="subscribe"
                  :class="{ success: subscribed }"
                >
                  {{ subscribed ? "Đã đăng ký!" : "Đăng ký" }}
                </button>
              </div>
            </div>

            <!-- CTA Card -->
            <div class="sidebar-card cta-card">
              <h4 class="cta-title">Bạn có muốn đóng góp?</h4>
              <p class="cta-text">
                Mỗi đóng góp cho dù đầu mạng là thay đổi đổi ấm cho cuộc sống
                của các em.
              </p>
              <RouterLink to="/quyen-gop" class="btn-cta">
                Quyên góp ngay
              </RouterLink>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- FAQ Section - Full Width -->
    <section class="faq-section-wrapper">
      <div class="container">
        <FAQSection
          title="Câu hỏi thường gặp"
          subtitle="Những thắc mắc phổ biến về tin tức và hoạt động của Quỹ"
          :items="newsFaqs"
          :columns="2"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.news-page {
  min-height: 100vh;
  background: var(--color-background, #fafafa);
}

/* Header Navigation (simplified for page) */
.page-header {
  background: var(--color-white, #fff);
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.nav-logo img {
  height: 50px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--color-text, #333);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--color-primary, #b12029);
}

.btn-donate-header {
  background: var(--color-primary, #b12029);
  color: #fff !important;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-donate-header:hover {
  background: #8a1820;
  transform: translateY(-2px);
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
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}

.breadcrumb-item a {
  color: #6b7280;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  color: var(--color-primary, #b12029);
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  padding: 0 0.5rem;
  color: #9ca3af;
}

.breadcrumb-item.active {
  color: #374151;
}

/* Hero Section */
.hero-section {
  background: var(--color-white, #fff);
  padding: 2rem 0 1.5rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text, #1a1a1a);
  margin: 0 0 0.5rem;
}

.page-subtitle {
  color: #666;
  font-size: 1rem;
  max-width: 600px;
  margin: 0 0 1.5rem;
}

/* Category Tabs */
.category-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-top: 1rem;

  scrollbar-width: thin;
  scrollbar-color: var(--color-primary, #b12029) #e5e7eb;
}

/* Custom scrollbar for webkit browsers */
.category-tabs::-webkit-scrollbar {
  height: 6px;
}

.category-tabs::-webkit-scrollbar-track {
  background: #e5e7eb;
  border-radius: 3px;
}

.category-tabs::-webkit-scrollbar-thumb {
  background: var(--color-primary, #b12029);
  border-radius: 3px;
}

.category-tabs::-webkit-scrollbar-thumb:hover {
  background: #8a1820;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #f5f5f5;
  color: #666;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.category-tab:hover {
  background: #eee;
  color: #333;
}

.category-tab.active {
  background: var(--color-primary, #b12029);
  color: #fff;
}

/* Content Section */
.content-section {
  padding: 2rem 0 4rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

/* Main Content */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Featured Article */
.featured-article {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--color-white, #fff);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.featured-image {
  height: 100%;
  min-height: 320px;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-primary, #b12029);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.featured-badge i {
  color: #ffc107;
}

.featured-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text, #1a1a1a);
  line-height: 1.3;
  margin: 0 0 1rem;
}

.featured-excerpt {
  color: #666;
  line-height: 1.7;
  margin: 0 0 1.5rem;
}

.btn-read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-primary, #b12029);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  width: fit-content;
  transition: all 0.2s;
}

.btn-read-more:hover {
  background: #8a1820;
  transform: translateY(-2px);
}

/* Articles Section */
.articles-section {
  background: var(--color-white, #fff);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text, #1a1a1a);
  margin: 0;
}

.view-all-link {
  color: var(--color-primary, #b12029);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.view-all-link:hover {
  text-decoration: underline;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.article-card {
  background: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.article-image {
  height: 160px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-content {
  padding: 1rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.article-category {
  color: var(--color-primary, #b12029);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.article-date {
  color: #999;
  font-size: 0.7rem;
}

.article-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text, #1a1a1a);
  line-height: 1.4;
  margin: 0 0 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-excerpt {
  color: #666;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.load-more-wrapper {
  text-align: center;
  margin-top: 1.5rem;
}

.btn-load-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #ddd;
  background: transparent;
  color: #666;
  border-radius: 50px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-load-more:hover {
  border-color: var(--color-primary, #b12029);
  color: var(--color-primary, #b12029);
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: var(--color-white, #fff);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text, #1a1a1a);
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sidebar-title i {
  color: var(--color-primary, #b12029);
}

/* Events Card */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-item {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.event-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 55px;
  background: #f8f8f8;
  border-radius: 8px;
  flex-shrink: 0;
}

.event-month {
  font-size: 0.6rem;
  color: #999;
  font-weight: 600;
}

.event-day {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary, #b12029);
}

.event-info {
  flex: 1;
}

.event-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text, #1a1a1a);
  margin: 0 0 0.25rem;
  line-height: 1.3;
}

.event-location {
  font-size: 0.75rem;
  color: #999;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.view-all-events {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f8f8f8;
  color: var(--color-primary, #b12029);
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s;
}

.view-all-events:hover {
  background: #f0f0f0;
}

/* Newsletter Card */
.newsletter-card {
  text-align: center;
}

.newsletter-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6b6b, #b12029);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.newsletter-icon i {
  font-size: 1.5rem;
  color: #fff;
}

.newsletter-text {
  color: #666;
  font-size: 0.85rem;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.newsletter-input {
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}

.newsletter-input:focus {
  border-color: var(--color-primary, #b12029);
}

.btn-subscribe {
  padding: 0.75rem;
  background: var(--color-primary, #b12029);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-subscribe:hover {
  background: #8a1820;
}

.btn-subscribe.success {
  background: #28a745;
}

/* CTA Card */
.cta-card {
  background: linear-gradient(135deg, #fff5f5, #fff);
  border: 1px solid rgba(177, 32, 41, 0.1);
}

.cta-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text, #1a1a1a);
  margin: 0 0 0.5rem;
}

.cta-text {
  color: #666;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0 0 1rem;
}

.btn-cta {
  display: block;
  text-align: center;
  padding: 0.75rem;
  background: var(--color-primary, #b12029);
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-cta:hover {
  background: #8a1820;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .cta-card {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .featured-article {
    grid-template-columns: 1fr;
  }

  .featured-image {
    min-height: 200px;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    grid-template-columns: 1fr;
  }

  .cta-card {
    grid-column: span 1;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .category-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
  }

  .category-tab {
    white-space: nowrap;
  }
}

/* FAQ Section Full Width */
.faq-section-wrapper {
  background: var(--color-white, #fff);
  padding: 3rem 0;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .faq-section-wrapper {
    padding: 2rem 0;
  }
}
</style>
