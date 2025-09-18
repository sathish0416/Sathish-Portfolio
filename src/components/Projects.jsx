import React from 'react';
import { Box, Typography } from '@mui/material';
import { Code2 } from 'lucide-react';

const Projects = ({ onClick }) => {
  return (
    <Box
      component="div"
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: '0 8px 16px rgba(88, 66, 66, 0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
          backgroundColor: '#ffffff',
        },
        padding: 3,
        minHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ textAlign: 'left' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Code2 size={24} color="#1a1a1a" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '1.2rem',
              color: '#1a1a1a',
            }}
          >
            Projects
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: '#4a4a4a',
            mb: 1,
            fontWeight: 500,
          }}
        >
          View my portfolio of projects
        </Typography>
      </Box>
    </Box>
  );
};

export default Projects;