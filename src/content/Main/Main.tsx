import { FC } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";

import cameraIcon from "../../asset/icon/camera.png";
import galleryIcon from "../../asset/icon/gallery.png";
import logo from "../../asset/icon/Logo-2.png"
import Stack from "@mui/material/Stack";
import '../../asset/fonts/font.css'

interface Props {
  onCameraClick: () => void;
  onGalleryClick: () => void;
}

const Main: FC<Props> = ({onCameraClick, onGalleryClick}) => {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                padding: 2,
            }}
        >
            <Box sx={{mb: '5vh'}}>
                    <img src={logo} alt="Logo" style={{ width: '300px', height: 'auto', marginTop: '20px' }} />
            </Box>
            <Grid container justifyContent='center' spacing={2} px={3} mb='5vh'>
                <Grid item>
                    <Stack
                        onClick={onCameraClick}
                        sx={{backgroundColor: 'lightgrey', width: '130px', borderRadius: '10px', p: '20px', position: 'relative', boxShadow: 4}}
                    >
                        <img width='60px' height='60px' src={cameraIcon} alt='camera' />
                        <Typography variant='body2' my={1} sx={{ fontFamily: 'NotoSerifKR, sans-serif' }}>Camera</Typography>
                        <KeyboardDoubleArrowRightRoundedIcon sx={{ position: 'absolute', bottom: '10px', right: '5px'}} fontSize='small' />
                    </Stack>
                </Grid>
                <Grid item >
                    <Stack
                        onClick={onGalleryClick}
                        sx={{backgroundColor: 'lightgrey', width: '130px', borderRadius: '10px', p: '20px', position: 'relative', boxShadow: 4}}
                    >
                        <img width='60px' height='60px' src={galleryIcon} alt='gallery' />
                        <Typography variant='body2' my={1} sx={{ fontFamily: 'NotoSerifKR, sans-serif', marginLeft: '8px' }}>Gallery</Typography>
                        <KeyboardDoubleArrowRightRoundedIcon sx={{ position: 'absolute', bottom: '10px', right: '5px'}} fontSize='small' />
                    </Stack>
                </Grid>
            </Grid>
            <Typography variant='body1'>
            </Typography>
    </Stack>
    )
}

export default Main;