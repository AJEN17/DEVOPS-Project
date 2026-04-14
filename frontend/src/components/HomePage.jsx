import React from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Fade
} from '@mui/material'
import {
  Psychology,
  TrendingUp,
  AutoAwesome,
  ArrowForward
} from '@mui/icons-material'

const HomePage = ({ onStartSurvey, onViewDashboard }) => {
  const features = [
    {
      icon: <Psychology sx={{ width: 40, height: 40, color: 'white' }} />,
      title: "ML Prediction",
      description: "Advanced machine learning model trained on comprehensive wellness data for accurate burnout prediction",
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
    },
    {
      icon: <TrendingUp sx={{ width: 40, height: 40, color: 'white' }} />,
      title: "Trend Analysis",
      description: "Track your mental wellness over time with interactive visualizations and historical data analysis",
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)'
    },
    {
      icon: <AutoAwesome sx={{ width: 40, height: 40, color: 'white' }} />,
      title: "AI Recommendations",
      description: "Receive personalized, actionable strategies powered by AI to effectively reduce your burnout risk",
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    }
  ]

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
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Fade in timeout={800}>
              <Box>
                {/* Badge */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 3,
                    py: 1,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: '#3b82f6',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    mb: 4,
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  AI-Powered Mental Wellness
                </Box>

                {/* Main Heading */}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                    fontWeight: '700',
                    color: '#0f172a',
                    lineHeight: 1.1,
                    mb: 2,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Predict & Prevent
                </Typography>
                
                {/* Sub Heading */}
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    fontWeight: '600',
                    color: '#3b82f6',
                    lineHeight: 1.2,
                    mb: 4,
                    fontFamily: "'Inter', sans-serif",
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Burnout Before<br />It Happens
                </Typography>
                
                {/* Description */}
                <Typography
                  sx={{
                    color: '#64748b',
                    fontSize: { xs: '1.1rem', sm: '1.3rem' },
                    lineHeight: 1.7,
                    mb: 6,
                    fontWeight: '400',
                    fontFamily: "'Inter', sans-serif",
                    maxWidth: '700px',
                    mx: 'auto'
                  }}
                >
                  Take our comprehensive mental wellness survey powered by advanced machine learning to assess your burnout risk and receive personalized, actionable recommendations.
                </Typography>

                {/* Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 3,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  mb: 8
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onStartSurvey}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      fontSize: '1.1rem',
                      px: 6,
                      py: 2,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: '600',
                      fontFamily: "'Inter', sans-serif",
                      boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
                      minWidth: '220px',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                        boxShadow: '0 12px 40px rgba(59, 130, 246, 0.6)',
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Start Assessment
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={onViewDashboard}
                    sx={{
                      borderColor: '#e2e8f0',
                      color: '#475569',
                      fontSize: '1.1rem',
                      px: 6,
                      py: 2,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: '600',
                      fontFamily: "'Inter', sans-serif",
                      minWidth: '220px',
                      borderWidth: '2px',
                      '&:hover': {
                        borderColor: '#3b82f6',
                        color: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.04)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    View Dashboard
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Box>

          {/* Features Section - Three Cards in One Horizontal Row */}
          <Fade in timeout={1000}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: '700',
                  color: '#0f172a',
                  mb: 6,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Why Choose NeuroBalance?
              </Typography>
              
              {/* Three Cards in One Horizontal Row */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                justifyContent: 'center',
                alignItems: 'stretch'
              }}>
                {features.map((feature, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      flex: 1,
                      minWidth: { xs: '100%', md: '300px' },
                      maxWidth: { xs: '100%', md: '400px' }
                    }}
                  >
                    <Card 
                      sx={{ 
                        background: 'white',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.4s ease',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-12px)',
                          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: feature.gradient
                        }
                      }}
                    >
                      <CardContent sx={{ 
                        p: 4, 
                        textAlign: 'center',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                        {/* Icon with Gradient Background */}
                        <Box 
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            background: feature.gradient,
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            boxShadow: `0 8px 20px ${feature.color}40`
                          }}
                        >
                          {feature.icon}
                        </Box>
                        
                        {/* Title */}
                        <Typography 
                          sx={{ 
                            fontWeight: '700', 
                            color: '#0f172a',
                            fontSize: '1.5rem',
                            mb: 2,
                            fontFamily: "'Inter', sans-serif"
                          }}
                        >
                          {feature.title}
                        </Typography>
                        
                        {/* Description */}
                        <Typography 
                          sx={{ 
                            color: '#64748b',
                            lineHeight: 1.6,
                            fontSize: '1rem',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '400',
                            flex: 1
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.9)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Typography 
          sx={{ 
            color: '#64748b', 
            fontSize: '1rem', 
            fontWeight: '400',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          © 2025 NeuroBalance. Mental wellness through AI innovation.
        </Typography>
      </Box>
    </Box>
  )
}

export default HomePage