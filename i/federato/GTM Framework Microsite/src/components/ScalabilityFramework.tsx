import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type Tier = 'foundation' | 'accelerate' | 'dominate';

interface TierData {
  title: string;
  subtitle: string;
  investment: string;
  audience: string;
  personalization: string;
  tactics: string[];
  metrics: string[];
  color: string;
  bgColor: string;
}

const tierData: Record<Tier, TierData> = {
  foundation: {
    title: "FOUNDATION",
    subtitle: "1:Many",
    investment: "Digital air cover, scalable assets, initial intent capture.",
    audience: "Top 200 P&C Carriers (Broad TAL)",
    personalization: "Standard Calculator/Landing Page.",
    tactics: [
      "Targeted LinkedIn/Programmatic Ads (\"26% waste\" stat)",
      "Content Syndication of the report",
      "Flagship Webinar: \"The 2025 Reality Check\""
    ],
    metrics: ["Engagement signals", "Cost per MQA"],
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  accelerate: {
    title: "ACCELERATE", 
    subtitle: "1:Few",
    investment: "Channel expansion, intent data activation, sales orchestration.",
    audience: "50 High-Priority Accounts showing intent signals.",
    personalization: "Segment-Personalized (Headlines and data adjust based on segment, e.g., \"Why 74% of Mid-Market Carriers Waste 20%+ Effort\").",
    tactics: [
      "Everything in Tier 1, plus:",
      "Intent Data Activation (6sense/Demandbase) to trigger dynamic ad spend and SDR outreach",
      "High-Impact Direct Mail (Physical report with personalized summary)", 
      "Targeted Workshops for account clusters"
    ],
    metrics: ["Sales Accepted Pipeline (SAP) generated", "Deal velocity"],
    color: "text-[#20DFA6]",
    bgColor: "bg-green-50"
  },
  dominate: {
    title: "DOMINATE",
    subtitle: "1:1", 
    investment: "Bespoke content, deep research, executive alignment.",
    audience: "10-15 Strategic \"Must-Win\" Accounts (The &gt;$5B segment).",
    personalization: "Fully Bespoke (Personalized URL; Personalized executive video; Calculator inputs pre-populated with research).",
    tactics: [
      "Everything in Tier 2, plus:",
      "Deep Account Mapping and dossier creation",
      "Bespoke \"Point of View\" Documents tailored to the account",
      "Executive-to-Executive (E2E) Outreach",
      "Private Roundtables/VIP Events"
    ],
    metrics: ["Strategic Opportunity creation", "Closed/Won Revenue", "Category leadership"],
    color: "text-[#0A459C]", 
    bgColor: "bg-[#0A459C]/5"
  }
};

export default function ScalabilityFramework() {
  const [activeTier, setActiveTier] = useState<Tier>('foundation');

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
            A Predictable Model for Pipeline Growth.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            The ABM framework is designed to scale predictably with investment. Increased budget unlocks 
            deeper personalization, wider orchestration, and faster penetration.
          </p>
        </motion.div>

        {/* Tier Selector */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex bg-white rounded-lg p-2 shadow-lg">
            {(Object.keys(tierData) as Tier[]).map((tier) => (
              <Button
                key={tier}
                variant={activeTier === tier ? "default" : "ghost"}
                onClick={() => setActiveTier(tier)}
                className={`mx-1 px-6 py-3 ${
                  activeTier === tier 
                    ? 'bg-[#0A459C] text-white' 
                    : 'text-gray-600 hover:text-[#0A459C]'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{tierData[tier].title}</div>
                  <div className="text-xs opacity-75">{tierData[tier].subtitle}</div>
                </div>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Active Tier Content */}
        <motion.div
          key={activeTier}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <Card className={`p-8 ${tierData[activeTier].bgColor} border-2 border-gray-200`}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`text-3xl ${tierData[activeTier].color} mb-2`}>
                    Tier {Object.keys(tierData).indexOf(activeTier) + 1}: {tierData[activeTier].title}
                  </h3>
                  <Badge variant="outline" className={`${tierData[activeTier].color} border-current`}>
                    {tierData[activeTier].subtitle}
                  </Badge>
                </div>
              </div>
              <p className="text-lg text-gray-700">{tierData[activeTier].investment}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Target Audience</h4>
                  <p className="text-gray-600">{tierData[activeTier].audience}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Personalization Level</h4>
                  <p className="text-gray-600">{tierData[activeTier].personalization}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Metrics</h4>
                  <ul className="space-y-1">
                    {tierData[activeTier].metrics.map((metric, index) => (
                      <li key={index} className="text-gray-600 flex items-center">
                        <span className={`w-2 h-2 rounded-full ${tierData[activeTier].bgColor.replace('bg-', 'bg-').replace('/5', '')} mr-2`} />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Key Tactics</h4>
                <ul className="space-y-2">
                  {tierData[activeTier].tactics.map((tactic, index) => (
                    <li key={index} className="text-gray-600 flex items-start">
                      <span className="text-[#20DFA6] mr-2 mt-1">•</span>
                      <span>{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Investment Impact Visualization */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Investment Impact Scale
                </div>
                <div className="flex space-x-2">
                  {(Object.keys(tierData) as Tier[]).map((tier, index) => (
                    <div 
                      key={tier}
                      className={`h-2 w-8 rounded ${
                        Object.keys(tierData).indexOf(activeTier) >= index 
                          ? 'bg-[#20DFA6]' 
                          : 'bg-gray-200'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl text-[#0A459C] mb-2">200+</div>
            <div className="text-sm text-gray-600">P&C Carriers Targeted (Foundation)</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl text-[#20DFA6] mb-2">50</div>
            <div className="text-sm text-gray-600">High-Priority Accounts (Accelerate)</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl text-[#0A459C] mb-2">10-15</div>
            <div className="text-sm text-gray-600">Must-Win Accounts (Dominate)</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}