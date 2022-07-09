import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import MyTimer from '../components/timer';
import Countdown from 'react-countdown';
import { useTimer } from 'react-timer-hook';
import QuesContext from '../context/questions';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import HelpM from '../components/HelpM';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../questionDet.css'
import Timer from '../components/timer';
// import axios from 'axios'
function Question(props) {

    let { id, cat } = useParams();
    // console.log(typeof(id))
    
   let coda = id.split("_")
  //  console.log(coda)
   let history= useHistory()


     

     
  

    const [ques, setQues] = useState({}); 
    const [ans, setAns] = useState([]);
    const scoreeData = {}
    
    const [time, setTime]= useState(null)
    const [dis, setDis] = useState(false)
    const [correct, setCorrect]= useState(false)

    const [show, setShow] = useState(false);

    let [is_right, setIs_right]=useState("btn btn-primary")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



  const set_true_correct=()=>{
    setCorrect(true)

  }


   
  


    const fetchQuestionHandler= async()=>{
      const response= await fetch(`http://127.0.0.1:8000/rest/question/${parseInt(coda[0])}`)
      const data = await response.json()
      // let i = data.seconds
      setQues(data)
      setAns(data.answer)
      console.log(data.seconds);
      setTime(data.seconds)
      // console.log(time)
    };

    
     //  timer()
      
     
   
      useEffect(() => {
       
       fetchQuestionHandler()
      //  timer()
       
      //  console.log(time)
        
      }, []);


    const shuffleArray=(array)=> {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }



    const my_help1 =()=>{
      let newFlse =[]
      let newTruth =[]

      // newFlse= ans.filter(fa=> fa.is_right==false)
      // newTruth= ans.filter(fa=> fa.is_right==true)
      // console.log(newTruth)
      // setAns([newFlse[0],...newTruth])

      for(let i =0; i<= ans.length; i++){
        if(ans[i].is_right){
          newTruth.push(ans[i])
          // setAns(ans[i])
        }else if(newTruth.length==1) {
          newTruth.push(ans[i])
          // setAns(ans[i])

        }else if(newTruth.length==2){
          break

        }
        // console.log(newTruth)
        
        


      }
      shuffleArray(newTruth)
        setAns([...newTruth])




      // console.log(time)
      // props.handle_help1()
      // props.handle_help(1)
      props.handle_help(1)
      handleClose()

    }



    const my_help3 =()=>{
      history.push(`/category/${cat}/question/`)
      // props.handle_help3()
      // props.handle_help(3)
      props.handle_help(3)
      

    }


    const my_help2 =()=>{
      // Restarts to 5 minutes timer
      const time = new Date();
      time.setSeconds(time.getSeconds() + 120);
      // props.handle_help2()
      // props.handle_help(2)
      props.handle_help(2)
      handleClose()
      restart(time)
    }

    const set_dis =()=>{
      setDis(true)
    }
    

    const hndleAns=(is_right) =>{
        console.log(ques.points)
        console.log(is_right)
        // props.score[props.team]

        if(ques.category=='General'){
          if(is_right){
            let newscore = props.score[props.team] + ques.points*2
            scoreeData[props.team] = newscore
         props.handle_score(scoreeData)
         set_true_correct()
         setIs_right("btn btn-success")
        //  setDis(true)
        //  console.log(scoreeData)
          }else{
            let newscore = props.score[props.team] - ques.points
         scoreeData[props.team] = newscore
         props.handle_score(scoreeData)
         console.log(scoreeData)
         setIs_right("btn btn-danger")
         
        //  setDis(true)
          }
         

         
    }else if(is_right){
      let newscore = props.score[props.team] + ques.points
         scoreeData[props.team] = newscore
         props.handle_score(scoreeData)
         console.log(scoreeData)
         setDis(true)
         set_true_correct()
         setIs_right("btn btn-success")

     } else{
      setIs_right("btn btn-danger")
    }
    pause()
    set_dis()
    // setIs_right("btn btn-primary")

    // setDis(false)
    // handl_color(is_right)
  }

  const handl_color =(right)=>{
    if(right){
      setIs_right("btn btn-success")

    }else{
      setIs_right("btn btn-danger")

    }
  }
 


  const times = new Date();

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp:times.setSeconds(times.getSeconds() + parseInt(coda[1])), onExpire: ()=>hndleAns(false) });

    //  if(time==0) return(<div>loading</div>);
    return (
          <div> 
    <div class="container">
          <div class="row">
    
              <h3 style={{textAlign: 'center'}}>categories / {cat} </h3>
              <br/>
              <br/>
              
              <h2 style={{textAlign: 'center', color: '#2591f7'}}  >{ques.title} :</h2>
    
          </div>
      </div>
    
      <div class="container mt-3">

      {/* {ans.map(answer=><button disabled={dis} className={`${(answer.is_right && dis )? (answer.is_right)? 'btn btn-success':'btn btn-danger' : (dis)? 'btn btn-danger':'btn btn-primary'}  form-controll form-control`} onClick={()=>hndleAns(answer.is_right)}>{answer.answer_text}</button> )} */}
      {ans.map(answer=><button disabled={dis} className={`${( dis )? (answer.is_right)? 'btn btn-success':'btn btn-danger' : 'btn btn-primary'}  form-controll form-control`} onClick={()=>hndleAns(answer.is_right)}>{answer.answer_text}</button> )}
      {/* ?"btn btn-danger": "btn btn-success" */}
      

      {/* <p onClick={()=>hndleAns(answer.is_right)}>{answer.answer_text}</p> */}
      
      {/* {(props.help_2? <button onClick={my_help2}>Restart</button>:<p></p>)}
   */}
    
      </div>
      <br/>
      <br/>
      {/* {dis && (correct? <p>your answer correct</p>:<p>you r wrong</p>)} */}
      {dis && (correct? <Alert  variant={'success'}>
      Your Answer Correct
      </Alert>:<Alert  variant={'danger'}>
      Your Answer Wronge
      </Alert>)}
      
    
      <div class="container">
          <div class="row">
    
              <div class="col-lg-4">
              {/* <HelpM handle_help1={props.handle_help1} ans={ans} setAns={setAns}/> */}
                  {/* <a href="#"> <button id="myBtn" class="btn btn-primary trigger"><span>Help</span></button> </a> */}
                  <button className="btnn btn btn-outline-primary" onClick={handleShow}>
<span>Help</span>
</button>

    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>How can i help you?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {((props.help_1)? <button className="btn btn-outline-primary" onClick={my_help1}>delete two answer</button>:<p></p>)}
        {((props.help_2)? <button className="btn btn-outline-primary mx-1" onClick={my_help2}>Ask the audince</button>:<p></p>)}
        {((props.help_3)? <button className="btn btn-outline-primary mx-1" onClick={my_help3}>Chang the question</button>:<p></p>)}
      
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        
      </Modal.Footer>
    </Modal>
                 
              </div>
    
    
    
              <div class="col-lg-4">
                <Timer minutes={minutes} seconds={seconds} />
                  {/* <a href="#"> <button class="btnn btn btn-primary "><span>Timer</span></button> </a> */}
              </div>
    
              <div class="col-lg-4">
              {dis &&<Link to={'/category'} ><button className="btnn btn btn-outline-primary" onClick={props.handle_team}>Next team</button></Link>}
                  {/* <a href="#"> <button className="btn btn-outline-primary"><span>Next team</span></button> </a> */}
              </div>
    
          </div>
      </div>
      </div> 
   
  
   
      
     
     

     );
}

export default Question;














{/* <button className="btn btn-outline-primary" onClick={handleShow}>
<span>Help</span>
</button>

<Modal show={show} onHide={handleClose} animation={false}>
  <Modal.Header closeButton>
    <Modal.Title>How i can help you?</Modal.Title>
  </Modal.Header>
  <Modal.Body>{(props.help_1? <button className="btn btn-outline-primary" onClick={my_help1}>delete two answer</button>:<p></p>)}</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
   
  </Modal.Footer>
</Modal> */}






{/* <div> 
<div class="container">
      <div class="row">

          <h3 style="text-align: center;">categories / {cat} </h3>
          <br/>
          <br/>
          
          <h2 style="text-align: center; color: #2591f7;">Choose the correct HTML elwment for the largest heading :</h2>

      </div>
  </div>

  <div class="container mt-3">


    


      <div class="input-group mb-3">
          
          <button class="form-control">it is test</button>
      </div>



  </div>
  <br/>
  <br/>

  <div class="container">
      <div class="row">

          <div class="col-lg-4">
              <a href="#"> <button id="myBtn" class="btn btn-primary trigger"><span>Help</span></button> </a>
          </div>



          <div class="col-lg-4">
              <a href="#"> <button class="btn btn-primary "><span>Timer</span></button> </a>
          </div>

          <div class="col-lg-4">
              <a href="#"> <button class="btn btn-outline-primary"><span>Next team</span></button> </a>
          </div>

      </div>
  </div>
  </div> */}






  // <div>
     
  // <div style={{fontSize: '100px'}}>
  //              <span>{minutes}</span>:<span>{seconds}</span>
  //             </div>
  //         <p>{time}</p>
  //         {/* <MyTimer expiryTimestamp={times.setSeconds(times.getSeconds() + time)}  /> */}
  //         {/* <Countdown date={Date.now() + (time*10000)} /> */}
  //           <h3>{ques.title}</h3>
  //           <p>{ques.points}</p>
  //           <p>{ques.seconds}</p>
  //           <div>{ans.map(answer=> <p onClick={()=>hndleAns(answer.is_right)}>{answer.answer_text}</p>)}</div>
  //           <p>{props.team}</p>
  //           {dis &&<div><Link to={'/category'} onClick={props.handle_team}>back to home</Link></div>}
  //           {dis && (correct? <p>your answer correct</p>:<p>you r wrong</p>)}
  //            <div><Link to={'/score'}>show the score</Link></div>
  //           {(props.help_1? <button onClick={my_help1}>delete two answer</button>:<p></p>)}
  //           {(props.help_2? <button onClick={() => {
  //               // Restarts to 5 minutes timer
  //               const time = new Date();
  //               time.setSeconds(time.getSeconds() + 120);
  //               props.handle_help2()
  //               restart(time)
  //             }}>Restart</button>:<p></p>)}
  //             <button onClick={my_help3}>chang the question</button>
           
  //       </div>

   






























 // function fetchQuestionHandler(props) {
    //   //  let time = 0
    //     fetch(`http://127.0.0.1:8000/rest/question/${id}`)
    //       .then((response) => {
    //         return response.json();
    //       })
    //       .then((data) => {
    //           console.log(data)
    //           setAns(data.answer)
            
    //         setQues(data)
    //         setTime(data.seconds)
          
           
            
    //       });

         
  
    //   }






//     <div> 
//     <div class="container">
//           <div class="row">
    
//               <h3 >categories / {cat} </h3>
//               <br/>
//               <br/>
              
//               <h2   >{ques.title} :</h2>
    
//           </div>
//       </div>
    
//       <div class="container mt-3">

//       {ans.map(answer=><button className="form-control" onClick={()=>hndleAns(answer.is_right)}>{answer.answer_text}</button> )}


//       {/* <p onClick={()=>hndleAns(answer.is_right)}>{answer.answer_text}</p> */}
    
  
    
//       </div>
//       <br/>
//       <br/>
//       {/* {dis && (correct? <p>your answer correct</p>:<p>you r wrong</p>)} */}
//       {dis && (correct? <Alert  variant={'success'}>
//       Your Answer Correct
//       </Alert>:<Alert  variant={'danger'}>
//       Your Answer Wronge
//       </Alert>)}
      
    
//       <div class="container">
//           <div class="row">
    
//               <div class="col-lg-4">
//               {/* <HelpM handle_help1={props.handle_help1} ans={ans} setAns={setAns}/> */}
//                   {/* <a href="#"> <button id="myBtn" class="btn btn-primary trigger"><span>Help</span></button> </a> */}
//                   <button className="btn btn-outline-primary" onClick={handleShow}>
// <span>Help</span>
// </button>

//     <Modal show={show} onHide={handleClose} animation={false}>
//       <Modal.Header closeButton>
//         <Modal.Title>Modal heading</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>{((props.help_1)? <button onClick={my_help1}>delete two answer</button>:<p></p>)}</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleClose}>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
                 
//               </div>
    
    
    
//               <div class="col-lg-4">
//                   <a href="#"> <button class="btn btn-primary "><span>Timer</span></button> </a>
//               </div>
    
//               <div class="col-lg-4">
//               {dis &&<Link to={'/category'} ><button className="btn btn-outline-primary" onClick={props.handle_team}>Next team</button></Link>}
//                   {/* <a href="#"> <button className="btn btn-outline-primary"><span>Next team</span></button> </a> */}
//               </div>
    
//           </div>
//       </div>
//       </div> 
   






