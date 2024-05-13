import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Logo from '../image/identitysafe.jpeg';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            소개글
          </Typography>
          <Typography variant="body2" color="text.secondary">
            청주대 인공지능소프트웨어학과 <br />
            박건순, 박균호, 전유나 제작
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
