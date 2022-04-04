import PropTypes from 'prop-types';
import React from 'react';
import './network-items.scss';
import person from '../../../assets/person.png';
import { useNavigate } from 'react-router-dom';
import { postNetworkSubscribe } from '../../../axios/Network';
import { useSelector } from 'react-redux';

const Index = ({ network }) => {
	const navigate = useNavigate();
	const { id, thumbnail, title, writer, summary, tagList } = network;
	var postIdURL = '/NetworkDetail/';
	const accesstoken = useSelector((state) => state.user.accesstoken);

	const toDetailPage = () => {
		postIdURL += id;
		navigate(postIdURL);
	};
	const deleteSubscribe = async () => {
		try {
			const res = await postNetworkSubscribe({ postId: id }, accesstoken);
			console.log(res.data.message);
		} catch (err) {
			console.error(err);
			console.log(err.response.data.message);
			alert('에러 입니다.');
		}
	};

	return (
		<>
			<div className="button" onClick={deleteSubscribe}>
				구독취소
			</div>
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
		</>
	);
};

Index.propTypes = {
	network: PropTypes.object,
};

export default Index;
