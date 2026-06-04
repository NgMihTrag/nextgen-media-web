"use client"

import { motion } from "framer-motion"

const logos = [
  { name: "TikTok", color: "#000000" },
  { name: "Shopee", color: "#EE4D2D" },
  { name: "Lazada", color: "#0F146D" },
  { name: "Facebook", color: "#1877F2" },
  { name: "Instagram", color: "#E4405F" },
  { name: "YouTube", color: "#FF0000" },
]

export function ClientLogos() {
  return (
    <section className="py-16 bg-muted/50 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-10 uppercase tracking-wider"
        >
          Đối tác tin cậy của chúng tôi
        </motion.p>
      </div>
      
      {/* Scrolling Logos */}
      <div className="relative">
        <div className="flex animate-scroll">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-12 flex items-center justify-center"
            >
              <div className="flex items-center gap-3 px-6 py-3 bg-background rounded-xl border border-border hover:border-primary/30 transition-colors">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm"
                  style={{ backgroundColor: logo.color }}
                >
                  {logo.name.charAt(0)}
                </div>
                <span className="text-foreground font-medium whitespace-nowrap">{logo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
