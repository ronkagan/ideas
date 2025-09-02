import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Base64 encoded logo for a self-contained single file
const federatoLogo = "data:image/png;base64,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";
const ronHeadshot = "https://d2gjqh9j26unp0.cloudfront.net/profilepic/d429f24ebe9f76fb53fa7cb204d2df7d";

// Re-using the utility function to keep this file self-contained
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Minimal versions of the shadcn-ui components used in this app, for a single-file build
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = ({ className, variant, size, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

const Card = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "grid items-start gap-1.5 px-6 pt-6 [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
};

const CardTitle = ({ className, ...props }) => {
  return (
    <h4
      className={cn("leading-none", className)}
      {...props}
    />
  );
};

const CardDescription = ({ className, ...props }) => {
  return (
    <p
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
};

const CardContent = ({ className, ...props }) => {
  return (
    <div
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
};

const Label = ({ className, ...props }) => {
  return (
    <label
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

const Input = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
};

const Badge = ({ className, variant, ...props }) => {
  const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
    {
      variants: {
        variant: {
          default:
            "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
          secondary:
            "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
          destructive:
            "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
          outline:
            "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
};

// Main Components
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigationItems = [
    { label: "The Crisis", href: "#crisis" },
    { label: "Root Cause", href: "#root-cause" },
    { label: "Calculator", href: "#calculator" },
    { label: "Strategy", href: "#strategy" },
    { label: "Framework", href: "#framework" },
    { label: "Execution", href: "#execution" },
    { label: "Results", href: "#results" }
  ];

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-white/10 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-[#0A459C] p-1.5 rounded-lg">
              <img 
                src={federatoLogo} 
                alt="Federato" 
                className="h-5 w-5 brightness-0 invert"
              />
            </div>
            <span className={`text-lg transition-colors duration-300 ${
              isScrolled ? 'text-[#0A459C]' : 'text-[#0A459C]'
            }`}>
              The Inefficiency Tax
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-[#0A459C]' 
                    : 'text-[#0A459C] hover:text-[#20DFA6]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => scrollToSection('#calendar-section')}
            className={`px-3 py-1.5 rounded-md text-sm transition-all duration-300 ${
              isScrolled
                ? 'text-[#0A459C] hover:bg-[#B3DDFA]/20'
                : 'text-[#0A459C] hover:bg-[#B3DDFA]/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Talk to Ron
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

const HeroSection = () => {
  return (
    <section id="crisis" className="min-h-screen bg-gradient-to-br from-[#f8f9fb] to-white flex items-center justify-center relative overflow-hidden pt-14">
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
};

const VisibilityCrisisSection = () => {
  return (
    <section id="root-cause" className="py-20 bg-gray-50">
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
};

const CalculatorSection = () => {
  const [gwp, setGwp] = useState("5000");
  const [underwriters, setUnderwriters] = useState("50");
  const [wastePercent, setWastePercent] = useState("35");

  // Calculations with safe number parsing
  const gwpNum = Number(gwp) || 0;
  const underwritersNum = Number(underwriters) || 0;
  const wasteNum = Number(wastePercent) || 0;
  const annualHoursWasted = Math.round((underwritersNum * 2080 * wasteNum) / 100);
  const avgSalary = 120000;
  const financialImpact = Math.round((annualHoursWasted * (avgSalary / 2080)) / 1000000 * 10) / 10;
  const potentialRevenueLift = Math.round((gwpNum * wasteNum) / 100 / 1000 * 10) / 10;

  return (
    <section id="calculator" className="py-20 bg-white">
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
                    min="0"
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
                    min="0"
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
                    min="0"
                    max="100"
                    value={wastePercent}
                    onChange={(e) => setWastePercent(e.target.value)}
                    className="mt-1"
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
};

const ABMStrategySection = () => {
  const strategySteps = [
    {
      title: "Identify",
      description: "Isolate the 37% of carriers (&gt;$5B) reporting the highest levels of waste",
      icon: "🔍"
    },
    {
      title: "Personalize", 
      description: "Lead with customized pain points derived from the report, tailored to persona (CUO vs. VP Ops)",
      icon: "🎯"
    },
    {
      title: "Orchestrate",
      description: "Tight alignment between personalized advertising, intent signal capture, and immediate sales activation",
      icon: "🔄"
    },
    {
      title: "Convert",
      description: "Transform frustration into urgency through concrete financial impact demonstration",
      icon: "🚀"
    }
  ];

  return (
    <section id="strategy" className="py-20 bg-gradient-to-br from-[#0A459C] to-[#083a7a] text-white">
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
};

const ScalabilityFramework = () => {
  const [activeTier, setActiveTier] = useState('foundation');

  const tierData = {
    foundation: {
      title: "FOUNDATION",
      subtitle: "1:Many",
      investment: "Digital air cover, scalable assets, initial intent capture.",
      audience: "Top 200 P&C Carriers (Broad TAL)",
      personalization: "Standard Calculator/Landing Page.",
      tactics: [
        "Targeted LinkedIn/Programmatic Ads (\"26% Waste\" stat)",
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
      audience: "10-15 Strategic \"Must-Win\" Accounts (The >$5B segment).",
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

  return (
    <section id="framework" className="py-20 bg-gray-50">
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
            {Object.keys(tierData).map((tier) => (
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
                  {Object.keys(tierData).map((tier, index) => (
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
};

const ExecutionBlueprint = () => {
  const timelineData = [
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

  return (
    <section id="execution" className="py-20 bg-white">
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
};

const DifferentiatorSection = () => {
  const achievements = [
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

  return (
    <section id="results" className="py-20 bg-gray-50">
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
};

const CalendarSection = () => {
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
};

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        <HeroSection />
        <VisibilityCrisisSection />
        <CalculatorSection />
        <ABMStrategySection />
        <ScalabilityFramework />
        <ExecutionBlueprint />
        <DifferentiatorSection />
        <CalendarSection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Strategic GTM Framework for Federato. Confidential and Proprietary.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Minimal utility and component definitions for the single-file build
// (You would normally import these from a library like shadcn/ui)
// To avoid a long file, these are placed at the end.
// Corrected cva to properly handle string variants without flattening characters
const cva = (base, { variants, defaultVariants }) => (props) => {
  const allProps = { ...defaultVariants, ...props };
  const baseClasses = typeof base === 'string' ? base : '';
  const variantClasses = Object.entries(variants).flatMap(([key, variantMap]) => {
    const value = allProps[key];
    if (value && variantMap[value]) {
      return [variantMap[value]]; // Wrap in array to prevent string flattening
    }
    return [];
  }).join(' ');
  return `${baseClasses} ${variantClasses} ${props.className || ''}`.trim();
};
const clsx = (...args) => args.filter(Boolean).join(' ');
const twMerge = (classes) => classes;
```
