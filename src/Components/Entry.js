import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const Entry  = ()=> {
    const { entries } = useSelector(state => state)
    const {id} = useParams()

    useEffect(() => {
        if (auth.id) {
          dispatch(fetchEntries(id));
        }
      }, [dispatch, auth.id, id]);
    
    return (
        <div>
            <h2>This is one journal entry</h2>
            <ul>
            {
                entries.map( entry => {
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
    )
}

export default Entry;
