import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

// Because Calendar is impossible with Tailwind...
// ...I have to painfully relearn normal CSS

export default function ScheduleApps(props) {
    const { currUser, scheduleAppsHeader } = props;
    const [isModalClicked, setModalClicked] = useState(false);
    const [clickedDay, setClickedDay] = useState(null);
    const appRef = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // I included the typeof so it won't throw an error
            if (isModalClicked && (typeof (e.target.className) !== 'object') && !appRef.current.dialog.contains(e.target)) {
                setModalClicked(false);
            }
        }
        document.addEventListener('mousedown', checkIfClickedOutside);

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        }
    }, [isModalClicked]);

    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            <CalendarModal currUser={currUser} appRef={appRef} isModalClicked={isModalClicked} modalCallback={setModalClicked} clickedDay={clickedDay} />
            {scheduleAppsHeader}
            <AppCalendar modalCallback={setModalClicked} dayCallback={setClickedDay} />
        </div>
    );
}

function CalendarModal(props) {
    const { currUser, appRef, isModalClicked, modalCallback, clickedDay } = props;
    const [currText, setCurrText] = useState('');

    let date;
    if (clickedDay !== null) {
        let month = clickedDay.getMonth() + 1;
        let day = clickedDay.getDate();
        const year = clickedDay.getFullYear();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        date = month + '/' + day + '/' + year;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleTextChange = (event) => {
        setCurrText(event.target.value);
    }

    const handleClick = () => {
        const newAppointment = { name: currText, date: clickedDay };
        currUser.appointments = [...currUser.appointments, newAppointment];
        setCurrText('');
        modalCallback(false);
    }
    const handleKeypress = (event) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <Modal className="w-[50%] animate-popup absolute left-[25%] top-[10%] p-5 bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" show={isModalClicked} ref={appRef}>
            <FontAwesomeIcon className="text-2xl mb-2 hover:text-[#FF0000] hover:cursor-pointer" onClick={() => modalCallback(false)} icon={faX} size="lg" aria-label="Close icon" />
            <Modal.Header className="text-center" closeButton>
                <Modal.Title className="font-heading text-3xl">Schedule an Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body className="md:ml-2 ml-8 pb-3">
                <h2 className="text-2xl">You are scheduling an appointment on {date}.<br />Please specify a reason:</h2>
                <form className="" onSubmit={handleSubmit}>
                    <label className="text-2xl pb-3"></label>
                    <input className="block p-[12px] w-[95%] mt-3 rounded-[15px] bg-grey"
                        placeholder={'Reason for appointment...'} aria-label={'Reason for appointment'} autoComplete="off"
                        onKeyDown={handleKeypress} onChange={handleTextChange} />
                </form>
            </Modal.Body>
            <p className="transition py-3 px-6 mx-auto w-[212px] mt-2 border-2 border-light-blue rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold" onClick={handleClick}>Schedule Appointment</p>
        </Modal>
    )
}

function AppCalendar(props) {
    const { modalCallback, dayCallback } = props;
    const handleClick = (event) => {
        dayCallback(event);
        modalCallback(true);
    };
    return <Calendar
        className="relative flex flex-col animate-popup h-screen"
        tileClassName="transition"
        onClickDay={handleClick}
        prev2Label={null}
        next2Label={null}
        view='month'
        minDetail="month"
    />;
}