<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

// Comment input
const newComment = ref("");
const isSubmitting = ref(false);

// Fake comments data
const comments = ref([
  {
    id: 1,
    userName: "Nguyễn Văn Minh",
    avatar: "https://i.pravatar.cc/150?img=1",
    content:
      "Dự án rất ý nghĩa! Tôi đã ủng hộ và hy vọng các em nhỏ sẽ có điều kiện học tập tốt hơn. Cảm ơn Quỹ Bông Hồng Nhỏ đã kết nối những tấm lòng nhân ái! 💚",
    date: "2024-12-28T10:30:00",
    likes: 24,
    isLiked: false,
  },
  {
    id: 2,
    userName: "Trần Thị Hương",
    avatar: "https://i.pravatar.cc/150?img=5",
    content:
      "Mình đã share dự án này cho bạn bè và gia đình. Mong mọi người cùng chung tay góp sức!",
    date: "2024-12-27T14:15:00",
    likes: 18,
    isLiked: true,
  },
  {
    id: 3,
    userName: "Lê Hoàng Nam",
    avatar: "https://i.pravatar.cc/150?img=3",
    content:
      "Tôi từng có dịp đến thăm các bản làng vùng cao và thấy các em rất cần được hỗ trợ. Cảm ơn quỹ đã tổ chức dự án này!",
    date: "2024-12-26T09:00:00",
    likes: 31,
    isLiked: false,
  },
  {
    id: 4,
    userName: "Phạm Thùy Linh",
    avatar: "https://i.pravatar.cc/150?img=9",
    content: "Đã đóng góp 500k. Chúc dự án thành công! 🌸",
    date: "2024-12-25T16:45:00",
    likes: 12,
    isLiked: false,
  },
  {
    id: 5,
    userName: "Đỗ Quang Huy",
    avatar: "https://i.pravatar.cc/150?img=8",
    content:
      "Mình theo dõi quỹ từ lâu rồi, các dự án đều rất minh bạch và hiệu quả. Tin tưởng và ủng hộ!",
    date: "2024-12-24T11:20:00",
    likes: 45,
    isLiked: true,
  },
]);

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Hôm nay";
  if (days === 1) return "Hôm qua";
  if (days < 7) return `${days} ngày trước`;
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Total comments count
const totalComments = computed(() => comments.value.length);

// Toggle like
const toggleLike = (commentId) => {
  const comment = comments.value.find((c) => c.id === commentId);
  if (comment) {
    comment.isLiked = !comment.isLiked;
    comment.likes += comment.isLiked ? 1 : -1;
  }
};

// Submit comment
const submitComment = () => {
  if (!newComment.value.trim()) return;

  isSubmitting.value = true;

  // Simulate API call
  setTimeout(() => {
    const newCommentObj = {
      id: Date.now(),
      userName: "Bạn",
      avatar: "https://i.pravatar.cc/150?img=12",
      content: newComment.value.trim(),
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    };

    comments.value.unshift(newCommentObj);
    newComment.value = "";
    isSubmitting.value = false;
  }, 500);
};

// Share comment
const shareComment = async (comment) => {
  const shareText = `"${comment.content}" - ${comment.userName} về dự án ${props.project.title}`;
  const shareData = {
    title: `Bình luận của ${comment.userName}`,
    text: shareText,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Share cancelled");
    }
  } else {
    navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
    alert("Đã copy bình luận vào clipboard!");
  }
};
</script>

<template>
  <section class="comments-section">
    <div class="comments-header">
      <h2 class="section-title">
        <i class="bi bi-chat-dots"></i>
        Bình luận
        <span class="comment-count">{{ totalComments }}</span>
      </h2>
    </div>

    <!-- Comment Input -->
    <div class="comment-input-wrapper">
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Avatar"
        class="input-avatar"
      />
      <div class="input-container">
        <textarea
          v-model="newComment"
          placeholder="Chia sẻ suy nghĩ của bạn về dự án này..."
          rows="3"
          class="comment-textarea"
          @keydown.enter.ctrl="submitComment"
        ></textarea>
        <div class="input-actions">
          <span class="hint-text">Ctrl + Enter để gửi</span>
          <button
            class="btn-submit"
            :disabled="!newComment.trim() || isSubmitting"
            @click="submitComment"
          >
            <i v-if="isSubmitting" class="bi bi-arrow-repeat spinning"></i>
            <i v-else class="bi bi-send"></i>
            {{ isSubmitting ? "Đang gửi..." : "Gửi bình luận" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Comments List -->
    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <img
          :src="comment.avatar"
          :alt="comment.userName"
          class="comment-avatar"
        />
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-author">{{ comment.userName }}</span>
            <span class="comment-date">{{ formatDate(comment.date) }}</span>
          </div>
          <p class="comment-text">{{ comment.content }}</p>
          <div class="comment-actions">
            <button
              class="action-btn like-btn"
              :class="{ liked: comment.isLiked }"
              @click="toggleLike(comment.id)"
            >
              <i
                :class="comment.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'"
              ></i>
              <span>{{ comment.likes }}</span>
            </button>
            <button class="action-btn reply-btn">
              <i class="bi bi-reply"></i>
              <span>Trả lời</span>
            </button>
            <button class="action-btn share-btn" @click="shareComment(comment)">
              <i class="bi bi-share"></i>
              <span>Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div v-if="comments.length >= 5" class="load-more">
      <button class="btn-load-more">
        <i class="bi bi-arrow-down-circle"></i>
        Xem thêm bình luận
      </button>
    </div>
  </section>
</template>

<style scoped>
.comments-section {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.comments-header {
  margin-bottom: var(--spacing-xl);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
}

.section-title i {
  color: var(--color-primary);
  font-size: 1.3rem;
}

.comment-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  background: var(--color-background-alt);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-muted);
}

/* Comment Input */
.comment-input-wrapper {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-background-alt);
}

.input-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.input-container {
  flex: 1;
}

.comment-textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--color-background-alt);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: var(--font-size-base);
  resize: vertical;
  min-height: 80px;
  transition: border-color var(--transition-fast);
}

.comment-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.comment-textarea::placeholder {
  color: var(--color-text-muted);
}

.input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-sm);
}

.hint-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.btn-submit {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-submit:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Comments List */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.comment-item {
  display: flex;
  gap: var(--spacing-md);
}

.comment-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.comment-author {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.comment-date {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.comment-text {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  line-height: 1.6;
  margin: 0 0 var(--spacing-sm) 0;
  word-wrap: break-word;
}

.comment-actions {
  display: flex;
  gap: var(--spacing-md);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background: var(--color-background-alt);
  color: var(--color-text);
}

.like-btn.liked {
  color: var(--color-primary);
}

.like-btn.liked i {
  color: var(--color-primary);
}

.share-btn:hover {
  color: #1877f2;
}

.share-btn:hover i {
  color: #1877f2;
}

/* Load More */
.load-more {
  text-align: center;
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-background-alt);
}

.btn-load-more {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 10px 20px;
  background: var(--color-white);
  border: 1px solid var(--color-background-alt);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-load-more:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .comments-section {
    padding: var(--spacing-lg);
  }

  .comment-input-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .input-avatar {
    width: 40px;
    height: 40px;
  }

  .input-container {
    width: 100%;
  }

  .input-actions {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-sm);
  }

  .hint-text {
    text-align: center;
  }

  .btn-submit {
    justify-content: center;
  }

  .comment-avatar {
    width: 36px;
    height: 36px;
  }

  .comment-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
}
</style>
