import { useTimer } from 'react-timer-hook';
import './timer.css'


function Timer(props) {
  return ( 
    <div className='pa'>
    {/* <h1>CountDown Timer</h1> */}
    <div>
      <span className="count-digit">{props.minutes}</span>
      
      <span className="separator">:</span>
      <span className="count-digit">{props.seconds}</span>
      
    </div>
    </div>
   );
}

export default Timer;
    
   

