import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faCalendarCheck, faMessage, faLightbulb, faUser, faRightFromBracket, faBars, faX } from '@fortawesome/free-solid-svg-icons'
import { serverEndpoint } from './serverEndpoint.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const apiEndpoint = serverEndpoint;

const CATEGORIES = [
    {
        queryLink: '/health',
        icon: faSquarePlus,
        iconSize: 'lg',
        name: 'Health',
        hoverOptions: [
            'Overview',
            'Lab Results',
            'Medications',
            'Vaccines',
            'Allergies',
            'Surgical History'
        ]
    },
    {
        queryLink: '/appointments',
        icon: faCalendarCheck,
        iconSize: 'lg',
        name: 'Appointments',
        hoverOptions: [
            'View Appointments',
            'Schedule Appointment'
        ]
    },
    {
        queryLink: '/messages',
        icon: faMessage,
        iconSize: '1x',
        name: 'Messaging',
        hoverOptions: []
    },
    {
        queryLink: '/resources',
        icon: faLightbulb,
        iconSize: 'lg',
        name: 'Resources',
        hoverOptions: [
            'Find Providers',
            'Find Hospitals',
            'Educational Providers'
        ]
    },
    {
        queryLink: '/profile',
        icon: faUser,
        iconSize: '1x',
        name: 'Profile',
        hoverOptions: []
    }
];

export default function NavBar(props) {
    async function handleSignOut() {
        await fetch(apiEndpoint + "logout",
            {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                mode: 'cors'
            });
        console.log('logging out')
        props.loginStatus();
    }

    const [isMenuOpen, setMenuOpen] = useState(false);
    const ref = useRef();

    const categoriesArray = CATEGORIES.map((category, index) => {
        return <Category
            queryLink={category.queryLink}
            icon={category.icon}
            iconSize={category.iconSize}
            categoryName={category.name}
            hoverOptions={category.hoverOptions}
            menuCallback={setMenuOpen}
            key={index}
        />;
    });

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
        <div>
            <nav className="md:inline absolute top-[35px] left-[15px] hidden">
                <FontAwesomeIcon className={'animate-popup text-3xl ml-3 cursor-pointer' + (isMenuOpen ? ' hidden' : '')} onClick={() => setMenuOpen(true)} icon={faBars} size="lg" aria-label="Hamburger menu for extra icons" />
                <FontAwesomeIcon className={'animate-popup text-3xl ml-3 cursor-pointer hover:text-red' + (isMenuOpen ? '' : ' hidden')} onClick={() => setMenuOpen(true)} icon={faX} size="lg" aria-label="Hamburger menu for extra icons" />
                <div className={'ml-[-15px] h-screen py-[20vh] mt-4' + (isMenuOpen ? ' bg-light-green' : '')} ref={ref}>
                    {isMenuOpen ? categoriesArray : null}
                </div>
            </nav>
            <nav className="md:hidden bg-light-green w-48 h-screen fixed top-0">
                <h1 className="font-heading text-3xl font-bold px-3 py-8">Healio</h1>
                <div className="flex flex-col my-20">
                    {categoriesArray}
                </div>
                <div className="hover:cursor-pointer" onClick={handleSignOut}>
                    <footer className="my-20 transition hover:bg-dark-green font-bold text-dark-blue py-2 pl-3">
                        <FontAwesomeIcon className="mr-2" icon={faRightFromBracket} size="lg" aria-label="Log out" />
                        <p className="inline ml-1">Log out</p>
                    </footer>
                </div>
            </nav>
        </div>
    )
}

function Category(props) {
    const { queryLink, icon, iconSize, categoryName, hoverOptions, menuCallback } = props;
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [isMouseHovered, setIsMouseHovered] = useState(false);
    const subCategories = hoverOptions.map((option, index) => {
        return <SubCategory subCategoryName={option} categoryQueryLink={queryLink} menuCallback={menuCallback} key={index} />
    });
    const mobileRef = useRef();

    // Set up clicking event for categories in mobile hamburger menu
    useEffect(() => {
        const checkIfClickedOutside = e => {
            const lowercaseCategory = categoryName.toLowerCase();
            // god i hate this error
            if (isMouseHovered && mobileRef.current && e.target.href === undefined) {
                setIsMouseHovered(false);
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        }
    }, [isMouseHovered]);


    let navType;
    if (window.innerWidth > 1040 || categoryName === 'Messaging' || categoryName === 'Profile') {
        if (window.innerWidth > 1040) {
            navType = (
                <NavLink to={queryLink} className={({ isActive }) => isActive ? setIsCategorySelected(true) : setIsCategorySelected(false)}>
                    <div className={(isMouseHovered || isCategorySelected ? 'transition bg-dark-green font-bold text-dark-blue ' : '') + 'py-2 pl-3'}>
                        <FontAwesomeIcon className="md:hidden mr-2" icon={icon} size={iconSize} aria-label={categoryName} />
                        <p className="inline ml-2">{categoryName} </p>
                    </div>
                </NavLink>
            );
        } else {
            navType = (
                <NavLink to={queryLink} onClick={() => menuCallback(false)} className={({ isActive }) => isActive ? setIsCategorySelected(true) : setIsCategorySelected(false)}>
                    <div className={(isMouseHovered || isCategorySelected ? 'transition bg-dark-green font-bold text-dark-blue ' : '') + 'py-2 pl-3'}>
                        <FontAwesomeIcon className="md:hidden mr-2" icon={icon} size={iconSize} aria-label={categoryName} />
                        <p className="inline ml-2">{categoryName} </p>
                    </div>
                </NavLink>
            );
        }
    } else {
        navType = (
            <div className="hover:cursor-pointer" onClick={() => setIsMouseHovered(true)} ref={mobileRef}>
                <div className={(isMouseHovered || isCategorySelected ? 'transition bg-dark-green font-bold text-dark-blue ' : '') + 'py-2 pl-3'}>
                    <FontAwesomeIcon className="md:hidden mr-2" icon={icon} size={iconSize} aria-label={categoryName} />
                    <p className="inline ml-2">{categoryName} </p>
                </div>
            </div>
        )
    }

    const handleMouseEnter = () => {
        if (window.innerWidth > 1040) {
            setIsMouseHovered(true);
        }
    }

    const handleMouseLeave = () => {
        if (window.innerWidth > 1040) {
            setIsMouseHovered(false);
        }
    }

    // div -> NavLink might be a bug later on sry
    // window.innerWidth doesn't work too well
    return (
        <div className={'md:text-center md:animate-popup md:w-[100vw] relative bg-light-green'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {navType}
            {isMouseHovered && hoverOptions.length !== 0 ? <SubCategoryPopup subCategories={subCategories} /> : ''}
        </div>
    );
}

function SubCategory(props) {
    const { subCategoryName, categoryQueryLink, menuCallback } = props;
    const [isMouseHovered, setIsMouseHovered] = useState(false);

    const queryLink = categoryQueryLink + '/' + subCategoryName.toLowerCase().split(' ').join('_');
    return (
        <NavLink to={queryLink} className={isMouseHovered ? 'transition font-bold bg-light-blue pl-4 py-2' : 'pl-4 py-2'}
            onMouseEnter={() => setIsMouseHovered(true)}
            onMouseLeave={() => setIsMouseHovered(false)}
            onClick={() => menuCallback(false)}>
            {subCategoryName}
        </NavLink>
    )
}

function SubCategoryPopup(props) {
    const { subCategories } = props;
    return (
        <div className="md:bg-light-green md:w-screen md:left-0 md:relative animate-popup absolute flex flex-col left-[192px] top-0 w-[200px] border-2 border-black bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
            {subCategories}
        </div>
    );
}