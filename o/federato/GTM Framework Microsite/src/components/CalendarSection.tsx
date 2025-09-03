import { motion } from "motion/react";

export default function CalendarSection() {
  return (
    <section id="calendar-section" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-[#0A459C]">
            Let's Transform Your GTM Strategy
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Schedule a strategic consultation with Ron to discuss implementing this framework 
            and establishing Federato's category leadership in RiskOps.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-[#f8f9fb] to-white p-8 rounded-lg shadow-sm border border-[#B3DDFA]/20">
            <div className="mb-6 text-center">
              <h3 className="text-xl text-[#0A459C] mb-2">Talk to Ron</h3>
              <p className="text-gray-600">
                30-minute strategic discussion on your specific GTM challenges and opportunities
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#B3DDFA]/30">
              <iframe 
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2GvfZZxoohtFgmi3KDzWStgJujnt2bUkl_iG2G_1NOOMuVFJ9pfNnwwq7Z70LKp52alJ0JaqnG?gv=true" 
                style={{ border: 0 }} 
                width="100%" 
                height="600" 
                frameBorder="0"
                title="Schedule consultation with Ron Kagan"
              />
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                All consultations are confidential and focused on your strategic objectives. 
                No sales pitch, just actionable insights.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="max-w-2xl mx-auto">
            <h4 className="text-lg text-gray-800 mb-4">Alternative Contact Methods</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center md:justify-end">
                <span className="mr-2">📧</span>
                <span>ron@strategicmarketing.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <span className="mr-2">📞</span>
                <span>(555) 123-4567</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}