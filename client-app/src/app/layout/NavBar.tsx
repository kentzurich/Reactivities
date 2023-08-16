import React from "react";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
    const {userStore: {user, logout, isLoggedIn}} = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                {isLoggedIn &&
                    <>
                        <Menu.Item as={NavLink} to='/activities' name='Activities' />
                        <Menu.Item as={NavLink} to='/errors' name='Errors' />
                        <Menu.Item header>
                            <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Image src={user == null ? '/assets/user.png' : (user.image == null ? '/assets/user.png' : user.image)} avatar spaced='right' />
                            <Dropdown pointing='top left' text={user == null ? "" : user.displayName}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`/profiles/${user == null ? null : user.username}`} text='My Profile' icon='user' />
                                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </>
                }
            </Container>
        </Menu>
    );
})