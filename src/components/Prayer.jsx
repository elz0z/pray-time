import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function Prayer({ name, time, img }) {
  return (
    <Card className="card">
      <CardMedia className="cardMedia"
        component="img"
        image={img}
        alt={"صلاة " + name}
      />
      <CardContent>
        <h3>
          {name}
        </h3>
        <Typography className="time" variant="h2" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}