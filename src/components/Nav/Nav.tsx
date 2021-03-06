import React from 'react';
import classes from'./Nav.module.css'
import {NavLink} from 'react-router-dom';
import Friends from './Friends/Friends';

const Nav: React.FC<{}> = props => {
    return (
        <nav className="main-nav">
            <ul className={classes.nav}>
                <li className={classes.item}><NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink></li>
                <li className={classes.item}><NavLink to="/messages" activeClassName={classes.active}>Messages</NavLink></li>
                <li className={classes.item}><NavLink to="/news" activeClassName={classes.active}>News</NavLink></li>
                <li className={classes.item}><NavLink to="/users" activeClassName={classes.active}>Users</NavLink></li>
                <li className={classes.item}><NavLink to="/toDo-list" activeClassName={classes.active}>ToDo List</NavLink></li>
                <li className={classes.item}>Music</li>
                <li className={classes.item}>Settings</li>
            </ul>
            {/*<Friends friends={props.navComponent.sidebar.friends} />*/}
        </nav>
    );
}

export default Nav;