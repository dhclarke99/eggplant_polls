import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Poll = () => {
  const { data } = useQuery(QUERY_ME);
  const polls = data?.me?.polls || [];

  console.log(data);
  console.log(polls);

  return (
    <main className="flex-row justify-center mb-4">
      {polls.map((poll) => {
        return (
          <div key={poll._id}>
            <h3>{poll.title}</h3>
            <p>{poll.description}</p>
            <p>Reward: {poll.value} eggplants</p>
            <button>{poll.option1}</button>
            <button>{poll.option2}</button>
          </div>
        );
      })}
    </main>
  );
};

export default Poll;
