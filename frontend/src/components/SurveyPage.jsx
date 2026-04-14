import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Slider,
  FormControl,
  FormLabel,
  TextField,
  Alert,
  Fade
} from '@mui/material'
import { ArrowBack, ArrowForward, Psychology } from '@mui/icons-material'
import axios from 'axios'

const steps = ['Work & Career', 'Lifestyle', 'Mental Health', 'Personal Life']

const surveySections = [
  {
    title: 'Work & Career',
    questions: [
      {
        id: 'work_hours',
        label: 'Average weekly work hours',
        type: 'slider',
        min: 10,
        max: 80,
        marks: [
          { value: 20, label: '20h' },
          { value: 40, label: '40h' },
          { value: 60, label: '60h' }
        ]
      },
      {
        id: 'workload',
        label: 'How would you rate your workload?',
        type: 'slider',
        min: 1,
        max: 10,
        marks: [
          { value: 1, label: 'Very Light' },
          { value: 5, label: 'Moderate' },
          { value: 10, label: 'Extreme' }
        ]
      },
      {
        id: 'job_satisfaction',
        label: 'Overall job satisfaction',
        type: 'slider',
        min: 1,
        max: 10,
        marks: [
          { value: 1, label: 'Very Low' },
          { value: 5, label: 'Neutral' },
          { value: 10, label: 'Very High' }
        ]
      }
    ]
  },
  {
    title: 'Lifestyle',
    questions: [
      {
        id: 'sleep_hours',
        label: 'Average daily sleep hours',
        type: 'slider',
        min: 3,
        max: 12,
        marks: [
          { value: 4, label: '4h' },
          { value: 6, label: '6h' },
          { value: 8, label: '8h' },
          { value: 10, label: '10h' }
        ]
      },
      {
        id: 'sleep_quality',
        label: 'Sleep quality (1-10 scale)',
        type: 'slider',
        min: 1,
        max: 10,
        marks: [
          { value: 1, label: 'Poor' },
          { value: 5, label: 'Average' },
          { value: 10, label: 'Excellent' }
        ]
      },
      {
        id: 'exercise_frequency',
        label: 'Exercise frequency per week',
        type: 'slider',
        min: 0,
        max: 7,
        marks: [
          { value: 0, label: 'None' },
          { value: 3, label: '3x' },
          { value: 7, label: 'Daily' }
        ]
      },
      {
        id: 'social_support',
        label: 'Social support satisfaction',
        type: 'slider',
        min: 1,
        max: 10,
        marks: [
          { value: 1, label: 'Very Low' },
          { value: 5, label: 'Moderate' },
          { value: 10, label: 'Very High' }
        ]
      }
    ]
  },
  {
    title: 'Mental Health',
    questions: [
      {
        id: 'stress_level',
        label: 'Current stress level',
        type: 'slider',
        min: 1,
        max: 10,
        marks: [
          { value: 1, label: 'Very Low' },
          { value: 5, label: 'Moderate' },
          { value: 10, label: 'Very High' }
        ]
      },
      {
        id: 'anxiety_level',
        label: 'Anxiety level',
        type: 'slider',
        min: 1,
        max: 10,
        marks: [
          { value: 1, label: 'Very Low' },
          { value: 5, label: 'Moderate' },
          { value: 10, label: 'Very High' }
        ]
      },
      {
        id: 'mood',
        label: 'Overall mood recently',
        type: 'slider',
        min: 1,
        max: 10,
        marks: [
          { value: 1, label: 'Very Low' },
          { value: 5, label: 'Neutral' },
          { value: 10, label: 'Very High' }
        ]
      }
    ]
  },
  {
    title: 'Personal Life',
    questions: [
      {
        id: 'personal_life_satisfaction',
        label: 'Personal life satisfaction',
        type: 'slider',
        min: 1,
        max: 10,
        marks: [
          { value: 1, label: 'Very Low' },
          { value: 5, label: 'Neutral' },
          { value: 10, label: 'Very High' }
        ]
      }
    ]
  }
]

const SurveyPage = ({ onComplete, onBack }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const requiredFields = [
        'work_hours', 'workload', 'job_satisfaction', 'sleep_hours',
        'sleep_quality', 'exercise_frequency', 'social_support', 
        'stress_level', 'anxiety_level', 'mood', 'personal_life_satisfaction'
      ]

      const missingFields = requiredFields.filter(
        field => !formData[field] && formData[field] !== 0
      )

      if (missingFields.length > 0) {
        setError('Please complete all questions before submitting')
        setLoading(false)
        return
      }

      const response = await axios.post('/api/predict', formData)
      onComplete(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit, please try again.')
    } finally {
      setLoading(false)
    }
  }

  const currentSection = surveySections[activeStep]

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 50%, #e0f2fe 100%)',
      width: '100%',
      margin: 0,
      padding: 0,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'linear-gradient(135deg, #3b82f6 0%, transparent 70%)',
        borderRadius: '50%',
        opacity: 0.1
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        background: 'linear-gradient(135deg, #06b6d4 0%, transparent 70%)',
        borderRadius: '50%',
        opacity: 0.1
      }} />

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        py: { xs: 4, md: 8 },
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{ 
          maxWidth: '800px', 
          width: '100%',
          mx: 2
        }}>
          {/* Header */}
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Psychology sx={{ 
                  width: 48, 
                  height: 48, 
                  color: '#3b82f6',
                  mr: 2
                }} />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    fontWeight: '700',
                    color: '#0f172a',
                    fontFamily: "'Inter', sans-serif",
                    background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Burnout Assessment
                </Typography>
              </Box>
              
              <Typography
                sx={{
                  color: '#64748b',
                  fontSize: '1.3rem',
                  lineHeight: 1.6,
                  mb: 3,
                  fontWeight: '400',
                  fontFamily: "'Inter', sans-serif",
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                Complete this comprehensive assessment to understand your burnout risk and receive personalized insights.
              </Typography>
            </Box>
          </Fade>

          {/* Progress Section */}
          <Fade in timeout={1000}>
            <Card 
              sx={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                mb: 4
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stepper 
                  activeStep={activeStep} 
                  alternativeLabel
                  sx={{
                    '& .MuiStepLabel-root .Mui-completed': {
                      color: '#3b82f6',
                    },
                    '& .MuiStepLabel-root .Mui-active': {
                      color: '#3b82f6',
                    },
                    '& .MuiStepLabel-label': {
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: '600',
                      fontSize: '1.1rem'
                    }
                  }}
                >
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>
          </Fade>

          {error && (
            <Fade in timeout={500}>
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: '12px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem'
                }}
              >
                {error}
              </Alert>
            </Fade>
          )}

          {/* Questions Section - Single Column Layout */}
          <Fade in timeout={1200}>
            <Card 
              sx={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 15px 50px rgba(0, 0, 0, 0.12)',
                }
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: '700', 
                    color: '#0f172a',
                    fontSize: '2.2rem',
                    mb: 2,
                    fontFamily: "'Inter', sans-serif",
                    textAlign: 'center'
                  }}
                >
                  {currentSection.title}
                </Typography>
                
                <Typography 
                  sx={{ 
                    color: '#64748b',
                    textAlign: 'center',
                    mb: 6,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.2rem'
                  }}
                >
                  Answer honestly to get accurate burnout insights.
                </Typography>

                {/* Single Column Layout for Questions */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {currentSection.questions.map((q, index) => (
                    <Card
                      key={q.id}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid rgba(59, 130, 246, 0.1)',
                        borderRadius: '20px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <FormControl fullWidth>
                          <FormLabel 
                            sx={{ 
                              mb: 3, 
                              fontSize: '1.4rem', 
                              fontWeight: '600',
                              color: '#0f172a',
                              fontFamily: "'Inter', sans-serif",
                              lineHeight: 1.3
                            }}
                          >
                            {q.label}
                          </FormLabel>

                          {q.type === 'slider' ? (
                            <Box sx={{ px: 1 }}>
                              <Slider
                                value={formData[q.id] || q.min}
                                onChange={(_, val) => handleInputChange(q.id, val)}
                                min={q.min}
                                max={q.max}
                                marks={q.marks}
                                valueLabelDisplay="on"
                                sx={{
                                  color: '#3b82f6',
                                  height: 8,
                                  '& .MuiSlider-thumb': {
                                    width: 24,
                                    height: 24,
                                    '&:hover, &.Mui-focusVisible': {
                                      boxShadow: '0 0 0 10px rgba(59, 130, 246, 0.16)',
                                    },
                                  },
                                  '& .MuiSlider-valueLabel': {
                                    backgroundColor: '#3b82f6',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '1rem',
                                    padding: '4px 12px',
                                    borderRadius: '8px'
                                  },
                                  '& .MuiSlider-markLabel': {
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '1rem',
                                    fontWeight: '500'
                                  }
                                }}
                              />
                            </Box>
                          ) : (
                            <TextField
                              type="number"
                              value={formData[q.id] || ''}
                              onChange={e => handleInputChange(q.id, parseInt(e.target.value))}
                              inputProps={{
                                min: q.min,
                                max: q.max,
                                style: { 
                                  textAlign: 'center', 
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: '1.2rem'
                                }
                              }}
                              sx={{ 
                                maxWidth: 200,
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '12px',
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: '1.2rem',
                                  height: '60px'
                                }
                              }}
                            />
                          )}
                        </FormControl>
                      </CardContent>
                    </Card>
                  ))}
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mt: 8,
                  pt: 4,
                  borderTop: '1px solid rgba(0, 0, 0, 0.08)'
                }}>
                  <Button
                    onClick={activeStep === 0 ? onBack : () => setActiveStep(prev => prev - 1)}
                    startIcon={<ArrowBack />}
                    disabled={loading}
                    sx={{
                      textTransform: 'none',
                      borderRadius: '14px',
                      px: 5,
                      py: 2,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      borderColor: '#e2e8f0',
                      color: '#475569',
                      minWidth: '180px',
                      '&:hover': {
                        borderColor: '#3b82f6',
                        color: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.04)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {activeStep === 0 ? 'Back to Home' : 'Previous'}
                  </Button>

                  <Button
                    variant="contained"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : () => setActiveStep(prev => prev + 1)
                    }
                    disabled={loading}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      borderRadius: '14px',
                      textTransform: 'none',
                      px: 6,
                      py: 2,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                      minWidth: '200px',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                        boxShadow: '0 12px 35px rgba(59, 130, 246, 0.4)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? loading ? 'Analyzing...' : 'See Results'
                      : 'Next Section'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Box>
      </Box>
    </Box>
  )
}

export default SurveyPage