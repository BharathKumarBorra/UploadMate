import { Route } from "react-router-dom";

const ProtectedRoute=(props)=> {
  



    const { component: Component, ...rest } = props;
    
    return (
      <Route
        {...rest}
        render={(props) =>
         <Component {...props} /> 
        }
      />
    );
  
}

export default ProtectedRoute;
