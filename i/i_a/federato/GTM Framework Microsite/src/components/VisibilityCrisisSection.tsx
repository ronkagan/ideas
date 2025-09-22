import { motion } from "motion/react";

export default function VisibilityCrisisSection() {
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
            Why Underwriters (and Executives) Are Flying Blind.
          </h2>
        </motion.div>

        {/* Fragmented dashboard visualization */}
        <motion.div 
          className="mb-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {/* Disconnected data points */}
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-red-200">
              <div className="h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Reinsurance Costs</h4>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded w-3/4" />
                <div className="h-2 bg-gray-200 rounded w-1/2" />
                <div className="h-2 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="text-xs text-red-600 mt-3 font-medium">⚠ Disconnected</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-red-200">
              <div className="h-4 bg-gradient-to-r from-green-400 to-green-600 rounded mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Portfolio Appetite</h4>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded w-full" />
                <div className="h-2 bg-gray-200 rounded w-4/5" />
                <div className="h-2 bg-gray-200 rounded w-3/5" />
              </div>
              <div className="text-xs text-red-600 mt-3 font-medium">⚠ Siloed</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-red-200">
              <div className="h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded mb-3" />
              <h4 className="font-semibold text-gray-800 mb-2">Submission Intake</h4>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded w-5/6" />
                <div className="h-2 bg-gray-200 rounded w-3/4" />
                <div className="h-2 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="text-xs text-red-600 mt-3 font-medium">⚠ Fragmented</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-lg text-gray-700 mb-8 text-center">
            The frustration isn't with the underwriters; it's with the systems failing them. 
            The Inefficiency Tax stems from three core failures identified in the report:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl text-red-600">📋</div>
              </div>
              <h3 className="text-xl mb-3">The Submission Deluge</h3>
              <p className="text-gray-600">
                <strong className="text-red-600">1 in 4</strong> submissions fall outside portfolio appetite before review.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl text-red-600">🔄</div>
              </div>
              <h3 className="text-xl mb-3">The "Swivel-Chair" Nightmare</h3>
              <p className="text-gray-600">
                Underwriters juggle <strong className="text-red-600">6+ disconnected systems</strong> on average to process a single risk.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl text-red-600">📊</div>
              </div>
              <h3 className="text-xl mb-3">The Executive Disconnect</h3>
              <p className="text-gray-600">
                <strong className="text-red-600">47%</strong> of executives believe prioritization is effective; 
                only <strong className="text-red-600">28%</strong> of underwriters agree.
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-lg text-gray-700">
              <strong>This gap is costing carriers high-value deals.</strong> The systems meant to support decision-making 
              have become the very obstacles preventing efficient underwriting.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}