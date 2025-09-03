import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import ronHeadshot from "figma:asset/a4181e0d79fe4211bdfc6c8b935acbf4d8c930c3.png";

interface Achievement {
  company: string;
  result: string;
  description: string;
  badge: string;
}

const achievements: Achievement[] = [
  {
    company: "Feedzai",
    result: "27% YoY Revenue Growth",
    description: "Rebuilt ABM strategy for RiskOps/AI-ML execution",
    badge: "RiskOps/AI-ML"
  },
  {
    company: "Advisen", 
    result: "Successful P&C Exit",
    description: "Deep insurance domain expertise and market understanding",
    badge: "Insurance Domain"
  },
  {
    company: "Previous Roles",
    result: "300% Pipeline Lift",
    description: "High-velocity ABM execution and optimization",
    badge: "ABM Execution"
  }
];

export default function DifferentiatorSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            Execution Requires Experience at This Intersection.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            This framework isn't theoretical. It's based on a proven track record in the exact domains 
            Federato requires: P&C insurance, scaling AI/ML RiskOps, and high-impact ABM.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Section */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-8">
                <img 
                  src={ronHeadshot}
                  alt="Ron Kagan"
                  className="w-32 h-32 rounded-full mx-auto lg:mx-0 mb-4 shadow-lg"
                />
                <h3 className="text-2xl text-gray-800 mb-2">Ron Kagan</h3>
                <p className="text-lg text-[#0A459C] mb-4">Strategic Marketing Consultant</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  <Badge variant="outline" className="text-[#0A459C] border-[#0A459C]">P&C Insurance</Badge>
                  <Badge variant="outline" className="text-[#20DFA6] border-[#20DFA6]">RiskOps</Badge>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">ABM Strategy</Badge>
                </div>
              </div>

              <div className="space-y-4 text-gray-600">
                <p>
                  Specialized expertise at the intersection of insurance technology, risk operations, 
                  and account-based marketing. Proven track record of translating complex technical 
                  value propositions into compelling market narratives.
                </p>
                <p>
                  Deep understanding of P&C carrier pain points, underwriting workflows, and the 
                  emerging RiskOps category. Experience scaling ABM programs for B2B SaaS companies 
                  targeting enterprise insurance clients.
                </p>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card className="p-6 border-l-4 border-[#20DFA6] bg-white shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg text-gray-800 mb-1">{achievement.company}</h4>
                        <Badge variant="secondary" className="text-xs">{achievement.badge}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl text-[#0A459C] mb-1">{achievement.result}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-[#0A459C] to-[#083a7a] text-white">
              <h3 className="text-2xl mb-4">Ready to Eliminate the Inefficiency Tax?</h3>
              <p className="text-blue-100 mb-6">
                Let's discuss how this framework can transform Federato's go-to-market strategy 
                and establish category leadership in RiskOps.
              </p>
              <Button 
                size="lg"
                className="bg-[#20DFA6] hover:bg-[#1bc589] text-gray-900 px-8 py-3"
                onClick={() => {
                  const calendarSection = document.getElementById('calendar-section');
                  if (calendarSection) {
                    calendarSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Schedule Time to Speak
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}