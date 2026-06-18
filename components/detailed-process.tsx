"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const processes = [
  {
    step: 1,
    title: "Tư Vấn & Lắng Nghe",
    description: "Chúng tôi lắng nghe chi tiết nhu cầu, mục tiêu và ngân sách của doanh nghiệp để đề xuất giải pháp phù hợp nhất.",
    points: [
      "Phân tích mục tiêu kinh doanh",
      "Xác định nền tảng livestream",
      "Lên kế hoạch ngân sách",
      "Định hình chiến lược nội dung"
    ],
    imagePosition: "right"
  },
  {
    step: 2,
    title: "Khảo Sát & Quy Hoạch",
    description: "Đánh giá không gian, điều kiện ánh sáng, âm thanh và lên kế hoạch chi tiết cho setup.",
    points: [
      "Khảo sát địa điểm thực tế",
      "Đánh giá hạ tầng mạng",
      "Lập sơ đồ thiết bị",
      "Xác định điểm phát sóng tối ưu"
    ],
    imagePosition: "left"
  },
  {
    step: 3,
    title: "Lên Kịch Bản & Chuẩn Bị",
    description: "Xây dựng kịch bản chi tiết, danh sách kiểm tra và tài liệu hướng dẫn cho toàn bộ quy trình.",
    points: [
      "Viết kịch bản livestream",
      "Chuẩn bị slide/graphic",
      "Kiểm tra công nghệ",
      "Đào tạo nhân viên"
    ],
    imagePosition: "right"
  },
  {
    step: 4,
    title: "Setup & Cài Đặt Thiết Bị",
    description: "Lắp đặt, cân chỉnh và kiểm tra toàn bộ hệ thống thiết bị, mạng và phần mềm.",
    points: [
      "Lắp đặt camera & micro",
      "Thiết lập hệ thống ánh sáng",
      "Cấu hình mixer & encoder",
      "Kiểm tra chất lượng âm video"
    ],
    imagePosition: "left"
  },
  {
    step: 5,
    title: "Vận Hành & Phát Sóng",
    description: "Quản lý toàn bộ quá trình phát sóng, tương tác với khán giả và xử lý sự cố thời gian thực.",
    points: [
      "Quản lý bình luận & tương tác",
      "Điều chỉnh chất lượng stream",
      "Hỗ trợ kỹ thuật 24/7",
      "Ghi lại tất cả phiên phát sóng"
    ],
    imagePosition: "right"
  },
  {
    step: 6,
    title: "Báo Cáo & Tối Ưu",
    description: "Phân tích dữ liệu, lập báo cáo chi tiết và đề xuất cải thiện cho các buổi livestream tiếp theo.",
    points: [
      "Phân tích lưu lượng khán giả",
      "Đánh giá tương tác & mua hàng",
      "Lập báo cáo chi tiết",
      "Đề xuất cải thiện"
    ],
    imagePosition: "left"
  }
]

export function DetailedProcess() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Chi Tiết Từng Giai Đoạn
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Hiểu rõ hơn về cách chúng tôi triển khai từng bước của quy trình
          </p>
        </motion.div>

        {/* Process Details */}
        <div className="space-y-20">
          {processes.map((process, index) => (
            <motion.div
              key={process.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${process.imagePosition === "left" ? "md:flex-row-reverse" : ""}`}>
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: process.imagePosition === "left" ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-white">{process.step}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{process.title}</h3>
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {process.description}
                  </p>
                  <ul className="space-y-3">
                    {process.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Image Placeholder */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="relative h-64 md:h-80 rounded-xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-blue-800/10"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-blue-500/20 mb-2">{process.step}</div>
                      <p className="text-blue-400/50">{process.title}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
