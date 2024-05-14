
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Logo from '../image/identitysafe.jpeg';
import './ActionAreaCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 1545, height: 850}}>
      <CardActionArea>
        <CardContent className='text'>
          <Typography gutterBottom variant="h5" component="div">
            <span className='font1'>서비스 목표</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
          <span className='font1'>카메라가 사용되는 다양한 분야에서의 개인정보 침해 문제와 초상권 침해 문제에 해결책을 제시하는 것</span>
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <span className='font1'>활용방안</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <span className='font1'>
            사람들은 자신의 개인정보가 존중받고 보호되는 환경에서 더 자유롭게 행동하고 창조적인 활동에 참여할 수 있을 것 <br />
            IdentitySafe는 기술적 해결책을 넘어, 사회 전반의 디지털 문화를 개선하는 데 기여할 것 <br />
            촬영 현장, 인터넷 개인 방송, 뉴스 등에서의 개인정보 침해 문제를 해결 <br />
            개인정보 데이터 기반 연구 및 개발에 있어서도 중요한 역할 <br />
            인공지능 학습이나 빅데이터 분석에서 필요한 대량의 데이터를 안전하게 활용 <br />
            </span>
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            <span className='font1'></span>
            청주대 인공지능소프트웨어학과 <br />
            박건순, 박균호, 전유나 제작
          </Typography>
          <div className='footer font2'>
                <span>개인정보비식별화 대상을 선택하세요</span>
                <div className='icon'>
                <span className='margin'><FontAwesomeIcon icon={faCameraRetro} size="2xl" /></span>
                <span><FontAwesomeIcon icon={faImage} size="2xl" /></span>
                </div>
            </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}