import './App.scss';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import MainPage from './page/MainPage/Index';
import NetworkListPage from './page/NetworkListPage/Index';
import LoginPage from './page/LoginPage/Index';
import NavBar from './components/NavBar/Index';
import MyPurchasedNetworkPage from './page/MyPurchasedNetworksPage/Index';
import MyNetworksPage from './page/MyNetworksPage/Index';
import MyInfoPage from './page/MyInfoPage/Index';
import SignupPage from './page/SignupPage/Index';
import NetworkUploadPage from './page/NetworkUploadPage/Index';
import MyInfoRevisePage from './page/MyInfoRevisePage/Index';
import NetworkDetailPage from './page/NetworkDetailPage/Index';
import MySubscribePage from './page/MySubscribePage/Index';
import IntroductionPage from './page/IntroductionPage/Index';
import MyBalancePage from './page/MyBalancePage/Index';
import Footer from './components/Footer/Index';
// import InfiniteScroll from './components/NetworkList/InfiniteScroll';

function App() {
	return (
		<div className="global">
			<NavBar />
			{/* <InfiniteScroll /> */}
			<Routes className="global-format">
				<Route path="/" element={<MainPage />} exact={true} />
				<Route path="/Introduction" element={<IntroductionPage />} />
				<Route path="/NetworkLists" element={<NetworkListPage />} />
				<Route path="/Login" element={<LoginPage />} />
				<Route path="/Signup" element={<SignupPage />} />
				<Route path="/MyInfo" element={<AuthRoute />}>
					<Route path="/MyInfo" element={<MyInfoPage />} />
				</Route>
				<Route path="/MyBalance" element={<AuthRoute />}>
					<Route path="/MyBalance" element={<MyBalancePage />} />
				</Route>
				<Route path="/Revise" element={<AuthRoute />}>
					<Route path="/Revise" element={<MyInfoRevisePage />} />
				</Route>
				<Route path="/PurchasedNetwork" element={<AuthRoute />}>
					<Route
						path="/PurchasedNetwork"
						element={<MyPurchasedNetworkPage />}
					/>
				</Route>
				<Route path="/MyNetworks" element={<AuthRoute />}>
					<Route path="/MyNetworks" element={<MyNetworksPage />} />
				</Route>
				<Route path="/MySubscribe" element={<AuthRoute />}>
					<Route path="/MySubscribe" element={<MySubscribePage />} />
				</Route>
				<Route path="/NetworkUpload" element={<AuthRoute />}>
					<Route path="/NetworkUpload" element={<NetworkUploadPage />} />
					<Route
						path="/NetworkUpload/:postId"
						element={<NetworkUploadPage />}
					/>
				</Route>
				<Route path="/NetworkDetail/:postId" element={<NetworkDetailPage />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
