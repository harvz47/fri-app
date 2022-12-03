import {useEffect, useState} from 'react';
import axios from 'axios';

function Student() {
    const [fname, setFname]= useState("");
    const [lname, setLname]= useState("");
    const [age, setAge]= useState("");
    const [students, setStudents] = useState([]);
    //useEffect(function, param - dependency)
    useEffect( ()=>{
        const url = 'http://localhost/sat-app/db.php'; //link to db
        axios.get(url).then((response)=>{
            setStudents(response.data);
            console.log(students);
        })
    },[]); //this

    const submitBtn = function(){
         e.preventDefault();
        let getData = new FormData(); // get data from
        getData.append('fname', fname); //key value pairs
        getData.append('lname', lname); //key value pairs
        getData.append('age', age);
        getData.append('function', 'insert');

        axios({
            method: 'POST' ,
            url: 'http://localhost/sat-app/db.php' , //db link
            data: getData, // data to be transferred
            config: 'Content-type = "multipart/form-data"' ,

        }).then(function(result){
            
            const url = 'http://localhost/sat-app/db.php'; //link to db
            axios.get(url).then((response)=>{
                setStudents(response.data);
                console.log(students);
            })
        });
    }

    const delBtn= function(e){
        // alert(e.currentTarget.id);
        let getData = new FormData(); // get data from
        getData.append('stud_id', e.currentTarget.id); //key value pairs
        getData.append('function', 'delete');
        axios({
            method: 'POST' ,
            url: 'http://localhost/sat-app/db.php' , //db link
            data: getData, // data to be transferred
            config: 'Content-type = "multipart/form-data"' ,
        }).then(function(result){
            // alert("succesfully deleted");
            const url = 'http://localhost/sat-app/db.php'; //link to db
            axios.get(url).then((response)=>{
                setStudents(response.data);
                console.log(students);
            })
        });

    }

    const upBtn = function (e){
        // alert (e.currentTarget.title);
        let getData = new FormData();
        getData.append('stud_id', e.currentTarget.title); //
        getData.append('fname', document.getElementById('fname'+e.currentTarget.title).value); //key value pairs
        getData.append('lname', document.getElementById('lname'+e.currentTarget.title).value);
        getData.append('age', document.getElementById('age'+e.currentTarget.title).value);
        getData.append('function', 'update');
        axios({
            method: 'POST' ,
            url: 'http://localhost/sat-app/db.php' , //db link
            data: getData, // data to be transferred
            config: 'Content-type = "multipart/form-data"' ,
        }).then(function(result){
            alert("succesfully update");
            const url = 'http://localhost/sat-app/db.php'; //link to db
            axios.get(url).then((response)=>{
                setStudents(response.data);
                console.log(students);
            })
        });

    }


    return (
        <div>
            <h1 className="text-center mb-3">Student's List</h1>
            <form method="" className="text-center">
                <input type="text" name="fname" value={fname} onChange ={(e) => setFname(e.target.value)} placeholder="Firstname"/><br/>
                <input type="text" name="lname"  value={lname} onChange ={(e) => setLname(e.target.value)} placeholder="Lastname"/><br/>
                <input type="number" name="age"  value={age} onChange ={(e) => setAge(e.target.value)} placeholder="Age"/><br/>   
                <input type="submit" onClick={submitBtn} className="btn btn-primary mt-3"/>
            </form>
            <table className="table table-striped w-50 mx-auto text-center" >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((val)=>{
                    return(
                    <tr key={val.stud_id}>
                        {/* <td><input id={'fname'+val.stud_id} defaultValue={val.firstname}/></td> */}
                        <td><input defaultValue={val.firstname} id={'fname'+val.stud_id}/></td>
                        <td><input defaultValue={val.lastname} id={'lname'+val.stud_id}/></td>
                        <td><input defaultValue={val.age} id={'age'+val.stud_id}/></td>
                        <td><button title={val.stud_id} onClick={upBtn}>Update</button></td>
                        <td><button id={val.stud_id} onClick={delBtn}>Delete</button></td>
                    </tr>
                        );
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Student;

