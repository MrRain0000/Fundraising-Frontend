<script setup>
// Sponsor/Partner logos data
const sponsors = [
  {
    id: 1,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/nts.png",
    alt: "NTS",
  },
  {
    id: 2,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/pvi.png",
    alt: "PVI",
  },
  {
    id: 3,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/pwc.png",
    alt: "PWC",
  },
  {
    id: 4,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/thp.png",
    alt: "THP",
  },
  {
    id: 5,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/vvn.png",
    alt: "VVN",
  },
  {
    id: 6,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/luatviet.png",
    alt: "Luật Việt",
  },
  {
    id: 7,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/vietthuong.png",
    alt: "Việt Thương",
  },
  {
    id: 8,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/bravo.png",
    alt: "Bravo",
  },
  {
    id: 9,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/scb.png",
    alt: "SCB",
  },
  {
    id: 10,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/truong-hoang-phat.png",
    alt: "Trường Hoàng Phát",
  },
  {
    id: 11,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/indochine.png",
    alt: "Indochine",
  },
  {
    id: 12,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2023/03/deloitte.png",
    alt: "Deloitte",
  },
  {
    id: 13,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/kamala.png",
    alt: "Kamala",
  },
  {
    id: 14,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/mia.png",
    alt: "MIA",
  },
  {
    id: 15,
    image:
      "https://littlerosesfoundation.org/wp-content/uploads/2022/09/msb.png",
    alt: "MSB",
  },
];
</script>

<template>
  <section class="sponsors-marquee">
    <div class="marquee-container">
      <div class="marquee-track">
        <div class="marquee-content">
          <div
            v-for="sponsor in sponsors"
            :key="sponsor.id"
            class="sponsor-item"
          >
            <img :src="sponsor.image" :alt="sponsor.alt" />
          </div>
        </div>
        <div class="marquee-content" aria-hidden="true">
          <div
            v-for="sponsor in sponsors"
            :key="'dup-' + sponsor.id"
            class="sponsor-item"
          >
            <img :src="sponsor.image" :alt="sponsor.alt" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sponsors-marquee {
  background: #fff;
  padding: var(--spacing-2xl) 0;
  border-bottom: 1px solid #eee;
  overflow: hidden;
}

.marquee-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.marquee-container::before,
.marquee-container::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}

.marquee-container::before {
  left: 0;
  background: linear-gradient(to right, #fff, transparent);
}

.marquee-container::after {
  right: 0;
  background: linear-gradient(to left, #fff, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 40s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-content {
  display: flex;
  align-items: center;
  gap: 80px;
  padding: 0 40px;
}

.sponsor-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sponsor-item img {
  height: 70px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
  transition: opacity var(--transition-fast);
}

.sponsor-item:hover img {
  opacity: 0.7;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .sponsors-marquee {
    padding: var(--spacing-md) 0;
  }

  .marquee-content {
    gap: 50px;
    padding: 0 25px;
  }

  .sponsor-item img {
    height: 40px;
    max-width: 110px;
  }

  .marquee-container::before,
  .marquee-container::after {
    width: 40px;
  }

  .marquee-track {
    animation-duration: 30s;
  }
}
</style>
