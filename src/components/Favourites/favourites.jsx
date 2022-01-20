import { toast } from 'materialize-css';
import React from 'react';
import { connect, useSelector } from 'react-redux';
import constants from '../../constant';
import styles from './favourites.module.scss'

function Favourites({setFavourite}) {
	
    const favourites = useSelector(state=>state.favourites.favourites)

	function changefavourites(bank){
		let [favourites, flag] = constants.favouriteFunction(bank)
		setFavourite(favourites);
		toast({html:flag});
	}

	return (
		<div className={styles["favourite_div"]}>
			<h1>Favourites</h1>
			{
				favourites.length === 0 &&
				<h5 className='center'>No favourite bank yet!</h5>
			}
			<div className={"row " + styles["row"]}>
					
				{
					favourites.map((details, i)=>(
						<div className={"col s12 m6 xl4 " + styles["col"]} key={i}>
							<div className={styles["favourite"]}>

								<h6 className='bold'>{details.bank_name}</h6>
										
								<div className="row">
									<div className={"col s6 " + styles["sub_div"]}>
										IFSC Code
										<p className='bold'>{details.ifsc}</p>
									</div>
									<div className={"col s6 " + styles["sub_div"]}>
										Bank Id
										<p className='bold'>{details.bank_id}</p>
									</div>
									<div className={"col s6 " + styles["sub_div"]}>
										Branch
										<p className='bold'>{details.branch}</p>
									</div>
									<div className={"col s6 " + styles["sub_div"]}>
										Bank city
										<p className='bold'>{details.city}</p>
									</div>
								</div>
								<div className="row">
									<div className={"col s12 " + styles["sub_div"]}>
										Bank address
										<p className='bold'>{details.address}</p>
									</div>
								</div>
								<div className="row">
									<div className={"col s6 " + styles["sub_div"]}>
										Bank district
										<p className='bold'>{details.district}</p>
									</div>
									<div className={"col s6 " + styles["sub_div"]}>
										Bank state
										<p className='bold'>{details.state}</p>
									</div>
								</div>
								<div className={styles["button"]}>
									<button className="btn" onClick={(e)=>{changefavourites(details)}}>
										Remove from Favourite
									</button>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
}


const mapDis = (dispatch)=>{
	return{
		setFavourite:(favourites)=>{
			dispatch({type:'Set_Favourites', favourites})
		},
	}
}

export default connect(null, mapDis)(Favourites);
