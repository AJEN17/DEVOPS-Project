import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  useMediaQuery
} from '@mui/material'
import {
  Psychology,
  Dashboard
} from '@mui/icons-material'

const Navbar = ({ onTakeAssessment, onViewDashboard }) => {
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}
    >
      <Toolbar sx={{ 
        px: { xs: 2, md: 4 }, 
        py: 2,
        justifyContent: 'space-between'
      }}>
        {/* Left Side - Logo and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Psychology sx={{ 
            width: { xs: 28, md: 32 }, 
            height: { xs: 28, md: 32 }, 
            color: '#3b82f6' 
          }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: { xs: '1.25rem', md: '1.5rem' }, 
              fontWeight: '700', 
              color: '#1e293b',
              letterSpacing: '-0.5px',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            NeuroBalance
          </Typography>
        </Box>

        {/* Right Side - Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Dashboard Button - Normal */}
          <Button 
            variant="outlined"
            onClick={onViewDashboard}
            startIcon={<Dashboard />}
            sx={{
              borderColor: '#e2e8f0',
              color: '#475569',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: '500',
              px: 3,
              py: 1,
              fontSize: '0.9rem',
              minWidth: 'auto',
              fontFamily: "'Inter', sans-serif",
              '&:hover': {
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.04)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {isMobile ? 'Dashboard' : 'View Dashboard'}
          </Button>

          {/* Take Assessment Button - Colored */}
          <Button 
            variant="contained"
            onClick={onTakeAssessment}
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: '600',
              px: 4,
              py: 1,
              fontSize: '0.9rem',
              minWidth: 'auto',
              fontFamily: "'Inter', sans-serif",
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {isMobile ? 'Assessment' : 'Take Assessment'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar