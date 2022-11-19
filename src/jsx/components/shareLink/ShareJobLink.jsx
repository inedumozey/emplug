import React from 'react';
import './style.css';
import CompanyLogo from '../CompanyLogo/company-logo';
import GetAuthor from '../GetAuthor/get-author';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {
    Copy
} from 'phosphor-react'

import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon

  } from "react-share";

export default function ShareJobLink({jobDetails, setShowShare}) {
   
    const url = `${process.env.REACT_APP_FRONTEND_BASE_URL}/job`;

    return (
        <div className='sharelink'>
             <div
                style={{
                    width: '100%',
                    display: 'flex',
                    padding: '1rem',
                    paddingBottom: 0,
                    borderBottom: '2px solid #00b500'
                }}
                >
                <CompanyLogo
                    logoUrl={jobDetails.author.logo}
                    name={jobDetails.author.organizationName}
                />
                <div style={{ width: '50%', marginLeft: '1rem', marginTop: 6  }}>
                    <h4 style={{lineHeight: '1.5rem'}}>
                    <GetAuthor author={jobDetails.author.organizationName} />
                    </h4>
                    <p style={{ marginBottom: '0.5rem'}}>
                    {jobDetails.title} |
                    <span
                        style={{ color: '#7f7f7f', marginLeft: '0.5rem' }}
                    >
                        {jobDetails.location}
                    </span>
                    </p>
                </div>
            </div>

            <div
                style={{
                    padding: '10px',
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
                >
                    <div className="shareBtn">
                        <FacebookShareButton url={`${url}/${jobDetails._id}`}>
                            <FacebookIcon size={32} round={true}/>
                        </FacebookShareButton>
                    </div>

                    <div className="shareBtn">
                        <LinkedinShareButton url={`${url}/${jobDetails._id}`}>
                            <LinkedinIcon size={32} round={true}/>
                        </LinkedinShareButton>
                    </div>

                    <div className="shareBtn">
                        <PinterestShareButton url={`${url}/${jobDetails._id}`}>
                            <PinterestIcon size={32} round={true}/>
                        </PinterestShareButton>
                    </div>

                    <div className="shareBtn">
                        <RedditShareButton url={`${url}/${jobDetails._id}`}>
                            <RedditIcon size={32} round={true}/>
                        </RedditShareButton>
                    </div>

                    <div className="shareBtn">
                        <TelegramShareButton url={`${url}/${jobDetails._id}`}>
                            <TelegramIcon size={32} round={true}/>
                        </TelegramShareButton>
                    </div>

                    <div className="shareBtn">
                        <WhatsappShareButton url={`${url}/${jobDetails._id}`}>
                            <WhatsappIcon size={32} round={true}/>
                        </WhatsappShareButton>
                    </div>

                    <div className="shareBtn">
                        <EmailShareButton url={`${url}/${jobDetails._id}`}>
                            <EmailIcon size={32} round={true}/>
                        </EmailShareButton>
                    </div>

                    <div className="shareBtn">
                        <CopyToClipboard
                            text={`${url}/${jobDetails._id}`}
                            onCopy={() => setShowShare(false) }>
                            <Copy size={32} />
                        </CopyToClipboard>
                    </div>                  
            </div>
        </div>
    )
}
