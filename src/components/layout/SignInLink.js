import React from 'react';
import {Link, NavLink} from 'react-router-dom'

const SignInLink = ()=> {
    return(
    <ul className="right">
        <li><NavLink to='/' className='black'>Log Out</NavLink></li>
        <li><NavLink to='/' className='btn btn-floating pink lighten-1'>CC</NavLink></li>
        {/* <li><NavLink to='/'></NavLink></li> */}
    </ul>
    )
}

export default SignInLink