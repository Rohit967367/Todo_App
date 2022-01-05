import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../ReduxTookit/AuthRedux';
import { useNavigate } from 'react-router-dom';



const theme = createTheme();

export default function LogIn() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onChangeHandlerEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangeHandlerPassword = (e) => {
        setPassword(e.target.value)
    }

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-AEup-yOl6EM0dhhuKE04uYhEvDRh0_M", {
            email, password
        })
            .then((res) => {
                console.log(res.data.idToken);
                dispatch(AuthAction.login(res.data.idToken))

            })
            .catch((err) => alert(err.message))


        // dispatch(AuthAction.login())

        navigate("/")


        setEmail("")
        setPassword("")
    };

    // console.log(con)
    // const auth = useSelector(state => state.auth.isAuth)
    let auth = true
    const data = localStorage.getItem("token")
    if (data) {
        auth = false
    }


    return (
        <div>
            {auth ? navigate("/") : (
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                {/* <LockOutlinedIcon /> */}
                                <h1>H</h1>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={onChangeHandlerEmail}
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
                                    value={password}
                                    onChange={onChangeHandlerPassword}
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
                                    Log-In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>)
            }
        </div>
    );
}