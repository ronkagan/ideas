import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f8f9fb] to-white flex items-center justify-center relative overflow-hidden pt-14">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:80px_80px]" />
      
      {/* Subtle geometric background elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#B3DDFA]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-32 left-16 w-48 h-48 bg-[#20DFA6]/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Animated visualization */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="relative mx-auto w-72 h-72">
            {/* Total GWP Circle */}
            <div className="absolute inset-0 rounded-full border-8 border-[#B3DDFA]/50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-xl text-[#0A459C]/70 mb-1">Total Industry</div>
                <div className="text-4xl text-[#0A459C]">$500B</div>
                <div className="text-lg text-[#0A459C]/70">GWP</div>
              </div>
            </div>
            
            {/* Wasted effort visualization */}
            <motion.div 
              className="absolute inset-0 rounded-full border-8 border-red-500"
              style={{
                clipPath: "polygon(0 0, 26% 0, 26% 100%, 0 100%)"
              }}
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
              animate={{ clipPath: "polygon(0 0, 26% 0, 26% 100%, 0 100%)" }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            
            {/* 26% Label */}
            <motion.div 
              className="absolute -left-20 top-1/2 transform -translate-y-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 }}
            >
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-xl shadow-lg">
                26%
              </div>
              <div className="text-sm text-red-600 mt-1">Wasted Effort</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-[#0A459C]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          26% Wasted Effort Isn't Just Inefficient.
          <br />
          <span className="text-red-600">It's an Existential Tax.</span>
        </motion.h1>

        {/* Body copy */}
        <motion.div 
          className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p>
            Federato's 2025 State of Underwriting Report exposed the quiet crisis in P&C insurance: 
            over a quarter of all underwriting effort is wasted on unwinnable deals.
          </p>
          
          <p>
            This isn't a generalized market problem; it's a quantifiable <strong className="text-[#0A459C]">"Inefficiency Tax."</strong>
          </p>
          
          <p>
            The crisis is most acute where the opportunity is greatest. For Tier 1 carriers (&gt;$5B Premium), 
            <strong className="text-red-600"> 37% report wasting up to 50% of their effort.</strong> Our GTM strategy is 
            designed to target this specific frustration, eliminate the tax, and define the RiskOps category.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex flex-col items-center text-[#0A459C]/60">
            <div className="text-sm mb-2">Scroll to explore</div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-[#0A459C]/40 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-[#0A459C]/60 rounded-full mt-2" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}