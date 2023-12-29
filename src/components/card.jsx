import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

const CardContentComp = ({ imgheight, imgsrc, imgalt, cardtitle, cardcontent }) => {
  return (
    <Card sx={{ minWidth: 150 }} className='card mb-3 col-3'>
      <CardContent className='text-center'>
        <CardMedia
          component="img"
          height={imgheight}
          image={imgsrc}
          alt={imgalt}
        />
        <Typography sx={{ fontSize: 14, fontWeight: "bold" }} gutterBottom>
          {cardtitle}
        </Typography>
        <Typography variant="h5" component="div">
          {cardcontent}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardContentComp