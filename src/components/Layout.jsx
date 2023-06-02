import Form from "./Form";
import logo from "../assets/images/codepro.png";

export default function Layout() {
  return (

    <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
      <div className="wrapper wrapper--w680">
        <div className="card card-4">
          <div className="card-body">
            <div className="myImage"><img src={logo} alt='logo' style={{ width: "300px" }} /></div>
            <h2 className="title mb-5">Student Registration Form</h2>
            <div>
              <h4 className="p-2 m-2" style={{background: "#2c6ed5", color: "white", borderRadius:"5px"}}>Child's Details</h4>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </div>

  );
}