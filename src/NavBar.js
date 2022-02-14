import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faCalendarCheck, faMessage, faLightbulb, faCircleDollarToSlot, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
    return (
        <nav className="px-4 bg-[#B5FFEC] w-48 h-screen">
            <h1 className="font-heading text-3xl font-bold py-8">
                Healio
            </h1>
            <ul className="my-20">
                <li className="py-2">
                    <NavLink to="/">
                        <FontAwesomeIcon className="mr-2" icon={faSquarePlus} size="lg" aria-label="Health" />
                        <p className="inline ml-2">Health</p>
                    </NavLink>
                </li>
                <li className="py-2">
                    <NavLink to="/appointments">
                        <FontAwesomeIcon className="mr-2" icon={faCalendarCheck} size="lg" aria-label="Appointments" />
                        <p className="inline ml-2">Appointments</p>
                    </NavLink>
                </li>
                <li className="py-2">
                    <NavLink to="/messages">
                        <FontAwesomeIcon className="mr-2" icon={faMessage} size="lg" aria-label="Messages" />
                        <p className="inline ml-1">Messaging</p>
                    </NavLink>
                </li>
                <li className="py-2">
                    <NavLink to="/resources">
                        <FontAwesomeIcon className="mr-2" icon={faLightbulb} size="lg" aria-label="Resources" />
                        <p className="inline ml-2">Resources</p>
                    </NavLink>
                </li>
                <li className="py-2">
                    <NavLink to="/billing">
                        <FontAwesomeIcon className="mr-2" icon={faCircleDollarToSlot} size="lg" aria-label="Billing" />
                        <p className="inline ml-1">Billing</p>
                    </NavLink>
                </li>
                <li className="py-2">
                    <NavLink to="/profile">
                        <FontAwesomeIcon className="mr-2" icon={faUser} size="lg" aria-label="Profile" />
                        <p className="inline ml-2">Profile</p>
                    </NavLink>
                </li>
            </ul>
            <footer className="py-20">
                <FontAwesomeIcon className="mr-2" icon={faRightFromBracket} size="lg" aria-label="Log out" />
                <p className="inline ml-1">Log out</p>
            </footer>
        </nav>
    )
}