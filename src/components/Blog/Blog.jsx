import React, { useRef } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Blog(props) {
   
    const postContentRef = useRef(null);

    let author = 'Gracias Kasongo';
    let post;
  

    if (props.data != null ) {
        post = props.data;
    } else {
        return;
    }

    return (
        <Link to={'/blog/view?q=' + post.id} className="border rounded p-4  bg-white mb-3 d-block text-secondary">
            <div className="d-flex border-bottom pb-2 position-relative">
                <img src="/img/_q.jpg" alt="" style={{ width: "2.5rem", height: "2.5rem" }} className="rounded-circle bs-primary-2"/>
                <div style={{ marginLeft: "10px", marginTop: "-4px" }}>
                    <strong>{ author}</strong>
                    <small
                        className="d-block text-montserrat" 
                        style={{ fontSize: ".8rem", marginTop: "-2px" }} >
                        <i className="fa fa-calendar-alt"/>  12/12/2022
                    </small>
                </div>
                <small
                    className='bg-primary-light-7 px-2 rounded-pill position-absolute top-0 end-0'>
                    Posted
                </small>
            </div>
            
            <div className="py-3">
                <strong>
                {post.title.substring(0,110)+'...'}
                </strong>
               
                <div className='mt-2'>
                    <i className="fa fa-clipboard-list" style={{marginRight: '7px'}}/>
                    Business expertise | Accounting  
                </div>
            </div>
            
            <div className='d-flex align-items-center  border-top pt-2'>
                <div className="d-flex align-items-center">
                    <span className="fa fa-heart text-primary"></span>
                    <small className="text-montserrat" style={{ marginLeft:"5px" }}>0 Like(s) </small>
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <i className="fa fa-comments" />
                    <small className="text-montserrat" style={{ marginLeft:"5px" }}>0 Comment(s) </small>
                </div>
            </div>
        </Link>
    )
}
