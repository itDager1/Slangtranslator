import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import logoImage from "figma:asset/4c338542dccb17db9f4629bc8e1cc79bc0940235.png";
import { TranslationMode } from "../App";

interface NavbarProps {
  translationMode: TranslationMode;
  onToggleMode: () => void;
}

export function Navbar({ translationMode, onToggleMode }: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoImage} alt="SlangTranslator Logo" className="w-8 h-8 rounded-lg" />
          <span className="text-gray-900">SlangTranslator</span>
        </div>
        
        <Button variant="outline" size="sm" className="gap-2" onClick={onToggleMode}>
          <Globe className="w-4 h-4" />
          {translationMode === "slangToRussian" ? "Сленг → Русский" : "Русский → Сленг"}
        </Button>
      </div>
    </nav>
  );
}
