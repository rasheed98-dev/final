import { useContext, useState, useEffect } from 'react';
import QuesContext from '../context/questions';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import '../question.css'
import { useHistory } from 'react-router-dom';
// import QuesContext, { QuesContextProvider } from './context/questions'

const Questions=(props)=> {
    const ctx= useContext(QuesContext)
    let i = 1

    let { cat } = useParams();
    const [q, setQ]=useState([])
    let history= useHistory()

 

console.log(cat)


const QHandler =()=>{
    setQ(ctx.question.filter(ques=> ques.category == cat))
    // .filter(ques=> ques.pk !== q.pk)
    // console.log(q)
}

const random_ques =()=>{
    let randomQ = q[Math.floor(Math.random()*q.length)];
    console.log(randomQ)
    history.push(`/category/${cat}/question/${randomQ.pk}_${randomQ.seconds}/`)
    ctx.filter_q(randomQ.pk)
}

useEffect(() => {
    QHandler();
    console.log(q)
  }, []);

  const goto_ques =(ques)=>{
      history.push(`/category/${cat}/question/${ques.pk}_${ques.seconds}/`)
      ctx.filter_q(ques.pk)
  }







    

    return ( 
        <>









     
<h1 >Choose your favorite section </h1>
<br/>
<br/>

<div className="container">
  <div className="row">
{/* {q.map(ques => <div className="col-sm-2"><button className="button3"><Link to={`/category/${cat}/question/${ques.pk}_${ques.seconds}/`} onClick={()=>ctx.filter_q(ques.pk)}> Q{i++}</Link></button></div>)} */}
{(q.length==0)? 
<div>{(ctx.question.length==0)?<Link className="btn btn-primary" to={'/score'}>Show The Score</Link>: <div><Link className="btn btn-primary" to={'/category'}>Change Section</Link>  <Link className="btn btn-primary" to={'/score'}>Show The Score</Link></div>}</div>:
<div>{q.map(ques => <div className="col-sm-2"><button className="button3" onClick={()=>goto_ques(ques)}> Q{i++}</button></div>)}</div>}
  {/* {ctx.question.filter(ques=> ques.category == cat).map(ques => <div className="col-sm-2"><button className="button3"><Link to={`/category/${cat}/question/${ques.pk}_${ques.seconds}/`} onClick={()=>ctx.filter_q(ques.pk)}> Q{i++}</Link></button></div>)} */}

    
  
   

  </div>
  <br/>
      


     {(q.length !=0)&&<button onClick={random_ques}  class="btn btn-primary center-btn " > Choose random <div class="fab"></div></button>} 
</div>



        </>
     );
}

export default Questions;


// onClick={()=>filter_q(ques.pk)}

{/* <p>this question for {props.team}</p>
{/* {ctx.question.filter(ques=> ques.category == cat).map(ques => <div><Link to={`/${cat}/question/${ques.pk}`}>{i++}</Link></div>)} 
{ctx.question.filter(ques=> ques.category == cat).map(ques => <div onClick={()=>ctx.filter_q(ques.pk)}><Link to={`/category/${cat}/question/${ques.pk}`}>{i++}</Link></div>)} */}




























// http://127.0.0.1:8000/rest/question/
// /question/${ques.pk}

    // let j =0


    // const handle_t =()=>{
    //     setTeam(props.teams[j])
    //     j++
    //     console.log(j)
    //     if(j >= props.teams.length){
    //              j=0
          
    //            }
    //         //    else{
    //         //        j++
    //         //    }


    // }
    // handle_t();
    // useEffect(() => {
    //     handle_t();
    //   },[j]);

    // let j =0

    //     setTeam(props.teams[j])
    //     j++
   
    // if (j == props.teams.length){
    //     j=0

    // }
    
       
        
    
    // const handle_team=()=>{
    //     let j= 0
    //     while(j<props.score.length){
    //         j++
    //         j=j % props.score.length
    //         setTeam(props.score[0])
    //     }
    // }


    


    