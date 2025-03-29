import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AnalysisPage() {
    const location = useLocation(); // Get the state passed from the previous page
    const navigate = useNavigate();
    const inputText = location.state?.inputText || ''; // Retrieve the input text

    // Simple AI analysis logic to classify the idea
    const classifyIdea = (idea: string): string => {
        if (idea.toLowerCase().includes('environment')) {
            return 'Environmental Problem';
        } else if (idea.toLowerCase().includes('education')) {
            return 'Educational Problem';
        } else if (idea.toLowerCase().includes('health')) {
            return 'Healthcare Problem';
        } else if (idea.toLowerCase().includes('technology')) {
            return 'Technological Problem';
        } else {
            return 'General Problem';
        }
    };

    const problemStatement = classifyIdea(inputText); // Classify the idea

    return (
        <div className="App">
            <h1>Analysis Result</h1>
            <p><strong>Idea:</strong> {inputText}</p>
            <p><strong>Problem Statement:</strong> {problemStatement}</p>
            <button onClick={() => navigate('/')} className="submit-button">
                Go Back
            </button>
        </div>
    );
}

export default AnalysisPage;