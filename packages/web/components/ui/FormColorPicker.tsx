'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface FormColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
  disabled?: boolean;
  className?: string;
}

const DEFAULT_PRESETS = [
  '#C9A962', // Gold (primary brand)
  '#A88C4A', // Dark gold
  '#D4B978', // Light gold
  '#1A1A1A', // Near black
  '#2A2A2A', // Dark gray
  '#8B4513', // Saddle brown
  '#654321', // Dark brown
  '#B87333', // Copper
  '#CD7F32', // Bronze
  '#DAA520', // Goldenrod
  '#D2691E', // Chocolate
  '#8B0000', // Dark red
];

export function FormColorPicker({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  disabled,
  className,
}: FormColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Validate hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const handlePresetClick = (color: string) => {
    onChange(color);
    setInputValue(color);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <div className="flex items-center gap-2">
        {/* Color preview button */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={clsx(
            'w-10 h-10 rounded-lg border-2 border-[var(--border)]',
            'transition-all duration-[var(--transition-fast)]',
            'hover:border-[var(--text-muted)] hover:scale-105',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          style={{ backgroundColor: value }}
          aria-label="Choose color"
        />

        {/* Hex input */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder="#C9A962"
          className={clsx(
            'flex-1 px-3 py-2.5 rounded-lg uppercase',
            'bg-[var(--surface)] border border-[var(--border)]',
            'text-[var(--text-primary)] text-sm font-mono placeholder:text-[var(--text-muted)]',
            'transition-all duration-[var(--transition-fast)]',
            'hover:border-[var(--text-muted)]',
            'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        />
      </div>

      {/* Preset colors dropdown */}
      {isOpen && (
        <div
          className={clsx(
            'absolute z-50 top-full left-0 mt-2 p-3 rounded-lg',
            'bg-[var(--surface)] border border-[var(--border)]',
            'shadow-[var(--shadow-lg)]',
            'animate-fade-in'
          )}
        >
          <p className="text-xs text-[var(--text-muted)] mb-2">Presets</p>
          <div className="grid grid-cols-6 gap-2">
            {presets.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handlePresetClick(color)}
                className={clsx(
                  'w-8 h-8 rounded-md border-2',
                  'transition-all duration-[var(--transition-fast)]',
                  'hover:scale-110 hover:shadow-[var(--shadow-md)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--accent)]',
                  color === value ? 'border-[var(--accent)]' : 'border-transparent'
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>

          {/* Native color picker */}
          <div className="mt-3 pt-3 border-t border-[var(--border)]">
            <label className="flex items-center gap-2 text-xs text-[var(--text-muted)] cursor-pointer">
              <input
                type="color"
                value={value}
                onChange={(e) => handlePresetClick(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              Custom color
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
