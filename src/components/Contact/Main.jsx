import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '../AppBar';
import Table from '../Table';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import Contact from './Contact';
import Toast from '../Toast';
import Error from '../Error';

function Main(props) {
  const [ contacts, setContacts ] = useState([]);
  const [ error, setError ] = useState(null);
  const { BASE_URI, setLoading } = useContext(GlobalContext);

  const fields = [
    { name: 'email', title: 'Email' },
    { name: 'create_date', title: 'Create date' },
    { name: 'status', title: 'State' },
    { name: 'action', title: 'Action' },
  ];

  
  async function fetchContacts() {
    setLoading(true);
    try {
      const response = await fetch(BASE_URI + '/contacts');
      setLoading(false);
      if (response.status === 200) {
        const { data } = await response.json();
        setContacts(data);
        return;
      }
      //When server respond with error message
      const { message } = await response.json();
      setError(message);

    } catch (e) {
      console.log(e);
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => { fetchContacts() }, []);
  
  //Check if there is an error
  if (error) {
    return(
      <Error code={500} content="Something went wrong with the sever!">
        <Toast
          type='danger'
          title='Something went wrong !'
          content={error}
        />
      </Error>
    )
  } 

  return (
    <div className='container position-relative'>
      <div className="row">
        <AppBar data={contacts} appName='Contacts' viewTypes={[ 'th','list' ]} />

        <div className="col-12">
          <div className="bg-white shadow-default p-3 rounded">
            <div className="row">
              {
                contacts.map((contact, id) => (
                  <div className="col-lg-6 col-md6 col-12" key={id}>
                    <Contact contact={contact} />
                  </div>)
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
