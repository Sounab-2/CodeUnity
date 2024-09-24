// src/components/ShareComponent.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ShareComponent = ({ meetId, meetName }) => {

    const shareText = `Join the meeting: ${meetName}. Meeting ID: ${meetId}`;
    const encodedText = encodeURIComponent(shareText);

    return (
        <div className="flex flex-col gap-4 p-4">
            <h3 className="text-lg font-bold">Share Meeting Details</h3>

            {/* Share via WhatsApp */}
            <button className="btn bg-green-500 text-white">
                <a
                    href={`https://wa.me/?text=${encodedText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                    Share via WhatsApp
                </a>
            </button>

            {/* Share via Twitter */}
            <button className="btn bg-blue-500 text-white">
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodedText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    <FontAwesomeIcon icon={faTwitter} className="mr-2" />
                    Share via Twitter
                </a>
            </button>

            {/* Share via Facebook */}
            <button className="btn bg-blue-700 text-white">
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                >
                    <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                    Share via Facebook
                </a>
            </button>

            {/* Share via Email */}
            <button className="btn bg-red-600 text-white">
                <a
                    href={`mailto:?subject=Join the Meeting&body=${encodedText}`}
                    className="flex items-center"
                >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Share via Email
                </a>
            </button>
        </div>
    );
};

export default ShareComponent;
