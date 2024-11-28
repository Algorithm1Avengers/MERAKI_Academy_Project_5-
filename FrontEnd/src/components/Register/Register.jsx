import React , {useContext, useState} from 'react'
import axios from "axios"

import { useNavigate } from 'react-router-dom'
 import registerimage from "../../assets/permides.jpeg" 

import { Container, Card, CardContent, TextField, Button, Typography, Grid } from '@mui/material'

import PersonAddIcon from '@mui/icons-material/PersonAdd'
const Register = () => {
 
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [country, setcountry] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');


  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrl(response.data.image);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const RegisterButton = () => {
    const newError = {};

   
    if (!firstName) newError.firstName = "First Name is required.";
    if (!lastName) newError.lastName = "Last Name is required.";
    if (!age) newError.age = "Age is required.";
    if (!email) newError.email = "Email is required.";
    if (!password) newError.password = "Password is required.";
    if (!country) newError.country = "Country is required.";

    
    if (Object.keys(newError).length) {
      setError(newError);
      return;
    }

    setError({});

    const body = {
      firstName,
      lastName,
      age,
      password,
      email,
      country,
     image: imageUrl
    };

    axios.post("http://localhost:5000/users/register", body)
      .then((result) => {
        if (result.status === 200) {
          setSuccessMessage("Registration successful! Redirecting to login...");
          setTimeout(() => navigate("/Login"), 2000); 
        }
      })
      .catch((err) => {
        console.log(err);
        setError({ api: "Registration failed. Please try again." });
      });
  };

  return (
    <>
      <Container component="main" maxWidth="md" className="register-container">
        <Card className="register-card">
          <Grid container>
            <Grid item xs={12} sm={6} className="image-section">
              <img src={registerimage} alt="Car" className="login-image" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent>
                <Typography variant="h5" component="h1" gutterBottom style={{ fontFamily: 'Roboto', fontWeight: '500', marginBottom: '20px' }}>
                  Create your account   <PersonAddIcon style={{ marginRight: '20px', color: '#D1B28E'  }}/>
                </Typography>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  error={!!error.firstName}
                  helperText={error.firstName}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  error={!!error.lastName}
                  helperText={error.lastName}
                />
                <TextField
                  label="Age"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                  error={!!error.age}
                  helperText={error.age}
                />
                  <TextField
                  label="Country"
                  variant="outlined"
                  fullWidth 
                  margin="normal"
                  value={country}
                  onChange={(e) => setcountry(e.target.value)}
                  error={!!error.country}
                  helperText={error.country}
                />
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  error={!!error.email}
                  helperText={error.email}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  error={!!error.password}
                  helperText={error.password}
                />
  <Button
                  variant="outlined"
                  fullWidth
                  component="label"
                  style={{ backgroundColor: '#D1B28E', color: 'white', margin: '10px 0' ,fontWeight:"700", fontSize:"15px"}}
                >
                  Upload Profile Picture
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    hidden
                  />
                </Button>
                <Button
                  variant="contained"
                  style={{backgroundColor: "#D1B28E",fontWeight:"700", fontSize:"15px"}}
                  fullWidth
                  onClick={RegisterButton}
                >
                  Register
                </Button>

               
                {successMessage && (
                  <Typography variant="body2" color="green" style={{ marginTop: '10px' }}>
                    {successMessage}
                  </Typography>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}

export default Register;
