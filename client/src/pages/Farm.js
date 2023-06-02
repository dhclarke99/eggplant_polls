// import React from 'react';
// import AuthService from '../utils/auth';

// function Farm() {
  
//   const handleClick = () => {
    
//     console.log(AuthService.getProfile().data._id)
   
//   };
//   return (
//     <div className="card bg-white card-rounded w-50">
//       <div className="card-header bg-dark text-center">
//         <h1>
//           Farm for Eggplants!
//         </h1>
//         <button onClick={handleClick}>Farm</button>
//       </div>
//     </div>
//   );
// }

// export default Farm;

import React, { useState } from 'react';
import AuthService from '../utils/auth';

function Farm() {
  const [eggplantCount, setEggplantCount] = useState(0);

  const handleClick = () => {
    // Get the user's ID from the authentication service
    const userId = AuthService.getProfile().data._id;

    // Update the eggplant count
    setEggplantCount(prevCount => prevCount + 1);

    // Send a request to the server to update the user's eggplant count
    // You can use a fetch or axios to make the request
    fetch(`/api/users/${userId}/eggplants`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eggplants: eggplantCount + 1 }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Farm for Eggplants!</h1>
        <p>Eggplantz farmed: {eggplantCount}</p>
        <button onClick={handleClick} id="farmEggplant"><img src="./assets/images/eggplantPlant.png" alt="Eggplant Plant"></img></button>
      </div>
    </div>
  );
}

export default Farm;