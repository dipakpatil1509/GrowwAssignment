import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import constants from '../../constant';
import styles from './bank_details.module.scss'

function BankDetails({setLoader, setBanksStore}) {
    const params = useParams();
    const ifsc_code = params.ifsc_code;

	const [details, set_details] = useState(null);
    
    const banks = useSelector(state=>state.banks.banks)
	const [local_city, set_local_city] = useState(localStorage.getItem('city'));


    useEffect(async () => {
        setLoader(true);
        if(!local_city){
            set_local_city(localStorage.getItem('city'))
        }
        let b = [...banks]
        if((!banks || banks.length === 0) && local_city !== null){
            console.log(local_city);
			const res = await axios.get(`${constants.URL}?city=${local_city.toUpperCase()}`)
			b = res.data;
            setBanksStore(b)
        }
        let currentBank = b.find(a=>a.ifsc===ifsc_code);
        set_details(currentBank);
        setLoader(false)
    }, [local_city]);

    useEffect(() => {
		const abort = new AbortController();
        
        if(typeof window !== undefined){
            window.onstorage = async function(e) {
                setLoader(true)
                if ( e.storageArea === localStorage && e.key === "city" && e.newValue !== local_city ) {
                    const res = await axios.get(`${constants.URL}?city=${e.newValue.toUpperCase()}`)
			        setBanksStore(res.data)
                } 
                setLoader(false)
            };
        }

		return () => {
			abort.abort();
		};
    }, []);
    
    
	if(banks.length === 0 || !details){
		return <h1 className="center">No bank found at this location and with this IFSC Code</h1>
	}
	

    return (
        <div className={styles["bank_details"]}>
            <h1>Bank Details</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Bank Name</td>
                        <td>{details.bank_name}</td>
                    </tr>
                    <tr>
                        <td>IFSC Code</td>
                        <td>{details.ifsc}</td>
                    </tr>
                    <tr>
                        <td>Bank Id</td>
                        <td>{details.bank_id}</td>
                    </tr>
                    <tr>
                        <td>Branch</td>
                        <td>{details.branch}</td>
                    </tr>
                    <tr>
                        <td>Bank address</td>
                        <td>{details.address}</td>
                    </tr>
                    <tr>
                        <td>Bank city</td>
                        <td>{details.city}</td>
                    </tr>
                    <tr>
                        <td>Bank district</td>
                        <td>{details.district}</td>
                    </tr>
                    <tr>
                        <td>Bank state</td>
                        <td>{details.state}</td>
                    </tr>
                </tbody>
            </table>
            <button className="btn">
                Add to Favourite
            </button>
        </div>
    );
}


const mapDis = (dispatch)=>{
	return{
		setBanksStore:(banks)=>{
			dispatch({type:'SET_BANKS', banks})
		},
		setLoader:(loader)=>{
			dispatch({type:'Set_Loader', loader})
		}
	}
}

export default connect(null, mapDis)(BankDetails);
