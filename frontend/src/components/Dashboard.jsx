import React from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip
} from '@mui/material'
import {
  Timeline,
  ShowChart,
  Psychology,
  ArrowBack,
  TrendingUp,
  Assessment,
  History,
  Insights,
  CalendarToday
} from '@mui/icons-material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const Dashboard = ({ history, onBack, onNewSurvey }) => {
  if (history.length === 0) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 50%, #e0f2fe 100%)',
        textAlign: 'center'
      }}>
        <Box>
          <Psychology sx={{ fontSize: 80, color: '#3b82f6', mb: 3, opacity: 0.8 }} />
          <Typography variant="h3" gutterBottom sx={{ fontFamily: "'Inter', sans-serif", color: '#1e293b', fontWeight: '700' }}>
            No Survey Data Yet
          </Typography>
          <Typography variant="h6" sx={{ color: '#64748b', fontFamily: "'Inter', sans-serif", mb: 4, maxWidth: '400px' }}>
            Complete your first burnout assessment to see your personalized dashboard and track your wellness journey.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={onNewSurvey}
            sx={{
              background: '#3b82f6',
              color: 'white',
              fontSize: '1.1rem',
              px: 6,
              py: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              '&:hover': {
                background: '#2563eb',
                boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
              }
            }}
          >
            Take First Assessment
          </Button>
        </Box>
      </Box>
    )
  }

  const latestResult = history[history.length - 1]
  const averageScore = history.reduce((sum, item) => sum + item.burnout_score, 0) / history.length

  // Risk level colors matching ResultsPage
  const riskColors = {
    'Low': '#10b981',
    'Moderate': '#f59e0b',
    'High': '#eb5656',
    'Critical': '#8e0000'
  }

  const riskLightColors = {
    'Low': '#d1fae5',
    'Moderate': '#fef3c7',
    'High': '#fecaca',
    'Critical': '#fca5a5'
  }

  // Calculate trend
  const getTrend = () => {
    if (history.length < 2) return 'stable'
    const current = latestResult.burnout_score
    const previous = history[history.length - 2].burnout_score
    return current < previous ? 'improving' : current > previous ? 'declining' : 'stable'
  }

  const trend = getTrend()
  const trendColor = trend === 'improving' ? '#10b981' : trend === 'declining' ? '#ef4444' : '#6b7280'

  // Prepare data for charts - FIXED: Ensure proper data structure
  const lineChartData = history.map((item, index) => ({
    name: `Test ${index + 1}`,
    score: item.burnout_score,
    date: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    fullDate: new Date(item.timestamp).toLocaleDateString()
  }))

  // Risk distribution data for pie chart - FIXED: Ensure all risk levels are included
  const riskDistribution = Object.keys(riskColors).map(level => {
    const count = history.filter(item => item.risk_level === level).length
    return {
      name: level,
      value: count,
      color: riskColors[level]
    }
  }).filter(item => item.value > 0) // Only show risk levels that have data

  // Monthly average data
  const monthlyData = history.reduce((acc, item) => {
    const date = new Date(item.timestamp)
    const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    
    if (!acc[monthYear]) {
      acc[monthYear] = { scores: [], count: 0 }
    }
    acc[monthYear].scores.push(item.burnout_score)
    acc[monthYear].count++
    
    return acc
  }, {})

  const barChartData = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    average: data.scores.reduce((a, b) => a + b, 0) / data.scores.length,
    tests: data.count
  })).slice(-6) // Last 6 months

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 50%, #e0f2fe 100%)',
      py: 4,
      px: { xs: 1, sm: 2 }
    }}>
      <Box sx={{ 
        maxWidth: '1400px', 
        mx: 'auto'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 6,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Button 
              startIcon={<ArrowBack />} 
              onClick={onBack}
              sx={{
                color: '#64748b',
                textTransform: 'none',
                fontWeight: '600',
                fontFamily: "'Inter', sans-serif",
                '&:hover': {
                  background: 'rgba(59, 130, 246, 0.04)',
                  color: '#3b82f6'
                }
              }}
            >
              Back to Results
            </Button>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                ml: { xs: 0, sm: 3 },
                mt: { xs: 1, sm: 0 },
                fontFamily: "'Inter', sans-serif",
                fontWeight: '700',
                color: '#1a77a2ff',
                fontSize: { xs: '1.8rem', md: '2.5rem' }
              }}
            >
              Wellness Dashboard
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            onClick={onNewSurvey}
            sx={{
              background: '#3b82f6',
              color: 'white',
              textTransform: 'none',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              px: 4,
              py: 1,
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              '&:hover': {
                background: '#2563eb',
                boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
              }
            }}
          >
            New Assessment
          </Button>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Row 1: First 4 stat cards only */}
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                height: '140px',
                background: 'white',
                border: `2px solid ${riskColors[latestResult.risk_level]}`,
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}>
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Assessment sx={{ color: '#3b82f6', mr: 1.5, fontSize: '1.2rem' }} />
                    <Typography variant="h6" sx={{ color: '#64748b', fontFamily: "'Inter', sans-serif", fontWeight: '600', fontSize: '0.9rem' }}>
                      Latest Score
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        color: riskColors[latestResult.risk_level],
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '700',
                        fontSize: '2rem',
                        lineHeight: 1
                      }}
                    >
                      {latestResult.burnout_score.toFixed(1)}
                    </Typography>
                    <Chip
                      label={`${latestResult.risk_level}`}
                      size="small"
                      sx={{
                        background: riskLightColors[latestResult.risk_level],
                        color: riskColors[latestResult.risk_level],
                        border: `1px solid ${riskColors[latestResult.risk_level]}`,
                        fontWeight: '700',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.7rem',
                        height: '24px'
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                height: '140px',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}>
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ShowChart sx={{ color: '#06b6d4', mr: 1.5, fontSize: '1.2rem' }} />
                    <Typography variant="h6" sx={{ color: '#64748b', fontFamily: "'Inter', sans-serif", fontWeight: '600', fontSize: '0.9rem' }}>
                      Average
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        color: '#06b6d4',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '700',
                        fontSize: '2rem',
                        lineHeight: 1
                      }}
                    >
                      {averageScore.toFixed(1)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp sx={{ color: trendColor, mr: 0.5, fontSize: '1rem' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: trendColor,
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: '600',
                          fontSize: '0.7rem',
                          textTransform: 'capitalize'
                        }}
                      >
                        {trend}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                height: '140px',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}>
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <History sx={{ color: '#8b5cf6', mr: 1.5, fontSize: '1.2rem' }} />
                    <Typography variant="h6" sx={{ color: '#64748b', fontFamily: "'Inter', sans-serif", fontWeight: '600', fontSize: '0.9rem' }}>
                      Total Tests
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        color: '#8b5cf6',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '700',
                        fontSize: '2rem',
                        lineHeight: 1
                      }}
                    >
                      {history.length}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#64748b',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8rem'
                      }}
                    >
                      Assessments
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                height: '140px',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}>
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarToday sx={{ color: '#f59e0b', mr: 1.5, fontSize: '1.2rem' }} />
                    <Typography variant="h6" sx={{ color: '#64748b', fontFamily: "'Inter', sans-serif", fontWeight: '600', fontSize: '0.9rem' }}>
                      Timeline
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        color: '#f59e0b',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '700',
                        fontSize: '2rem',
                        lineHeight: 1
                      }}
                    >
                      {Math.ceil((new Date() - new Date(history[0].timestamp)) / (1000 * 60 * 60 * 24))}d
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#64748b',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8rem'
                      }}
                    >
                      Tracking
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Row 2: Secondary Charts - Risk Distribution and Monthly Overview */}
          <Grid item xs={12} container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Insights sx={{ color: '#8b5cf6', mr: 2, fontSize: '1.8rem' }} />
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '700',
                        color: '#1e293b'
                      }}
                    >
                      Risk Distribution
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, minHeight: '250px' }}>
                    {riskDistribution.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={riskDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                            labelLine={false}
                          >
                            {riskDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value} tests`, name]}
                            contentStyle={{ 
                              borderRadius: '8px',
                              fontFamily: "'Inter', sans-serif",
                              background: 'white',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Typography sx={{ color: '#64748b', fontFamily: "'Inter', sans-serif" }}>
                          No risk distribution data available
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Timeline sx={{ color: '#06b6d4', mr: 2, fontSize: '1.8rem' }} />
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '700',
                        color: '#1e293b'
                      }}
                    >
                      Monthly Overview
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, minHeight: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="month" 
                          stroke="#64748b"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#64748b"
                          fontSize={12}
                          domain={[0, 100]}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '8px',
                            fontFamily: "'Inter', sans-serif",
                            background: 'white',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                          }}
                          formatter={(value, name) => {
                            if (name === 'average') return [`${value.toFixed(1)}`, 'Average Score']
                            return [value, 'Tests Taken']
                          }}
                        />
                        <Bar 
                          dataKey="average" 
                          fill="#06b6d4" 
                          radius={[4, 4, 0, 0]}
                          name="average"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>


          {/* Row 4: Recent Assessments - ONLY ONE INSTANCE */}
          <Grid item xs={12}>
            <Card sx={{ 
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <History sx={{ color: '#f59e0b', mr: 2, fontSize: '1.8rem' }} />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: '700',
                      color: '#1e293b'
                    }}
                  >
                    Recent Assessments
                  </Typography>
                </Box>
                <Box sx={{ maxHeight: '400px', overflowY: 'auto', pr: 1 }}>
                  {history.slice().reverse().map((item, index) => (
                    <Paper 
                      key={index} 
                      sx={{ 
                        p: 2, 
                        mb: 2,
                        background: 'white',
                        border: `1px solid #f1f5f9`,
                        borderRadius: '8px',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          borderColor: '#c3d6f0',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 0 } }}>
                        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                          <Typography variant="h6" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: '600', color: '#1e293b' }}>
                            Score: {item.burnout_score.toFixed(1)}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#64748b', fontFamily: "'Inter', sans-serif", mt: 0.5 }}>
                            {new Date(item.timestamp).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </Typography>
                        </Box>
                        <Chip
                          label={item.risk_level}
                          sx={{
                            background: riskLightColors[item.risk_level],
                            color: riskColors[item.risk_level],
                            border: `2px solid ${riskColors[item.risk_level]}`,
                            fontWeight: '700',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.9rem',
                            px: 2,
                            py: 1
                          }}
                        />
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Dashboard