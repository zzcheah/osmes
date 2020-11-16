import React from 'react';
import {Link, NavLink} from 'react-router-dom'

const SignOutLink = ()=> {
    return(
    <ul className="right">
        <li><NavLink to='/signup'>Sign Up</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
        {/* <li><NavLink to='/'></NavLink></li> */}
    </ul>
    )
}

export default SignOutLink