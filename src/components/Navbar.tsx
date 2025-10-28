import logoImage from "figma:asset/4c338542dccb17db9f4629bc8e1cc79bc0940235.png";
import { TranslationHistory, HistoryEntry } from "./TranslationHistory";

interface NavbarProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
  onSelectEntry: (entry: HistoryEntry) => void;
}

export function Navbar({ history, onClearHistory, onSelectEntry }: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="goldGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFED4E', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#DAA520', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            {/* Left speech bubble (Slang) */}
            <circle cx="10" cy="12" r="6" fill="url(#goldGradient)" />
            <path d="M 7 16 L 6 19 L 9 17 Z" fill="url(#goldGradient)" />
            <text x="10" y="14.5" textAnchor="middle" fill="#FFF" fontSize="7" fontWeight="bold">А</text>
            
            {/* Right speech bubble (Russian) */}
            <circle cx="22" cy="20" r="6" fill="url(#goldGradient2)" />
            <path d="M 25 24 L 26 27 L 23 25 Z" fill="url(#goldGradient2)" />
            {/* Lightning bolt icon */}
            <path d="M 24 17 L 20.5 20.5 L 22.5 20.5 L 20 24 L 24 20 L 22 20 L 24 17 Z" fill="#FFF" stroke="#FFF" strokeWidth="0.6" strokeLinejoin="round" />
            
            {/* Exchange arrows */}
            <g opacity="0.95">
              {/* Top arrow (right) - curved */}
              <path d="M 13.5 11 Q 16 9 18.5 10" stroke="#FFD700" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M 17.5 8.5 L 19 10 L 17.5 11.5" stroke="#FFD700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              
              {/* Bottom arrow (left) - curved */}
              <path d="M 18.5 21 Q 16 23 13.5 22" stroke="#DAA520" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M 14.5 20.5 L 13 22 L 14.5 23.5" stroke="#DAA520" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </svg>
          <span className="text-gray-900">SlangTranslator</span>
        </div>
        
        <TranslationHistory 
          history={history}
          onClearHistory={onClearHistory}
          onSelectEntry={onSelectEntry}
        />
      </div>
    </nav>
  );
}
