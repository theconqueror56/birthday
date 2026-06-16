import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { FloatingParticles } from './components/effects/FloatingParticles';
import { CustomCursor } from './components/effects/CustomCursor';
import { PageTransition } from './components/layout/PageTransition';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/ui/BackToTop';
import { Landing } from './pages/Landing';
import { Reveal } from './components/sections/Reveal';
import { Reasons } from './components/sections/Reasons';
import { Timeline } from './components/sections/Timeline';
import { Polaroids } from './components/sections/Polaroids';
import { Gallery } from './components/sections/Gallery';
import { Letters } from './components/sections/Letters';
import { Playlist } from './components/sections/Playlist';
import { StarMap } from './components/sections/StarMap';
import { MiniGame } from './components/sections/MiniGame';
import { TimeCounter } from './components/sections/TimeCounter';
import { FinalMessage } from './components/sections/FinalMessage';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-transparent">
        {/* Only render custom cursor on larger screens if desired, but here we do it globally */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        
        <LoadingScreen />
        <ScrollProgress />
        <FloatingParticles />
        <Navbar />
        <BackToTop />
        
        <PageTransition>
          <main className="w-full">
            <Landing />
            <Reveal />
            <Reasons />
            <Timeline />
            <Polaroids />
            <Gallery />
            <Letters />
            <Playlist />
            <StarMap />
            <MiniGame />
            <TimeCounter />
            <FinalMessage />
          </main>
        </PageTransition>
      </div>
    </BrowserRouter>
  );
}

export default App;
