import PropTypes from 'prop-types';
import React from 'react';
import './own-network-items.scss';

const Index = ({ network }) => {
	const { title, description, sampleImg } = network;
	return (
		<div className="own-items-block">
			{sampleImg && (
				<div className="thumbnail">
					<a>
						{/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
						<img src={sampleImg} alt="thumbnail" />
					</a>
				</div>
			)}
			<div className="contents">
				<h2>
					<a>
						{/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
						{title}
					</a>
				</h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

Index.propTypes = {
	network: PropTypes.object,
};

export default Index;
