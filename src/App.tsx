import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
    const [text, setText] = useState(''); // State to track the input value
    const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for the textarea
    const navigate = useNavigate(); // React Router's navigation hook

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);

        // Dynamically adjust the height of the textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scrollHeight
        }
    };

    const handleSave = () => {
        if (text.trim() !== '') {
            // Navigate to the analysis page with the input text as state
            navigate('/analysis', { state: { inputText: text } });
        }
    };

    return (
        <div className="App">
            <h1>Share Your Ideas</h1>
            <div className="textbox-container">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleInputChange}
                    placeholder="Type your idea here..."
                    className="expandable-textarea"
                />
            </div>
            <button onClick={handleSave} className="submit-button">
                Analysis
            </button>
        </div>
    );
}

export default App;