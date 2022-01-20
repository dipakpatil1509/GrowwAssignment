import axios from "axios";
import { toast } from "materialize-css";
import React, { useCallback, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import constants from "../../constant";
import styles from "./all_banks.module.scss";
import Filters from "./filters";

function AllBanks({setBanksStore, setBanksCity, setLoader, setFavourite}) {

	const cities_i_love = ["Dhule", "Pune", "Mumbai", "Nashik", "Ahemdabad"];

	const [banks, set_banks] = useState([])
	const [filtered_banks, set_filtered_banks] = useState([])
	const [selectedCity, set_city] = useState(sessionStorage.getItem('city') || cities_i_love[0])
	const [maxlength, set_maxlength] = useState(10);
	const [selectedpage, setselectedpage] = useState(1);

    const favourites = useSelector(state=>state.favourites.favourites)

	function useSelectedCity(value){
		set_city(value);
	}
	
	const change = useCallback((id)=>{
		if(id < 1){
			id = 1;
		}
		var length = Math.ceil(filtered_banks.length/parseInt(maxlength))
		if(id > length){
			id = length
		}
		setselectedpage(id);
		if(document.querySelector('.' + styles["table-wrapper"]))
			document.querySelector('.' + styles["table-wrapper"]).scrollTop = 0;

	}, [filtered_banks, maxlength]) 


	function changefavourites(bank){
		let [favourites, flag] = constants.favouriteFunction(bank)
		setFavourite(favourites);
		toast({html:flag});
	}

	useEffect(() => {
		change(1);
	}, [filtered_banks, change]);
	

	useEffect(() => {
			
		const abort = new AbortController();

		async function fetchData() {
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
		}
		fetchData()
		return () => {
			abort.abort();
		};
	}, [selectedCity,  setBanksCity, setBanksStore, setLoader]);
	
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
			<div className={styles["table-wrapper"]}>
				<table className="striped highlight centered responsive-table banksTable">
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
							filtered_banks.slice(maxlength * (selectedpage - 1), selectedpage * maxlength).map((bank, i)=>{
								let id = bank.ifsc
								return(
									<tr key={i}>
										<TableCell bankId={id}>{maxlength * (selectedpage - 1) + i + 1}.</TableCell>
										<TableCell bankId={id}>{bank.bank_name}</TableCell>
										<TableCell bankId={id}>{bank.ifsc}</TableCell>
										<TableCell bankId={id}>{bank.branch}</TableCell>
										<TableCell bankId={id}>{bank.bank_id}</TableCell>
										<TableCell bankId={id} style={{"maxWidth":"500px"}}>{bank.address}</TableCell>
										<td>
											<a href="#!" 
												onClick={(e)=>{e.preventDefault(); changefavourites(bank)}}
											>
												<i className={"fas fa-heart " + (favourites.some(a=>a.ifsc===bank.ifsc) ? styles["active"] : "")}></i>
											</a>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			
			{
				filtered_banks.length > 0 &&
				<div className={styles["bottom"]}>
					<div className={styles["page_no"]}>
						<a href="#!" 
							className={selectedpage === 1 ? styles["disabled"] : ""}
							onClick={(e)=>{e.preventDefault(); change(selectedpage - 1)}}
						><i className="fas fa-chevron-left"></i></a>
						<p>
							Page &nbsp;
							<span className={styles["active"]}>{ selectedpage }</span>  &nbsp;
							of  &nbsp;
							<span className={styles["active"]}>{ Math.ceil(filtered_banks.length/parseInt(maxlength)) }</span>
						</p>
						<a href="#!"
							className={selectedpage === Math.ceil(filtered_banks.length/parseInt(maxlength)) ? styles["disabled"] : ""} 
							onClick={(e)=>{e.preventDefault(); change(selectedpage + 1)}}
						><i className="fas fa-chevron-right"></i></a>
					</div>
					<select className="browser-default" name="maxlength" id="maxlength" onChange={(e)=>{set_maxlength(parseInt(e.target.value))}} defaultValue="10">
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
			}
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
		setFavourite:(favourites)=>{
			dispatch({type:'Set_Favourites', favourites})
		},
		setLoader:(loader)=>{
			dispatch({type:'Set_Loader', loader})
		}
	}
}

export default connect(null, mapDis)(AllBanks);
