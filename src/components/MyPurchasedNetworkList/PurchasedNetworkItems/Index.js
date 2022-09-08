/* eslint-disable*/
import PropTypes from 'prop-types';
import React from 'react';
import './network-items.scss';

import person from '../../../assets/person.png';

import RunModel from '../../RunNetwork/runNetwork';

import { useNavigate } from 'react-router-dom';
import { postNetworkSubscribe } from '../../../axios/Network';
import { useSelector } from 'react-redux';

const Index = ({ network }) => {
	const navigate = useNavigate();
	const { id, thumbnail, title, writer, summary, tagList } = network;
	const [isPopup, setIspopup] = useState(false);
	var postIdURL = '/NetworkDetail/';

	const onNavigate = (e) => {
		if (e.target.id === 'detail') {
			postIdURL += id;
			navigate(postIdURL);
		} else if (e.target.id === 'library') {
			navigate('/Library/' + id);
		}
	};

	const produceConfirm = () => {
		if (window.confirm('해당 인공지능 모델로 이미지를 생성합니다.')) {
			// 이미지 생성
			setIspopup(true);
		}
	};

	return (
		<>
			{isPopup ? (
				<RunModel isPopup={isPopup} postId={id} setIspopup={setIspopup} />
			) : null}
			<div className="inrow">
				<div className="button" id="produce" onClick={onNavigate}>
					이미지 생성
				</div>
				<div className="button" id="library" onClick={produceConfirm}>
					이미지 Library
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
};

export default Index;
