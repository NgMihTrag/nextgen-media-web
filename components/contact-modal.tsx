"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useContactModal } from "@/context/contact-modal-context"
import { X, Phone, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

export function ContactModal() {
  const { isOpen, closeModal } = useContactModal()

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, closeModal])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[500px] lg:max-w-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>

              {/* Modal Content */}
              <div className="p-8 flex flex-col items-center">
                {/* QR Code */}
                <div className="mb-6 w-full max-w-[300px]">
                  <Image
                    src="/zalo-qr.png"
                    alt="Zalo QR Code"
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-xl"
                    priority
                  />
                </div>

                {/* Subtitle */}
                <p className="text-slate-500 text-sm text-center mb-6">
                  Quét mã QR để liên hệ trực tiếp qua Zalo
                </p>

                {/* Contact Info */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    Nguyễn Minh Tráng
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Danh thiếp Zalo
                  </p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>Hotline: <span className="font-semibold text-slate-900">0838 110 501</span></p>
                    <p>Email: <span className="font-semibold text-slate-900">trang.2663@gmail.com</span></p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full grid grid-cols-2 gap-4">
                  {/* Call Button */}
                  <a
                    href="tel:0838110501"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 group"
                  >
                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Gọi Ngay
                  </a>

                  {/* Chat Zalo Button */}
                  <a
                    href="https://zalo.me/0838110501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 group"
                  >
                    <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Chat Zalo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
