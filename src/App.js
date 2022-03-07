import './App.css';
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
import NetworkUpdatePage from './page/NetworkUpdatePage/Index';
import SearchPage from './page/SearchPage/Index';

function App() {
	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route path="/" element={<MainPage />} exact={true} />
				<Route path="/NetworkSearch" element={<SearchPage />} />
				<Route path="/NetworkLists" element={<NetworkListPage />} />
				<Route path="/Login" element={<LoginPage />} />
				<Route path="/Signup" element={<SignupPage />} />
				<Route path="/MyInfo" element={<AuthRoute />}>
					<Route path="/MyInfo" element={<MyInfoPage />} />
				</Route>
				<Route path="/OwnNetworks" element={<AuthRoute />}>
					<Route path="/OwnNetworks" element={<OwnNetworksPage />} />
				</Route>
				<Route path="/MyNetworks" element={<AuthRoute />}>
					<Route path="/MyNetworks" element={<MyNetworksPage />} />
				</Route>
				<Route path="/NetworkUpload" element={<AuthRoute />}>
					<Route path="/NetworkUpload" element={<NetworkUploadPage />} />
				</Route>
				<Route path="/NetworkUpdate/:postId" element={<AuthRoute />}>
					<Route
						path="/NetworkUpdate/:postId"
						element={<NetworkUpdatePage />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
