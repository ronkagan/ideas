// Import the actual logos from the Figma design
import imgMetaPlatformsIncLogo211 from "figma:asset/2ce2ac599ea5510f85c36338c7edd37de3cee1be.png";
import imgInstacart1 from "figma:asset/347e0f60c8ae88dbed086239be37d86934222647.png";
import imgKickstarter1 from "figma:asset/583fc4cd70056d9f0598c494e67e592f58dd5c55.png";
import imgEmcLogo1 from "figma:asset/3f302b2507ebb846c6f6a87f7dec5380580ffab4.png";
import imgHsbcLogo1 from "figma:asset/2a70708fdf1263ac0377b767cac0c639088e83ce.png";
import imgZionsBankLogoPngTransparent1 from "figma:asset/733cb55df35d7de9858a5f61e967633733f91fa4.png";
import imgWicks11 from "figma:asset/a2a62c51c69b75b59878575236a4962fcbfebb55.png";
import imgGitHubLogo1 from "figma:asset/b05ee68c96e1e260389d6b34ddc80dacb0633e42.png";
import imgInsightPartnersLogo1 from "figma:asset/790f2731addcf8c88ba43ea65238be42acd1c8f2.png";
import imgJoseAndresLogoUpdatedE16747160114071 from "figma:asset/136302b36e92c9faa6b10e75a6ce08d458d1427b.png";
import imgTrueVentures1 from "figma:asset/7933010c91ac92d574f3016a8d8c175032cf3b77.png";
import imgUncorkLogo1 from "figma:asset/3eb00bb76f56420445bf68ef4e7035a966a90e54.png";

interface Logo {
  id: string;
  name: string;
  src: string;
}

const logos: Logo[] = [
  {
    id: '1',
    name: 'Meta',
    src: imgMetaPlatformsIncLogo211
  },
  {
    id: '2', 
    name: 'Instacart',
    src: imgInstacart1
  },
  {
    id: '3',
    name: 'Wicks',
    src: imgWicks11
  },
  {
    id: '4',
    name: 'EMC',
    src: imgEmcLogo1
  },
  {
    id: '5',
    name: 'HSBC',
    src: imgHsbcLogo1
  },
  {
    id: '6',
    name: 'GitHub',
    src: imgGitHubLogo1
  },
  {
    id: '7',
    name: 'Zions Bank',
    src: imgZionsBankLogoPngTransparent1
  },
  {
    id: '8',
    name: 'José Andrés Group',
    src: imgJoseAndresLogoUpdatedE16747160114071
  },
  {
    id: '9',
    name: 'True Ventures',
    src: imgTrueVentures1
  },
  {
    id: '10',
    name: 'Uncork Capital',
    src: imgUncorkLogo1
  },
  {
    id: '11',
    name: 'Kickstarter',
    src: imgKickstarter1
  },
  {
    id: '12',
    name: 'Insight Partners',
    src: imgInsightPartnersLogo1
  }
];

export function LogoMarquee() {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full py-12">
      <div className="relative overflow-hidden">
        {/* Left fade gradient overlay */}
        <div 
          className="absolute top-0 left-0 w-32 h-full z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(255, 255, 255, 1), transparent)'
          }}
        />
        
        {/* Right fade gradient overlay */}
        <div 
          className="absolute top-0 right-0 w-32 h-full z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(255, 255, 255, 1), transparent)'
          }}
        />
        
        <div className="relative flex overflow-hidden select-none group">
          <div 
            className="flex shrink-0 gap-12"
            style={{
              animation: 'logoMarqueeScroll 60s linear infinite',
              width: 'max-content',
              animationPlayState: 'running'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running';
            }}
          >
            {duplicatedLogos.map((logo, index) => {
              // Custom styling for specific logos
              const isTrueVentures = logo.name === 'True Ventures';
              const isWicks = logo.name === 'Wicks';
              const isZionsBank = logo.name === 'Zions Bank';
              
              // Container width adjustments for logos with too much whitespace
              let containerWidth = 'w-48'; // default
              if (isWicks || isZionsBank) {
                containerWidth = 'w-32'; // tighter container
              }
              
              // Logo-specific styling
              let logoClasses = "max-w-full max-h-full w-auto h-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300";
              let logoStyle = { height: '6rem' }; // default height
              
              if (isTrueVentures) {
                // Make True Ventures completely visible
                logoClasses = "max-w-full max-h-full w-auto h-auto object-contain opacity-100 hover:opacity-100 transition-all duration-300";
              } else if (isZionsBank) {
                // Make Zions Bank larger
                logoStyle = { height: '8rem' };
              }

              return (
                <div
                  key={`${logo.id}-${index}`}
                  className={`flex shrink-0 justify-center items-center ${containerWidth} h-24 px-2`}
                >
                  <img
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    className={logoClasses}
                    style={logoStyle}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}