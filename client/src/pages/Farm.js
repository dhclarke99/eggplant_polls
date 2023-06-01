import React from 'react';
import AuthService from '../utils/auth';

function Farm() {
  
  const handleClick = () => {
    
    console.log(AuthService.getProfile().data._id)
   
  };
  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>
          Farm for Eggplants!
        </h1>
        <button onClick={handleClick}>Farm</button>
      </div>
    </div>
  );
}

export default Farm;