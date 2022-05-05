import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faCalendarCheck, faMessage, faLightbulb, faUser, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const apiEndpoint = "http://localhost:5000/api/v1/"

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
            'Schedule Appointments',
            'Upcoming Appointments',
            'Past Appointments'
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
            index={index}
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
            <div className="md:inline absolute top-[35px] left-[15px] hidden">
                <FontAwesomeIcon className="text-3xl ml-3 cursor-pointer hover:animate-wiggle" onClick={() => setMenuOpen(true)} icon={faBars} size="lg" aria-label="Hamburger menu for extra icons" />
                <div ref={ref}>
                    {isMenuOpen ? categoriesArray : null}
                </div>
            </div>
            <nav className="md:hidden bg-light-green w-48 h-screen fixed top-0">
                <h1 className="font-heading text-3xl font-bold px-3 py-8">Healio</h1>
                <div className="flex flex-col my-20">
                    {categoriesArray}
                </div>
                <Link to="/" className="hover:cursor-pointer" onClick={handleSignOut}>
                    <footer className="my-20 transition hover:bg-dark-green font-bold text-dark-blue py-2 pl-3">
                        <FontAwesomeIcon className="mr-2" icon={faRightFromBracket} size="lg" aria-label="Log out" />
                        <p className="inline ml-1">Log out</p>
                    </footer>
                </Link>
            </nav>
        </div>
    )
}

function Category(props) {
    const { queryLink, icon, iconSize, categoryName, hoverOptions, index } = props;
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [isMouseHovered, setIsMouseHovered] = useState(false);
    let roundedCorners = '';
    const subCategories = hoverOptions.map((option, index) => {
        return <SubCategory subCategoryName={option} categoryQueryLink={queryLink} key={index} />
    });
    if (index === 0) {
        roundedCorners = ' md:rounded-t-[15px]';
    } else if (index === 4) {
        roundedCorners = ' md:rounded-b-[15px]';
    }

    // div -> NavLink might be a bug later on sry
    return (
        <div className={'md:animate-popup md:ml-3 relative bg-light-green w-48' + roundedCorners}
            onMouseEnter={() => setIsMouseHovered(true)}
            onMouseLeave={() => setIsMouseHovered(false)}>
            <NavLink to={queryLink} className={({ isActive }) => isActive ? setIsCategorySelected(true) : setIsCategorySelected(false)}>
                <div className={(isMouseHovered || isCategorySelected ? 'transition bg-dark-green font-bold text-dark-blue ' : '') + 'py-2 pl-3' + roundedCorners}>
                    <FontAwesomeIcon className="mr-2" icon={icon} size={iconSize} aria-label={categoryName} />
                    <p className="inline ml-2">{categoryName} </p>
                </div>
            </NavLink>
            {isMouseHovered && hoverOptions.length !== 0 ? <SubCategoryPopup subCategories={subCategories} /> : ''}
        </div>
    );
}

function SubCategory(props) {
    const { subCategoryName, categoryQueryLink } = props;
    const [isMouseHovered, setIsMouseHovered] = useState(false);

    const queryLink = categoryQueryLink + '/' + subCategoryName.toLowerCase().split(' ').join('_');
    return (
        <NavLink to={queryLink} className={isMouseHovered ? 'transition font-bold bg-light-blue pl-4 py-2' : 'pl-4 py-2'}
            onMouseEnter={() => setIsMouseHovered(true)}
            onMouseLeave={() => setIsMouseHovered(false)}>
            {subCategoryName}
        </NavLink>
    )
}

function SubCategoryPopup(props) {
    const { subCategories } = props;
    return (
        <div className="animate-popup absolute left-[192px] top-0 w-[200px] border-2 border-black bg-white flex flex-col">
            {subCategories}
        </div>
    );
}