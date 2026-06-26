import Loader from './components/Loader';
import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import Pricing from './components/Pricing';
import SocialProof from './components/SocialProof';
import { Icon } from './components/icons';

export default function App() {
  return (
    <>
      <Loader />
      <Hero />
      <main>
        <BentoFeatures />
        <SocialProof />
        <Pricing />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted md:flex-row">
          <span className="flex items-center gap-2 font-display font-bold text-powder">
            <Icon name="cube" size={18} className="text-accent" /> fluxion
          </span>
          <p className="font-display text-xs">© 2026 Fluxion Inc. All rights reserved.</p>
          <nav className="flex items-center gap-6 font-display" aria-label="Footer">
            <a href="#features" className="transition-colors duration-200 ease-micro hover:text-powder">platform</a>
            <a href="#pricing" className="transition-colors duration-200 ease-micro hover:text-powder">pricing</a>
            <a href="#proof" className="transition-colors duration-200 ease-micro hover:text-powder">customers</a>
            <a href="#top" aria-label="Back to top" className="rounded-lg border border-line p-1.5 transition-colors duration-200 ease-micro hover:border-accent hover:text-powder">
              <Icon name="chevronUp" size={16} />
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
