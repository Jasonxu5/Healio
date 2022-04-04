import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faCalendarCheck, faMessage, faLightbulb, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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

export default function NavBar() {
    const handleSignOut = () => {
        firebase.auth().signOut();
    }

    const categoriesArray = CATEGORIES.map((category, index) => {
        return <Category
            queryLink={category.queryLink}
            icon={category.icon}
            iconSize={category.iconSize}
            categoryName={category.name}
            hoverOptions={category.hoverOptions}
            key={index}
        />;
    });

    return (
        <nav className="bg-light-green w-48 h-screen fixed top-0">
            <h1 className="font-heading text-3xl font-bold px-3 py-8">Healio</h1>
            <div className="flex flex-col my-20">
                {categoriesArray}
            </div>
            <footer className="py-20 px-3">
                <Link to="/" className="hover:cursor-pointer" onClick={handleSignOut}>
                    <FontAwesomeIcon className="mr-2" icon={faRightFromBracket} size="lg" aria-label="Log out" />
                    <p className="inline ml-1">Log out</p>
                </Link>
            </footer>
        </nav>
    )
}

function Category(props) {
    const { queryLink, icon, iconSize, categoryName, hoverOptions } = props;
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [isMouseHovered, setIsMouseHovered] = useState(false);

    const subCategories = hoverOptions.map((option, index) => {
        return <SubCategory subCategoryName={option} categoryQueryLink={queryLink} key={index} />
    });
    return (
        <NavLink to={queryLink} className={'relative' +
            (isMouseHovered || isCategorySelected ? ' bg-dark-green font-bold text-dark-blue' : '') +
            (({ isActive }) => isActive ? setIsCategorySelected(true) : setIsCategorySelected(false))}
            onMouseEnter={() => setIsMouseHovered(true)}
            onMouseLeave={() => setIsMouseHovered(false)}>
            <div className="py-2 pl-3">
                <FontAwesomeIcon className="mr-2" icon={icon} size={iconSize} aria-label={categoryName} />
                <p className="inline ml-2">{categoryName} </p>
            </div>
            {isMouseHovered && hoverOptions.length !== 0 ? <SubCategoryPopup subCategories={subCategories} /> : ''}
        </NavLink>
    );
}

function SubCategory(props) {
    const { subCategoryName, categoryQueryLink } = props;
    const [isMouseHovered, setIsMouseHovered] = useState(false);

    const queryLink = categoryQueryLink + '/' + subCategoryName.toLowerCase().split(' ').join('_');
    return (
        <NavLink to={queryLink} className={isMouseHovered ? 'font-bold bg-light-blue pl-4 py-2' : 'pl-4 py-2'}
            onMouseEnter={() => setIsMouseHovered(true)}
            onMouseLeave={() => setIsMouseHovered(false)}>
            {subCategoryName}
        </NavLink>
    )
}

function SubCategoryPopup(props) {
    const { subCategories } = props;
    return (
        <div className="absolute left-[192px] top-0 w-[200px] border-2 border-black bg-white flex flex-col">
            {subCategories}
        </div>
    );
}
/*
NEW (clickable space, but active pages aren't highlighted)

<NavLink to={queryLink} className={'relative' +
            (isMouseHovered || isCategorySelected ? ' bg-dark-green font-bold text-dark-blue' : '') +
            (({ isActive }) => isActive ? setIsCategorySelected(true) : setIsCategorySelected(false))}
            onMouseEnter={() => setIsMouseHovered(true)}
            onMouseLeave={() => setIsMouseHovered(false)}>
            <div className="py-2 pl-3">
                <FontAwesomeIcon className="mr-2" icon={icon} size={iconSize} aria-label={categoryName} />
                <p className="inline ml-2">{categoryName} </p>
            </div>
            {isMouseHovered && hoverOptions.length !== 0 ? <SubCategoryPopup subCategories={subCategories} /> : ''}
        </NavLink>


OLD (not clickable space, but active pages are highlighted)

<div className={'relative py-2 pl-3 hover:cursor-pointer' + (isMouseHovered || isCategorySelected ? ' bg-dark-green font-bold text-dark-blue' : '')}
            onMouseEnter={() => setIsMouseHovered(true)}
            onMouseLeave={() => setIsMouseHovered(false)}>
            <NavLink to={queryLink} className={({ isActive }) => isActive ? setIsCategorySelected(true) : setIsCategorySelected(false)}>
                <FontAwesomeIcon className="mr-2" icon={icon} size={iconSize} aria-label={categoryName} />
                <p className="inline ml-2">{categoryName} </p>
            </NavLink>
            {isMouseHovered && hoverOptions.length !== 0 ? <SubCategoryPopup subCategories={subCategories} /> : ''}
        </div>
*/