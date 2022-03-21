import React from 'react';

export default function PlaceHolder(props) {
    const { currUser, templateHeader } = props;
    return (
        <div className="flex flex-col">
            {templateHeader}
        </div>
    );
}