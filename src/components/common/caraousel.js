

import React from 'react'
import { landingStyles } from '../../styles/landing';
import { Typography, Box } from '@mui/material';
import Carousel from "react-material-ui-carousel";


const image = ["assets/images/caraousel.jpg", "assets/images/caraousel1.jpg"]
const Image = ({ image }) => {
    const classes = landingStyles()
    return (
        <>      
        <div className={classes.frontImageView}>
            <img src={image} className={classes.frontImage}/>
            </div>
         </>
    )
}
const caraousel = () => {
    return (
        <Carousel
            navButtonsAlwaysInvisible={true}
            indicators={false}
            autoPlay={true}
            timeout={100}
        >
           {image?.map((image)=> <Image key={Math.random()} image={image} />)}
        </Carousel>
    );
};
export default caraousel