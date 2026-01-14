<script setup>
import { ref, nextTick, watch, onMounted } from "vue";
import { sendMessage, getQuickSuggestions } from "@/services/geminiService";

// Chat state
const isOpen = ref(false);
const messages = ref([]);
const inputMessage = ref("");
const isLoading = ref(false);
const messagesContainer = ref(null);

// Quick suggestions
const suggestions = getQuickSuggestions();

// Toggle chat window
const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && messages.value.length === 0) {
    // Add welcome message
    messages.value.push({
      role: "assistant",
      content:
        "Xin chào! 🌹 Tôi là trợ lý ảo của Quỹ Bông Hồng Nhỏ. Tôi có thể giúp bạn:\n\n• Tìm hiểu về các dự án thiện nguyện\n• Hướng dẫn cách quyên góp\n• Tra cứu khoản đóng góp\n• Trả lời các câu hỏi về Quỹ\n\nBạn cần hỗ trợ gì ạ?",
    });
  }
};

// Send message
const handleSend = async () => {
  const text = inputMessage.value.trim();
  if (!text || isLoading.value) return;

  // Add user message
  messages.value.push({
    role: "user",
    content: text,
  });
  inputMessage.value = "";
  isLoading.value = true;

  // Scroll to bottom
  await nextTick();
  scrollToBottom();

  // Build chat history (last 10 messages for context)
  const history = messages.value.slice(-10, -1).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.content,
  }));

  // Call Gemini API
  const response = await sendMessage(text, history);

  // Add bot response
  messages.value.push({
    role: "assistant",
    content: response.message,
  });

  isLoading.value = false;

  // Scroll to bottom
  await nextTick();
  scrollToBottom();
};

// Handle suggestion click
const handleSuggestion = (suggestion) => {
  inputMessage.value = suggestion;
  handleSend();
};

// Scroll to bottom of messages
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Handle Enter key
const handleKeydown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
};

// Format message content (simple markdown-like formatting)
const formatMessage = (content) => {
  let formatted = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");

  // Replace progress tags
  formatted = formatted.replace(
    /\{\{PROGRESS:(\d+)\|(\d+)\|([^\|]+)\|([^\|\}]+)\}\}/g,
    (match, percent, days, raised, target) => {
      // Limit percent to 100
      const p = Math.min(100, parseInt(percent));

      // Parse numbers if possible, otherwise keep string
      const formatNum = (val) => {
        // Remove dots/commas and try parse
        const clean = val.toString().replace(/[\.,]/g, "");
        const num = parseInt(clean);
        return !isNaN(num) ? num.toLocaleString("vi-VN") + " đ" : val;
      };

      return `
        <div class="chat-progress-card">
          <div class="progress-info">
            <span class="progress-label">Tiến độ quyên góp</span>
            <span class="progress-percent">${p}%</span>
          </div>
          <div class="chat-progress-bar">
            <div class="chat-progress-fill" style="width: ${p}%"></div>
          </div>
          <div class="progress-stats">
            <div class="stat-item">
              <span class="stat-label">Đã góp:</span>
              <span class="stat-value highlighted">${formatNum(raised)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Mục tiêu:</span>
              <span class="stat-value">${formatNum(target)}</span>
            </div>
          </div>
          <div class="progress-meta">
            <span><i class="bi bi-clock"></i> Còn ${days} ngày</span>
            <span><i class="bi bi-check-circle"></i> Đang chạy</span>
          </div>
        </div>
      `;
    }
  );

  // Replace Donate Button tag
  formatted = formatted.replace(
    /\{\{DONATE_BTN\}\}/g,
    `<button class="btn-chat-donate" onclick="window.location.href='/quyen-gop'"><i class="bi bi-heart-fill"></i> Quyên góp ngay</button>`
  );

  return formatted;
};

// Handle clicks within messages (for donate button navigation)
const handleMessageClick = (event) => {
  const target = event.target.closest(".btn-chat-donate");
  if (target) {
    // Prevent default navigation if we want to use router push (optional, simpler to use href for now)
    // but href in onclick works fine for simple SPA nav or reload
  }
};
</script>

<template>
  <div class="chat-widget">
    <!-- Toggle Button -->
    <button
      class="chat-toggle-btn"
      @click="toggleChat"
      :class="{ 'is-open': isOpen }"
    >
      <i v-if="!isOpen" class="bi bi-chat-dots-fill"></i>
      <i v-else class="bi bi-x-lg"></i>
    </button>

    <!-- Chat Window -->
    <Transition name="chat-window">
      <div v-if="isOpen" class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="header-info">
            <div class="avatar">
              <img
                src="https://littlerosesfoundation.org/wp-content/uploads/2022/09/Asset-1.png"
                alt="Bot"
              />
            </div>
            <div class="header-text">
              <h4>Trợ lý Bông Hồng Nhỏ</h4>
              <span class="status">
                <span class="status-dot"></span>
                Trực tuyến
              </span>
            </div>
          </div>
          <button class="close-btn" @click="toggleChat">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Messages -->
        <div class="chat-messages" ref="messagesContainer">
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="message"
            :class="msg.role"
          >
            <div
              class="message-content"
              v-html="formatMessage(msg.content)"
            ></div>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading" class="message assistant">
            <div class="message-content loading">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>

          <!-- Quick Suggestions (only show at start) -->
          <div v-if="messages.length === 1 && !isLoading" class="suggestions">
            <button
              v-for="(sug, idx) in suggestions"
              :key="idx"
              class="suggestion-btn"
              @click="handleSuggestion(sug)"
            >
              {{ sug }}
            </button>
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input">
          <input
            v-model="inputMessage"
            type="text"
            placeholder="Nhập tin nhắn..."
            @keydown="handleKeydown"
            :disabled="isLoading"
          />
          <button
            class="send-btn"
            @click="handleSend"
            :disabled="!inputMessage.trim() || isLoading"
          >
            <i class="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9998;
  font-family: var(--font-base);
}

/* Toggle Button */
.chat-toggle-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-primary-dark)
  );
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(177, 32, 41, 0.4);
  transition: all 0.3s ease;
}

.chat-toggle-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(177, 32, 41, 0.5);
}

.chat-toggle-btn.is-open {
  background: #374151;
}

/* Chat Window */
.chat-window {
  position: absolute;
  bottom: 75px;
  right: 0;
  width: 380px;
  height: 520px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Animations */
.chat-window-enter-active,
.chat-window-leave-active {
  transition: all 0.3s ease;
}

.chat-window-enter-from,
.chat-window-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-primary-dark)
  );
  color: white;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: white;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.header-text h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
}

.status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  opacity: 0.9;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f9fafb;
}

.message {
  max-width: 85%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.message.user .message-content {
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-primary-dark)
  );
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content {
  background: white;
  color: #374151;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Loading dots */
.message-content.loading {
  display: flex;
  gap: 4px;
  padding: 16px 20px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}
.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
  }
  40% {
    transform: scale(1.2);
  }
}

/* Suggestions */
.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.suggestion-btn {
  padding: 8px 14px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  font-size: 0.8rem;
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.suggestion-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Input */
.chat-input {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: white;
  border-top: 1px solid #e5e7eb;
}

.chat-input input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input input:focus {
  border-color: var(--color-primary);
}

.chat-input input::placeholder {
  color: #9ca3af;
}

.send-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: scale(1.05);
}

.send-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 480px) {
  .chat-widget {
    bottom: 10px;
    right: 10px;
  }

  .chat-toggle-btn {
    width: 54px;
    height: 54px;
    font-size: 1.3rem;
  }

  .chat-window {
    width: calc(100vw - 20px);
    height: calc(100vh - 80px);
    bottom: 65px;
    right: 0;
    border-radius: 12px;
  }
}
/* Progress Bar Card */
:deep(.chat-progress-card) {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 12px;
  margin: 8px 0;
  width: 100%;
}

:deep(.progress-info) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.85rem;
}

:deep(.progress-label) {
  color: #166534;
  font-weight: 500;
}

:deep(.progress-percent) {
  color: #15803d;
  font-weight: 700;
}

:deep(.chat-progress-bar) {
  height: 8px;
  background: #dcfce7;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

:deep(.chat-progress-fill) {
  height: 100%;
  background: #22c55e;
  border-radius: 4px;
  transition: width 0.5s ease;
}

/* Donate Button */
:deep(.btn-chat-donate) {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  color: white;
  border: none;
  padding: 9px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
}

:deep(.btn-chat-donate:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(239, 68, 68, 0.4);
}

:deep(.progress-stats) {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #bbf7d0;
  font-size: 0.8rem;
}

:deep(.stat-item) {
  display: flex;
  flex-direction: column;
}

:deep(.stat-label) {
  color: #4b5563;
  font-size: 0.75rem;
}

:deep(.stat-value) {
  font-weight: 600;
  color: #374151;
}

:deep(.stat-value.highlighted) {
  color: #15803d;
}

:deep(.progress-meta) {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #15803d;
}

:deep(.progress-meta i) {
  margin-right: 4px;
}
</style>
