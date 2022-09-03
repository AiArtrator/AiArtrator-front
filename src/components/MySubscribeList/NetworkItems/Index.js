import PropTypes from 'prop-types';
import React from 'react';
import './network-items.scss';

import person from '../../../assets/person.png';

import { useNavigate } from 'react-router-dom';
import { postNetworkSubscribe } from '../../../axios/Network';
import { useSelector } from 'react-redux';

const Index = ({ network, onRemove }) => {
	const navigate = useNavigate();
	const { id, thumbnail, title, writer, summary, tagList } = network;
	var postIdURL = '/NetworkDetail/';
	const accesstoken = useSelector((state) => state.user.accesstoken);

	const onNavigate = (e) => {
		if (e.target.id === 'produce') {
			navigate('/'); // Todo: change the url - if needed to pay, go to payment page
		} else if (e.target.id === 'detail') {
			postIdURL += id;
			navigate(postIdURL);
		}
	};

	const deleteSubscribe = async () => {
		const tmp = id;
		try {
			const res = await postNetworkSubscribe({ postId: id }, accesstoken);
			console.log(res.data.message);
			onRemove(tmp);
		} catch (err) {
			console.error(err);
			console.log(err.response.data.message);
			alert('에러 입니다.');
		}
	};

	const onDelete = () => {
		if (window.confirm('구독을 취소합니다.')) {
			deleteSubscribe();
		}
	};

	return (
		<>
			<div className="inrow">
				<div className="button" id="produce" onClick={onNavigate}>
					이미지 생성
				</div>
				<div className="button" onClick={onDelete}>
					구독 취소
				</div>
			</div>

			<div className="items-block" id="detail" onClick={onNavigate}>
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
	onRemove: PropTypes.func,
};

export default Index;
