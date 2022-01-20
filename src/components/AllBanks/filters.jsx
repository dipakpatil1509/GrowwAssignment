import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./all_banks.module.scss";

function Filters({cities=[], set_city, filter_bank}) {

    const selectedCity = useSelector(state=>state.banks.city)
    const banks = useSelector(state=>state.banks.banks)
    const [selectCategory, set_category] = useState(null)

    useEffect(() => {
        document.querySelector('#search').value = "";
        filter_bank(banks);
    }, [selectCategory]);
    
    useEffect(() => {
        document.querySelector('#search').value = "";
        document.querySelector('#category').value = "";
        set_category(null)
        filter_bank(banks);
    }, [selectedCity]);

    function set_filtered_banks(value){
        if(value && selectCategory && banks){
            value = value.toLowerCase();
            let filtered_banks= banks.filter(a=>a[selectCategory] && a[selectCategory].toString().toLowerCase().includes(value))
            filter_bank(filtered_banks);
        }
    }
    return (
        <div className={styles["filters"] + " row"}>
            <div className="col xl4 m6 s12">
                <select className='browser-default' name="city" id="city" defaultValue={selectedCity} onChange={(e)=>{set_city(e.target.value)}}>
                    {
                        cities.map((city, i)=>(
                            <option value={city} key={i}>
                                {city}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="col xl4 m6 s12">
                <select className='browser-default' name="category" id="category" 
                    defaultValue="" onChange={(e)=>{set_category(e.target.value)}}>
                    <option value="" disabled>
                        --Select Category--
                    </option>
                    {
                        Object.keys(Object.assign({}, ...banks)).map((category, i)=>(
                            <option value={category} key={i}>
                                {category.toLocaleUpperCase()}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="col xl4 m12 s12">
                <input type="text" disabled={!selectCategory}
                    className='browser-default' name="search" 
                    id="search" autoComplete='false' placeholder='Search' 
                    onChange={(e)=>{set_filtered_banks(e.target.value)}}
                />
            </div>
        </div>
    );
}

export default Filters;
