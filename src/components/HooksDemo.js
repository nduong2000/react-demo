import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './HooksDemo.css';

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return windowSize;
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  // Get stored value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  
  // Set stored value
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  
  return [storedValue, setValue];
}

// Custom hook for form input
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  const reset = () => {
    setValue(initialValue);
  };
  
  return {
    value,
    onChange: handleChange,
    reset,
    setValue
  };
}

function HooksDemo() {
  const { darkMode } = useTheme();
  
  // Using our custom hooks
  const windowSize = useWindowSize();
  const [favoriteColor, setFavoriteColor] = useLocalStorage('favoriteColor', '#4a90e2');
  const nameInput = useInput('');
  
  const handleColorChange = (e) => {
    setFavoriteColor(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello, ${nameInput.value}! Your favorite color is ${favoriteColor}.`);
    nameInput.reset();
  };
  
  return (
    <div className={`hooks-container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Custom Hooks Demo</h2>
      <p className="hooks-description">
        Demonstrating the power of custom hooks for reusable logic in React.
      </p>
      
      <div className="hooks-demo-section">
        <h3>Window Size Hook</h3>
        <div className="hook-example window-size-example">
          <div className="window-size-display">
            <div>
              <span className="label">Width:</span>
              <span className="value">{windowSize.width}px</span>
            </div>
            <div>
              <span className="label">Height:</span>
              <span className="value">{windowSize.height}px</span>
            </div>
          </div>
          <p className="hook-info">
            This custom hook tracks browser window dimensions and updates when resized.
          </p>
          <div className="hook-code">
            <code>function useWindowSize() &#123; ... &#125;</code>
          </div>
        </div>
      </div>
      
      <div className="hooks-demo-section">
        <h3>Local Storage Hook</h3>
        <div className="hook-example local-storage-example">
          <div className="color-picker">
            <label htmlFor="colorPicker">Pick your favorite color:</label>
            <input
              type="color"
              id="colorPicker"
              value={favoriteColor}
              onChange={handleColorChange}
            />
          </div>
          <div 
            className="color-display"
            style={{ backgroundColor: favoriteColor }}
          >
            <span className="color-value">{favoriteColor}</span>
          </div>
          <p className="hook-info">
            This color choice persists even after page refresh thanks to localStorage.
          </p>
          <div className="hook-code">
            <code>function useLocalStorage(key, initialValue) &#123; ... &#125;</code>
          </div>
        </div>
      </div>
      
      <div className="hooks-demo-section">
        <h3>Form Input Hook</h3>
        <div className="hook-example form-input-example">
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="nameInput">Enter your name:</label>
              <input
                type="text"
                id="nameInput"
                {...nameInput}
                placeholder="Your name"
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
          <p className="hook-info">
            Simplify form handling by abstracting input state and handlers.
          </p>
          <div className="hook-code">
            <code>function useInput(initialValue) &#123; ... &#125;</code>
          </div>
        </div>
      </div>
      
      <div className="hooks-explanation">
        <h4>Benefits of Custom Hooks:</h4>
        <ul>
          <li><strong>Reusability:</strong> Extract logic to use across components</li>
          <li><strong>Separation of Concerns:</strong> Isolate unrelated logic</li>
          <li><strong>Simplified Testing:</strong> Test logic independently from UI</li>
          <li><strong>Abstraction:</strong> Hide complex implementation details</li>
        </ul>
      </div>
    </div>
  );
}

export default HooksDemo;
