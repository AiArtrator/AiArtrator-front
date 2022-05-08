import PropTypes from 'prop-types';
import React from 'react';
import './network-items.scss';
import person from '../../../assets/person.png';
import { useNavigate } from 'react-router-dom';

const Index = ({ network }) => {
	const navigate = useNavigate();
	const { id, thumbnail, title, writer, summary, tagList } = network;
	let postId = '/NetworkDetail/';

	const toDetailPage = () => {
		postId += id;
		navigate(postId);
	};

	return (
		<div className="items-block" onClick={toDetailPage}>
			<img src={thumbnail} alt="thumbnail" />
			<div className="contents">
				<h3>
					<a>{title}</a>
				</h3>
				<div className="writer">
					<img src={person} alt="profile" />
					<div className="writer-nickname">{writer.nickname}</div>
				</div>

				<p>{summary}</p>
				<div className="taglist">
					{tagList.map((tag) => (
						<div className="tag" tag={tag} key={tag.id}>
							{tag.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

Index.propTypes = {
	network: PropTypes.object,
};

export default Index;
