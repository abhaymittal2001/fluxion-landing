import Loader from './components/Loader';
import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import Pricing from './components/Pricing';
import SocialProof from './components/SocialProof';

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
          <span className="font-display font-bold text-white">Fluxion</span>
          <p>© 2026 Fluxion Inc. All rights reserved.</p>
          <nav className="flex gap-6" aria-label="Footer">
            <a href="#features" className="transition-colors duration-200 ease-micro hover:text-white">Platform</a>
            <a href="#pricing" className="transition-colors duration-200 ease-micro hover:text-white">Pricing</a>
            <a href="#proof" className="transition-colors duration-200 ease-micro hover:text-white">Customers</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
