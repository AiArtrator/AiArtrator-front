import './App.css';
import Test from './components/test/Test';
import { Route, Routes } from 'react-router-dom';
import MainPage from './page/MainPage/Index.js';
import NetworkListPage from './page/NetworkListPage/Index.js';
import LogInPage from './page/LoginPage/Index.js';
import NavBar from './components/NavBar/Index.js';
import OwnNetworksPage from './page/OwnNetworksPage/Index.js';
import MyInfoPage from './page/MyInfoPage/Index.js';

function App() {
	return (
		<div>
			<NavBar />
			<div className="layout">
				<OwnNetworksPage />
				{/*  App에서 이렇게 하면 화면에 잘 보임!!!!SCSS문제인듯 */}
				<Test />
				<Routes>
					<Route path="/" component={MainPage} exact={true} />
					<Route path="/NetworkLists" component={NetworkListPage} />
					<Route path="/LogIn" component={LogInPage} />
					<Route path="/OwnNetworks" component={OwnNetworksPage} />
					<Route path="/MyInfo" component={MyInfoPage} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
