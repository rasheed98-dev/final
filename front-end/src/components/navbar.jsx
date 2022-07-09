import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Badge, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"
import AuthContext from "../context/AuthContext";
import '../questionDet.css'


function Navbaar(props) {
  const authCtx = useContext(AuthContext);
  // isLoggedIn
    return ( 

        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky" data-offset="500">
<div className="container">
<a href="#" className="navbar-brand"><img src={logo} alt="Avatar Logo" style={{width:"200px", height:"120px"}} className="rounded-pill"/> </a>

<button className="navbar-toggler" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
 <span className="navbar-toggler-icon"></span>
</button>

<div className="navbar" id="navbarContent">
 <ul className="navbar-nav ml-auto">
   <li className="nav-item active">
     <a className="nav-link" href="/">Home</a>
   </li>
   <li className="nav-item">
     <a className="nav-link" href="#">About</a>
   </li>
   <li className="nav-item">
     <a className="nav-link" href="#">Services</a>
   </li>
  
   <li className="nav-item">
    {!authCtx.isLoggedIn && <Link className="btn btn-outline-primary" to={'/auth'}>Log in</Link>} 
   </li>
   <li className="nav-item">
   { authCtx.isLoggedIn && <a href="/" className="btn btn-outline-primary" onClick={authCtx.logout}>Log out</a>} 
   </li>
   <li  className="nav-item">
   <Link to={'/score'} className="btn btn-primary mx-2">
<span>{props.team} </span>
<Badge bg="light" text="dark">{props.team_score}</Badge>

</Link>

   </li>
 </ul>
</div>

</div>
</nav> 
     
       

     );
}

export default Navbaar;


















{/* <Navbar bg="light" expand="lg">
<Container fluid>
  <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="me-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link href="#action1">Home</Nav.Link>
      <Nav.Link href="#action2">Link</Nav.Link>
      <NavDropdown title="Link" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">
          Something else here
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="#" disabled>
        Link
      </Nav.Link>
    </Nav>
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Container>
</Navbar> */}