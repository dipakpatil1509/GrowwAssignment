import axios from "axios";
import { toast } from "materialize-css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import constants from "../../constant";
import styles from "./all_banks.module.scss";
import Filters from "./filters";

function AllBanks({setBanksStore, setBanksCity, setLoader}) {

	const cities_i_love = ["Dhule", "Pune", "Mumbai", "Nashik", "Ahemdabad"];

	const [banks, set_banks] = useState([])
	const [filtered_banks, set_filtered_banks] = useState([])
	const [selectedCity, set_city] = useState(sessionStorage.getItem('city') || cities_i_love[0])
	
	function useSelectedCity(value){
		set_city(value);
	}

	useEffect(async () => {
		const abort = new AbortController();
		setLoader(true)
		
		localStorage.setItem('city', selectedCity);
		sessionStorage.setItem('city', selectedCity);
		setBanksCity(selectedCity)

		try {
			const res = await axios.get(`${constants.URL}?city=${selectedCity.toUpperCase()}`)
			set_banks(res.data)
			setBanksStore(res.data)
			set_filtered_banks(res.data)
		} catch (error) {
			console.log(error);
			toast({html:""+error})
		}
		setLoader(false)
		return () => {
			abort.abort();
		};
	}, [selectedCity]);
	
	const TableCell = ({children, bankId, style})=>(
		<td>
			<Link to={"/bank-details/"+bankId} style={style}>
				{children}
			</Link>
		</td>
	)

	if(banks.length === 0){
		return <h1 className="center">No bank found at this location</h1>
	}
	
	return (
		<div className={styles["all_banks"]}>
			<h1>All Banks</h1>
			<Filters filter_bank={set_filtered_banks} cities={cities_i_love} selectedCity={selectedCity} set_city={useSelectedCity} />
			<table className="striped highlight centered responsive-table">
				<thead>
					<tr>
						<th>Sr. No.</th>
						<th>Bank</th>
						<th>IFSC</th>
						<th>Branch</th>
						<th>Bank ID</th>
						<th>Address</th>
						<th>Favourite</th>
					</tr>
				</thead>
				<tbody>
					{
						filtered_banks.length === 0 &&
						<tr>
							<td colSpan={6}>
								<h5>No Records Found!</h5>
							</td>
						</tr>
					}
					{
						filtered_banks.map((bank, i)=>{
							let id = bank.ifsc
							return(
								<tr key={i}>
									<TableCell bankId={id}>{i+1}.</TableCell>
									<TableCell bankId={id}>{bank.bank_name}</TableCell>
									<TableCell bankId={id}>{bank.ifsc}</TableCell>
									<TableCell bankId={id}>{bank.branch}</TableCell>
									<TableCell bankId={id}>{bank.bank_id}</TableCell>
									<TableCell bankId={id} style={{"maxWidth":"500px"}}>{bank.address}</TableCell>
									<td>
										<a href="#!" onClick={(e)=>{e.preventDefault()}}>
											<i className="fas fa-heart"></i>
										</a>
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	);
}

const mapDis = (dispatch)=>{
	return{
		setBanksStore:(banks)=>{
			dispatch({type:'SET_BANKS', banks})
		},
		setBanksCity:(city)=>{
			dispatch({type:'SET_CITY', city})
		},
		setLoader:(loader)=>{
			dispatch({type:'Set_Loader', loader})
		}
	}
}

export default connect(null, mapDis)(AllBanks);
