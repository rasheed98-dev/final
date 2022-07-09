import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table'
import '../score.css'

function ShowTheScore(props) {
    const [score, setScore] = useState(props.score)
    // const [max, setMax]=useState([])
    const [sorted, setSorted]=useState({})

    const get_max_score =()=>{
        const sortedEntriesByVal = Object.entries(score).sort(([, v1], [, v2]) => v2 - v1);
        setSorted(sortedEntriesByVal.reduce((r, [k, v]) => ({ ...r, [k]: v }), {}))

//   return {
//     min: sortedEntriesByVal[0],
//     max: sortedEntriesByVal[sortedEntriesByVal.length - 1],
//     sortedObjByVal: sortedEntriesByVal.reduce((r, [k, v]) => ({ ...r, [k]: v }), {}),
 // setMax(Object.entries(score).reduce((max, entry) => entry[1] >= max[1] ? entry : max, [0, -Infinity]))
//   };
};
       
    
    useEffect(() => {
        get_max_score();
       
      }, []);
    //   let index=1
    return ( 
        <div class="container cont">
        <h2>The Scores </h2>
        <ul class="responsive-table">
          <li class="lii table-header">
            <div class=" col col-1">Team Id</div>
            <div class="col col-2">Team Name</div>
            <div class=" col col-3">Score</div>
            <div class=" col col-4"> Status</div>
          </li>
          {
              Object.keys(sorted).map((teamN, index)=>{
                return(
            <li className= {`${(index==0)? `table-headerr lii`:"table-row lii"} `}>
            <div class="col col-1" >{index+1}</div>
            <div class="col col-2" >{teamN}</div>
            <div class="col col-3">{sorted[teamN]}</div>
            <div class="col col-4" >{(index==0)? `Winner`:"Looser"}</div>
          </li>
                    
                )
                })

          }
          
          
        </ul>
      </div>
       
     );
}

export default ShowTheScore;


{/* <div>
<p>{max[0]}:{max[1]}</p>

{Object.keys(score).map((teamN)=>{
return(
    <div>
        
       <h3>{teamN}: {score[teamN]}</h3> 
    </div>
)
})}</div> */}





// props.score.entries(props.score).map((points, team)=>{
//     <div> <p>{team}</p> : <p>{points}</p></div>
//  })