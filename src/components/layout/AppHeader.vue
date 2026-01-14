<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);

// Navigation items
const navItems = [
  { name: "Tin tức", path: "/tin-tuc" },
  { name: "Hoạt động", path: "/hoat-dong" },
  { name: "Giới thiệu", path: "/gioi-thieu" },
];

// Dropdown items for "Liên hệ"
const contactItems = [
  {
    name: "Liên hệ chung",
    path: "/lien-he",
  },
  {
    name: "Đăng ký tình nguyện viên",
    path: "/dang-ky-tinh-nguyen-vien",
  },
  {
    name: "Hợp tác với chúng tôi",
    path: "/hop-tac",
  },
  {
    name: "Đăng ký Chuyên gia",
    path: "/dang-ky-chuyen-gia",
  },
];

// Dropdown items for "Minh bạch tài chính"
const transparencyItems = [
  {
    name: "Thống kê Quyên góp",
    path: "/thong-ke-quyen-gop",
    icon: "bar-chart-line",
  },
  {
    name: "Báo cáo tài chính",
    path: "/bao-cao-tai-chinh",
    icon: "file-earmark-text",
  },
  {
    name: "Báo cáo thường niên",
    path: "/bao-cao-thuong-nien",
    icon: "calendar-check",
  },
  {
    name: "Tài liệu & Nghiên cứu",
    path: "/tai-lieu",
    icon: "journal-bookmark",
  },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (!isMenuOpen.value) {
    isDropdownOpen.value = false;
    isContactDropdownOpen.value = false;
  }
};

const isContactDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  isContactDropdownOpen.value = false;
};

const toggleContactDropdown = () => {
  isContactDropdownOpen.value = !isContactDropdownOpen.value;
  isDropdownOpen.value = false;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const closeContactDropdown = () => {
  isContactDropdownOpen.value = false;
};

// Check if transparency dropdown is active
const isTransparencyActive = computed(() => {
  return transparencyItems.some((item) => route.path.startsWith(item.path));
});

// Check if contact dropdown is active
const isContactActive = computed(() => {
  return route.path.startsWith("/lien-he");
});

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = document.querySelector(".nav-dropdown-custom");
  const contactDropdown = document.querySelector(".nav-dropdown-contact");
  if (dropdown && !dropdown.contains(event.target)) {
    isDropdownOpen.value = false;
  }
  if (contactDropdown && !contactDropdown.contains(event.target)) {
    isContactDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <header class="app-header">
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div class="container">
        <!-- Logo -->
        <RouterLink class="navbar-brand d-flex align-items-center" to="/">
          <!-- Desktop Logo -->
          <img
            src="https://littlerosesfoundation.org/wp-content/uploads/2022/08/df.png"
            alt="Little Roses Foundation"
            class="logo-img logo-desktop"
          />
          <!-- Mobile Logo -->
          <img
            src="/Logo_Mobile/logo.webp"
            alt="Little Roses Foundation"
            class="logo-img logo-mobile"
          />
        </RouterLink>

        <!-- Mobile Toggle Button -->
        <button
          class="navbar-toggler border-0"
          type="button"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Menu -->
        <div
          class="collapse navbar-collapse"
          :class="{ show: isMenuOpen }"
          id="navbarNav"
        >
          <ul class="navbar-nav ms-auto align-items-lg-center">
            <!-- Regular nav items -->
            <li v-for="item in navItems" :key="item.name" class="nav-item">
              <RouterLink
                class="nav-link px-3"
                :to="item.path"
                @click="isMenuOpen = false"
              >
                {{ item.name }}
              </RouterLink>
            </li>

            <!-- Custom Vue Dropdown for Minh bạch tài chính -->
            <li class="nav-item nav-dropdown-custom">
              <button
                class="nav-link px-3 dropdown-toggle-btn"
                :class="{ active: isTransparencyActive }"
                @click.stop="toggleDropdown"
              >
                Báo Cáo
                <i
                  class="bi bi-chevron-down dropdown-arrow"
                  :class="{ rotated: isDropdownOpen }"
                ></i>
              </button>
              <ul
                class="dropdown-menu-custom"
                :class="{ show: isDropdownOpen }"
              >
                <template
                  v-for="(item, index) in transparencyItems"
                  :key="item.name"
                >
                  <li v-if="index > 0"><hr class="dropdown-divider" /></li>
                  <li>
                    <RouterLink
                      class="dropdown-item"
                      :to="item.path"
                      @click="
                        isMenuOpen = false;
                        closeDropdown();
                      "
                    >
                      <i
                        v-if="item.icon"
                        :class="`bi bi-${item.icon} me-2`"
                      ></i>
                      {{ item.name }}
                    </RouterLink>
                  </li>
                </template>
              </ul>
            </li>

            <!-- Custom Vue Dropdown for Liên hệ -->
            <li class="nav-item nav-dropdown-contact">
              <button
                class="nav-link px-3 dropdown-toggle-btn"
                :class="{ active: isContactActive }"
                @click.stop="toggleContactDropdown"
              >
                Liên hệ
                <i
                  class="bi bi-chevron-down dropdown-arrow"
                  :class="{ rotated: isContactDropdownOpen }"
                ></i>
              </button>
              <ul
                class="dropdown-menu-custom"
                :class="{ show: isContactDropdownOpen }"
              >
                <template
                  v-for="(item, index) in contactItems"
                  :key="item.name"
                >
                  <li v-if="index > 0"><hr class="dropdown-divider" /></li>
                  <li>
                    <RouterLink
                      class="dropdown-item"
                      :to="item.path"
                      @click="
                        isMenuOpen = false;
                        closeContactDropdown();
                      "
                    >
                      <i
                        v-if="item.icon"
                        :class="`bi bi-${item.icon} me-2`"
                      ></i>
                      {{ item.name }}
                    </RouterLink>
                  </li>
                </template>
              </ul>
            </li>

            <!-- Donate Button -->
            <li class="nav-item ms-lg-3 mt-3 mt-lg-0">
              <RouterLink
                class="btn btn-donate"
                to="/quyen-gop"
                @click="isMenuOpen = false"
              >
                Quyên góp ngay
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 11000;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.logo-img {
  height: 60px;
  width: auto;
}

/* Logo visibility */
.logo-mobile {
  display: none;
}

.logo-desktop {
  display: block;
}

.nav-link {
  font-weight: 500;
  color: #333 !important;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active,
.nav-link.active {
  color: var(--color-primary, #b12029) !important;
}

/* Custom dropdown */
.nav-dropdown-custom,
.nav-dropdown-contact {
  position: relative;
}

.dropdown-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1rem;
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu-custom {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: #fff;
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.2s ease;
  z-index: 1000;
  list-style: none;
}

.dropdown-menu-custom.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-divider {
  margin: 0.4rem 1rem;
  border: none;
  border-top: 1px solid #e5e7eb;
  opacity: 1;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: all 0.15s;
}

.dropdown-item:hover,
.dropdown-item.router-link-active {
  background: rgba(177, 32, 41, 0.05);
  color: var(--color-primary, #b12029);
}

.dropdown-item i {
  color: var(--color-primary, #b12029);
  opacity: 0.7;
}

.dropdown-item:hover i,
.dropdown-item.router-link-active i {
  opacity: 1;
}

.btn-donate {
  background-color: var(--color-primary, #b12029);
  color: #fff !important;
  font-weight: 600;
  padding: 0.625rem 1.3rem;
  border-radius: 10px;
  border: none;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn-donate:hover {
  background-color: #8a1820;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(177, 32, 41, 0.3);
}

/* Mobile styles */
@media (max-width: 991.98px) {
  /* Logo visibility for mobile */
  .logo-mobile {
    display: block;
  }

  .logo-desktop {
    display: none;
  }

  .navbar-collapse {
    padding: 1rem 0.85rem;
  }

  .nav-link {
    padding: 0.75rem 0 !important;
  }

  .btn-donate {
    width: 100%;
    text-align: center;
  }

  .dropdown-menu-custom {
    position: static;
    box-shadow: none;
    background: #f8f9fa;
    border-radius: 8px;
    margin-top: 0.5rem;
    opacity: 1;
    visibility: visible;
    transform: none;
    max-height: 0;
    overflow: hidden;
    padding: 0;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }

  .dropdown-menu-custom.show {
    max-height: 200px;
    padding: 0.5rem 0;
  }

  .dropdown-toggle-btn {
    width: 100%;
    justify-content: space-between;
    padding: 0.75rem 0 !important;
  }
}
</style>