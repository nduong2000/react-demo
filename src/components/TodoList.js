import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import './TodoList.css';

function TodoList() {
  const { darkMode } = useTheme();
  
  // State for todos
  const [todos, setTodos] = useState(() => {
    // Load from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, text: 'Learn React Hooks', completed: true },
      { id: 2, text: 'Build a React App', completed: false },
      { id: 3, text: 'Deploy to Nginx', completed: false }
    ];
  });
  
  // State for new todo input
  const [newTodo, setNewTodo] = useState('');
  
  // State for filter
  const [filter, setFilter] = useState('all');
  
  // Ref for focusing input
  const inputRef = useRef(null);
  
  // Effect to store todos in localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // Effect to focus input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  // Effect to show notification when all todos are completed
  useEffect(() => {
    if (todos.length > 0 && todos.every(todo => todo.completed)) {
      const timeoutId = setTimeout(() => {
        alert('Congratulations! All tasks completed!');
      }, 500);
      
      // Cleanup function to clear timeout if component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [todos]);
  
  // Effect to update document title with remaining tasks
  useEffect(() => {
    const incompleteTasks = todos.filter(todo => !todo.completed).length;
    document.title = incompleteTasks > 0 ? 
      `(${incompleteTasks}) Tasks Remaining` : 
      'All Tasks Complete!';
    
    // Cleanup function to restore title when component unmounts
    return () => {
      document.title = 'React Features Demo';
    };
  }, [todos]);
  
  // Add new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    
    if (newTodo.trim() === '') return;
    
    const newTodoItem = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };
  
  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });
  
  return (
    <div className={`todo-container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Todo List</h2>
      <p className="todo-description">
        Demonstrating useEffect hook for side effects in React.
      </p>
      
      <div className="todo-app">
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            ref={inputRef}
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new task..."
            className="todo-input"
          />
          <button type="submit" className="add-button">Add</button>
        </form>
        
        <div className="todo-filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty-message">
              No {filter !== 'all' ? filter : ''} tasks to display
            </li>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className="todo-text">{todo.text}</span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>
        
        <div className="todo-stats">
          <span>
            {todos.filter(todo => !todo.completed).length} items left
          </span>
        </div>
      </div>
      
      <div className="effect-explanation">
        <h4>useEffect Examples in this Component:</h4>
        <ol>
          <li>
            <strong>Persistent Storage:</strong>
            <p>Saves todos to localStorage whenever the todos state changes.</p>
            <code>useEffect(() => &#123; localStorage.setItem('todos', JSON.stringify(todos)); &#125;, [todos]);</code>
          </li>
          <li>
            <strong>Auto-Focus:</strong>
            <p>Focuses the input field when the component mounts (empty dependency array).</p>
            <code>useEffect(() => &#123; inputRef.current.focus(); &#125;, []);</code>
          </li>
          <li>
            <strong>Conditional Side Effect:</strong>
            <p>Shows congratulations alert when all todos are completed.</p>
            <code>useEffect(() => &#123; if (all completed) &#123; alert('Congratulations!'); &#125; &#125;, [todos]);</code>
          </li>
          <li>
            <strong>Document Title:</strong>
            <p>Updates the document title with the number of remaining tasks.</p>
            <code>useEffect(() => &#123; document.title = \`Tasks Remaining\`; return () => &#123; /* cleanup */ &#125; &#125;, [todos]);</code>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default TodoList;