import React from 'react';
import BPGHM from './img/BPGHM.png';
import COHE from './img/COHE.png';
import UMed from './img/UMed.png';
import SIA from './img/SIA.png';

const EDUCATIONAL_INFO = [
    {
        title: 'Best Practices in Global Health Missions',
        shortTitle: 'BPGHM',
        img: BPGHM,
        desc: 'BPGHM provides a wealth of healthcare information. ' +
            'This resource is useful for anyone wanting to get involved and learn more about healthcare.',
        url: 'https://bpghm.org/health_topics/education-healthcare-provider/'
    },
    {
        title: 'Centers of Occupational Health & Education',
        shortTitle: 'COHE',
        img: COHE,
        desc: 'COHE links workers, employers and providers together' +
            ' to promote best practices regarding work ethics and safety.',
        url: 'https://www.lni.wa.gov/patient-care/provider-partnership-best-practices/centers-of-occupational-health-education-cohe'
    },
    {
        title: 'UW Medicine',
        shortTitle: 'UMed',
        img: UMed,
        desc: 'UW Medicine allows you to refer a patient and check out patient records.',
        url: 'https://www.uwmedicine.org/provider-resource'
    },
    {
        title: 'Spa Industry Association',
        shortTitle: 'SIA',
        img: SIA,
        desc: 'SIA teaches one about the importance of everyday wellness. ' +
            'One could learn about wellness education and the impact it has on children growing up and adults learning about it.',
        url: 'https://dayspaassociation.com/why-is-wellness-education-important-for-all-spheres-of-life/'
    },
];

export default function Education(props) {
    const { educationHeader } = props;
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {educationHeader}
            <EducationCards />
        </div>
    );
}

function EducationCards() {
    const educationalInfoArray = EDUCATIONAL_INFO.map((education, index) => {
        return <SingleEducationCard
            title={education.title}
            shortTitle={education.shortTitle}
            img={education.img}
            desc={education.desc}
            url={education.url}
            key={index}
        />
    });
    return (
        <div className="flex flex-col">
            {educationalInfoArray}
        </div>
    )
}

function SingleEducationCard(props) {
    const { title, shortTitle, img, desc, url } = props;

    return (
        <div className="flex flex-col w-[90%]">
            <div className="sm:flex-col flex mt-6 gap-6 animate-popup p-6 bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[20px]">
                <img className="sm:h-full h-[100px]" src={img} alt={title} />
                <div className="flex flex-col gap-2">
                    <h2 className="sm:hidden font-heading text-3xl">{title}</h2>
                    <h2 className="sm:block hidden font-heading text-3xl">{shortTitle}</h2>
                    <hr className="border-grey" />
                    <p className="">{desc}</p>
                    <a href={url}
                        className="transition w-[160px] py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold">
                        Visit Resource
                    </a>
                </div>
            </div>
            <hr className="sm:block mt-4 border-grey hidden" />
        </div>
    )
}