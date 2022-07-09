import { useEffect } from "react";
import { Link } from "react-router-dom";
import ux from '../assets/img/ux.png'
import ai from '../assets/img/ai.png'
import g from "../assets/img/g.png"
import app from "../assets/img/app.png"
import v from "../assets/img/v.png"
import '../App.css'

function Category(props) {
    // useEffect(props.handle_team(), [props.team])
    return ( 
        <>
        <br/>
      <br/>
      

      <div className="container">
        <div className="row align-items-center flex-wrap h-100">

          
            <h1 style={{textAlign: 'center'}} >Choose your favorite section {props.team_score} </h1>
            <br />
            <h3 style={{textAlign: 'center'}}>This question for {props.team}</h3>
            {/* style={{text-align: "center;"}} */}
          

        </div>
      </div>

     <br/>
     <br/>
        <div className="page-section">
<div className="container">
  <div className="row">

     <div className="col-lg-3">
      <div className="card-service">
        <div className="header">
          <img className="card-img-top" src={ux} alt="Card image" style={{width:"70%"}} />
        </div>
        <div className="body">
          <h5 className="text-secondary">Web design</h5>
          <p>We help you define your SEO objective and develop a realistic strategy with you</p>
          <Link  to={'/category/Front-end/question/'} className=" btn-join btn btn-primary">Join !</Link>
        </div>
      </div>
    </div>

     <div className="col-lg-3">
      <div className="card-service">
        <div className="header">
          <img className="card-img-top" src={ai} alt="Card image" style={{width:"70%"}}  />
        </div>
        <div className="body">
          <h5 className="text-secondary">AI</h5>
          <p>We help you define your SEO objective and develop a realistic strategy with you</p>
          <Link to={'/category/AI/question/'} className=" btn-join btn btn-primary">Join !</Link>
        </div>
      </div>
    </div>

      <div className="col-lg-3">
      <div className="card-service">
        <div className="header">
          <img className="card-img-top" src={g} alt="Card image" style={{width:"70%"}}  />
        </div>
        <div className="body">
          <h5 className="text-secondary">Genarel Questions</h5>
          <p>We help you define your SEO objective and develop a realistic strategy with you</p>
          <Link to={'/category/General/question/'} className="btn-join btn btn-primary">Join !</Link>
        </div>
      </div>
    </div>
    
     <div className="col-lg-3">
      <div className="card-service">
        <div className="header">
          <img className="card-img-top" src={app} alt="Card image" style={{width:"70%"}}  />
        </div>
        <div className="body">
          <h5 className="text-secondary">Mobile App.</h5>
          <p>We help you define your SEO objective and develop a realistic strategy with you</p>
          <Link to={'/category/Mobil-app/question/'} className=" btn-join btn btn-primary">Join !</Link>
        </div>
      </div>
    </div>

  </div>
</div> 
</div> 

<img  src={v} alt="Card image" style={{width:"30%"}} />
       

      
        

        
       
        
        
        
        
     </>
     );
}

export default Category;





{/* <div className="col-lg-3">
<div className="card-service">
  <div className="header">
    <img className="card-img-top" src={ux} alt="Card image" style={{width:'70%'}} />
  </div>
  <div className="body">
    <h5 className="text-secondary">Web design</h5>
    <p>We help you define your SEO objective and develop a realistic strategy with you</p>
    <a href="q.html" className="btn btn-primary">Join !</a>
  </div>
</div>
</div> */}




  
 
    










{/* {props.team}
<div><Link to={'/category/Front-end/question/'} >Front-end</Link></div>
<div><Link to={'/category/Back-end/question/'} >Back-end</Link></div>
<div><Link to={'/category/Gamming/question/'} >Gamming</Link></div>
<div> <Link to={'/category/AI/question/'} >AI</Link></div>
<div> <Link to={'/category/General/question/'} >General</Link></div>
<div> <Link to={'/category/Mobil-app/question/'} >Mobil-app</Link></div> */}










{/* <div><Link to={'/category/Front-end/question/'} onClick={props.handle_team}>Front-end</Link></div>
        <div><Link to={'/category/Back-end/question/'} onClick={props.handle_team}>Back-end</Link></div>
        <div><Link to={'/category/Gamming/question/'} onClick={props.handle_team}>Gamming</Link></div>
        <div> <Link to={'/category/AI/question/'} onClick={props.handle_team}>AI</Link></div>
        <div> <Link to={'/category/General/question/'} onClick={props.handle_team}>General</Link></div>
        <div> <Link to={'/category/Mobil-app/question/'} onClick={props.handle_team}>Mobil-app</Link></div> */}