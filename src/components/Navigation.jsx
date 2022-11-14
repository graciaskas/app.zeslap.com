import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation(props) {
  return (
    <aside className="navigation bg-secondary">
        {/**/}
        <div className="d-flex align-items-center bg-white navigation-header">
          <img src="/icons/favicon.png" alt="" width={38}  />
          <h4 className="text-secondary" style={{paddingTop:'7px'}}>ZeSlap.</h4>
        </div>
      
        <div className='navigation-nav' role={'navigation'}>
          <Link to="/" className='d-flex align-items-center'>
            <i className="fas fa-columns"></i>
            <span className="text-decoration-none t-white">Dashboard</span>
          </Link>
          <Link to="/contacts/?view=th" className="d-flex align-items-center">
            <i className="fas fa-envelope"></i>
            <span className="text-decoration-none t-white">Site contacts</span>
            <i className='badge rounded-pill bg-secondary float-right'>05</i>
          </Link>
          <Link to="/newsletters/?view=list" className='d-flex align-items-center'>
            <i className="fas fa-at "></i>
            <span className="text-decoration-none">Newsletters</span>
            <i className='badge rounded-pill bg-orange float-right'>05</i>
          </Link>
          <Link to="/users/?view=th" className='d-flex align-items-center'>
            <i className="fas fa-users "></i>
            <span className="text-decoration-none t-white">Users</span>
            <i className='badge rounded-pill bg-primary float-right'>05</i>
          </Link>
        
        <li className='navigation-dropdown'>
          <Link data-bs-toggle="collapse" to={"#multiCollapseExample1"} className="collapse-item d-block w-100">
            <i className="fas fa-blog "></i>
            <span className="text-decoration-none t-white">Blog</span>
          </Link>
          <div className="collapse multi-collapse bg-secondary-dark-2 rounded" id="multiCollapseExample1">
            <Link to="/blog/?view=th"  className='d-flex align-items-center'>
              <i className="fas fa-columns"></i>
              <span className="text-decoration-none t-white">Dashboard</span>
            </Link>
            <Link to="/blog/blogs/?view=th" className='d-flex align-items-center active'>
              <i className="fas fa-blog "></i>
              <span className="text-decoration-none t-white">Blogs</span>
              <i className='badge rounded-pill bg-warning float-right'>05</i>
            </Link>
          </div>
        </li>

        <Link to="/plans" className='d-flex align-items-center'>
          <i className="fas fa-cog "></i>
          <span className="text-decoration-none t-white">Plans</span>
        </Link>
        
        <Link to="/payments" className='d-flex align-items-center'>
          <i className="fas fa-cog "></i>
          <span className="text-decoration-none t-white">Payments history</span>
        </Link>

      </div>
    </aside>
  )
}
