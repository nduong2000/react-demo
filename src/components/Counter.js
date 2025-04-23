import React, { useState, useReducer } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Counter.css';

// Reducer function for the advanced counter
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + action.payload };
    case 'DECREMENT':
      return { ...state, count: state.count - action.payload };
    case 'RESET':
      return { ...state, count: 0 };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    default:
      return state;
  }
};

function Counter() {
  const { darkMode } = useTheme();
  
  // Simple counter using useState
  const [count, setCount] = useState(0);
  
  // Advanced counter using useReducer
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    step: 1
  });
  
  // Handle input change for the step value
  const handleStepChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    dispatch({ type: 'SET_STEP', payload: value });
  };
  
  return (
    <div className={`counter-container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Counter Examples</h2>
      <p className="counter-description">
        Demonstrating state management with useState and useReducer hooks.
      </p>
      
      <div className="counters-wrapper">
        <div className="counter-box simple-counter">
          <h3>Simple Counter</h3>
          <p className="counter-info">
            Using the <code>useState</code> hook for basic state management.
          </p>
          
          <div className="counter-display">
            <span className="count">{count}</span>
          </div>
          
          <div className="counter-controls">
            <button 
              onClick={() => setCount(count - 1)}
              className="counter-button decrement"
            >
              -
            </button>
            <button 
              onClick={() => setCount(0)}
              className="counter-button reset"
            >
              Reset
            </button>
            <button 
              onClick={() => setCount(count + 1)}
              className="counter-button increment"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="counter-box advanced-counter">
          <h3>Advanced Counter</h3>
          <p className="counter-info">
            Using the <code>useReducer</code> hook for complex state management.
          </p>
          
          <div className="counter-display">
            <span className="count">{state.count}</span>
          </div>
          
          <div className="step-control">
            <label htmlFor="step">Step:</label>
            <input 
              type="number"
              id="step"
              min="1"
              max="10"
              value={state.step}
              onChange={handleStepChange}
            />
          </div>
          
          <div className="counter-controls">
            <button 
              onClick={() => dispatch({ type: 'DECREMENT', payload: state.step })}
              className="counter-button decrement"
            >
              - {state.step}
            </button>
            <button 
              onClick={() => dispatch({ type: 'RESET' })}
              className="counter-button reset"
            >
              Reset
            </button>
            <button 
              onClick={() => dispatch({ type: 'INCREMENT', payload: state.step })}
              className="counter-button increment"
            >
              + {state.step}
            </button>
          </div>
        </div>
      </div>
      
      <div className="state-explanation">
        <h4>Key React State Concepts:</h4>
        <ul>
          <li>
            <strong>useState:</strong> Basic hook for managing simple state values.
          </li>
          <li>
            <strong>useReducer:</strong> Advanced hook for complex state logic that involves multiple sub-values.
          </li>
          <li>
            <strong>Immutability:</strong> React state should never be mutated directly - always create a new state object.
          </li>
          <li>
            <strong>Batched Updates:</strong> React batches state updates for performance optimization.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Counter;
