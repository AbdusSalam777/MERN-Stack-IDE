import React from 'react'
import { motion } from "framer-motion";

const Featurecard = ({title, desc, Icon, color, glow}) => {
   return (
    <motion.div
      whileHover={{ y: -12, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 220, damping: 15 }}
      className="group relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl
                 border border-white/10 hover:border-white/20
                 transition-all duration-300
                 hover:shadow-[0_0_45px_rgba(34,197,94,0.25)]"
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <Icon
          className={`text-6xl mb-6 ${color} drop-shadow-[0_0_20px_${glow}]`}
        />
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default Featurecard;