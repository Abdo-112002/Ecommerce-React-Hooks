

import { Navigate , useLocation} from "react-router-dom";
import { useDataContext } from "../context/DataContext"



export function RequireUerAuth({children}) {
    const {user} = useDataContext();
    if(user){
        return <Navigate to='/'/>
    }
    return children;
}

export function RequireProfileAuth({children}) {
  const {user} = useDataContext();
  const location = useLocation();
  if(!user){
      return <Navigate to='/login' state={{path : location.pathname}}/>
  }
  return children;
}



