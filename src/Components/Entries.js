import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const Entries  = ()=> {
    const { entries } = useSelector(state => state)
    
    return (
        <div>
            <h2>These are all your journal entries</h2>
            <div className="formBlock">
            <div className="form">
        <ul>
            {
                entries.map( review => {
                    return (
                        <li>
                           Subject: {entries.subject}<br/>
                           Description:  {entries.description}<br/>
                            
                        </li>
                    )
                })
            }
        </ul>
        </div>
        </div>
        </div>
    )
}

export default Entries;
