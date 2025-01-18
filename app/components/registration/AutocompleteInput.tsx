import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

interface AutocompleteInputProps {
    name: string;
    value: string;
    onChange: (name: string, value: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    placeholder: string;
    fetchSuggestions: (query: string) => Promise<string[]>;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  fetchSuggestions
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedFetchSuggestions = useRef(
    debounce(async (query: string) => {
      if (query.length > 1) {
        try {
          const fetchedSuggestions = await fetchSuggestions(query);
          setSuggestions(fetchedSuggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300)
  ).current;

  useEffect(() => {
    debouncedFetchSuggestions(value);
  }, [value, debouncedFetchSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(name, suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        onFocus={() => {
          onFocus();
          setShowSuggestions(true);
        }}
        onBlur={() => {
          onBlur();
          setTimeout(() => setShowSuggestions(false), 200);
        }}
        placeholder={placeholder}
        className="w-full p-2 bg-transparent border-b-2 border-gray-300 outline-none transition-all duration-300 focus:border-b-3"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;