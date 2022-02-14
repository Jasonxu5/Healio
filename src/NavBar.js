import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className="px-4 bg-[#B5FFEC] w-48 h-screen">
            <h1 className="font-heading text-3xl font-bold py-8">
                Healio
            </h1>
            <ul className="my-20">
                <li className="py-2"><NavLink to="/">Health</NavLink></li>
                <li className="py-2"><NavLink to="/appointments">Appointments</NavLink></li>
                <li className="py-2"><NavLink to="/messages">Messaging</NavLink></li>
                <li className="py-2"><NavLink to="/resources">Resources</NavLink></li>
                <li className="py-2"><NavLink to="/billing">Billing</NavLink></li>
                <li className="py-2"><NavLink to="/profile">Profile</NavLink></li>
            </ul>
            <footer className="py-20">
                <p>Log out</p>
            </footer>
        </nav>
    )
}