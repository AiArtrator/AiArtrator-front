import React from 'react';
import { Carousel } from 'react-carousel-minimal';

import JPG1 from '../../assets/carousel1.jpg';
import JPG2 from '../../assets/carousel2.jpeg';
import JPG3 from '../../assets/carousel3.jpeg';

import { useTranslation } from 'react-i18next';

const Index = () => {
	const { t } = useTranslation();
	const data = [
		{
			image: JPG2,
			caption: `<div>
					  <br/>
					  <br/>
					  <br/>
					 ${t('carous1_1')}
					  <br /><br /> ${t('carous1_2')}
					  <h1>${t('carous1_3')}</h1>
					  <h5>${t('carous1_4')}</h5>
					</div>`,
		},

		{
			image: JPG3,
			caption: `<div>
			<br/>
			<br/>
			<br/>
			<h2>${t('carous2_1')}</h2>${t('carous2_2')}
			<br /><br /> ${t('carous2_3')}
			

		  </div>`,
		},
		{
			image: JPG1,
			caption: `<div>
			<br/>
			<br/>
			${t('carous3_1')}<br />
			<br />${t('carous3_2')}<br /><br />${t('carous3_3')}
			<h1>${t('carous3_4')}</h1>
			<h5>${t('carous3_5')}</h5>
			<h5>${t('carous3_6')}</h5>
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
