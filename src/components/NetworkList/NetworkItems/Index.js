import PropTypes from 'prop-types';
import React from 'react';
import './network-items.scss';

const Index = ({ network }) => {
	const { thumbnail, title, writer, summary } = network;

	return (
		<div className="items-block">
			<div className="thumbnail">
				<a>
					<img src={thumbnail} alt="thumbnail" />
				</a>
			</div>

			<div className="contents">
				<h3>
					<a>
						{/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
						{title}
					</a>
				</h3>
				<p>{writer.nickname}</p>
				<p>{summary}</p>
				{/* <p>{tagList}</p> */}
			</div>
		</div>
	);
};

Index.propTypes = {
	network: PropTypes.object,
};

export default Index;
