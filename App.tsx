import React, { useState } from 'react';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';
import { MENU_ITEMS } from './constants';

const App: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* 3D Scene Background */}
      <Scene items={MENU_ITEMS} hoveredId={hoveredId} />
      
      {/* UI Overlay */}
      <Overlay items={MENU_ITEMS} hoveredId={hoveredId} setHoveredId={setHoveredId} />
      
      {/* Decorative overlaid scanlines or grain (CSS only) */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
      <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat"></div>
    </div>
  );
};

export default App;
