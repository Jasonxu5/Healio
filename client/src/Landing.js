import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import landingImage from './img/landingImage.svg';

import niya from './team/niya.jpg';
import alex from './team/alex.jpg';
import jason from './team/jason.jpg';
import jerome from './team/jerome.png';

const MOBIO = [
    {
        name: 'Niya Park',
        role: 'Project Manager',
        img: niya
    },
    {
        name: 'Alex Ramos',
        role: 'Designer',
        img: alex
    },
    {
        name: 'Jason Xu',
        role: 'Backend Dev',
        img: jason
    },
    {
        name: 'Jerome Orille',
        role: 'Frontend Dev',
        img: jerome
    }
]
export default function Landing() {
    return (
        <div className="flex flex-col bg-pale-blue h-full">
            <NavBar />
            <Body />
            <About />
            <footer className="mx-10 mt-[200px]">&copy; 2021 - 2022 MoBio @ University of Washington iSchool</footer>
        </div>
    );
}

function NavBar() {
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
        <div className="w-screen bg-white fixed z-50">
            <div className="md:w-[88vw] flex justify-between w-[95vw] mx-10 mt-4 pb-4">
                <h1 className="font-heading text-3xl font-bold mt-2">Healio</h1>
                <div className="md:inline my-3 hidden">
                    <FontAwesomeIcon className="text-4xl cursor-pointer hover:animate-wiggle" onClick={() => { setMenuOpen(true) }} icon={faBars} aria-label="Hamburger menu for extra icons" />
                    {isMenuOpen ? NavOptions("absolute right-[20px] mt-2 flex gap-5 text-xl p-5 bg-white rounded-[15px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]", ref) : null}
                </div>
                {NavOptions("md:hidden flex gap-10 text-xl my-1", null)}
            </div>
        </div>
    );
}

function NavOptions(css, ref) {
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

function Body() {
    return (
        <div className="md:mx-auto md:w-full">
            <img className="md:hidden absolute right-0 top-[70px] ml-auto h-[90vh]" src={landingImage} alt="Patients and Doctor Clipart" />
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
    );
}

function About() {
    const mobioArray = MOBIO.map((member, index) => {
        return <MoBioProfile name={member.name} role={member.role} img={member.img} key={index} />
    });
    return (
        <div className="md:flex-col flex mt-[400px]">
            <div className="md:text-center flex flex-col gap-4 mx-10 mt-[200px]">
                <h2 className="font-heading text-5xl font-bold">Who we are</h2>
                <div className="text-2xl">
                    <p>We are a team of <p className="text-light-blue inline">self-motivated</p></p>
                    <p>college undergraduates from</p>
                    <p>the University of Washington iSchool.</p>
                </div>
            </div>
            <div className="md:mt-[30px] md:relative md:gap-2 md:right-0 absolute grid grid-cols-2 gap-y-20 gap-x-40 right-[35px]">
                {mobioArray}
            </div>
        </div>
    );
}

function MoBioProfile(props) {
    const { name, role, img } = props;

    return (
        <div className="md:mx-auto font-heading text-xl">
            <img className="rounded-full h-40" src={img} />
            <p>{name}</p>
            <p>{role}</p>
        </div>
    );
}