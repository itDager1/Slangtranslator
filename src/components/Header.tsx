import { Languages } from "lucide-react";
import { TranslationMode } from "../App";

interface HeaderProps {
  translationMode: TranslationMode;
}

export function Header({ translationMode }: HeaderProps) {
  return (
    <div className="text-center max-w-4xl mx-auto px-4 pt-4 pb-4">

      <h1 className="mb-4 text-black font-['Lora'] text-4xl">
      </h1>
    </div>
  );
}
