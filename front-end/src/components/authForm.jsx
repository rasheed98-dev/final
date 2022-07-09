import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../context/AuthContext';
import team from "../assets/img/team.png"
import logo from "../assets/img/logo.png"


// import classes from './AuthForm.module.css';

const AuthForm = () => {
  const UserNameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let history= useHistory()

 

  let submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = UserNameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    fetch('http://127.0.0.1:8000/api-token-auth', {
        method: 'POST',
        body: JSON.stringify({
          'username': enteredUsername,
          'password': enteredPassword,
          
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
        .then((data) => {
        authCtx.login(data.token);
        // console.log(data.token)
        history.push("/")
        })
        .catch((err) => {
          alert(err.message);
        });
    };


    return (

      <section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src={team}  class="img-fluid" alt="Sample image" style={{marginTop: '100px'}} />
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form  onSubmit={submitHandler}>
          <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
             <img src={logo}  alt="Sample image" style={{width:'300px', height: '200px', marginleft: '80px'}}  />
          </div>
             <p class="text-center fw-bold mx-3 mb-0">Welcome  back!</p> 
             <p> Please login/Signup to your account.</p>
          <div class="divider d-flex align-items-center my-4">
            
          </div>

          
          <div class="form-outline mb-4">
            <input type="text" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid Usernme" ref={UserNameInputRef} />
            <label class="form-label" htmlFor="form3Example3">Usernme</label>
          </div>

          
          <div class="form-outline mb-3">
            <input type="password"  class="form-control form-control-lg"
              placeholder="Enter password" id='password'
              required
              ref={passwordInputRef} />
            <label class="form-label" htmlFor="password">Password</label>
          </div>

         

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg" style={{paddingleft: '2.5rem', paddingright: '2.5rem'}}>Login</button>
           
          </div>

        </form>
      </div>
    </div>
  </div>
  </section>


  

      );
    


  };

 

export default AuthForm;





{/* </section>
        <section >
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <div >
              <label htmlFor='username'>Your Email</label>
              <input type='text' id='username' required ref={UserNameInputRef} />
            </div>
            <div >
              <label htmlFor='password'>Your Password</label>
              <input
                type='password'
                id='password'
                required
                ref={passwordInputRef}
              />
            </div>
            <div >
             
                <button>Login</button>
            
              
              
            </div>
          </form>
        </section> */}