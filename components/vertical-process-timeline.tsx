"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Tư Vấn & Lắng Nghe",
    description: "Chúng tôi lắng nghe chi tiết nhu cầu, mục tiêu và ngân sách của doanh nghiệp để đề xuất giải pháp phù hợp nhất.",
    points: [
      "Phân tích mục tiêu kinh doanh",
      "Xác định nền tảng livestream",
      "Lên kế hoạch ngân sách",
      "Định hình chiến lược nội dung"
    ],
    duration: "1-2 ngày"
  },
  {
    number: "02",
    title: "Khảo Sát & Quy Hoạch",
    description: "Đánh giá không gian, điều kiện ánh sáng, âm thanh và lên kế hoạch chi tiết cho setup.",
    points: [
      "Khảo sát địa điểm thực tế",
      "Đánh giá hạ tầng mạng",
      "Lập sơ đồ thiết bị",
      "Xác định điểm phát sóng tối ưu"
    ],
    duration: "2-3 ngày"
  },
  {
    number: "03",
    title: "Lên Kịch Bản & Chuẩn Bị",
    description: "Xây dựng kịch bản chi tiết, danh sách kiểm tra và tài liệu hướng dẫn cho toàn bộ quy trình.",
    points: [
      "Viết kịch bản livestream",
      "Chuẩn bị slide/graphic",
      "Kiểm tra công nghệ",
      "Đào tạo nhân viên"
    ],
    duration: "3-5 ngày"
  },
  {
    number: "04",
    title: "Setup & Cài Đặt Thiết Bị",
    description: "Lắp đặt, cân chỉnh và kiểm tra toàn bộ hệ thống thiết bị, mạng và phần mềm.",
    points: [
      "Lắp đặt camera & micro",
      "Thiết lập hệ thống ánh sáng",
      "Cấu hình mixer & encoder",
      "Kiểm tra chất lượng âm video"
    ],
    duration: "2-3 ngày"
  },
  {
    number: "05",
    title: "Vận Hành & Phát Sóng",
    description: "Quản lý toàn bộ quá trình phát sóng, tương tác với khán giả và xử lý sự cố thời gian thực.",
    points: [
      "Quản lý bình luận & tương tác",
      "Điều chỉnh chất lượng stream",
      "Hỗ trợ kỹ thuật 24/7",
      "Ghi lại tất cả phiên phát sóng"
    ],
    duration: "Theo lịch phát sóng"
  },
  {
    number: "06",
    title: "Báo Cáo & Tối Ưu",
    description: "Phân tích dữ liệu, lập báo cáo chi tiết và đề xuất cải thiện cho các buổi livestream tiếp theo.",
    points: [
      "Phân tích lưu lượng khán giả",
      "Đánh giá tương tác & mua hàng",
      "Lập báo cáo chi tiết",
      "Đề xuất cải thiện"
    ],
    duration: "1-2 ngày"
  }
]

export function VerticalProcessTimeline() {
  return (
    <section className="py-24 bg-[#0a0f1e] relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quy Trình 6 Giai Đoạn
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Một hành trình toàn diện từ tư vấn ban đầu đến phát sóng thành công
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50 top-0"
            style={{ originY: 0 }}
          />

          {/* Steps */}
          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-[58px] w-6 h-6 bg-blue-600 rounded-full border-4 border-[#0a0f1e] shadow-lg shadow-blue-500/50 z-20" />

                {/* Step Card */}
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800/50 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 ml-0 md:ml-0">
                  <CardContent className="p-8">
                    <div className="flex flex-col gap-6">
                      {/* Header */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-5xl font-bold text-blue-400 mb-2">
                              {step.number}
                            </div>
                            <h3 className="text-2xl font-bold text-white">
                              {step.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-blue-300 bg-blue-500/10 px-4 py-2 rounded-lg whitespace-nowrap">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">{step.duration}</span>
                          </div>
                        </div>
                        <p className="text-slate-300 text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Bullet Points */}
                      <div className="grid md:grid-cols-2 gap-3">
                        {step.points.map((point) => (
                          <div key={point} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
