import React, { useState } from 'react'
import { Container, Box } from '@mui/material'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import SurveyPage from './components/SurveyPage'
import ResultsPage from './components/ResultsPage'
import Dashboard from './components/Dashboard'
import theme from './styles/theme';
import './styles/App.css';


function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [surveyResults, setSurveyResults] = useState(null)
  const [surveyHistory, setSurveyHistory] = useState([])

  const handleTakeAssessment = () => {
    setCurrentPage('survey')
  }

  const handleViewDashboard = () => {
    setCurrentPage('dashboard')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    setSurveyResults(null)
  }

  const handleSurveyComplete = (results) => {
    setSurveyResults(results)
    setSurveyHistory(prev => [...prev, {
      ...results,
      timestamp: new Date().toISOString()
    }])
    setCurrentPage('results')
  }

  const handleNewSurvey = () => {
    setCurrentPage('survey')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navbar - Always visible */}
      <Navbar 
        onTakeAssessment={handleTakeAssessment}
        onViewDashboard={handleViewDashboard}
      />
      
      <Box sx={{ width: '100%', py: 4 }}>
        {currentPage === 'home' && (
          <HomePage 
            onStartSurvey={handleTakeAssessment}
            onViewDashboard={handleViewDashboard}
          />
        )}
        {currentPage === 'survey' && (
          <SurveyPage 
            onComplete={handleSurveyComplete}
            onBack={handleBackToHome}
          />
        )}
        {currentPage === 'results' && (
          <ResultsPage 
            results={surveyResults}
            history={surveyHistory}
            onNewSurvey={handleNewSurvey}
            onViewDashboard={handleViewDashboard}
            onBack={handleBackToHome}
          />
        )}
        {currentPage === 'dashboard' && (
          <Dashboard 
            history={surveyHistory}
            onBack={handleBackToHome}
            onNewSurvey={handleNewSurvey}
          />
        )}
      </Box>
    </Box>
  )
}

export default App