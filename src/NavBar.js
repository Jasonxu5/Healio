import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faCalendarCheck, faMessage, faLightbulb, faCircleDollarToSlot, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
    return (
        <nav className="bg-light-green w-48 h-screen fixed top-0">
            <h1 className="font-heading text-3xl font-bold px-3 py-8">Healio</h1>
            <div className="flex flex-col my-20">
                <NavLink to="/" className={({ isActive }) => isActive ? 'py-2 pl-3 pr-24 bg-dark-green font-bold' : 'py-2 px-3'}>
                    <FontAwesomeIcon className="mr-2" icon={faSquarePlus} size="lg" aria-label="Health" />
                    <p className="inline ml-2">Health</p>
                </NavLink>
                <NavLink to="/appointments" className={({ isActive }) => isActive ? 'py-2 pl-3 pr-23 bg-dark-green font-bold' : 'py-2 px-3'}>
                    <FontAwesomeIcon className="mr-2" icon={faCalendarCheck} size="lg" aria-label="Appointments" />
                    <p className="inline ml-2">Appointments</p>
                </NavLink>
                <NavLink to="/messages" className={({ isActive }) => isActive ? 'py-2 pl-3 pr-23 bg-dark-green font-bold' : 'py-2 px-3'}>
                    <FontAwesomeIcon className="mr-2" icon={faMessage} size="lg" aria-label="Messages" />
                    <p className="inline ml-1">Messaging</p>
                </NavLink>
                <NavLink to="/resources" className={({ isActive }) => isActive ? 'py-2 pl-3 pr-23 bg-dark-green font-bold' : 'py-2 px-3'}>
                    <FontAwesomeIcon className="mr-2" icon={faLightbulb} size="lg" aria-label="Resources" />
                    <p className="inline ml-2">Resources</p>
                </NavLink>
                <NavLink to="/billing" className={({ isActive }) => isActive ? 'py-2 pl-3 pr-24 bg-dark-green font-bold' : 'py-2 px-3'}>
                    <FontAwesomeIcon className="mr-2" icon={faCircleDollarToSlot} size="lg" aria-label="Billing" />
                    <p className="inline ml-1">Billing</p>
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => isActive ? 'py-2 pl-3 pr-24 bg-dark-green font-bold' : 'py-2 px-3'}>
                    <FontAwesomeIcon className="mr-2" icon={faUser} size="lg" aria-label="Profile" />
                    <p className="inline ml-2">Profile</p>
                </NavLink>
            </div>
            <footer className="py-20 px-3">
                <FontAwesomeIcon className="mr-2" icon={faRightFromBracket} size="lg" aria-label="Log out" />
                <p className="inline ml-1">Log out</p>
            </footer>
        </nav>
    )
}