import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CalculatorSection() {
  const [gwp, setGwp] = useState("5000");
  const [underwriters, setUnderwriters] = useState("50");
  const [wastePercent, setWastePercent] = useState("35");

  // Calculations
  const annualHoursWasted = Math.round((parseInt(underwriters) * 2080 * parseInt(wastePercent)) / 100);
  const avgSalary = 120000;
  const financialImpact = Math.round((annualHoursWasted * (avgSalary / 2080)) / 1000000 * 10) / 10;
  const potentialRevenueLift = Math.round((parseInt(gwp) * parseInt(wastePercent)) / 100 / 1000 * 10) / 10;

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
            The Engagement Mechanism: Quantifying the Pain.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            To convert frustration into urgency, we must move from abstract concepts to concrete financial impact. 
            The "Inefficiency Tax Calculator" is the centerpiece of our demand generation efforts.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 shadow-xl border-2 border-gray-100">
            <div className="mb-8 text-center">
              <h3 className="text-2xl mb-2 text-[#0A459C]">Inefficiency Tax Calculator</h3>
              <p className="text-gray-600">Calculate the true cost of underwriting inefficiency at your organization</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <h4 className="text-lg mb-4 text-gray-800">Organization Details</h4>
                
                <div>
                  <Label htmlFor="gwp">Annual Gross Written Premium ($ Millions)</Label>
                  <Input 
                    id="gwp"
                    type="number" 
                    value={gwp}
                    onChange={(e) => setGwp(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="underwriters">Number of Underwriters</Label>
                  <Input 
                    id="underwriters"
                    type="number" 
                    value={underwriters}
                    onChange={(e) => setUnderwriters(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="waste">Estimated Wasted Effort (%)</Label>
                  <Input 
                    id="waste"
                    type="number" 
                    value={wastePercent}
                    onChange={(e) => setWastePercent(e.target.value)}
                    className="mt-1"
                    max="100"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Tier 1 carriers (&gt;$5B) average 35-50%
                  </p>
                </div>
              </div>

              {/* Outputs */}
              <div className="space-y-6">
                <h4 className="text-lg mb-4 text-gray-800">Your Inefficiency Tax</h4>
                
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <div className="text-sm text-red-600 uppercase tracking-wide">Annual Hours Wasted</div>
                  <div className="text-3xl text-red-700 mt-1">
                    {annualHoursWasted.toLocaleString()}
                  </div>
                  <div className="text-sm text-red-600 mt-1">hours per year</div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <div className="text-sm text-red-600 uppercase tracking-wide">Financial Impact</div>
                  <div className="text-3xl text-red-700 mt-1">
                    ${financialImpact}M
                  </div>
                  <div className="text-sm text-red-600 mt-1">in wasted salary costs</div>
                </div>

                <div className="bg-[#20DFA6] bg-opacity-10 p-4 rounded-lg border-l-4 border-[#20DFA6]">
                  <div className="text-sm text-[#0A459C] uppercase tracking-wide">Potential Revenue Lift</div>
                  <div className="text-3xl text-[#0A459C] mt-1">
                    ${potentialRevenueLift}B
                  </div>
                  <div className="text-sm text-[#0A459C] mt-1">by adopting RiskOps</div>
                </div>
              </div>
            </div>

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Button className="bg-[#0A459C] hover:bg-[#083a7a] text-white px-8 py-3 text-lg">
                Get Your Detailed Assessment
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                This calculator will be the primary lead capture asset across all campaign tiers
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}