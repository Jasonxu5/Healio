import React, { useState, useEffect } from 'react';
import Header from './Header.js';

import katie from './img/katie.png';
import ortega from './img/ortega.png';
import valera from './img/valera.png';

// sry idk how to do dates
const MESSAGES = [
    {
        username: 'Katie',
        img: katie,
        content: 'Just wanted to say that these notes and your care are superb! Thank you for treating my daughter on such a short notice.',
        conversationIndex: 1,
        timestamp: 1
    },
    {
        username: 'Katie',
        img: katie,
        content: 'Hey Dr. Ortega! I had a question about my recent appointment, where can I find my doctors notes and details on the prescribed medications?',
        conversationIndex: 1,
        timestamp: 3
    },
    {
        username: 'Katie',
        img: katie,
        content: 'Thanks Dr. Ortega! The medications prescribed seem to be just what I needed!',
        conversationIndex: 1,
        timestamp: 5
    },
    {
        username: 'Katie',
        img: katie,
        content: 'Dr. Valera, I\'m writing to ask if there is anything that I should bring or keep in mind before my mother\'s upcoming appointment this week? Is it okay if she continues to take pain relievers?',
        conversationIndex: 2,
        timestamp: 1
    },
    {
        username: 'Katie',
        img: katie,
        content: 'Hello Dr. Valera! Any idea when the lab results for my mother\'s x-rays will come in? Should I call you to discuss them if I have questions?',
        conversationIndex: 2,
        timestamp: 3
    },
    {
        username: 'Katie',
        img: katie,
        content: 'Thanks Dr. Valera! I appreciate your efforts and the care provided to my mother!',
        conversationIndex: 2,
        timestamp: 5
    },
    {
        username: 'Dr. Ortega',
        img: ortega,
        content: 'You\'re welcome, Mrs. Wang! Stay healthy!',
        conversationIndex: 1,
        timestamp: 2
    },
    {
        username: 'Dr. Ortega',
        img: ortega,
        content: 'Hello Mrs. Wang! I\'ve updated your profile with doctors notes and information about your prescribed medications. Take care of yourself!',
        conversationIndex: 1,
        timestamp: 4
    },
    {
        username: 'Dr. Valera',
        img: valera,
        content: 'Good morning, Mrs. Wang! Thanks for reaching out, I’m happy to assist you. Healio’s web portal should have all the needed information and it\'s perfectly fine to continue taking the pain killers. Let me know if you have anymore questions!',
        conversationIndex: 2,
        timestamp: 2
    },
    {
        username: 'Dr. Valera',
        img: valera,
        content: 'Hello Mrs. Wang! Your mother\'s x-rays should be sent and uploaded on the patient portal shortly. Do call me if there are any questions. Stay safe!',
        conversationIndex: 2,
        timestamp: 4
    }
];

export default function Messaging(props) {
    const { currUser, familyInfo, setUserCallback, signedIn } = props;
    const [currConversationIndex, setCurrConversationIndex] = useState(1);
    const [currMessages, setCurrMessages] = useState(MESSAGES);

    return (
        <div>
            <Header title={'Messaging'} currUser={currUser} familyInfo={familyInfo} setUserCallback={setUserCallback} signedIn={signedIn} />
            <hr />
            <div className="flex divide-x w-[97.5%]">
                <ChatBox currUser={currUser} currMessages={currMessages} currMessagesCallback={setCurrMessages} currConversationIndex={currConversationIndex} />
                <ChatNav currUser={currUser} currMessages={currMessages} setConvoCallback={setCurrConversationIndex} />
            </div>
        </div>
    );
}

function ChatBox(props) {
    const { currUser, currMessages, currMessagesCallback, currConversationIndex } = props;
    const [typedMessage, setTypedMessage] = useState('');

    // // Handle enter text input for chat
    // useEffect(() => {
    //     const listener = event => {
    //         if (event.code === "Enter" || event.code === "NumpadEnter") {
    //             console.log("Enter key was pressed. Run your function.");
    //             event.preventDefault();
    //             setTypedMessage(event.target.value);
    //         }
    //     };
    //     document.addEventListener("keydown", listener);
    //     return () => {
    //         document.removeEventListener("keydown", listener);
    //     };
    // }, [typedMessage]);

    const handleTextChange = (event) => {
        setTypedMessage(event.target.value);
    };
    const handleTextSubmit = (event) => {
        event.preventDefault();
        const newMessages = [...currMessages, {
            username: currUser.firstName,
            img: currUser.img,
            content: typedMessage,
            conversationIndex: currConversationIndex,
            timestamp: 6
        }];
        currMessagesCallback(newMessages);
    };

    // Filter messages to relevant conversation + order by date
    const filterCurrConvo = currMessages.filter(message => {
        if (message.conversationIndex === currConversationIndex) {
            return message;
        }
    });
    filterCurrConvo.sort((a, b) => {
        return a.timestamp - b.timestamp;
    });

    const convoArray = filterCurrConvo.map((message, index) => {
        return <OneMessage currUser={currUser} message={message} key={index} />;
    });
    return (
        <div className="grow pl-[235px]">
            <div className="flex flex-col overflow-auto">
                {convoArray}
            </div>
            <form className="" onSubmit={handleTextSubmit}>
                <label className="absolute left-[-100vw]">Type something here...</label>
                <input onChange={handleTextChange} placeholder="Type something here..." aria-label="Send a message" autoComplete="off" />
            </form>
        </div>
    );
}

function OneMessage(props) {
    const { currUser, message } = props;
    let messageStyling;
    let imgStyling;

    // Style message text and image based on current user
    if (currUser.firstName === message.username) {
        messageStyling = 'ml-auto bg-light-green rounded-[15px_15px_0_15px]';
        imgStyling = 'mr-[45px]';
        return (
            <div className="flex gap-2">
                <p className={messageStyling + " max-w-[627px] p-[12px] my-[10px]"}>{message.content}</p>
                <img className={imgStyling + " rounded-full inline w-10 h-10 self-end"} src={message.img} />
            </div>
        );
    } else {
        messageStyling = 'bg-grey rounded-[15px_15px_15px_0]';
        imgStyling = '';
        return (
            <div className="flex gap-2">
                <img className={imgStyling + " rounded-full inline w-10 h-10 self-end"} src={message.img} />
                <p className={messageStyling + " max-w-[627px] p-[12px] my-[10px]"}>{message.content}</p>
            </div>
        );
    }
}

function ChatNav(props) {
    const { currMessages, setConvoCallback } = props;

    const allConvos = [...new Set(currMessages.map(message => message.conversationIndex))];
    const convoArray = allConvos.map((convo, index) => <OneConversation convo={convo} key={index} />)

    const handleConvoClick = (event) => {
        setConvoCallback(parseInt(event.target.id));
    }
    return (
        <div className="ml-0 overflow-auto">
            <div onClick={handleConvoClick}>
                {convoArray}
            </div>
        </div>
    );
}

function OneConversation(props) {
    const { convo } = props;
    return <p className="hover:cursor-pointer" id={convo}>Conversation {convo}</p>;
}