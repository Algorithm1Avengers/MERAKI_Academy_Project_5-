  import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles'
const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '80px',
        }, 
      }}
    >
      
      <List sx={{mt:10}}>
        <ListItem button component={Link} to="/Admin/dashbored">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/Admin/products">
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/Admin/orders">
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={Link} to="/Admin/users">
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/Admin/countries">
          <ListItemText primary="Countries" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}; 

export default Sidebar; 
 