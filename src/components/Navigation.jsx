import React from 'react'

export default function Navigation(props) {
  return (
    <aside className="b-dark">
        {/**/}
        <div className="d-flex">
          <img src="/src/icons/favicon.png" alt="" width={26} height={25} />
          <h4 className="t-white">ZeSlap.</h4>
        </div>
        <ul>
          <li>
            <i class="fas fa-columns t-blue"></i>
            <a href="./" className="text-decoration-none t-white">Dashboard</a>
          </li>
          <li className="active-menu">
            <i class="fas fa-envelope t-blue"></i>
            <a href="./" className="text-decoration-none t-white">Messages</a>
          </li>
          <li>
            <i class="fas fa-at t-blue"></i>
            <a href="./" className="text-decoration-none t-white">Newsletters</a>
          </li>
          <li>
            <i class="fas fa-users t-blue"></i>
            <a href="./" className="text-decoration-none t-white">Users</a>
          </li>
          <li>
            <i class="fas fa-cog t-blue"></i>
            <a href="./" className="text-decoration-none t-white">Settings</a>
          </li>
        </ul>
    </aside>
  )
}
