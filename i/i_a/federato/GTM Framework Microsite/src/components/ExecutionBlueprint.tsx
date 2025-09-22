import { motion } from "motion/react";

interface TimelineItem {
  period: string;
  title: string;
  description: string;
  tasks: string[];
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    period: "Days 1-30",
    title: "Architect & Align",
    description: "Foundation setting and strategic alignment",
    tasks: [
      "Integrate MarTech stack",
      "Finalize ICP based on \"highest inefficiency\" segments", 
      "Align Sales on TAL and SLAs",
      "Build the \"Inefficiency Tax Calculator\" and Tier 3 pilot assets"
    ],
    color: "bg-blue-500"
  },
  {
    period: "Days 31-60", 
    title: "Launch & Orchestrate",
    description: "Campaign execution and synchronized plays",
    tasks: [
      "Launch Tier 3 pilot to 5 strategic accounts",
      "Activate Tier 1 multi-channel air cover",
      "Execute synchronized Sales/Marketing plays",
      "Establish KPI framework"
    ],
    color: "bg-[#20DFA6]"
  },
  {
    period: "Days 61-90",
    title: "Optimize & Scale", 
    description: "Data-driven optimization and scaling",
    tasks: [
      "Analyze pilot data",
      "Optimize messaging/channel mix",
      "Scale successful plays from Tier 3 to the Tier 2 segment"
    ],
    color: "bg-[#0A459C]"
  }
];

export default function ExecutionBlueprint() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            Immediate Impact, Strategic Foundation.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            A clear 90-day execution plan designed to deliver quick wins while building 
            the infrastructure for long-term category leadership.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300" />
            
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  {/* Timeline marker */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className={`w-4 h-4 rounded-full ${item.color} border-4 border-white shadow-lg`} />
                  </div>

                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                      <div className="mb-4">
                        <div className={`inline-block px-3 py-1 rounded-full text-white text-sm ${item.color} mb-2`}>
                          {item.period}
                        </div>
                        <h3 className="text-xl text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                      
                      <ul className="space-y-2">
                        {item.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="text-gray-600 text-sm flex items-start">
                            <span className="text-[#20DFA6] mr-2 mt-1 text-xs">●</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Milestones */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="text-2xl text-blue-600 mb-2">30</div>
            <div className="text-sm text-blue-800">Days to Foundation</div>
          </div>
          <div className="text-center bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="text-2xl text-[#20DFA6] mb-2">60</div>
            <div className="text-sm text-green-800">Days to Market Activation</div>
          </div>
          <div className="text-center bg-[#0A459C]/5 p-6 rounded-lg border border-[#0A459C]/20">
            <div className="text-2xl text-[#0A459C] mb-2">90</div>
            <div className="text-sm text-[#0A459C]">Days to Scalable Growth</div>
          </div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div 
          className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg max-w-4xl mx-auto"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <h4 className="text-lg text-yellow-800 mb-3">Expected 90-Day Outcomes</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold text-yellow-800">Pipeline:</span>
              <span className="text-yellow-700"> 5+ strategic opportunities identified</span>
            </div>
            <div>
              <span className="font-semibold text-yellow-800">Engagement:</span>
              <span className="text-yellow-700"> 200+ calculator completions</span>
            </div>
            <div>
              <span className="font-semibold text-yellow-800">Market Position:</span>
              <span className="text-yellow-700"> RiskOps category leadership established</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}