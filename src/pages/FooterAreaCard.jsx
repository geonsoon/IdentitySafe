
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './FooterAreaCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 1500, maxheight: 1000}}>
      <CardActionArea>
      <CardContent sx={{ padding: "0px" }}>
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