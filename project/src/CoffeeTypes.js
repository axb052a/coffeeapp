import React from 'react';
import { Paper, Typography, Divider, Grid } from '@mui/material'; 

function CoffeeTypes() {
  return (
    <Paper
      elevation={3}
      style={{
        position: 'absolute', 
        top: '64px', 
        left: 0,
        width: '100%',
        height: 'calc(100% - 64px)',
        backgroundImage: 'url("https://www.designboom.com/twitterimages/uploads/2018/07/designboom-cafe-sk-fb.jpg")', 
        backgroundSize: 'cover',
        overflow: 'auto',
        padding: '20px',
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-end"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '50%', height: '50%' }}
      >
        <Grid item style={{ textAlign: 'right', paddingRight: '20px', paddingTop: '20px' }}>
          <Typography variant="h4" gutterBottom style={{ color: '#3E2723', fontWeight: 'bold' }}>
            Different Types of Coffee
          </Typography>
          <Divider style={{ margin: '10px 0', backgroundColor: '#3E2723' }} />
          <Typography variant="body1" paragraph style={{ color: '#3E2723', fontWeight: 'bold' }}>
            Here are some common types of coffee:
          </Typography>
          <ul style={{ color: '#3E2723', textAlign: 'left', paddingLeft: '20px', fontWeight: 'bold' }}>
            <li><strong>Espresso:</strong> A concentrated coffee brewed by forcing a small amount of nearly boiling water through finely-ground coffee beans.</li>
            <li><strong>Cappuccino:</strong> Espresso mixed with steamed milk and topped with foam. Often sprinkled with cocoa powder or cinnamon.</li>
            <li><strong>Latte:</strong> Similar to a cappuccino, but with more steamed milk and less foam. Often served in a glass.</li>
            <li><strong>Americano:</strong> A diluted espresso, made by adding hot water to espresso shots. It has a similar strength to drip coffee but a different flavor profile.</li>
            <li><strong>Macchiato:</strong> An espresso with a small amount of milk or foam, creating a 'stained' or 'marked' coffee.</li>
            <li><strong>Mocha:</strong> A chocolate-flavored variant of a latte, typically with chocolate syrup or cocoa powder added to espresso and steamed milk.</li>
          </ul>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CoffeeTypes;
