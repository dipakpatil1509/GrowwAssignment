const constants = {
    URL:"https://vast-shore-74260.herokuapp.com/banks",
    favouriteFunction:(bank)=>{
        
        var favourites = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : []
        let flag;
        function favouritesExists(id) {
            return favourites.some(bankSaved => {
                return bankSaved.ifsc === id;
            });
        }

        if (favouritesExists(bank.ifsc)) {
            favourites = favourites.filter(bankSaved => {
                return bankSaved.ifsc !== bank.ifsc
            })
            flag = "Removed Successfully"
        }
        else {
            favourites.push(bank)
            flag = "Added Successfully"
        }
        localStorage.setItem('favourites', JSON.stringify(favourites))

        return [favourites, flag];
    }
}

export default constants;