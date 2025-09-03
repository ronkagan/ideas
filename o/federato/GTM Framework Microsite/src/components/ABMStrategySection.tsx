import { motion } from "motion/react";

export default function ABMStrategySection() {
  const strategySteps = [
    {
      title: "Identify",
      description: "Isolate the 37% of carriers (&gt;$5B) reporting the highest levels of waste",
      icon: "🎯"
    },
    {
      title: "Personalize", 
      description: "Lead with customized pain points derived from the report, tailored to persona (CUO vs. VP Ops)",
      icon: "🎨"
    },
    {
      title: "Orchestrate",
      description: "Tight alignment between personalized advertising, intent signal capture, and immediate sales activation",
      icon: "🎼"
    },
    {
      title: "Convert",
      description: "Transform frustration into urgency through concrete financial impact demonstration",
      icon: "⚡"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#0A459C] to-[#083a7a] text-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            Turning Insights into Pipeline Requires Precision, Not Volume.
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            We will execute a multi-tiered ABM framework focused on surrounding the buying committees 
            at the accounts most acutely feeling this pain.
          </p>
        </motion.div>

        {/* Strategy Flow */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {strategySteps.map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-[#20DFA6] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    {step.icon}
                  </div>
                  
                  {/* Arrow to next step */}
                  {index < strategySteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-blue-300 transform -translate-y-0.5">
                      <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-blue-300 border-t-2 border-b-2 border-t-transparent border-b-transparent transform -translate-y-1/2" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl mb-3 text-[#20DFA6]">{step.title}</h3>
                <p className="text-blue-100 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategy Details */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <h4 className="text-xl mb-4 text-[#20DFA6]">Hyper-Targeting</h4>
            <p className="text-blue-100">
              Isolating the 37% of carriers (&gt;$5B) reporting the highest levels of waste. 
              Focus on where the pain is most acute and the opportunity greatest.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <h4 className="text-xl mb-4 text-[#20DFA6]">Data-Driven Personalization</h4>
            <p className="text-blue-100">
              Leading with customized pain points derived from the report, tailored to the persona. 
              CUOs care about strategic risk, VPs Ops care about operational efficiency.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <h4 className="text-xl mb-4 text-[#20DFA6]">Seamless Orchestration</h4>
            <p className="text-blue-100">
              Tight alignment between personalized advertising, intent signal capture, and immediate sales activation. 
              No handoff friction between marketing touch and sales conversation.
            </p>
          </div>
        </motion.div>

        {/* Key Stat */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-block bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
            <div className="text-sm text-blue-200 uppercase tracking-wide mb-2">Surgical ABM Focus</div>
            <div className="text-4xl mb-2 text-[#20DFA6]">37%</div>
            <div className="text-blue-100">of Tier 1 carriers reporting highest inefficiency levels</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}