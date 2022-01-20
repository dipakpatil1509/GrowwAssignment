import './App.css';
import { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import AllBanks from './components/AllBanks/all_banks';
import Favourites from './components/Favourites/favourites';
import BankDetails from './components/BankDetails/bank_details';
import Loader from './components/Loader/loader';
import Navbar from './components/Layout/Navbar/navbar';
import Sidebar from './components/Layout/Sidebar/sidebar';
import { useSelector } from 'react-redux';

function App() {

	const loader = useSelector(state=>state.loader.loader)

	return (
		<Router>
			<div className='App'>
				<Navbar />
				{
					loader && <Loader />
				}
				<main>
					<div className="row main_row">
						<Sidebar className="col xl2 l3 m12 s12 hide-on-med-and-down" />

						<div className="col xl10 l9 m12 s12 content">
							<Suspense fallback={<Loader />}>
								<Routes>
									<Route path="/" element={<Navigate to="/all-banks" />} />
									<Route path="all-banks" element={<AllBanks />} />
									<Route path="bank-details/:ifsc_code"  element={<BankDetails />} />
									<Route path="favourites" element={<Favourites />}/>
									<Route path="*" element={<h1 className='center'>404 Not Found</h1>}/>
								</Routes>
							</Suspense>
						</div>
					</div>
				</main>
			</div>
		</Router>
	);
}

export default App;
