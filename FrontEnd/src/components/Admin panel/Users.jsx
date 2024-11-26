import React , {useEffect,useContext,useState} from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress,Button,  Grid,
  Card,
  CardContent,
  IconButton,
  Divider, Collapse } from '@mui/material'
import "./users.css"
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import "./users.css";
const Users = () => {
  const userId=useSelector((initialState)=> initialState.login.userId)
 const [userdata, setuserdata] = useState([])
 const [image, setimage] = useState("")
 const [expandedComments, setExpandedComments] = useState({});
    useEffect(()=>{
        axios.get(`http://localhost:5000/users/usersInfo`

        ).then((res)=>{
          console.log(res)
          console.log(res.data.result)
          setuserdata(res.data.result)
        
        }).catch((err)=>{
          //seterror1(err.response.data.message)
          console.log(err)
          
        
      })},[])  

      
    /*   useEffect(() => {
    
        const fetchUserData = async () => {
          try {
            
            const response = await axios.get(`http://localhost:5000/users/userinfo/${userId}`);
            setimage(response.data.result[0].image); 
            console.log(response)
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    if (userId){
      fetchUserData();
    }
        
      }, [userId]);
      
console.log(image) */

const handleDeleteComment = async (userId, comment) => {
  try {
    
    await axios.delete(`http://localhost:5000/review/${userId}`, {
      data: { userId, comment },
    });

    
    setuserdata((prevState) =>
      prevState.map((user) => {
        if (user._id === userId) {
          return {
            ...user,
            comments: user.comments.filter((item) => item !== comment),
          };
        }
        return user;
      })
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};


  return (
    <>
    {/* <Sidebar/> */}
    <Typography variant="h4" gutterBottom align="center" className="heading">
        Spot Seekers Users Information
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {userdata.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card className="user-card">
              <CardContent>
               
                <div className="user-image">
                  <img
                    src={user.image || '/default-image.png'}
                    alt="User"
                    className="circle-image"
                  />
                </div>
                
                <Typography variant="h6">{`${user.firstname} ${user.lastname}`}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Age: {user.age} | Email: {user.email || 'N/A'}
                </Typography>
                <Divider style={{ margin: '10px 0' }} />

               
                <Typography variant="body1" gutterBottom>
                  <strong>Comments:</strong>
                </Typography>
                <IconButton onClick={() => handleToggleComments(user._id)} size="small">
                  {expandedComments[user._id] ? 'Hide Comments' : 'Show Comments'}
                </IconButton>

               
                <Collapse in={expandedComments[user._id]}>
                  <div className="comments-list">
                    {user.comments.length > 0 ? (
                      user.comments.map((comment, index) => (
                        <div className="comment-item" key={index}>
                          <Typography variant="body2" className="comment-text">
                            {comment}
                          </Typography>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteComment(user._id, comment)}
                            aria-label="delete"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No comments available.
                      </Typography>
                    )}
                  </div>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

  


export default Users