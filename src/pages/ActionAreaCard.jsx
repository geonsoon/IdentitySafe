
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './ActionAreaCard.css';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 1500, maxHeight: 1000, border: 0, boxShadow: 0 }}>
      <CardActionArea>
        <CardContent className='text'>
          <Typography gutterBottom variant="h5" component="div">
            <span className='font1'>서비스 목표</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
          <span className='font1'>
            카메라가 사용되는 다양한 분야에서의 개인정보 침해 문제와 초상권 침해 문제에 해결책을 제시하는 것입니다.<br />
            더 나아가, 사람들은 자신의 개인정보가 존중받고 보호되는 환경에서 더 자유롭게 행동하고 창조적인 활동에 참여할 수 있을 것입니다.<br />
          </span>
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '8px', lineHeight: 1.5 }}>
            <span className='font1'>활용방안</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <span className='font1'>
            촬영 현장, 인터넷 개인 방송, 뉴스 등에서의 개인정보 침해 문제를 해결 <br />
            개인정보 데이터 기반 연구 및 개발에 있어서도 중요한 역할 <br />
            인공지능 학습이나 빅데이터 분석에서 필요한 대량의 데이터를 안전하게 활용 <br />
            </span>
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            <span className='font1'></span>
            청주대 인공지능소프트웨어학과 <br />
            박건순, 박균호, 전유나 제작 <br />
            <span className='boldfont'>©2024 IdentitySafe. All right reserved. </span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}