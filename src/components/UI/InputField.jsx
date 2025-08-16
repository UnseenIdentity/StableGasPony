import React, { useState, useRef, useEffect } from 'react';

const InputField = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  suggestions = [], 
  className = '' 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    setShowSuggestions(newValue.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onChange?.(suggestion);
    setShowSuggestions(false);
  };

  const clearInput = () => {
    setInputValue('');
    onChange?.('');
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (inputValue.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className={`relative mb-4 sm:mb-5 ${className}`}>
      <label className="text-xs text-white/50 mb-2 block">{label}</label>
      <input
        ref={inputRef}
        type="text"
        className="w-full py-3 sm:py-4 pr-10 bg-white/5 border-2 border-[rgba(79,172,254,0.2)] rounded-[12px] sm:rounded-[15px] text-white text-sm sm:text-base transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] focus:outline-none focus:border-[#4facfe] focus:bg-white/8 focus:shadow-[0_0_25px_rgba(79,172,254,0.3),0_4px_15px_rgba(0,0,0,0.3)]"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-none border-none text-white/50 text-base sm:text-lg cursor-pointer p-1 sm:p-1.5 transition-all duration-200 hover:text-white/80"
        onClick={clearInput}
      >
        ✕
      </button>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(20,25,40,0.98)] border border-[rgba(79,172,254,0.3)] rounded-[12px] sm:rounded-[15px] mt-1 max-h-[120px] sm:max-h-[150px] overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer transition-all duration-200 border-b border-white/5 hover:bg-[rgba(79,172,254,0.2)] hover:pl-4 sm:hover:pl-5 text-sm"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputField;
