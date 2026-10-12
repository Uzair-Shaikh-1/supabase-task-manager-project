import React, { useEffect, useState } from 'react'
import Task from './component/Task';
import Auth from './component/Auth';
import { supabase } from './supabase-client';

const App = () => {
  const [session, setsession] = useState(null)
  
  const fetchsession = async () =>{ 
    const currentsession = await supabase.auth.getSession()
    console.log(currentsession);
    
    setsession(currentsession.data.session)
}
 
  useEffect(() => {
   fetchsession()

   const {data:autListener} = supabase.auth.onAuthStateChange((_event,session) =>{
      setsession(session)
   })

   return () =>{
    autListener.subscription.unsubscribe()
   }
  }, [])
  
const logout = async () =>{
await supabase.auth.signOut()
}

  return (
    <>
    {session ?<> <button onClick={logout}>Logout</button>  ( <Task session={session}/>)  </> : ( <Auth/> )  }
    </>
  )
}

export default App