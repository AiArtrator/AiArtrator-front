import './App.scss';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import MainPage from './page/MainPage/Index';
import NetworkListPage from './page/NetworkListPage/Index';
import LoginPage from './page/LoginPage/Index';
import NavBar from './components/NavBar/Index';
import OwnNetworksPage from './page/OwnNetworksPage/Index';
import MyNetworksPage from './page/MyNetworksPage/Index';
import MyInfoPage from './page/MyInfoPage/Index';
import SignupPage from './page/SignupPage/Index';
import NetworkUploadPage from './page/NetworkUploadPage/Index';
import MyInfoRevisePage from './page/MyInfoRevisePage/Index';
import NetworkDetailPage from './page/NetworkDetailPage/Index';
import MySubscribePage from './page/MySubscribePage/Index';
// import Footer from './components/Footer/Index';
import IntroductionPage from './page/IntroductionPage/Index';
function App() {
	return (
		<div className="global">
			<NavBar />
			<Routes className="global-format">
				<Route path="/" element={<MainPage />} exact={true} />
				<Route path="/Introduction" element={<IntroductionPage />} />
				<Route path="/NetworkLists" element={<NetworkListPage />} />
				<Route path="/Login" element={<LoginPage />} />
				<Route path="/Signup" element={<SignupPage />} />
				<Route path="/MyInfo" element={<AuthRoute />}>
					<Route path="/MyInfo" element={<MyInfoPage />} />
				</Route>
				<Route path="/Revise" element={<AuthRoute />}>
					<Route path="/Revise" element={<MyInfoRevisePage />} />
				</Route>
				<Route path="/OwnNetworks" element={<AuthRoute />}>
					<Route path="/OwnNetworks" element={<OwnNetworksPage />} />
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
			{/* <Footer /> Todo: Footer SCSS */}
		</div>
	);
}

export default App;
