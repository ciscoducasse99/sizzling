import React from 'react'
import logo from '../logo.svg';
import '../App.css';
import {Link} from 'react-router-dom'

const Entry = () => {
    return(
        <div className="App">
      <header className="App-header">
        <h3>Sizzling Kitchen</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Simple host/customer experience <span className="font-weight-bolder">prototype</span> for Sizzling Kitchen using <code>React, Redux, MySql &  Express </code>
        </p>
        <div className="row">
          <button className="btn btn-primary mx-2">
            <Link to="/host" className="text-white">
              View Host
            </Link>
          </button>
          <button className="btn btn-primary mx-2">
            <Link to="/users" className="text-white">
              View Users
            </Link>
          </button>
        </div>
      </header>
    </div>
    )
}

export default Entry