import React, { useState, useEffect } from 'react'

const BASE_URL = 'https://localhost:44361/api/';

export default function Wishlists() {
    
    const [wishlists, setWishlists] = useState([]);

    const fetchWishlists = () => {
        fetch(BASE_URL+'wishlist') // this should be changed to 'wishlists' (plural)
        .then(response => response.json())
        .then((data) => {
            setWishlists(data);
        })
        .catch ((err) => {
            console.log(`An error has occurred: ${err}`);
      });
    }

    useEffect(() => {
        fetchWishlists();
    }, []); // empty [] dependancy list to stop infinite loop

    return (
        <div>
            <h1>Wishlists</h1>
            {/* Pending change to CARD Format, instead of Table */}
            {/* Add Conditional to display "No Wishlists" if wishlist array is empty */}
            <table className="table is-fullwidth"> 
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>DueDate</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {wishlists.map(wishlist =>
                        <tr key={wishlist.Id}>
                            <td>{wishlist.Id}</td> 
                            <td>{wishlist.Name}</td>
                            <td>{wishlist.Password}</td>
                            <td>{wishlist.DueDate}</td>
                        </tr>
                    )}
                </tbody>
            </table>



        </div>
    )

}
