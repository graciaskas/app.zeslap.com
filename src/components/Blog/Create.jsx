import React, { useState,useEffect,useRef } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AppBarCreate from '../AppBarCreate';
import Keyboard from '../Keyboard';
import { GlobalContext } from "../../contexts/GlobalContext";



export default function Create() {
   //writing area ref
    const writingAreaRef = useRef(null);
    //state
    const [ state, setState ] = useState({
        title: null,
        category: null,
        content: null
    });

    const { BASE_URI } = useContext(GlobalContext);
    
    const submitBlog = async (event) => {
        event.preventDefault();
        const form = event.target;
        setState({
            title: form[ 'title' ].value,
            category: form[ 'category' ].value,
            content: writingAreaRef.current.innerHTML
        });
        if (state.title) {
            try {
                const response = await fetch(BASE_URI + '/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(state)
                });
                const responseJSON = await response.json();
                
                if (response.status == 200) {
                    return window.location.pathname = '/blogs';
                }
                console.log(responseJSON.error);
            } catch (error) {
                console.log(error);
            }
            
        }
    };



    useEffect(function () {
        
    },[]);

   
    return (
        <div className='container'>
            <div className="row">
        
                <div className="col-12">
                    <form className="text__form" onSubmit={submitBlog}>
                        <div className="row">

                            <AppBarCreate appName='Blogs' />
                            
                            <div className="col-12">
                                <div className="p-3 bg-white mt-3 shadow-default rounded">
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <div className="input-group border  w-100 mt-2 ">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-book"/>
                                                </span>
                                                <input type="text" placeholder="Blog title" required name='title'/>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-12">
                                            <div className="input-group border  w-100 mt-2">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-th"/>
                                                </span>
                                                <input type="text" placeholder="Blog category" required name='category'/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <Keyboard refElement={ writingAreaRef } />
                        </div>
                       
                    </form>
                </div>
            </div>
        </div>
    )
}
