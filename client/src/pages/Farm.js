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

import {useMutation, useQuery} from '@apollo/client'
import {UPDATE_USER} from '../utils/mutations';
import {QUERY_ME, QUERY_USER} from '../utils/queries';
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';

function Farm() {
  const [eggplantCount, setEggplantCount] = useState(0);

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: (error) => {
      console.error(error);
    },
  });

  const { data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  const handleClick = () => {
    setEggplantCount((prevCount) => prevCount + 1);
  };
  useEffect(
    () => {
      if (userData) {
        setEggplantCount(userData.eggplants)
      }
    }, [data, userData]
  )
  const handleHarvest = async () => {
    try {
      // Get the user's ID from the authentication service
      const userId = Auth.getProfile().data._id;
console.log(userId)
      // Perform the necessary logic to update the user's eggplant count in the backend
      await updateUser({
        variables: {userId, eggplants: eggplantCount},
        refetchQueries: [{ query: QUERY_USER, variables: { username: userData.username } }],
      });

      // const updatedUser = data.updateUser
      // setEggplantCount(updatedUser.eggplants);
      // console.log(`Updated eggplants count in frontend: ${updatedUser.eggplants}`);

      // const updatedEggplantCount = data.updateUser.eggplants;

      // // Update the eggplant count in the component state
      // setEggplantCount(updatedEggplantCount);

      setEggplantCount(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Farm for Eggplants!</h1>

        <p>Eggplantz farmed: {eggplantCount}</p>
        <button onClick={handleClick} id="farmEggplant"><img src="./assets/images/eggplantPlant.png" alt="Eggplant Plant"></img></button>
          <button onClick={handleHarvest}>Harvest</button>

      </div>
    </div>
  );
}

export default Farm;