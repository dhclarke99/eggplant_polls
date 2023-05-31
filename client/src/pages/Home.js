import { Link } from 'react-router-dom';


const Home = () => {


  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to EggPlant Polls!</h1>
      </div>
      <div className="card-body m-5">
        <h2>Here is a list of polls you can vote on:</h2>
        
      </div>
      <div className="card-footer text-center m-3">
        <h2>Ready to create a new poll?</h2>
        <Link to="/poll">
          <button className="btn btn-lg btn-danger">Create Poll!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;