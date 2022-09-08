import React from 'react';
import { Carousel } from 'react-carousel-minimal';
// import CarouselCustomize from './carousel.js';
import JPG1 from '../../assets/carousel1.jpg';
import JPG2 from '../../assets/carousel2.jpeg';
import JPG3 from '../../assets/carousel3.jpeg';

const Index = () => {
	const data = [
		{
			image: JPG2,
			caption: `<div>
					  <br/>
					  <br/>
					  The Platform of
					  <br/><br/>
					  Generative Models
					  <h1>Ai Artrator</h1>
					  <br /><h5>run the ML Models with the Cloud API</h5>

					</div>`,
		},
		{
			image: JPG3,
			caption: `<div>
			<br/>
			<br/>
			<br/>
			<h2>Ai Artrator</h2>Upload the ML Weight,
			<br /><br />Get Tokens
			

		  </div>`,
		},
		{
			image: JPG1,
			caption: `<div>
			<br/><br/><br/><br/>SHARE · SELL · PURCHASE<br/>
			<h1>Ai Artrator</h1>
			<h5>run the PREE ML Models with your smart phone</h5>
		  </div>`,
		},
	];

	const captionStyle = {
		fontSize: '2em',
		fontWeight: 'bold',
	};
	const slideNumberStyle = {
		fontSize: '20px',
		fontWeight: 'bold',
	};
	return (
		<div className="App" style={{ height: '35rem' }}>
			<div style={{ textAlign: 'center' }}>
				<div
					style={{
						padding: '0',
					}}
				>
					<Carousel
						data={data}
						time={3000}
						width="100%"
						height="37rem"
						captionStyle={captionStyle}
						radius="0px"
						slideNumber={false}
						slideNumberStyle={slideNumberStyle}
						captionPosition="top"
						automatic={true}
						dots={true}
						pauseIconColor="white"
						pauseIconSize="40px"
						slideBackgroundColor="darkgrey"
						slideImageFit="cover"
						thumbnails={false}
						thumbnailWidth="100px"
						showNavBtn={false}
						style={{
							textAlign: 'center',
							maxWidth: '100%',
							maxHeight: '35rem',
							margin: '0rem',
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Index;
