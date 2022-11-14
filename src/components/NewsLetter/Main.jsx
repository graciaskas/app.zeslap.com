import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '../AppBar';
import Table from '../Table';

function Main(props) {
  const fields = [
    { name: 'email', title: 'Email' },
    { name: 'username', title: 'Related user' },
    { name: 'create_date', title: 'Create date' },
    { name: 'status', title: 'State' },
    { name: 'action', title: 'Action' },
  ];
  const rows = [

  ]
  return (
    <div className='container position-relative'>
      <div className="row">
        <AppBar data={[]} appName='NewsLetters' viewTypes={[ 'list' ]} />

        <Table data={[]} fields={ fields} /> 
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
