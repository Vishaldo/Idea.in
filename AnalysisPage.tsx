import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AnalysisPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const inputText = location.state?.inputText || '';

    const [problemStatement, setProblemStatement] = useState<string>('Analyzing...');
    const [prizing, setPrizing] = useState<string>('Calculating...');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const analyzeIdeaWithAI = async (idea: string): Promise<{ problemStatement: string; prizing: string }> => {
        try {
            console.log('Sending request to backend with idea:', idea);
            const response = await fetch('http://localhost:5000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idea }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log('Backend response:', data);

            return {
                problemStatement: data.problemStatement || 'Unable to classify the idea',
                prizing: data.prizing || 'Unable to calculate prizing',
            };
        } catch (error) {
            console.error('Error analyzing idea:', error);
            setError('Failed to analyze the idea. Please try again later.');
            return {
                problemStatement: 'Error analyzing the idea',
                prizing: 'Error calculating prizing',
            };
        }
    };

    useEffect(() => {
        if (!inputText.trim()) {
            setError('Input text cannot be empty.');
            setLoading(false);
            return;
        }

        setLoading(true);
        analyzeIdeaWithAI(inputText).then((result) => {
            setProblemStatement(result.problemStatement);
            setPrizing(result.prizing);
            setLoading(false);
        });
    }, [inputText]);

    return (
        <div className="App">
            <h1>Analysis Result</h1>
            {error ? (
                <>
                    <p style={{ color: 'red' }}>{error}</p>
                    <button onClick={() => window.location.reload()} className="submit-button">
                        Retry
                    </button>
                </>
            ) : loading ? (
                <p>Loading analysis...</p>
            ) : (
                <>
                    <p><strong>Idea:</strong> {inputText}</p>
                    <p><strong>Problem Statement:</strong> {problemStatement}</p>
                    <p><strong>Prizing:</strong> {prizing}</p>
                </>
            )}
            <button onClick={() => navigate('/')} className="submit-button">
                Go Back
            </button>
        </div>
    );
}

export default AnalysisPage;