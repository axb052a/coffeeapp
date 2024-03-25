import React from 'react';
import { Avatar, Typography, Grid, Card, CardContent, Paper } from '@mui/material';

const UserProfile = ({ user }) => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={3} mt={3}>
      <Grid item xs={12} md={8}>
        <Paper
          elevation={3}
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            width: '100%',
            height: 'calc(100% - 64px)',
            backgroundImage: 'url("https://images.adsttc.com/media/images/5b27/a202/f197/cc39/7700/009a/large_jpg/-_Featured_Image.jpg?1529324006")', 
            backgroundSize: 'cover',
            overflow: 'auto',
            padding: '20px',
          }}
        >
          <Card elevation={0} style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '15px', borderRadius: '15px' }}>
            <CardContent style={{ textAlign: 'center' }}>
              <Avatar
                src={user.profileImage || 'https://cdn-icons-png.flaticon.com/256/3003/3003035.png'}
                alt="Profile"
                style={{ width: '200px', height: '200px', borderRadius: '50%', margin: '0 auto', marginBottom: '15px' }}
              />
              <Typography variant="h6">Name: {user.username}</Typography>
              <Typography variant="body1">Email: {user.email}</Typography>
              <Typography variant="body1">User ID: {user.id}</Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
