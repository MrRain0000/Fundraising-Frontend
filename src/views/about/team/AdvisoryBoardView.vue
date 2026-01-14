<script setup>
// Ban cố vấn - Advisory Board
const members = [
  {
    name: "Ngô Sĩ Đình",
    role: "Director of Caritas Vietnam",
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/nsd-450x450.jpg",
  },
  {
    name: "Lê Xuân Hy",
    role: "Professor - Seattle University",
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/Le-Xuan-Hy-1-450x450.jpg",
  },
  {
    name: "Hà Thu Thanh",
    role: "Chairwoman - Deloitte Vietnam",
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/htt-450x450.jpg",
  },
];
</script>

<template>
  <div class="team-members">
    <h3 class="team-category-title">Ban cố vấn</h3>
    <div class="row g-4">
      <div
        v-for="member in members"
        :key="member.name"
        class="col-md-6 col-lg-4"
      >
        <div class="member-card">
          <div class="member-image">
            <img :src="member.image" :alt="member.name" />
          </div>
          <div class="member-info">
            <h5 class="member-name">{{ member.name }}</h5>
            <p class="member-role">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-category-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.row > [class*="col-"] {
  display: flex;
}

.member-card {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  width: 100%;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.member-image {
  width: 100%;
  aspect-ratio: 1;
  margin: 0 auto var(--spacing-md);
  overflow: hidden;
  border-radius: var(--radius-md);
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.member-name {
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.member-role {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-bottom: 0;
  line-height: 1.5;
  flex: 1;
}
</style>
