import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POLLS } from '../utils/queries';


const Home = () => {
  const { loading, data, error } = useQuery(QUERY_POLLS, {
    fetchPolicy: "no-cache"
  });
  if (error){
    console.log(error)
  }

  const pollList = data?.polls || [];
  console.log(pollList)

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to EggPlant Polls!</h1>
      </div>
      <div className="card-body m-5">
        <h2>Here is a list of polls you can vote on:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            
            {pollList.map((poll) => {
              return (
                <div key={poll._id}>
                  <h3>{poll.title}</h3>
                </div>
              );
            })}
          </ul>
        )}
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
