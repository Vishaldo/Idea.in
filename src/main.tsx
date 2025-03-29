import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AnalysisPage from 'my-react-app/AnalysisPage';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/analysis" element={<AnalysisPage />} />
        </Routes>
    </BrowserRouter>
);