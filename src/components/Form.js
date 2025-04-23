import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Form.css';

function Form() {
  const { darkMode } = useTheme();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    plan: 'basic',
    notifications: false
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    
    if (isValid) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            message: '',
            plan: 'basic',
            notifications: false
          });
          setSubmitSuccess(false);
        }, 3000);
      }, 1500);
    }
  };
  
  // Input focus animation effect
  useEffect(() => {
    const inputs = document.querySelectorAll('.sample-input input, .sample-input textarea');
    
    inputs.forEach(input => {
      const handleFocus = () => {
        input.parentElement.classList.add('focused');
      };
      
      const handleBlur = () => {
        if (input.value === '') {
          input.parentElement.classList.remove('focused');
        }
      };
      
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
      
      // Check initial state
      if (input.value !== '') {
        input.parentElement.classList.add('focused');
      }
      
      return () => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      };
    });
  }, []);
  
  return (
    <div className={`form-container ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Contact Us</h2>
      <p className="form-description">
        This sample form demonstrates controlled components, form validation, 
        state management, and effects in React.
      </p>
      
      {submitSuccess ? (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Thank you!</h3>
          <p>Your message has been submitted successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="sample-form">
          <div className={`sample-input ${errors.name ? 'error' : ''}`}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <label htmlFor="name">Name</label>
            <span className="highlight"></span>
            <span className="bar"></span>
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className={`sample-input ${errors.email ? 'error' : ''}`}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <label htmlFor="email">Email</label>
            <span className="highlight"></span>
            <span className="bar"></span>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="sample-select">
            <label>Select Plan</label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="basic">Basic Plan</option>
              <option value="premium">Premium Plan</option>
              <option value="enterprise">Enterprise Plan</option>
            </select>
          </div>
          
          <div className={`sample-input ${errors.message ? 'error' : ''}`}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              disabled={isSubmitting}
            ></textarea>
            <label htmlFor="message">Message</label>
            <span className="highlight"></span>
            <span className="bar"></span>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          
          <div className="sample-checkbox">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <label htmlFor="notifications">
              <span></span>
              Receive email notifications
            </label>
          </div>
          
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Form;