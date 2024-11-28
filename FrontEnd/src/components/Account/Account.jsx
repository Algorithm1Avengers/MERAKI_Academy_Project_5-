import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Container ,Grid,Avatar} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const AccountSettings = () => {
  const [selectedImage, setSelectedImage] = useState(null); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    country: "",
    email: "",
    password: "",
  });
  const userId=useSelector((initialState)=> initialState.login.userId)
  const [error, setError] = useState(null); 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setSelectedImage(imageUrl); 
      setFormData((prevData) => ({
        ...prevData,
        image: file, 
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      

      const response = await axios.put(`http://localhost:5000/users/update/${userId}`, formData);
      if (response.status === 200) {
        alert("Account updated successfully!");
        navigate("/profile"); 
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating account");
    }
  };

 
  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5000/users/userinfo/${userId}`);
        setFormData(response.data.result[0]); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
console.log(formData)
  return (
    <Container maxWidth="sm">
    
    <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: "bold", color: "#D1B28E" }}>
      Edit Account Information
    </Typography>

    
    {error && (
      <Typography color="error" align="center" style={{ marginBottom: "20px" }}>
        {error}
      </Typography>
    )}

    
<Box display="flex" justifyContent="center" marginBottom="20px">
        <Avatar
          alt="Profile Picture"
          src={formData.image||selectedImage || "https://via.placeholder.com/120"} 
          sx={{ width: 120, height: 120, border: "4px solid #D1B28E" }}
        />
      </Box>

      
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <Button
          variant="outlined"
          component="label"
          style={{ backgroundColor: "#D1B28E", color: "white" }}
        >
          Upload New Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </Button>
      </Box>
   
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
       
        <Grid item xs={12}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Grid>

        
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Grid>

        
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Grid>

       
        <Grid item xs={12}>
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </Grid>

        
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Grid>

       
      </Grid>

      
      <Box mt={3} display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "#D1B28E",
            width: "100%",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Update Account
        </Button>
      </Box>
    </form>
  </Container>
  );
};

export default AccountSettings;
