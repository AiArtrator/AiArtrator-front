import './App.css';
import Test from './components/test/Test';
import { Route, Link, Routes } from 'react-router-dom';
import MainPage from './page/MainPage/Index.js';
import NetworkListPage from './page/NetworkListPage/Index.js';
import LogInPage from './page/LoginPage/Index.js';
import NavBar from './components/NavBar/Index.js';

function App() {
	return (
		<div className="App">
			<Test />
			<NavBar />
			<Routes>
				<Route exact path="/" component={MainPage}></Route>
				<Route path="/NetworkList" component={NetworkListPage}></Route>
				<Route path="/LogIn" component={LogInPage}></Route>
			</Routes>
		</div>
	);
}

export default App;
