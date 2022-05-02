import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import landingImage from './img/landingImage.svg';

export default function Landing() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const ref = useRef();

    // Set up clicking event for mobile hamburger menu
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        }
    }, [isMenuOpen]);

    return (
        <div className="flex flex-col">
            <div className="flex mx-10 mt-4 pb-4">
                <h1 className="font-heading text-3xl font-bold mt-2">Healio</h1>
                <div className="md:inline my-3 ml-auto hidden">
                    <FontAwesomeIcon className="text-3xl ml-3 cursor-pointer hover:animate-wiggle" onClick={() => { setMenuOpen(true) }} icon={faBars} size="lg" aria-label="Hamburger menu for extra icons" />
                    {isMenuOpen ? NavBar("absolute right-[35px] mt-2 flex gap-5 text-xl p-5 bg-white rounded-[15px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]", ref) : null}
                </div>
                {NavBar("md:hidden flex gap-10 text-xl my-1 ml-auto", null)}
            </div>
            <div className="md:mx-auto md:w-full bg-pale-blue h-[90vh]">
                <img className="md:hidden absolute right-0 ml-auto h-[90vh]" src={landingImage} alt="Patients and Doctor Clipart" />
                <div className="md:text-center flex flex-col gap-4 mx-10 mt-[200px]">
                    <h2 className="font-heading text-5xl font-bold">Healio</h2>
                    <div className="text-2xl">
                        <p>Son, Daughter, Parent, <p className="text-light-blue inline">You.</p></p>
                        <p>Take control of your family's</p>
                        <p>medical information today.</p>
                    </div>
                    <Link to="/login">
                        <p className="md:mx-auto font-semibold text-dark-blue bg-dark-green rounded-lg py-2 px-4 w-[115px] hover:cursor-pointer">Join Healio</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function NavBar(css, ref) {
    return (
        <div className={css} ref={ref}>
            <Link to="/" className="mt-2">Home</Link>
            <p className="mt-2">About</p>
            <Link to="/login">
                <p className="font-semibold text-dark-blue bg-dark-green rounded-lg py-2 px-4 hover:cursor-pointer">Login</p>
            </Link>
        </div>
    )
}