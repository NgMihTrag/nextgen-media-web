"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ExternalLink } from "lucide-react"

const creators = [
  {
    name: "Beauty Store VN",
    industry: "Mỹ phẩm",
    followers: "125K",
    description: "Tăng 300% doanh số sau 3 tháng hợp tác",
    avatar: "BS",
    color: "#ec4899",
  },
  {
    name: "Fashion Hub",
    industry: "Thời trang",
    followers: "89K",
    description: "Từ 0 đến 100K followers trong 6 tháng",
    avatar: "FH",
    color: "#8b5cf6",
  },
  {
    name: "Tech Gadget Pro",
    industry: "Công nghệ",
    followers: "256K",
    description: "Top 1 bán hàng công nghệ trên TikTok Shop",
    avatar: "TG",
    color: "#06b6d4",
  },
  {
    name: "Home Living",
    industry: "Nội thất",
    followers: "67K",
    description: "Mở rộng thị trường online thành công",
    avatar: "HL",
    color: "#f97316",
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Khách hàng đã triển khai cùng chúng tôi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Những dự án tiêu biểu đã được NextGen Media đồng hành.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator, index) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
                {/* Cover Image */}
                <div 
                  className="h-32 relative"
                  style={{ backgroundColor: `${creator.color}20` }}
                >
                  <div 
                    className="absolute inset-0 opacity-50"
                    style={{ 
                      background: `linear-gradient(135deg, ${creator.color}40 0%, transparent 100%)` 
                    }}
                  />
                </div>
                
                <CardContent className="p-6 pt-0 relative">
                  {/* Avatar */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl -mt-8 relative z-10 border-4 border-card"
                    style={{ backgroundColor: creator.color }}
                  >
                    {creator.avatar}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-card-foreground mt-4 mb-1">
                    {creator.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">{creator.industry}</p>
                  
                  <div className="flex items-center gap-1 text-sm text-foreground mb-3">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-medium">{creator.followers}</span>
                    <span className="text-muted-foreground">followers</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {creator.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full group/btn border-border text-foreground hover:border-primary hover:text-primary"
                  >
                    Xem Case Study
                    <ExternalLink className="w-3 h-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
