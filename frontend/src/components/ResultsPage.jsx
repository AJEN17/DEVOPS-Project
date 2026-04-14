import React from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider
} from '@mui/material'
import {
  Dashboard
} from '@mui/icons-material'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts'

const ResultsPage = ({ results, history, onNewSurvey, onViewDashboard, onBack }) => {
  if (!results) {
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
          <Typography variant="h2" gutterBottom sx={{ fontFamily: "'Inter', sans-serif", color: '#0f172a' }}>
            No Results Available
          </Typography>
          <Button
            variant="contained"
            onClick={onNewSurvey}
            sx={{
              background: '#3b82f6',
              color: 'white',
              fontSize: '1.2rem',
              px: 6,
              py: 2,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: '600',
              fontFamily: "'Inter', sans-serif",
              '&:hover': {
                background: '#2563eb',
              }
            }}
          >
            Take Assessment
          </Button>
        </Box>
      </Box>
    )
  }

  const { burnout_score = 0, risk_level = 'Moderate', factors } = results

  // AI-Based Recommendations by Risk Level
  const aiRecommendations = {
    'Low': [
      "Enhance job satisfaction: Identify one task you enjoy and focus on it weekly.",
      "Prioritize social connections: Schedule a weekly catch-up with a friend or loved one.",
      "Boost sleep quality: Establish a calming bedtime routine to improve sleep hygiene.",
      "Increase exercise frequency: Add a light physical activity or a walk on off days.",
      "Practice mindfulness: Dedicate 5-10 minutes daily for deep breathing or meditation exercises."
    ],
    'Moderate': [
      "Enhance job satisfaction: Identify one task you enjoy and focus on it weekly.",
      "Prioritize social connections: Schedule a weekly catch-up with a friend or loved one.",
      "Boost sleep quality: Establish a calming bedtime routine to improve sleep hygiene.",
      "Increase exercise frequency: Add a light physical activity or a walk on off days.",
      "Practice mindfulness: Dedicate 5-10 minutes daily for deep breathing or meditation exercises."
    ],
    'High': [
      "Workload optimization: Break large projects into smaller tasks and prioritize using the Eisenhower Matrix.",
      "Stress reduction techniques: Implement daily 15-minute meditation sessions and progressive muscle relaxation.",
      "Boundary reinforcement: Set clear 'no work' hours and communicate these boundaries to colleagues and family.",
      "Social support activation: Schedule weekly check-ins with friends or join a professional support group.",
      "Sleep quality enhancement: Establish a digital curfew 1 hour before bedtime and create a relaxing pre-sleep routine."
    ],
    'Critical': [
      "Immediate professional intervention: Contact mental health services or your healthcare provider within 24 hours.",
      "Medical leave consideration: Discuss taking temporary leave from work to focus on recovery.",
      "Crisis support activation: Share your situation with trusted individuals who can provide immediate support.",
      "Basic self-care focus: Concentrate on fundamental needs - hydration, nutrition, and rest above all else.",
      "Environmental stress reduction: Remove yourself from high-stress environments whenever possible."
    ]
  }

  // canonical color maps stored with lowercase keys for robust lookup
  const riskColorsLower = {
    low: '#10b981',        // Green
    moderate: '#f59e0b',   // Orange
    high: '#eb5656',       // Red
    critical: '#8e0000'    // Dark Red
  }

  const riskLightColorsLower = {
    low: '#cff9e3ff',        // Light Green
    moderate: '#f8ecbbff',   // Light Orange
    high: '#fed3d3ff',       // Light Red
    critical: '#ffaeaeff'    // Light Dark Red
  }

  // normalize input risk_level -> lowercase trimmed key
  const riskKey = String(risk_level || '').trim().toLowerCase()

  // accessors with fallback to 'moderate' if lookup fails
  const getColor = (key) => riskColorsLower[(String(key || '').trim().toLowerCase())] || riskColorsLower['moderate']
  const getLightColor = (key) => riskLightColorsLower[(String(key || '').trim().toLowerCase())] || riskLightColorsLower['moderate']

  const recommendations = aiRecommendations[Object.keys(aiRecommendations).find(k => k.toLowerCase() === riskKey) || 'Moderate']

  // Pie chart data (ensure numeric and clamped)
  const safeScore = Math.max(0, Math.min(100, Number(burnout_score) || 0))
  const pieData = [
    { name: 'Your Risk', value: safeScore },
    { name: 'Safe Zone', value: Math.max(0, 100 - safeScore) }
  ]

  // static pie colors derived from normalized key
  const pieColors = [getColor(riskKey), '#e5e7eb']

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 50%, #e0f2fe 100%)',
      width: '100%',
      margin: 0,
      padding: 0,
      position: 'relative'
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
        width: '100%',
        py: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{
          maxWidth: '1200px',
          width: '100%',
          mx: 'auto',
          px: 3
        }}>

          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1e293b',
                fontFamily: "'Inter', sans-serif",
                mb: 2
              }}
            >
              Your Burnout Risk Assessment
            </Typography>

            <Typography
              sx={{
                color: '#64748b',
                fontSize: '1.1rem',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Based on your comprehensive mental wellness survey
            </Typography>
          </Box>

          {/* Score and Distribution Card */}
          <Card
            sx={{
              background: 'white',
              border: `2px solid ${getColor(riskKey)}`,
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              mb: 4,
              width: '100%'
            }}
          >
            <CardContent sx={{ p: 5 }}>
              <Grid container spacing={4} alignItems="center">
                {/* Left Side - Score */}
                <Grid item xs={12} md={7}>
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    {/* Risk Level Chip */}
                    <Chip
                      label={`${(risk_level || '').toString().trim()} Risk`}
                      sx={{
                        fontWeight: '700',
                        background: getLightColor(riskKey),
                        color: getColor(riskKey),
                        border: `2px solid ${getColor(riskKey)}`,
                        fontSize: '1rem',
                        px: 3,
                        py: 1.5,
                        height: 'auto',
                        mb: 3
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: '3.5rem',
                        fontWeight: '600', // Less bolder
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1,
                        mb: 1,
                        color: '#3b82f6' // Blue color for score
                      }}
                    >
                      {safeScore.toFixed(1)}/100
                    </Typography>

                    <Typography
                      sx={{
                        color: '#64748b',
                        fontSize: '1.1rem',
                        fontFamily: "'Inter', sans-serif",
                        mb: 4
                      }}
                    >
                      Burnout Risk Score
                    </Typography>

                    {/* Risk Score Slider */}
                    <Box sx={{ maxWidth: 400, mb: 4 }}>
                      <Slider
                        value={safeScore}
                        min={0}
                        max={100}
                        disabled
                        sx={{
                          color: getColor(riskKey),
                          height: 8,
                          '& .MuiSlider-track': {
                            border: 'none',
                          },
                          '& .MuiSlider-thumb': {
                            height: 20,
                            width: 20,
                            backgroundColor: getColor(riskKey),
                            border: '2px solid white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                              boxShadow: 'inherit',
                            },
                          },
                          '& .MuiSlider-valueLabel': {
                            lineHeight: 1.2,
                            fontSize: 12,
                            background: 'unset',
                            padding: 0,
                            width: 32,
                            height: 32,
                            borderRadius: '50% 50% 50% 0',
                            backgroundColor: getColor(riskKey),
                            transformOrigin: 'bottom left',
                            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                            '&:before': { display: 'none' },
                            '&.MuiSlider-valueLabelOpen': {
                              transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                            },
                            '& > *': {
                              transform: 'rotate(45deg)',
                            },
                          },
                        }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="body2" color="#64748b">0</Typography>
                        <Typography variant="body2" color="#64748b">100</Typography>
                      </Box>
                    </Box>

                    {/* Risk Level Indicators */}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                      {['Critical', 'High', 'Low', 'Moderate'].map((level) => {
                        const key = level.toLowerCase()
                        const active = key === riskKey
                        return (
                          <Chip
                            key={level}
                            label={level}
                            sx={{
                              fontWeight: active ? '700' : '500',
                              background: active ? getLightColor(key) : '#f8fafc',
                              color: active ? getColor(key) : '#64748b',
                              border: active ? `2px solid ${getColor(key)}` : '1px solid #e2e8f0',
                              fontSize: '0.9rem',
                              px: 2,
                              py: 1
                            }}
                          />
                        )
                      })}
                    </Box>
                  </Box>
                </Grid>

                {/* Right Side - Risk Distribution Chart */}
                <Grid item xs={12} md={5}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        fontFamily: "'Inter', sans-serif",
                        mb: 4
                      }}
                    >
                      Risk Distribution
                    </Typography>

                    {/* Pie Chart */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                      <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, value }) => `${value}%`}
                            labelLine={false}
                            isAnimationActive={false}
                          >
                            {pieData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={pieColors[index] ?? '#e5e7eb'}
                                stroke="none"
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value}%`, 'Percentage']}
                            contentStyle={{
                              borderRadius: '12px',
                              fontFamily: "'Inter', sans-serif",
                              background: 'white',
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>

                    {/* Chart Legend */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 14, height: 14, background: getColor(riskKey), borderRadius: '50%' }} />
                        <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#64748b' }}>
                          Your Risk ({safeScore.toFixed(1)}%)
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 14, height: 14, background: '#e5e7eb', borderRadius: '50%' }} />
                        <Typography sx={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#64748b' }}>
                          Safe Zone ({Math.max(0, 100 - safeScore)}%)
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Recommendations Card */}
          <Card
            sx={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              mb: 4,
              width: '100%'
            }}
          >
            <CardContent sx={{ p: 5 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  fontFamily: "'Inter', sans-serif",
                  mb: 1
                }}
              >
                Personalized Recommendations
              </Typography>

              <Typography
                sx={{
                  color: '#64748b',
                  fontSize: '1.1rem',
                  fontFamily: "'Inter', sans-serif",
                  mb: 4
                }}
              >
                AI-generated strategies to reduce your burnout risk
              </Typography>

              {/* Recommendations List with Plus Icons */}
              <List sx={{ py: 0 }}>
                {recommendations.map((rec, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      px: 0,
                      py: 2,
                      alignItems: 'flex-start'
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.25 }}>
                      <Typography
                        sx={{
                          color: '#3b82f6',
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          lineHeight: 1
                        }}
                      >
                        +
                      </Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary={rec}
                      primaryTypographyProps={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.1rem',
                        fontWeight: '400',
                        lineHeight: 1.6,
                        color: '#475569'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                onClick={onNewSurvey}
                sx={{
                  background: '#3b82f6',
                  color: 'white',
                  fontSize: '1.1rem',
                  px: 5,
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
                Take Another Assessment
              </Button>

              <Button
                variant="outlined"
                onClick={onViewDashboard}
                startIcon={<Dashboard />}
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#475569',
                  fontSize: '1.1rem',
                  px: 5,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: '600',
                  fontFamily: "'Inter', sans-serif",
                  borderWidth: '2px',
                  '&:hover': {
                    borderColor: '#3b82f6',
                    color: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.04)',
                  }
                }}
              >
                View Dashboard
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ResultsPage
