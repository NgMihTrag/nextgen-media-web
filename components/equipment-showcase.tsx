"use client"

import { motion } from "framer-motion"
import { Camera, Mic, Sliders, Radio, Lightbulb, Wifi } from "lucide-react"

const equipment = [
  { icon: Camera, title: "Camera", description: "4K Camera, PTZ Camera, Gimbal Stabilizer" },
  { icon: Mic, title: "Microphone", description: "Microphone chuyên nghiệp, Lavalier, Condenser" },
  { icon: Sliders, title: "Mixer Audio", description: "Professional Audio Mixer, Sound Processor" },
  { icon: Radio, title: "Encoder", description: "Streaming Encoder, Multi-bitrate Support" },
  { icon: Lightbulb, title: "Lighting", description: "LED Ring Light, Studio Lights, Backlight" },
  { icon: Wifi, title: "Internet System", description: "Dual Internet Connection, Failover System" },
]

export function EquipmentShowcase() {
  return (
    <section className="py-24 bg-[#0a0f1e]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trang Bị & Thiết Bị
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Các thiết bị chuyên nghiệp được lựa chọn kỹ càng để đảm bảo chất lượng tốt nhất
          </p>
        </motion.div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 group-hover:border-blue-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
