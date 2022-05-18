import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperclip, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import _, { first } from 'lodash';
import katie from './img/katie.png';
import daughter from './img/daughter.png';
import grandma from './img/grandma.png';
import ortega from './img/ortega.png';
import valera from './img/valera.png';


export default function Messaging(props) {
    const { currUser, firstUser, messagingHeader } = props;

    // im sorry this is really bad :(
    const CONVERSATIONS = [
        {
            participants: [firstUser, 'Daughter', 'Dr. Ortega'],
            images: [katie, daughter, ortega]
        },
        {
            participants: [firstUser, 'Grandma', 'Dr. Valera'],
            images: [katie, grandma, valera]
        }
    ];
    const MESSAGES = [
        {
            username: firstUser,
            img: katie,
            content: 'Just wanted to say that these notes and your care are superb! Thank you for treating my daughter on such a short notice.',
            conversation: CONVERSATIONS[0],
            timestamp: new Date('February 6, 2022 11:13:00')
        },
        {
            username: firstUser,
            img: katie,
            content: 'Hey Dr. Ortega! I had a question about my recent appointment, where can I find my doctors notes and details on the prescribed medications?',
            conversation: CONVERSATIONS[0],
            timestamp: new Date('February 17, 2022 13:34:00')
        },
        {
            username: firstUser,
            img: katie,
            content: 'Please note that this feature is unfinished. :) Thanks Dr. Ortega! The medications prescribed seem to be just what I needed!',
            conversation: CONVERSATIONS[0],
            timestamp: new Date('February 17, 2022 14:20:00')
        },
        {
            username: firstUser,
            img: katie,
            content: 'Dr. Valera, I\'m writing to ask if there is anything that I should bring or keep in mind before my mother\'s upcoming appointment this week? Is it okay if she continues to take pain relievers?',
            conversation: CONVERSATIONS[1],
            timestamp: new Date('February 6, 2022 11:13:00')
        },
        {
            username: firstUser,
            img: katie,
            content: 'Hello Dr. Valera! Any idea when the lab results for my mother\'s x-rays will come in? Should I call you to discuss them if I have questions?',
            conversation: CONVERSATIONS[1],
            timestamp: new Date('February 8, 2022 06:02:00')
        },
        {
            username: firstUser,
            img: katie,
            content: 'Thanks Dr. Valera! I appreciate your efforts and the care provided to my mother!',
            conversation: CONVERSATIONS[1],
            timestamp: new Date('February 8, 2022 08:28:00')
        },
        {
            username: 'Dr. Ortega',
            img: ortega,
            content: 'You\'re welcome, Mrs. Wang! Stay healthy!',
            conversation: CONVERSATIONS[0],
            timestamp: new Date('February 6, 2022 11:15:00')
        },
        {
            username: 'Dr. Ortega',
            img: ortega,
            content: 'Hello Mrs. Wang! I\'ve updated your profile with doctors notes and information about your prescribed medications. Take care of yourself!',
            conversation: CONVERSATIONS[0],
            timestamp: new Date('February 17, 2022 13:41:00')
        },
        {
            username: 'Dr. Valera',
            img: valera,
            content: 'Good morning, Mrs. Wang! Thanks for reaching out, I’m happy to assist you. Healio’s web portal should have all the needed information and it\'s perfectly fine to continue taking the pain killers. Let me know if you have anymore questions!',
            conversation: CONVERSATIONS[1],
            timestamp: new Date('February 6, 2022 11:14:00')
        },
        {
            username: 'Dr. Valera',
            img: valera,
            content: 'Hello Mrs. Wang! Your mother\'s x-rays should be sent and uploaded on the patient portal shortly. Do call me if there are any questions. Stay safe!',
            conversation: CONVERSATIONS[1],
            timestamp: new Date('February 8, 2022 08:20:00')
        }
    ];
    const [currConversation, setCurrConversation] = useState(CONVERSATIONS[0]);
    const [currMessages, setCurrMessages] = useState(MESSAGES);

    if (!currConversation) {
        return (
            <div>
                <div className="md:pl-[25px] pl-[235px]">
                    {messagingHeader}
                </div>
                <hr className="pl-0 border-grey" />
                <p className="md:pl-[25px] pl-[235px]">This feature unfortunately does not work with the chosen user. Please refresh the page</p>
            </div>
        )
    }
    return (
        <div>
            <div className="md:pl-[25px] pl-[235px]">
                {messagingHeader}
            </div>
            <hr className="pl-0 border-grey" />
            <div className="md:pl-[25px] flex divide-x divide-grey h-screen pl-[235px]">
                <ChatBox currUser={currUser} currMessages={currMessages} currMessagesCallback={setCurrMessages} currConversation={currConversation} setConvoCallback={setCurrConversation} />
                <ChatNav currUser={currUser} currMessages={currMessages} currConversation={currConversation} setConvoCallback={setCurrConversation} />
            </div>
        </div>
    );
}

function ChatBox(props) {
    const { currUser, currMessages, currMessagesCallback, currConversation, setConvoCallback } = props;
    const [typedMessage, setTypedMessage] = useState('');

    if (!currConversation.participants.includes(currUser.firstName)) {
        const allConvos = [...new Set(currMessages.map(message => message.conversation))];
        const relevantConvosToUser = allConvos.filter(convo => { return convo.participants.includes(currUser.firstName) });
        setConvoCallback(relevantConvosToUser[0]);
    }

    // Scrolling hook that activates when a message is sent using a dummy div element
    const ref = useRef();
    useEffect(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, [currMessages]);

    const handleTextChange = (event) => {
        setTypedMessage(event.target.value);
    };
    const handleTextSubmit = (event) => {
        event.preventDefault();
        const newMessages = [...currMessages, {
            username: currUser.firstName,
            img: currUser.img,
            content: typedMessage,
            conversation: currConversation,
            timestamp: new Date()
        }];
        currMessagesCallback(newMessages);
        setTypedMessage('');
    };

    // Filter messages to relevant conversation + order by date
    const filterCurrConvo = currMessages.filter(message => {
        if (_.isEqual(message.conversation, currConversation)) {
            return message;
        }
    });
    filterCurrConvo.sort((a, b) => {
        return a.timestamp - b.timestamp;
    });

    const convoArray = filterCurrConvo.map((message, index) => {
        return <OneMessage currUser={currUser} message={message} key={index} />;
    });
    // Label element has css rules that hide it from non-screen readers
    return (
        <div className="grow-[2]">
            <div className="animate-popup h-[75%] overflow-y-auto">
                {convoArray}
                <div ref={ref} />
            </div>
            <form className="flex gap-3 mt-2 justify-center" onSubmit={handleTextSubmit}>
                <label className="absolute left-[-100vw]">Type something here...</label>
                <FontAwesomeIcon className="my-auto text-dark-grey" icon={faImage} size="lg" aria-label="Attach an image here" />
                <FontAwesomeIcon className="my-auto text-dark-grey" icon={faPaperclip} size="lg" aria-label="Attach a document here" />
                <input className="p-[12px] w-[75%] rounded-[15px] bg-grey" value={typedMessage}
                    onChange={handleTextChange} placeholder="Type something here..." aria-label="Send a message" autoComplete="off" />
                <FontAwesomeIcon className="my-auto text-dark-grey" icon={faFaceSmile} size="lg" aria-label="Send an emoji" />
            </form>
        </div>
    );
}

function OneMessage(props) {
    const { currUser, message } = props;
    let messageStyling;
    let imgStyling;

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = message.timestamp.getMonth();
    const day = message.timestamp.getDate();
    const year = message.timestamp.getFullYear();

    let fullTimestamp = monthNames[monthIndex] + ' ' + day.toString() + ', ' + year.toString();
    const currDate = new Date();
    const currDateTimestamp = monthNames[currDate.getMonth()] + ' ' + currDate.getDate().toString() + ', ' + currDate.getFullYear().toString();

    // Today at ...
    if (fullTimestamp === currDateTimestamp) {
        const hour = message.timestamp.getHours();
        const minutes = message.timestamp.getMinutes();
        let hourString;
        let minutesString;
        let timePeriod;
        if (hour >= 12) {
            if (hour === 12) {
                hourString = hour.toString();
            } else {
                hourString = (hour - 12).toString();
            }
            timePeriod = 'PM';
        } else {
            if (hour === 0) {
                hourString = '12';
            } else {
                hourString = hour.toString();
            }
            timePeriod = 'AM';
        }
        if (minutes < 10) {
            minutesString = '0' + minutes.toString();
        } else {
            minutesString = minutes.toString();
        }
        fullTimestamp = 'Today at ' + hourString + ':' + minutesString + ' ' + timePeriod;
    }
    // Style message text and image based on current user
    if (currUser.firstName === message.username) {
        messageStyling = 'ml-auto bg-light-green rounded-[15px_15px_0_15px]';
        imgStyling = 'mr-[45px]';
        return (
            <div>
                <p className="text-dark-grey text-center m-2">{fullTimestamp}</p>
                <div className="flex gap-2">
                    <p className={messageStyling + " sm:max-w-[300px] md:max-w-[400px] max-w-[500px] p-[12px] my-[10px]"}>{message.content}</p>
                    <img className={imgStyling + " rounded-full inline w-10 h-10 self-end"} src={message.img} />
                </div>
            </div>
        );
    } else {
        messageStyling = 'mr-auto bg-grey rounded-[15px_15px_15px_0]';
        imgStyling = '';
        return (
            <div>
                <p className="text-dark-grey text-center mt-2">{fullTimestamp}</p>
                <div className="flex gap-2">
                    <img className={imgStyling + " rounded-full inline w-10 h-10 self-end"} src={message.img} />
                    <p className={messageStyling + " sm:max-w-[250px] md:max-w-[400px] max-w-[500px] p-[12px] my-[10px]"}>{message.content}</p>
                </div>
            </div>
        );
    }
}

function ChatNav(props) {
    const { currUser, currMessages, currConversation, setConvoCallback } = props;

    const allConvos = [...new Set(currMessages.map(message => message.conversation))];
    const relevantConvosToUser = allConvos.filter(convo => { return convo.participants.includes(currUser.firstName) })
    const convoArray = relevantConvosToUser.map((convo, index) => <OneConversation currUser={currUser} currConversation={currConversation} convo={convo} setConvoCallback={setConvoCallback} key={index} />);

    return (
        <div className="flex flex-col divide-y divide-grey overflow-y-auto">
            {convoArray}
        </div>
    );
}

function OneConversation(props) {
    const { currUser, currConversation, convo, setConvoCallback } = props;
    let userNamesInConvo = '';
    let selectedConvo = '';
    if (currConversation === convo) {
        selectedConvo = ' transition bg-dark-green font-bold text-dark-blue'
    };

    const userArray = convo.images.map((userImg, index) => {
        let userObj = {};
        userObj[convo.participants[index]] = userImg;
        return userObj;
    });
    const userImgArray = userArray.map((user, index) => {
        const userImg = user[Object.keys(user)[0]];
        if (!_.isEqual(currUser.img, userImg)) {
            const userName = Object.keys(user)[0];
            userNamesInConvo += userName + ', ';
            return <UserInConversation user={user} index={index} key={index} />;
        };
    });
    // remove comma and space
    userNamesInConvo = userNamesInConvo.slice(0, -2);
    const handleConvoClick = () => {
        setConvoCallback(convo);
    };

    return (
        <div className={'flex flex-col overflow-x-auto whitespace-nowrap hover:cursor-pointer hover:bg-light-blue hover:text-black hover:text-bold' + selectedConvo} onClick={handleConvoClick}>
            <div className="ml-2 mt-2">
                {userImgArray}
            </div>
            <p className="md:hidden ml-2 mr-6 my-2">{userNamesInConvo}</p>
        </div>
    );
}

function UserInConversation(props) {
    const { user, index } = props;
    const userName = Object.keys(user)[0];
    const userImg = user[userName];
    let overlapStyle = '';
    if (index > 1) {
        overlapStyle = ' relative left-[-10px]';
    }
    return <img className={'rounded-full inline w-10 h-10 mb-2' + overlapStyle} src={userImg} alt={userName} />
}