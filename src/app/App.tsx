import React from 'react';
import '../css/App.css';
import { Container, Stack, Box, Typography, Button} from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{my:4}}>
          <Typography variant='h4' component={"h1"} gutterBottom>
            Create React App on TypeScript

          </Typography>
        </Box>
        <Button variant="contained">Contained</Button>
      </Stack>
    </Container>
  );
}

export default App;