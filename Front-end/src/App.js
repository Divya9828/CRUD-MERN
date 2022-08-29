import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


function App() {
var [name,setName]=useState('');
var [mobile,setMobile]=useState('');
var[email,setEmail]=useState('');
const [employeeList, setEmployeeList] = useState([]);
const [newUpdate, setUpdate]=useState("");

// view all record api
var viewButton=()=>
{
  axios.get('http://localhost:5000/select').then((res)=>
  {
    setEmployeeList(res.data);
  })
}

// insert records api
var submitButton=()=>
{
  if(name === ''|| email === ''|| mobile==='')
  {
    alert("pls all fields are req")
  }
  else
  {
    axios.post('http://localhost:5000/insert',{username:name,usermob:mobile,useremail:email}).then((response1)=>
    {
      if(response1.status===200)
      {
        alert("Success");
      }
      if(response1.status===204)          
      {
        alert("already reg")
      }
      setName('')
      setEmail('')
      setMobile('')
      viewButton()
    });
  }
}

// delete particular records api
var deleteEmployee=(user)=>
{
  axios.delete(`http://localhost:5000/delete/${user}`).then((response)=>
  {
    if(response.status===200)
    {
      alert('Successfully Deleted');
    }
    else
    {
      alert('something wrong');
    }
    viewButton()
  })
}

// update particular records api
var updateEmployee=(edit)=>
{
  axios.put("http://localhost:5000/update",{username:edit,useremail:newUpdate}).then((response)=>
  {
    if(response.status===200)
    {
      alert("successfully updated")
    }
    setUpdate('')
    viewButton()
  })
}
  return (
    <>
      <div className="container mt-3 mb-3">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
          <input type="name" name="name" className="form-control" value={name}
            onChange={(e)=>{setName(e.target.value)}} id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Mobile</label>
          <input type="mobile"  onChange={(e)=>{setMobile(e.target.value)}} value={mobile}
            name="mobile" className="form-control" id="exampleFormControlInput1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email"  onChange={(e)=>{setEmail(e.target.value)}} value={email}
            name="email" className="form-control" id="exampleFormControlInput1"
            placeholder="name@example.com" />
        </div>        
        <div className="mb-3">
          <button type='submit' onClick={submitButton} className="btn btn-success">Submit</button>
        </div>    
        <div className="employees">
          <button onClick={viewButton} className="btn btn-primary">Show Employees</button>
          {employeeList.map((val, key) =>
          {
            return(
              <div className="employee">
              <div>
                <table border='2'>
                  <tr>
                    <th>NAME</th>
                    <th>MOBILE</th>
                    <th>EMAIL</th>
                    <th>UPDATE EMAIL</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                  <tr>
                    <td>{val.name}</td>
                    <td>{val.mobile}</td>
                    <td>{val.email}</td>
                    <td><input type="text" onChange={(e)=>{setUpdate(e.target.value)}} placeholder="email id"></input></td>
                    <td><button className='btn btn-warning' onClick={() => {updateEmployee(val.name)}}>UPDATE</button></td>
                    <td><button className='btn btn-danger' onClick={() => {deleteEmployee(val.name)}}>DELETE</button></td>
                  </tr>
                </table>                
              </div>              
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}
export default App;

