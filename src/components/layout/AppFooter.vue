<script setup>
import { RouterLink } from "vue-router";

const currentYear = new Date().getFullYear();

const quickLinks = [
  { name: "Trang chủ", path: "/" },
  { name: "Giới thiệu", path: "/gioi-thieu" },
  { name: "Hoạt động", path: "/hoat-dong" },
  { name: "Báo cáo tài chính", path: "/bao-cao-tai-chinh" },
  { name: "Liên hệ", path: "/lien-he" },
  { name: "Quyên góp", path: "/quyen-gop" },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: "facebook",
    url: "https://www.facebook.com/littlerosesfoundation",
  },
  {
    name: "YouTube",
    icon: "youtube",
    url: "https://www.facebook.com/littlerosesfoundation",
  },
];

// Google Maps embed URL for the address
const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3876777576344!2d106.69209847583878!3d10.783454459049973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9e838dc7%3A0x9c50461c38ae1b5a!2s49%20Ph%E1%BA%A1m%20Ng%E1%BB%8Dc%20Th%E1%BA%A1ch%2C%20Ph%C6%B0%E1%BB%9Dng%20V%C3%B5%20Th%E1%BB%8B%20S%C3%A1u%2C%20Qu%E1%BA%ADn%203%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2s!4v1702900000000!5m2!1svi!2s";
</script>

<template>
  <footer class="app-footer bg-dark text-white pt-5 pb-3">
    <div class="container">
      <div class="row g-4">
        <!-- Contact Info -->
        <div class="col-lg-3 col-md-6">
          <h6 class="footer-title mb-3">Liên hệ</h6>
          <ul class="list-unstyled footer-contact">
            <li class="mb-3 d-flex">
              <i class="bi bi-geo-alt me-2 text-primary-custom mt-1"></i>
              <span class="text-white-50 small">
                49 Pham Ngoc Thach St., Vo Thi Sau Ward, District 3, HCMC,
                Vietnam
              </span>
            </li>
            <li class="mb-2 d-flex">
              <i class="bi bi-telephone me-2 text-primary-custom"></i>
              <div class="d-flex flex-column">
                <a href="tel:+84906220422" class="footer-link small">
                  (+84) 906.22.04.22
                </a>
                <a href="tel:+84896622422" class="footer-link small">
                  (+84) 896.62.24.22
                </a>
              </div>
            </li>
            <li class="mb-2 d-flex">
              <i class="bi bi-envelope me-2 text-primary-custom"></i>
              <a
                href="mailto:info@littlerosesfoundation.org"
                class="footer-link small"
              >
                info@littlerosesfoundation.org
              </a>
            </li>
          </ul>
        </div>
        <!-- About Column -->
        <div class="col-lg-4 col-md-6">
          <div class="footer-brand mb-3">
            <div class="d-flex align-items-center mb-3"></div>
            <p class="text-white-50 small">
              Thắp sáng nụ cười, ươm mầm tương lai. Chúng tôi cam kết 100% minh
              bạch trong từng khoản đóng góp.
            </p>
          </div>

          <!-- Social Links -->
          <div class="social-links d-flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="social-link"
              :aria-label="social.name"
              target="_blank"
              rel="noopener"
            >
              <i :class="`bi bi-${social.icon}`"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6">
          <h6 class="footer-title mb-3">Liên kết nhanh</h6>
          <ul class="list-unstyled footer-links">
            <li v-for="link in quickLinks" :key="link.path" class="mb-2">
              <RouterLink :to="link.path" class="footer-link">
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Google Maps -->
        <div class="col-lg-3 col-md-6">
          <h6 class="footer-title mb-3">Bản đồ</h6>
          <div class="map-wrapper">
            <iframe
              :src="mapEmbedUrl"
              width="100%"
              height="180"
              style="border: 0; border-radius: 8px"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <hr class="my-4 border-secondary" />

      <!-- Copyright -->
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start">
          <p class="mb-0 text-white-50 small">
            © {{ currentYear }} Little Roses Foundation. Tất cả quyền được bảo
            lưu.
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end mt-2 mt-md-0">
          <RouterLink to="/quyen-gop" class="btn btn-donate-footer">
            Quyên góp ngay
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #1f2a37 !important;
}

.footer-title {
  color: var(--color-white);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  font-size: var(--font-size-sm);
  letter-spacing: 0.5px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  transition: all var(--transition-base);
}

.social-link:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-3px);
}

.social-link i {
  font-size: 1.25rem;
}

.text-primary-custom {
  color: var(--color-primary) !important;
}

.map-wrapper {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.btn-donate-footer {
  background-color: var(--color-primary);
  color: var(--color-white) !important;
  font-weight: var(--font-weight-semibold);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  border: none;
  font-size: var(--font-size-sm);
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn-donate-footer:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-2px);
}
</style>
