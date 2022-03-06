import React, { useState } from 'react';
import Header from './Header.js';

// sry idk how to do dates
const MESSAGES = [
    {
        username: 'Katie',
        content: 'Just wanted to say that these notes and your care are superb! Thank you for treating my daughter on such a short notice.',
        conversationIndex: 1,
        timestamp: 1
    },
    {
        username: 'Katie',
        content: 'Hey Dr. Ortega! I had a question about my recent appointment, where can I find my doctors notes and details on the prescribed medications?',
        conversationIndex: 1,
        timestamp: 3
    },
    {
        username: 'Katie',
        content: 'Thanks Dr. Ortega! The medications prescribed seem to be just what I needed!',
        conversationIndex: 1,
        timestamp: 5
    },
    {
        username: 'Katie',
        content: 'Dr. Valera, I\'m writing to ask if there is anything that I should bring or keep in mind before my mother\'s upcoming appointment this week? Is it okay if she continues to take pain relievers?',
        conversationIndex: 2,
        timestamp: 1
    },
    {
        username: 'Katie',
        content: 'Hello Dr. Valera! Any idea when the lab results for my mother\'s x-rays will come in? Should I call you to discuss them if I have questions?',
        conversationIndex: 2,
        timestamp: 3
    },
    {
        username: 'Katie',
        content: 'Thanks Dr. Valera! I appreciate your efforts and the care provided to my mother!',
        conversationIndex: 2,
        timestamp: 5
    },
    {
        username: 'Dr. Ortega',
        content: 'You\'re welcome, Mrs. Wang! Stay healthy!',
        conversationIndex: 1,
        timestamp: 2
    },
    {
        username: 'Dr. Ortega',
        content: 'Hello Mrs. Wang! I\'ve updated your profile with doctors notes and information about your prescribed medications. Take care of yourself!',
        conversationIndex: 1,
        timestamp: 4
    },
    {
        username: 'Dr. Valera',
        content: 'Good morning, Mrs. Wang! Thanks for reaching out, I’m happy to assist you. Healio’s web portal should have all the needed information and it\'s perfectly fine to continue taking the pain killers. Let me know if you have anymore questions!',
        conversationIndex: 2,
        timestamp: 2
    },
    {
        username: 'Dr. Valera',
        content: 'Hello Mrs. Wang! Your mother\'s x-rays should be sent and uploaded on the patient portal shortly. Do call me if there are any questions. Stay safe!',
        conversationIndex: 2,
        timestamp: 4
    }
];

export default function Messaging(props) {
    const { currUser, familyInfo, setUserCallback, signedIn } = props;
    const [currConversationIndex, setCurrConversationIndex] = useState(1);

    return (
        <div>
            <Header title={'Messaging'} currUser={currUser} familyInfo={familyInfo} setUserCallback={setUserCallback} signedIn={signedIn} />
            <hr />
            <div className="flex divide-x w-[97.5%]">
                <ChatBox currConversationIndex={currConversationIndex} />
                <ChatNav setConvoCallback={setCurrConversationIndex} />
            </div>
        </div>
    );
}

function ChatBox(props) {
    const { currConversationIndex } = props;

    // Filter messages to relevant conversation + order by date
    const filterCurrConvo = MESSAGES.filter(message => {
        if (message.conversationIndex === currConversationIndex) {
            return message;
        }
    });
    filterCurrConvo.sort((a, b) => {
        return a.timestamp - b.timestamp;
    });

    const convoArray = filterCurrConvo.map((message, index) => {
        return <OneMessage message={message.content} key={index} />;
    });
    return (
        <div className="pl-[235px] overflow-auto">
            {convoArray}
        </div>
    );
}

function OneMessage(props) {
    const { message } = props;
    return <p>{message}</p>;
}

function ChatNav(props) {
    const { setConvoCallback } = props;

    const allConvos = [...new Set(MESSAGES.map(message => message.conversationIndex))];
    const convoArray = allConvos.map(convo => <OneConversation convo={convo} />)
    
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