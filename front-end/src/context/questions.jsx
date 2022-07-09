import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

const QuesContext = React.createContext({
  // isLoggedIn: false,
  
});


export const QuesContextProvider = (props) => {
    const [question, setQuestion] = useState([]);
    const authCtx = useContext(AuthContext);

    function fetchQuesHandler() {
        fetch('http://127.0.0.1:8000/rest/question/',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Token ${authCtx.token}`
          }
        } )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data)
            setQuestion(data)
            //  console.log(authCtx.token)
            
          });
          
    
    
          console.log(question)
      }
    
      useEffect(() => {
        fetchQuesHandler();
      }, [authCtx.token]);
    
  const filter_q =(pk)=>{
   

    
    
    setQuestion(question.filter(ques=> ques.pk !== pk))
    // console.log(filterd)
    //  console.log(pk)


}

    return (
      <QuesContext.Provider
        value={{
          question: question,
          filter_q: filter_q
        }}
      >
        {props.children}
      </QuesContext.Provider>
    );
  };
  
  export default QuesContext;