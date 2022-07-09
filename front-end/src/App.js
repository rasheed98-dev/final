
import './App.css';
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import QuesContext, { QuesContextProvider } from './context/questions'
import Welcome from './pges/welcome';
// import Questions from './pges/question';
import { Switch } from 'react-router-dom';
// import Question from './pges/questionDet';
import { Link } from 'react-router-dom';
// import Category from './pges/category';
// import ShowTheScore from './pges/showScore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import NewTeam from './pges/creat-teams';
import { Button } from 'react-bootstrap';
import Navbaar from './components/navbar';
import MyTimer from './components/timer';
import LoadingSpinner from './components/loadingS';
import AuthPage from './pges/Auth';





const Question = React.lazy(() => import('./pges/questionDet'));
const Questions = React.lazy(() => import('./pges/question'));
const Category = React.lazy(() => import('./pges/category'));
const ShowTheScore = React.lazy(() => import('./pges/showScore'));
const NewTeam = React.lazy(() => import('./pges/creat-teams'));

function App() {
  const [teams, setTeams] = useState(['team_1'])
  const [score, setScore] = useState({'team_1':0})
  const [help_1, setHelp_1] = useState({'team_1':0})
  const [help_2, setHelp_2] = useState({'team_1':0})
  const [help_3, setHelp_3] = useState({'team_1':0})
  let [team, setTeam] = useState('team_1')
  const [dis, setDis]=useState(true)
 
  

  const [selected, setSelected] = useState(1);
  let [teamN, setTeamN] = useState(0)
  const arr =[]
  const obj = {}
  const hlp1 ={}
  let help_11 ={}

  const hlp2 ={}
  let help_22 ={}

  const hlp3 ={}
  let help_33 ={}

  // const obj ={}
  // const obj2={}
  let history= useHistory()


  // ["team_1","team_2","team_3","team_4"]
  // {"team_1":0, "team_2":0,"team_3":0,"team_4":0}

  const dateChangeHandler = (event) => {
    setTeamN(event.target.value);
    if (event.target.value>=0) {
      setDis(false)
      // setTeamN(event.target.value);
      
    }
   //  console.log(teamN)
    
   };

   const set_teams =()=>{
    setTeams(arr)
    
    setScore(obj)
    setHelp_1(hlp1)
    setHelp_2(hlp2)
    setHelp_3(hlp3)
   
     
   }

  const submitHandler = (event) => {
    event.preventDefault();
     let t = event.target.value
     let element
    //  const arr =[]
    //  const obj = {}
    //  const obj2={}
    for (let i = 1; i <= teamN; i++) {
       element = `team_${i}`;
       arr.push(element)
       obj[element]=0
       hlp1[element]=2
       hlp2[element]=2
       hlp3[element]=2


      setTeam(teams[0])
     
  
     }
   
     console.log(typeof(teams[0]))
    //  setTeams(arr)
    set_teams()
    
    //  setScore(obj)
    //  setHelp_1(obj2)
     
     

    // console.log("hhh");
    if(arr.length==0){
      history.push('/')

    }
    else{ history.push('/category')
  }
  
  // history.push('/category')
   
    console.log(teams)
     console.log(score)
     console.log(team)



  
  };

  

  // useEffect(handle_team(),[])
  const handle_team=()=>{
    
   
  console.log(teams[1])
  if(teams.length==1){
    setTeam(teams[0])
  }else{
    setSelected(prev => {
      if (prev === teams.length-1) {
        return 0;
      } else {
        return prev + 1;
      }
      
    });
    // console.log(teams[selected])
  setTeam(teams[selected])

  }
 

  }

  const handle_score =(newScore)=>{
    setScore({...score, ...newScore})
    console.log(score)


  }

 


const handle_help =(n)=>{
 if(n==1){
  console.log(team)
  let help = help_1[team]-1
  help_11[team]= help
 setHelp_1({...help_1, ...help_11})

 }
 else if(n==2){
  let help = help_2[team]-1

  help_22[team]= help
 setHelp_2({...help_2, ...help_22})
 
 console.log(help_22)

 }
 else if(n==3){
  let help = help_3[team]-1

  help_33[team]= help
 setHelp_3({...help_3, ...help_33})
 

 }
 
//  console.log(help_22)
}

const handle_helpp =(n)=>{
  let help_ ={}
  let help__={}
  if(n==1){
    help_= hlp1
    help__= help_11
  }
  if(n==2){
    help_= hlp2
    help__= help_22
  }
  if(n==3){
    help_= hlp3
    help__= help_33
  }
    console.log(team)
     let help = help_[team]-1
     help__[team]= help
    setHelp_1({...help_, ...help__})
    console.log(help_1)
  }

// const times = new Date();
// times.setSeconds(times.getSeconds() + time);
  return (
    
    <div>
      
     <Navbaar team={team} team_score={score[team]}/>
     {/* <MyTimer expiryTimestamp={time}/>      */}
    

     <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
    
     
      <Switch>
        
      <Route exact path='/'>
        <NewTeam submitHandler={submitHandler} teamN={teamN} dateChangeHandler={dateChangeHandler} dis={dis} />
     
     
      </Route>

      <Route path='/Auth'>
        <AuthPage></AuthPage>

      </Route>


      <Route exact path='/score'>
     <ShowTheScore score={score}/>
      </Route>


      <Route exact path='/category/'>
        <Category team={team} team_score={score[team]}></Category>
        {/* handle_team={handle_team} */}
        
      </Route>
      <Route exact path='/category/:cat/question/'>
          <Questions team={team}/>
      </Route>

      <Route  path='/category/:cat/question/:id'>
          <Question team={team}
           handle_score={handle_score} 
           handle_team={handle_team} 
           score={score}
            handle_helpp={handle_helpp} handle_help={handle_help}
           help_1={help_1[team]} help_2={help_2[team]}  help_3={help_3[team]} />
           {/* help_2={help_2[team]}  help_3={help_3[team]} */}
           {/* handle_help={handle_help} */}
      </Route>

      </Switch>
      </Suspense>
      
     
      {/* {ctx.question.map(ques => <div>{i++}</div>)} */}
    </div>
    
      //  <div>{ctx.question}</div>
    
     
     
    
  );
}

export default App;





 //   setSelected(prev => {
  //     if (prev === teams.length-1) {
  //       return 0;
  //     } else {
  //       return prev + 1;
  //     }
      
  //   });
  //   // console.log(teams[selected])
  // setTeam(teams[selected])



  // const handle_help1 =()=>{
  //   console.log(team)
  //    let help = help_1[team]-1
  //    help_11[team]= help
  //   setHelp_1({...help_1, ...help_11})
  //   console.log(help_1)
  // }
  
  // const handle_help2 =()=>{
    
  //    let help = help_2[team]-1
  
  //    help_22[team]= help
  //   setHelp_2({...help_2, ...help_22})
    
  //   console.log(help)
  // }
  
  // const handle_help3 =()=>{
    
  //   let help = help_3[team]--
  
  //   help_33[team]= help
  //  setHelp_3({...help_3, ...help_33})
   
  // //  console.log(help_22)
  // }
