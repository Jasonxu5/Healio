import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import landingImage from './img/landingImage.svg';

import Login from './Login.js';
import Signup from './Signup.js';

import niya from './team/niya.jpg';
import alex from './team/alex.jpg';
import jason from './team/jason.jpg';
import jerome from './team/jerome.png';

const MOBIO = [
    {
        name: 'Niya Park',
        role: 'Project Manager',
        img: niya,
        linkedin: 'https://www.linkedin.com/in/niyapark/'
    },
    {
        name: 'Alex Ramos',
        role: 'Designer',
        img: alex,
        linkedin: 'https://www.linkedin.com/in/alex-g-ramos/'
    },
    {
        name: 'Jason Xu',
        role: 'Backend Developer',
        img: jason,
        linkedin: 'https://www.linkedin.com/in/jason-xu-5a29b4180/'
    },
    {
        name: 'Jerome Orille',
        role: 'Frontend Developer',
        img: jerome,
        linkedin: 'https://www.linkedin.com/in/jahwoamyy/'
    }
];

export default function Landing(props) {
    const { loginStatus } = props;
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const [isLogin, setLogin] = useState(true);

    const bodyRef = useRef();
    const aboutRef = useRef();
    const loginRef = useRef();

    // Set up clicking event for menus
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // I included the typeof so it won't throw an error
            if (isLoginClicked && (typeof (e.target.className) !== 'object') && !loginRef.current.dialog.contains(e.target)) {
                setIsLoginClicked(false);
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        }
    }, [isLoginClicked]);
    return (
        <div>
            {isLoginClicked ?
                (isLogin ?
                    <Login loginStatus={loginStatus} isLoginClicked={isLoginClicked} loginClickedCallback={setIsLoginClicked} loginRef={loginRef} loginCallback={setLogin} /> :
                    <Signup loginStatus={loginStatus} isLoginClicked={isLoginClicked} loginClickedCallback={setIsLoginClicked} loginRef={loginRef} loginCallback={setLogin} />) :
                null}
            <div className="flex flex-col bg-pale-blue">
                <NavBar loginCallback={setIsLoginClicked} setLogin={setLogin} bodyRef={bodyRef} aboutRef={aboutRef} />
                <Body loginCallback={setIsLoginClicked} setLogin={setLogin} bodyRef={bodyRef} />
                <About aboutRef={aboutRef} />
                <footer className="mx-10 mt-[200px]">&copy; 2021 - 2022 MoBio @ University of Washington iSchool</footer>
            </div>
        </div>
    );
}

function NavBar(props) {
    const { loginCallback, setLogin, bodyRef, aboutRef } = props;
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isDisclaimerClicked, setDisclaimer] = useState(false);
    const navRef = useRef();
    const disclaimerRef = useRef();

    // Set up clicking event for menus
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isMenuOpen && !navRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
            // I included the typeof so it won't throw an error
            if (isDisclaimerClicked && (typeof (e.target.className) !== 'object') && !e.target.className.includes('modal')) {
                setDisclaimer(false);
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        }
    }, [isMenuOpen, isDisclaimerClicked]);

    const handleClick = () => {
        setLogin(true);
        loginCallback(true);
    };

    return (
        <div className="w-screen bg-white fixed z-50">
            <div className="md:w-[88vw] flex justify-between w-[95vw] mx-10 mt-4 pb-4">
                <h1 className="font-heading text-3xl font-bold mt-2">Healio</h1>
                <div className="md:inline my-3 hidden">
                    <FontAwesomeIcon className="text-4xl cursor-pointer hover:animate-wiggle" onClick={() => { setMenuOpen(true) }} icon={faBars} aria-label="Hamburger menu for extra icons" />
                    {isMenuOpen ? <NavOptions css="absolute right-[20px] mt-2 flex flex-col gap-5 text-xl p-5 bg-white rounded-[15px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" navRef={navRef} bodyRef={bodyRef} aboutRef={aboutRef} setDisclaimerCallback={setDisclaimer} loginCallback={handleClick} /> : null}
                </div>
                <NavOptions css="md:hidden flex gap-10 text-xl my-1" navRef={null} bodyRef={bodyRef} aboutRef={aboutRef} setDisclaimerCallback={setDisclaimer} loginCallback={handleClick} />
            </div>
            <Modal className="modal" show={isDisclaimerClicked} ref={disclaimerRef}>
                <FontAwesomeIcon className="text-2xl mb-2 hover:text-[#FF0000] hover:cursor-pointer" onClick={() => setDisclaimer(false)} icon={faX} size="lg" aria-label="Close icon" />
                <Modal.Header className="text-center" closeButton>
                    <Modal.Title className="font-heading text-3xl">Data Use Disclaimer</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    Starting on May 23th, 2022, the Mobio team will be transitioning the Healio platform to an open-source project. What this means is that the project repository and source code will be publicly accessible under the MIT License. Our team has done extensive research and development in building the platform you’re using today, but we cannot continue our efforts on this project after graduation. Therefore, by open-sourcing our project, we will give future teams a foundation for them to build and iterate new features and improvements upon.

                    During the transition to open source, all currently stored user data will be DELETED on May 23, 2022. We will provide an option to export lab results, doctor’s notes, and medical history if you want to save that data. However, all other types of data such as appointments and messages will not have the option to be exported.

                    Thank you for using Healio and helping us contribute to the development of a more accessible patient portal!

                    - The Mobio Team
                </Modal.Body>
            </Modal>
        </div>
    );
}

function NavOptions(props) {
    const { css, navRef, bodyRef, aboutRef, setDisclaimerCallback, loginCallback} = props;

    const handleClick = (event) => {
        if (event.target.textContent === 'Home') {
            bodyRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        } else if (event.target.textContent === 'About') {
            aboutRef.current.scrollIntoView({ behavior: 'smooth', inline: 'end' });
        } else {
            setDisclaimerCallback(true);
        }
    };
    return (
        <div className={css} ref={navRef}>
            <p className="mt-2 hover:cursor-pointer" onClick={handleClick}>Data Use Disclaimer</p>
            <p className="mt-2 hover:cursor-pointer" onClick={handleClick}>Home</p>
            <p className="mt-2 hover:cursor-pointer" onClick={handleClick}>About</p>
            <p className="md:w-[80px] font-semibold text-dark-blue bg-dark-green rounded-lg py-2 px-4 hover:cursor-pointer" onClick={loginCallback}>Login</p>
        </div>
    )
}

function Body(props) {
    const { loginCallback, setLogin, bodyRef } = props;

    const handleClick = () => {
        setLogin(false);
        loginCallback(true);
    }
    return (
        <div className="md:mx-auto md:w-full" ref={bodyRef}>
            <div className="md:flex-col flex">
                <div className="md:mt-[125px] md:text-center flex flex-col gap-4 mx-10 mt-[200px]" data-aos="fade-right" data-aos-duration="1500">
                    <h2 className="font-heading text-5xl font-bold">Healio</h2>
                    <div className="text-2xl">
                        <p>Son, Daughter, Parent, <p className="text-light-blue inline">You.</p></p>
                        <p>Take control of your family's</p>
                        <p>medical information today.</p>
                    </div>
                    <p className="md:mx-auto font-semibold text-dark-blue bg-dark-green rounded-lg py-2 px-4 w-[86px] hover:cursor-pointer" onClick={handleClick}>Sign Up</p>
                </div>
                <img className="md:hidden ml-auto h-[100vh]" src={landingImage} alt="Patients and Doctor Clipart" data-aos="fade-left" data-aos-duration="1500" />
            </div>
        </div>
    );
}

function About(props) {
    const { aboutRef } = props;
    const mobioArray = MOBIO.map((member, index) => {
        return <MoBioProfile name={member.name} role={member.role} img={member.img} linkedin={member.linkedin} key={index} />
    });
    return (
        <div className="md:flex-col flex mt-10" ref={aboutRef}>
            <div className="md:mt-[50vh] md:text-center flex flex-col gap-4 mx-10 mt-[200px]" data-aos="fade-right" data-aos-duration="1500">
                <h2 className="font-heading text-5xl font-bold">Who we are</h2>
                <div className="text-2xl">
                    <p>We are a team of <p className="text-light-blue inline">self-motivated</p></p>
                    <p>college undergraduates from</p>
                    <p>the University of Washington iSchool.</p>
                </div>
            </div>
            <div className="md:mt-[30px] md:relative md:gap-2 md:right-0 absolute grid grid-cols-2 gap-y-20 gap-x-40 right-[35px]" data-aos="fade-left" data-aos-duration="1500">
                {mobioArray}
            </div>
        </div>
    );
}

function MoBioProfile(props) {
    const { name, role, img, linkedin } = props;

    return (
        <div className="md:mx-auto font-heading text-xl">
            <img className="rounded-full h-40" src={img} />
            <a href={linkedin} target="_blank" rel="noopener noreferrer">{name}</a>
            <p>{role}</p>
        </div>
    );
}