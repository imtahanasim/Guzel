"use client"

import { motion } from "framer-motion"

// Custom animated icons to ensure pathLength animation works perfectly using motion.path
const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3e523f]">
    <motion.path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    <motion.path
      d="M17 8l-5-5-5 5"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
    />
    <motion.path
      d="M12 3v12"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
    />
  </svg>
)

const SettingsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3e523f]">
    <motion.path
      d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.circle
      cx="12" cy="12" r="3"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
    />
  </svg>
)

const PackageIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3e523f]">
    <motion.path
      d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.path
      d="M3.27 6.96L12 12.01l8.73-5.05"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
    />
    <motion.path
      d="M12 22.08V12"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
    />
  </svg>
)

const steps = [
  {
    icon: UploadIcon,
    title: "Upload & Print",
    description: "Upload your art or mail it to us. We handle professional printing.",
  },
  {
    icon: SettingsIcon,
    title: "Design Your Frame",
    description: "Select wood, mount, and size. Customize every detail.",
  },
  {
    icon: PackageIcon,
    title: "Delivered Ready to Hang",
    description: "Handcrafted and delivered, ready to display on your wall.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function ServiceSteps() {
  return (
    <section className="bg-[#FFF9EF] py-16 md:py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center mb-20 md:mb-24"
        >
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#3e523f]/60 mb-4 block">Process</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3D5C3D] mb-6">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto font-sans leading-relaxed">
            Simple steps to transform your art into a handcrafted masterpiece, delivered with care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-4 px-4 md:px-0 md:gap-16 max-w-5xl mx-auto pb-4 md:pb-0 no-scrollbar"
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center space-y-6 min-w-[80vw] md:min-w-0 snap-center"
              >
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#f5f5f0] mb-2 shadow-sm">
                  <Icon />
                </div>
                <h3 className="font-serif text-2xl text-[#3D5C3D]">
                  {step.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed max-w-[280px]">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
