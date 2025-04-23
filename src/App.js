import React, { useState } from 'react';
import Form from './components/Form';
import Counter from './components/Counter';
import ContextDemo from './components/ContextDemo';
import HooksDemo from './components/HooksDemo';
import TodoList from './components/TodoList';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('form');

  const renderComponent = () => {
    switch(activeComponent) {
      case 'form':
        return <Form />;
      case 'counter':
        return <Counter />;
      case 'context':
        return <ContextDemo />;
      case 'hooks':
        return <HooksDemo />;
      case 'todo':
        return <TodoList />;
      default:
        return <Form />;
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <header className="app-header">
          <h1>React Features Demo</h1>
          <p>Exploring key functionalities of React</p>
        </header>
        
        <nav className="app-nav">
          <button 
            className={activeComponent === 'form' ? 'active' : ''} 
            onClick={() => setActiveComponent('form')}
          >
            Sample Form
          </button>
          <button 
            className={activeComponent === 'counter' ? 'active' : ''} 
            onClick={() => setActiveComponent('counter')}
          >
            Counter (State)
          </button>
          <button 
            className={activeComponent === 'context' ? 'active' : ''} 
            onClick={() => setActiveComponent('context')}
          >
            Theme (Context)
          </button>
          <button 
            className={activeComponent === 'hooks' ? 'active' : ''} 
            onClick={() => setActiveComponent('hooks')}
          >
            Custom Hooks
          </button>
          <button 
            className={activeComponent === 'todo' ? 'active' : ''} 
            onClick={() => setActiveComponent('todo')}
          >
            Todo (Effects)
          </button>
        </nav>
        
        <main className="app-content">
          {renderComponent()}
        </main>
        
        <footer className="app-footer">
          <p>React Demo Application - Deploy to Nginx</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
