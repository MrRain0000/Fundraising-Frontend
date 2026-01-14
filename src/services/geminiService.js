// Gemini API Service for Chatbot
import organizationData from '@/data/organization.json';
import projectsData from '@/data/projects.json';
import donationsData from '@/data/donations.json';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

// Build system prompt with organization context
const buildSystemPrompt = () => {
  const activeProjects = projectsData.filter(p => p.status === 'active');
  const completedProjects = projectsData.filter(p => p.status === 'completed');
  
  return `Bạn là trợ lý ảo thân thiện của ${organizationData.name} (${organizationData.englishName}). 

**GIỚI THIỆU VỀ QUỸ:**
${organizationData.description}

**SỨ MỆNH:**
${organizationData.mission}

**THÔNG TIN LIÊN HỆ:**
- Website: ${organizationData.website}
- Hotline: ${organizationData.hotline}
- Email: ${organizationData.email}
- Hoạt động từ năm: ${organizationData.foundedYear}

**THÔNG TIN CHUYỂN KHOẢN QUYÊN GÓP:**
- Ngân hàng: ${organizationData.bankInfo.bankName}
- Số tài khoản: ${organizationData.bankInfo.accountNumber}
- Chủ tài khoản: ${organizationData.bankInfo.accountName}
- Chi nhánh: ${organizationData.bankInfo.branch}

**CAM KẾT MINH BẠCH:**
${organizationData.transparency.map(t => `- ${t}`).join('\n')}

**THÀNH TỰU:**
- Tổng số tiền đã nhận: ${organizationData.stats.totalRaised}
- Số lượt đóng góp: ${organizationData.stats.totalDonors}
- Dự án đã hoàn thành: ${organizationData.stats.projectsCompleted}
- Số tỉnh thành đã đến: ${organizationData.stats.provincesReached}

**CÁC LĨNH VỰC HOẠT ĐỘNG:**
${organizationData.programs.map(p => `- ${p.name}: ${p.description}`).join('\n')}

**DỰ ÁN ĐANG HOẠT ĐỘNG (${activeProjects.length} dự án):**
${activeProjects.slice(0, 6).map(p => `- "${p.title}" tại ${p.location}: ${p.shortDescription} (Đã đạt ${p.raised}/${p.target} VNĐ, chiếm ${Math.round(p.raised/p.target*100)}%, còn ${p.daysLeft} ngày)`).join('\n')}

**DỰ ÁN ĐÃ HOÀN THÀNH (${completedProjects.length} dự án):**
${completedProjects.slice(0, 4).map(p => `- "${p.title}" tại ${p.location}: ${p.shortDescription}`).join('\n')}

**CÁCH QUYÊN GÓP:**
${organizationData.howToDonate.map((h, i) => `${i+1}. ${h}`).join('\n')}

**NHIỆM VỤ CỦA BẠN:**
1. Trả lời các câu hỏi về Quỹ và hoạt động thiện nguyện
2. Hướng dẫn cách quyên góp và cung cấp thông tin ngân hàng
3. Giới thiệu các dự án đang hoạt động khi được hỏi
4. Khi người dùng muốn tra cứu khoản đóng góp, hỏi họ mã giao dịch (format: PT-2024-XXX)
5. Luôn thể hiện sự thân thiện, chuyên nghiệp và nhiệt tình

**QUY TẮC TRẢ LỜI:**
- **QUAN TRỌNG:** Khi người dùng muốn quyên góp, KHÔNG liệt kê thông tin ngân hàng dài dòng. HÃY dùng cú pháp sau để hiển thị nút quyên góp: {{DONATE_BTN}}.
   Ví dụ: "Bạn có thể ủng hộ ngay tại đây: {{DONATE_BTN}}".
   Chỉ cung cấp thông tin ngân hàng khi người dùng hỏi cụ thể.
- **QUAN TRỌNG:** Khi nhắc đến tiến độ của dự án, KHÔNG dùng lời văn dài dòng. HÃY dùng cú pháp sau để hiển thị thanh tiến độ: {{PROGRESS:phần_trăm|ngày_còn_lại|số_tiền_đã_góp|mục_tiêu}}.
   Ví dụ: "{{PROGRESS:50|30|150000000|300000000}}".
   LƯU Ý: Số tiền phải là SỐ NGUYÊN, không dùng dấu chấm hay phẩy ngăn cách.
   Chỉ sử dụng cú pháp này cho các dự án đang hoạt động.`;
};

// Search donations by code
const searchDonation = (code) => {
  const normalizedCode = code.toUpperCase().trim();
  return donationsData.find(d => d.code.toUpperCase() === normalizedCode);
};

// Search projects by keyword
const searchProject = (keyword) => {
  const normalizedKeyword = keyword.toLowerCase();
  return projectsData.filter(p => 
    p.title.toLowerCase().includes(normalizedKeyword) ||
    p.shortDescription.toLowerCase().includes(normalizedKeyword) ||
    p.location.toLowerCase().includes(normalizedKeyword)
  );
};

// Format currency for display
const formatCurrency = (amount) => {
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(1).replace('.0', '') + ' tỷ đồng';
  } else if (amount >= 1000000) {
    return Math.round(amount / 1000000) + ' triệu đồng';
  }
  return amount.toLocaleString('vi-VN') + ' đồng';
};

// Main chat function
export const sendMessage = async (userMessage, chatHistory = []) => {
  if (!GEMINI_API_KEY) {
    return {
      success: false,
      message: 'Xin lỗi, chatbot đang được cấu hình. Vui lòng liên hệ hotline ' + organizationData.hotline + ' để được hỗ trợ. 📞'
    };
  }

  try {
    // Check for donation lookup intent
    const donationCodeMatch = userMessage.match(/PT-\d{4}-\d{3}/i);
    if (donationCodeMatch) {
      const donation = searchDonation(donationCodeMatch[0]);
      if (donation) {
        const usageDetails = donation.usedFor.map(u => 
          `• ${u.item}: ${formatCurrency(u.amount)}`
        ).join('\n');
        
        return {
          success: true,
          message: `✅ **Tìm thấy khoản quyên góp!**

📋 **Mã giao dịch:** ${donation.code}
👤 **Nhà tài trợ:** ${donation.name}
💰 **Số tiền:** ${formatCurrency(donation.amount)}
📅 **Ngày quyên góp:** ${donation.date}
🎯 **Dự án:** ${donation.campaign}
📊 **Trạng thái:** ${donation.status === 'completed' ? 'Đã sử dụng hoàn tất ✅' : 'Đang triển khai 🔄'}

**Chi tiết sử dụng:**
${usageDetails}

Cảm ơn bạn đã tin tưởng và đồng hành cùng Quỹ! 💚`
        };
      }
    }

    // Build conversation history for API
    const contents = [
      {
        role: 'user',
        parts: [{ text: buildSystemPrompt() + '\n\nHãy nhớ các thông tin trên để trả lời câu hỏi của người dùng.' }]
      },
      {
        role: 'model',
        parts: [{ text: 'Tôi đã ghi nhớ tất cả thông tin về Quỹ Từ Thiện Bông Hồng Nhỏ. Tôi sẵn sàng hỗ trợ người dùng! 🌹' }]
      },
      ...chatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ];

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return {
        success: true,
        message: data.candidates[0].content.parts[0].text
      };
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      success: false,
      message: `Xin lỗi, tôi gặp sự cố khi xử lý. Vui lòng thử lại hoặc liên hệ hotline ${organizationData.hotline} để được hỗ trợ trực tiếp. 📞`
    };
  }
};

// Get quick suggestions
export const getQuickSuggestions = () => [
  'Làm sao để quyên góp?',
  'Dự án nào đang cần hỗ trợ?',
  'Tra cứu khoản đóng góp',
  'Giới thiệu về Quỹ'
];

export default {
  sendMessage,
  getQuickSuggestions,
  searchDonation,
  searchProject
};
