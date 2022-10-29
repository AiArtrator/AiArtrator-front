import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Index = () => {
	return (
		<LogoContainer to="/">
			<img src="/logo512.png" alt="logo" />
			<div className="title">
				<div>
					<span>P</span>latform <span>O</span>f
				</div>
				<div className="right">
					<span>G</span>enerative models
				</div>
			</div>
		</LogoContainer>
	);
};

const LogoContainer = styled(Link)`
	position: relative;
	width: max-content;
	height: max-content;
	display: flex;
	font-size: 30px;
	text-decoration: none;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
	img {
		height: 80px;
		width: 80px;
		border-radius: 50%;
		background-color: blue;
		margin-right: 25px;
	}
	.title {
		width: 100%;
		flex-direction: column;
		color: black;
		span {
			display: inline;
			color: #000080;
			font-weight: 900;
		}
		.right {
			margin-left: 65px;
		}
	}
`;

export default Index;
