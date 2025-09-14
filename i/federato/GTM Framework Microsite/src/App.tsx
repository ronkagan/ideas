import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import VisibilityCrisisSection from "./components/VisibilityCrisisSection";
import CalculatorSection from "./components/CalculatorSection";
import ABMStrategySection from "./components/ABMStrategySection";
import ScalabilityFramework from "./components/ScalabilityFramework";
import ExecutionBlueprint from "./components/ExecutionBlueprint";
import DifferentiatorSection from "./components/DifferentiatorSection";
import CalendarSection from "./components/CalendarSection";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        <div id="crisis">
          <HeroSection />
        </div>
        
        <div id="root-cause">
          <VisibilityCrisisSection />
        </div>
        
        <div id="calculator">
          <CalculatorSection />
        </div>
        
        <div id="strategy">
          <ABMStrategySection />
        </div>
        
        <div id="framework">
          <ScalabilityFramework />
        </div>
        
        <div id="execution">
          <ExecutionBlueprint />
        </div>
        
        <div id="results">
          <DifferentiatorSection />
        </div>
        
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