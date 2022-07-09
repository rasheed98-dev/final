// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// function HelpM() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const my_help1 =(props)=>{
//     let newFlse =[]
//     let newTruth =[]

//     newFlse= props.ans.filter(fa=> fa.is_right==false)
//     newTruth= props.ans.filter(fa=> fa.is_right==true)
//     console.log(newTruth)
//     props.setAns([newFlse[0],...newTruth])
//     // console.log(time)
//     props.handle_help1()
//     handleClose()

//   }


//   return (
    
//     <>
//       <button className="btn btn-outline-primary" onClick={handleShow}>
//       <span>Help</span>
//       </button>

//       <Modal show={show} onHide={handleClose} animation={false}>
//         <Modal.Header closeButton>
//           <Modal.Title>How i can help you?</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{(props.help_1? <button className="btn btn-outline-primary" onClick={my_help1}>delete two answer</button>:<p></p>)}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
         
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default HelpM