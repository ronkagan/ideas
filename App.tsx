import { LogoMarquee } from './components/LogoMarquee';

export default function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="mb-4">Ron Earns Customers and Investment</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn the trust of the largest customers and most coveted investors.
          </p>
        </div>
        
        <div className="w-full">
          <LogoMarquee />
        </div>
        
        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground">
            Grow with Ron whether you need account-based marketing, product-led growth, B2B2C, global expansion, partner-led growth or marketplace GTMs.
          </p>
        </div>
      </div>
    </div>
  );
}