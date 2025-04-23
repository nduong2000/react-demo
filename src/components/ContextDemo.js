import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ContextDemo.css';

function ContextDemo() {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <div className={`context-container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>React Context API Demo</h2>
      <p className="context-description">
        Demonstrating React's Context API for state management across components without prop drilling.
      </p>
      
      <div className="theme-demo">
        <div className="theme-display">
          <div className="theme-icon">
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </div>
          <h3>Current Theme: {darkMode ? 'Dark Mode' : 'Light Mode'}</h3>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="theme-toggle-button"
        >
          Toggle Theme
        </button>
        
        <div className="theme-components">
          <div className="theme-component">
            <h4>Component A</h4>
            <div className="component-box">
              I'm using the shared theme context.
            </div>
          </div>
          
          <div className="theme-component">
            <h4>Component B</h4>
            <div className="component-box">
              I'm also using the same theme context.
            </div>
          </div>
          
          <div className="theme-component">
            <h4>Component C</h4>
            <div className="component-box">
              We all share the same theme state!
            </div>
          </div>
        </div>
      </div>
      
      <div className="context-explanation">
        <h4>How Context API Works:</h4>
        <ol>
          <li>
            <strong>Create Context:</strong>
            <code>const ThemeContext = createContext(defaultValue);</code>
          </li>
          <li>
            <strong>Create Provider:</strong>
            <code>{'<ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>'}</code>
          </li>
          <li>
            <strong>Wrap Components:</strong>
            <code>{'<ThemeProvider>...your app...</ThemeProvider>'}</code>
          </li>
          <li>
            <strong>Consume Context:</strong>
            <code>const themeContext = useContext(ThemeContext);</code>
          </li>
        </ol>
      </div>
      
      <div className="context-benefits">
        <h4>Benefits of Context API:</h4>
        <ul>
          <li>Avoids "prop drilling" (passing props through multiple layers)</li>
          <li>Centralizes state management for specific domains</li>
          <li>Makes components more reusable and clean</li>
          <li>Ideal for app-wide states like themes, user data, and localization</li>
        </ul>
      </div>
    </div>
  );
}

export default ContextDemo;
