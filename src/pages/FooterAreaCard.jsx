import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './FooterAreaCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'; 

export default function ActionAreaCard() {
  return (
    <Card className="footerAreaCard cardSizeOverrides">
      <CardActionArea>
        <CardContent sx={{ padding: "0px" }}>
          <div className='footer font2'>
            <span>개인정보비식별화 대상을 선택하세요</span>
            <div className='icon'>
              <Link to="/camera">
                <span className='margin'>
                <FontAwesomeIcon icon={faCameraRetro} size="9x" color='rgb(119, 140, 163)' />
                </span>
              </Link>
              <Link to="/image">
                <span>
                  <FontAwesomeIcon icon={faImage} size="9x" color='rgb(119, 140, 163)'/> 
                </span>
              </Link>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
