'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <Link href="/" className="block">
          <motion.h1
            className="font-heading text-2xl sm:text-3xl font-bold text-text text-center cursor-pointer hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Beleza Viva
          </motion.h1>
        </Link>
      </div>
    </header>
  )
}

