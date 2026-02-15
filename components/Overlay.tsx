import React from 'react';
import { UIProps } from '../types';

export const Overlay: React.FC<UIProps> = ({ items, hoveredId, setHoveredId }) => {
  const activeItem = items.find(item => item.id === hoveredId);

  return (
    <main className="absolute inset-0 z-10 pointer-events-none flex font-mono">
      {/* Left Side - Info Panel (Pop-up on hover) */}
      <div className="hidden md:flex md:w-2/3 h-full items-center justify-start p-12 md:pl-24">
        <div className={`transition-all duration-500 transform max-w-sm w-full ${activeItem ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {activeItem && (
            <div className="relative border border-[#39FF14]/30 bg-black/80 backdrop-blur-md p-8 shadow-[0_0_30px_rgba(57,255,20,0.1)]">
              {/* Decorative Sci-fi Corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#39FF14]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#39FF14]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#39FF14]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#39FF14]" />
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-6 border-b border-[#39FF14]/20 pb-4">
                <span className="text-[#39FF14] text-xs tracking-[0.2em] animate-pulse">● LIVE DATA</span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#39FF14]/50 to-transparent"></div>
              </div>

              <h1 className="text-3xl md:text-4xl text-white mb-6 font-bold tracking-tighter uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                {activeItem.label}
              </h1>
              
              <p className="text-[#39FF14]/80 text-md md:text-lg leading-relaxed border-l-2 border-[#39FF14] pl-6">
                {activeItem.description}
              </p>

              {/* Footer Tech Decos */}
              <div className="mt-8 flex justify-between items-end text-[10px] text-gray-500 tracking-widest">
                <span>COORD: {activeItem.vertexPosition.join(' / ')}</span>
                <span>STATUS: ONLINE</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar (1/3rd) */}
      <div className="w-full md:w-1/3 h-full flex flex-col justify-center px-8 md:px-12 pointer-events-auto bg-gradient-to-l from-black/80 to-transparent">
        <div className="flex flex-col gap-4">
          {items.map((item) => {
            const isActive = hoveredId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`
                  relative group cursor-pointer border p-4 transition-all duration-300 backdrop-blur-sm
                  ${isActive 
                    ? 'bg-[#39FF14]/10 border-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.3)] translate-x-[-10px]' 
                    : 'bg-black/40 border-[#39FF14]/30 hover:border-[#39FF14]/70'
                  }
                `}
              >
                <h2
                  className={`
                    text-lg md:text-xl tracking-widest uppercase transition-colors duration-300
                    ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-[#39FF14]'}
                  `}
                >
                  {item.label}
                </h2>
                
                {/* Decorative corner accent for tech feel */}
                <div 
                  className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300
                    ${isActive ? 'border-white' : 'border-[#39FF14]/50'}
                  `} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};