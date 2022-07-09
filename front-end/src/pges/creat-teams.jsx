import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import home from '../assets/img/home.png'
import AuthContext from "../context/AuthContext";


function NewTeam(props) {
  const authCtx = useContext(AuthContext);
  // isLoggedIn
   
    return ( 
      <>
    
      <br/>
      <br/>

       <div className="container">
<div className="page-banner home-banner">
  <div className="row align-items-center flex-wrap-reverse h-100">

    <div className="col-sm-6 ">
      <h1 className="mb-4">Learn new concepts for each question</h1>
      <p className="text-lg text-grey mb-5">We help you prepare for exams and quizes</p>
      <div className="form-group col-md">
     {authCtx.isLoggedIn && <form onSubmit={props.submitHandler}>
<label for="team">
 Number of the teams:
 <input type="number" className="form-control" name="team" id="team" value={props.teamN}
          onChange={props.dateChangeHandler} />
</label>

{/* <button type="submit" className="btn btn-primary ">GET START</button> */}
<input type="submit" className="btn btn-primary mx-2" value="GET START" disabled={props.dis} />

</form> }

{!authCtx.isLoggedIn && <p>Log in to get start</p>}

</div>
      {/* <Link to={'/category'} className="btn btn-primary ">GET START <div className="fab"></div></Link> */}
    </div>
    
    

    <div className="col-sm-6 اhome ">
      <div className="">
        <img src={home} alt=""/>
      </div>
    </div>
  </div>


</div>
</div>
    
        
      </>
     );
}

export default NewTeam;



  {/* <form onSubmit={props.submitHandler}>
<label>
  Enter the number of the teams:
  <input type="number" name="team" value={props.teamN}
          onChange={props.dateChangeHandler} />
</label>
<input type="submit" value="Submit" />

</form> */}



{/* <form onSubmit={props.submitHandler}>
<label>
  Enter the number of the teams:
  <input type="number" name="team" value={props.teamN}
          onChange={props.dateChangeHandler} />
</label>
<input type="submit" value="Submit" />

</form> */}



{/* <div className="container">
<div className="page-banner home-banner">
  <div className="row align-items-center flex-wrap-reverse h-100">

    <div className="col-sm-6 ">
      <h1 className="mb-4">Learn new concepts for each question</h1>
      <p className="text-lg text-grey mb-5">We help you prepare for exams and quizes</p>
      <Link to={'/category'} className="btn btn-primary ">GET START <div className="fab"></div></Link>
    </div>
    
    

    <div className="col-sm-6 اhome ">
      <div className="">
        <img src={home} alt=""/>
      </div>
    </div>
  </div>


</div>
</div> */}


{/* <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div> */}