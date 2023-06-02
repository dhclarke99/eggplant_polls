import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_POLL } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Poll = () => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    value: '',
    option1: '',
    option2: '',
  });
  const [addPoll, { error }] = useMutation(ADD_POLL
  //   , {
  //   update(cache, { data: { addPoll } }) {
  //     try {
      

  //       cache.writeQuery({
          
  //         data: { polls: [addPoll] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }

  //     // update me object's cache
  //     const { me } = cache.readQuery({ query: QUERY_ME });
  //     cache.writeQuery({
  //       query: QUERY_ME,
  //       data: { me: { ...me, polls: [...me.polls, addPoll] } },
  //     });
  //   },
  // }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addPoll({
        variables: { title: formState.title, description: formState.description, value: parseInt(formState.value), option1: formState.option1, option2: formState.option2 },
      });

      // Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = () => {
    
    console.log(Auth.getProfile().data._id)
  }
  return (
    
    <main className="flex-row justify-center mb-4">
    
            <>
            <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Create Poll</h4>
          <div className="card-body">
            
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Title"
                  name="title"
                  type="text"
                  value={formState.title}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Description"
                  name="description"
                  type="text"
                  value={formState.description}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="DropdownList of #s?"
                  name="value"
                  type="value"
                  value={formState.value}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Option1"
                  name="option1"
                  type="text"
                  value={formState.option1}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Option2"
                  name="option2"
                  type="text"
                  value={formState.option2}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                  
                >
                  Submit
                </button>
              </form>
            

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
             
            </>
          
      
    </main>
    
  );
};

export default Poll;
