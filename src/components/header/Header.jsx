import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Container, LogoutBtn, Logo } from '../index';
import { useNavigate } from 'react-router';

function Header() {

    const authStatus = useSelector( (state) => state.auth.status );
    const navigate = useNavigate();

    const navItems = [
        {name : 'Home', slug : '/', active: true},
        {name : 'Login', slug : '/Login', active: !authStatus},
        {name : 'SignUp', slug : '/Signup', active : !authStatus},
        {name : 'All Posts', slug : '/all-posts', active : authStatus},
        {name : 'Add Post', slug : '/add-post', active : authStatus},
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav>
                    <div>
                        <Link to='/' >
                        <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map( (item) => 
                        (item.active) ? (
                            <li key={item.name}>
                                <button
                                onClick={() => navigate(item.slug)}
                                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                >
                                    {item.name}

                                </button>
                            </li>
                        ) : null
                        )}
                        {authStatus && ( // it renders the li only if authStatus is true
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;