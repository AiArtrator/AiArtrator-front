import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import MainPage from './page/MainPage/Index';
import NetworkListPage from './page/NetworkListPage/Index';
import LoginPage from './page/LoginPage/Index';
import NavBar from './components/NavBar/Index';
import OwnNetworksPage from './page/OwnNetworksPage/Index';
import MyInfoPage from './page/MyInfoPage/Index';
import SignupPage from './page/SignupPage/Index';
import NetworkUploadPage from './page/NetworkUploadPage/Index';

function App() {
	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route path="/" element={<MainPage />} exact={true} />
				<Route path="/NetworkLists" element={<NetworkListPage />} />
				<Route path="/Login" element={<LoginPage />} />
				<Route path="/Signup" element={<SignupPage />} />
				<Route path="/OwnNetworks" element={<AuthRoute />}>
					<Route path="/OwnNetworks" element={<OwnNetworksPage />} />
				</Route>
				<Route path="/MyInfo" element={<AuthRoute />}>
					<Route path="/MyInfo" element={<MyInfoPage />} />
				</Route>
				{/* <Route path="/NetworkUpload" element={<AuthRoute />}> */}
				<Route path="/NetworkUpload" element={<NetworkUploadPage />} />
				{/* </Route> */}
			</Routes>
		</div>
	);
}

export default App;
