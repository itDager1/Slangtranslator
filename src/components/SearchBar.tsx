import { useEffect, useRef, useState } from "react";
import { TranslationMode } from "../App";
import { Keyboard } from "lucide-react";
import { VirtualKeyboard } from "./VirtualKeyboard";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (word: string) => void | Promise<void>;
  translationMode: TranslationMode;
}

export function SearchBar({ value, onChange, onSearch, translationMode }: SearchBarProps) {
  const placeholder = "Введите текст...";
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
    
  // Debounced search effect
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set new timer
    if (value.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        onSearch(value.trim());
      }, 700);
    }
    
    // Cleanup on unmount or value change
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value, onSearch]);

  // Update cursor position when textarea is clicked or changed
  const updateCursorPosition = () => {
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart);
    }
  };

  // Handle virtual keyboard key press
  const handleVirtualKeyPress = (key: string) => {
    const newValue = value.slice(0, cursorPosition) + key + value.slice(cursorPosition);
    onChange(newValue);
    
    // Update cursor position
    const newCursorPos = cursorPosition + key.length;
    setCursorPosition(newCursorPos);
    
    // Set cursor position in textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = newCursorPos;
        textareaRef.current.selectionEnd = newCursorPos;
        textareaRef.current.focus();
      }
    }, 0);
  };

  // Handle backspace
  const handleVirtualBackspace = () => {
    if (cursorPosition > 0) {
      const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
      onChange(newValue);
      
      const newCursorPos = cursorPosition - 1;
      setCursorPosition(newCursorPos);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = newCursorPos;
          textareaRef.current.selectionEnd = newCursorPos;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  // Handle space
  const handleVirtualSpace = () => {
    handleVirtualKeyPress(" ");
  };

  // Handle enter
  const handleVirtualEnter = () => {
    if (value.trim()) {
      // Clear debounce timer and search immediately
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      onSearch(value.trim());
    }
  };
    
  return (
    <div className="w-full">
      <div className="bg-gray-800 rounded-xl p-6 min-h-[280px] flex flex-col relative">
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            onChange(newValue);
            updateCursorPosition();
          }}
          onClick={updateCursorPosition}
          onKeyUp={updateCursorPosition}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
              e.preventDefault();
              // Clear debounce timer and search immediately
              if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
              }
              onSearch(value.trim());
            }
          }}
          maxLength={1000}
          spellCheck={false}
          className="w-full flex-1 bg-transparent border-none outline-none text-white placeholder:text-white placeholder:text-lg resize-none text-[20px] font-normal not-italic no-underline"
          style={{ color: '#FFFFFF', textShadow: '0 0 1px rgba(255, 255, 255, 0.5)' }}
        />
        <div className="absolute bottom-4 right-4 text-sm text-gray-400 flex items-center gap-2">
          {value.length} из 1000
          <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`transition-colors ${showKeyboard ? 'text-amber-500' : 'hover:text-white'}`}
            title={showKeyboard ? "Скрыть клавиатуру" : "Показать клавиатуру"}
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Virtual Keyboard */}
      {showKeyboard && (
        <VirtualKeyboard
          onKeyPress={handleVirtualKeyPress}
          onBackspace={handleVirtualBackspace}
          onSpace={handleVirtualSpace}
          onEnter={handleVirtualEnter}
        />
      )}
    </div>
  );
}
