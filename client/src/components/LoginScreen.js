import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react';
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
// import RegisterScreen from './RegisterScreen';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(253, 237, 237)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        The Top 5 Lister
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginScreen() {

  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
   
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if (auth.error) {
      console.log(auth.errorMessage);
      handleOpen();
    }
    // eslint-disable-next-line no-console
    auth.loginUser({
      email: data.get('email'),
      password: data.get('password'),
    }, store);
    
    
  };

  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Alert severity="warning" sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Error: Invalid Login
            </Typography>
            <Typography severity="error">{auth.errorMessage}</Typography>
            <Button onClick={handleClose}>Close</Button>
          </Alert>
        </Modal>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}