import React from 'react'
import { Link } from 'react-router-dom';

export default function Contact({ contact }) {
    const { name, content, subject, email,read } = contact;
    
    return (
        <div className="rounded p-4 bg-white border mb-3">
            <div className="d-flex border-bottom position-relative pb-2">
                <div className="icon_round bg-secondary text-white">
                    <i className="fa fa-user" />
                </div>
                <div style={{ marginLeft: "5px", marginTop: "-5px" }}>
                    <strong>{name}</strong>
                    <small className="d-block" style={{ fontSize: ".75rem" }} >12/12/2022</small>
                </div>
                {
                    read ?
                        <small
                            className='position-absolute top-0 end-0 bg-secondary-light-7 rounded-pill px-2'>Read</small> :
                        <small
                            className='position-absolute top-0 end-0 bg-primary-light-7 rounded-pill px-2'>Not read
                        </small>
                }
            </div>

            <div className="py-3">
                <strong className='mb-2 d-block' style={{ fontSize: '.85rem' }}>
                    Object : {subject.substring(0,110)+'...'}
                </strong>
                <p style={{ wordBreak: 'break-word' }}>{content.substring(0, 100) + '...'}</p>
                <div className='mt-2'>
                    <i className="fa fa-envelope" style={{marginRight: '7px'}}/>{email}                 
                </div>
           </div>
           
            <div className='d-flex align-items-center justify-content-between border-top pt-3'>
                <Link
                    role={'button'}
                    to={'./view?q=' + contact.id}
                    className='text-decoration-underline btn-sm bg-primary text-white rounded-pill'>
                    Read more
                </Link>
            </div>
        </div>
    );
}
