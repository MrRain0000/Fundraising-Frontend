# Quỹ Bông Hồng Nhỏ (Little Roses Foundation)

> Website quỹ từ thiện minh bạch 100%, được cấp phép bởi Bộ Nội Vụ

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?logo=bootstrap)

---

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
- [Chạy dự án](#chạy-dự-án)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)

---

## 🌹 Giới thiệu

Quỹ Bông Hồng Nhỏ (Little Roses Foundation) là quỹ từ thiện không vì mục tiêu lợi nhuận, hoạt động trên lĩnh vực **Sức khỏe** và **Giáo dục**, hỗ trợ những mảnh đời khó khăn trên khắp Việt Nam.

---

## ✨ Tính năng

- ✅ Minh bạch 100% - Sao kê công khai
- ✅ Danh sách quyên góp Real-time
- ✅ Video giới thiệu
- ✅ Báo cáo tài chính
- ✅ Responsive (Desktop, Tablet, Mobile)
- ✅ Component hóa, dễ mở rộng

---

## 💻 Yêu cầu hệ thống

| Phần mềm | Phiên bản |
| -------- | --------- |
| Node.js  | >= 18.x   |
| npm      | >= 9.x    |

---

## 🚀 Cài đặt

### Bước 1: Clone dự án

```bash
git clone https://github.com/your-username/lrf-website.git
cd lrf-website
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

---

## ▶️ Chạy dự án

### Development (có hot-reload)

```bash
npm run dev
```

Mở trình duyệt tại: **http://localhost:5173** (hoặc port hiển thị trong terminal)

### Build Production

```bash
npm run build
```

### Preview bản build

```bash
npm run preview
```

---

## 📁 Cấu trúc thư mục

```
src/
├── assets/           # CSS, images
│   └── css/
│       └── variables.css
├── components/       # Vue components
│   ├── common/       # Dùng chung (BackButton, FAQ...)
│   └── home/         # Riêng cho trang chủ
├── router/           # Vue Router
│   └── index.js
├── views/            # Các trang
│   ├── HomeView.vue
│   ├── AboutView.vue
│   ├── NewsView.vue
│   └── reports/      # Báo cáo tài chính
├── App.vue
└── main.js
```

---

## 🛠 Công nghệ sử dụng

| Công nghệ       | Mục đích           |
| --------------- | ------------------ |
| Vue 3           | Frontend framework |
| Vite            | Build tool         |
| Vue Router      | Điều hướng         |
| Bootstrap 5     | CSS framework      |
| Bootstrap Icons | Icon library       |
| Swiper          | Carousel/Slider    |

---

## 👥 Tác giả

- **Nguyễn Đức Thịnh** - _Developer_

---

## 📄 License

Dự án này được phát triển cho Quỹ Bông Hồng Nhỏ (Little Roses Foundation).

---

> 🌹 _"Thắp sáng nụ cười, ươm mầm tương lai"_
