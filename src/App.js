import './App.css';
import Test from './components/test/Test';
import { Route, Link, Routes } from 'react-router-dom';
import MainPage from './page/MainPage/Index.js';
import NetworkListPage from './page/NetworkListPage/Index.js';
import LogInPage from './page/LoginPage/Index.js';
import NavBar from './components/NavBar/Index.js';
import OwnNetworksPage from './page/OwnNetworksPage/Index.js';
import MyInfoPage from './page/MyInfoPage/Index.js';

function App() {
	return (
		<div className="App">
			<NavBar />
			<Test />
			<Routes>
				<Route exact path="/" component={MainPage} />
				<Route path="/NetworkLists" component={NetworkListPage} />
				<Route path="/LogIn" component={LogInPage} />
				<Route path="/OwnNetworks" component={OwnNetworksPage} />
				<Route path="/MyInfo" component={MyInfoPage} />
			</Routes>
		</div>
	);
}

export default App;
