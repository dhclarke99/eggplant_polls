import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POLLS } from '../utils/queries';
import AuthService from '../utils/auth';


const Home = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(QUERY_POLLS, {
    fetchPolicy: "no-cache"
  });
  if (error){
    console.log(error)
  }

  const pollList = data?.polls || [];
  console.log(pollList)

  const isLoggedIn = AuthService.loggedIn();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/poll');
    } else {
      navigate('/login');
    }
  };

  const handleVote = () => {
    if (isLoggedIn) {
      console.log("click")
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="card bg-white card-rounded w-50">
      
      <div className="card-body m-5">
        <div id="homeHeader">
        <h1>Here is a list of polls you can vote on:</h1></div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            
            {pollList.map((poll) => {
              return (
                <div key={poll._id}>
                  <h3>{poll.title}</h3>
                  <p>{poll.description}</p>
                  <p>Reward: {poll.value} eggplants</p>
                  <button onClick={handleVote}>{poll.option1}</button>
                  <button onClick={handleVote}>{poll.option2}</button>
                </div>
              );
            })}
          </ul>
        )}
      </div>
      <div className="card-footer text-center m-3" id="homeFooter">
        <h2>Ready to create a new poll?</h2>
        
          <button className="btn btn-lg btn-danger" id="createPoll" onClick={handleClick}>Create Poll!</button>
        
      </div>
    </div>
  );
};

export default Home;
