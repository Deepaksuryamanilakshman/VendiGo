import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        navigate(`/search?q=${encodeURIComponent(transcript)}`);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        alert('Voice search not available. Please try typing your search.');
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in your browser.');
    }
  };

  const handleImageSearch = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // In a real app, you would upload this to an image recognition service
        // For demo purposes, we'll just search for "image"
        navigate('/search?q=image&type=visual');
        alert('Image search feature would analyze your image and find similar products. For demo, showing general results.');
      }
    };
    input.click();
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Search by Keyword or Product ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      
      <button 
        type="button" 
        onClick={handleVoiceSearch}
        className="search-icon-btn"
        title="Voice Search"
      >
        
        
      </button>
      
      <button 
        type="button" 
        onClick={handleImageSearch}
        className="search-icon-btn"
        title="Image Search"
      >
        📷
      </button>
      
      <button 
        type="submit"
        className="search-icon-btn"
        title="Search"
      >
        🔍
      </button>
    </form>
  );
}

export default SearchBar;