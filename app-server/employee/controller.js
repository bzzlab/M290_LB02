const HTTP_STATUS = require('../config/httpcodes.config');
const Employee = require('./model.js');
// Create an Employee
const employeeObj = new Employee();

//check if request body is empty
function isEmpty(obj) {
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false;
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

// Create and Save a new Employee
function create(req, res) {
  // Validate request
  if (isEmpty(req.body)) {
    console.log('Req-body is empty!!!')
    res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log("Request body ...");
  console.log(req.body);

/*
Aufgabe (2/4) - Postman (app-server)
Erzeugen Sie mit Postman einen neuen Angestellten mit folgenden Angaben, welche
alle als String behandelt werden sollen:
Angestellten-ID ist 210, Vor-/Nachname Hans Muster, Email HMuster,
Telefon 0714234568, Anstellungsdatum 2022-12-01,
Job-ID IT_PROG, Gehalt 7900, Vorgesetzten-ID 103, Abteilung-ID 60

Als Resultat geben Sie
1. die URI mit dem korrekten HTTP-Verb
2. den Body im JSON-Format

Tipp: Studieren Sie die Funktion create im Controller, um die korrekten Felder für den Request mit Postman zu erzeugen.
*/
  let data = {
    "EMPLOYEE_ID": parseInt(req.body.employeeId),
    "FIRST_NAME": req.body.firstName,
    "LAST_NAME": req.body.lastName,
    "EMAIL": req.body.email,
    "PHONE_NUMBER": parseInt(req.body.phone),
    "HIRE_DATE": req.body.hireDate,
    "JOB_ID": req.body.jobId,
    "SALARY": parseFloat(req.body.salary),
    "MANAGER_ID": parseInt(req.body.managerId),
    "DEPARTMENT_ID": parseInt(req.body.departmentId)
  }

  console.log(`Following data parsed from body ..`);
  console.log(data);

    // Save Employee in the database
    employeeObj.create(data, (err, result) => {
      if (err)
        res.status(HTTP_STATUS.SERVER_ERROR).send({
          message:
              err.message || "Some error occurred while creating the Employee."
        });
      else res.status(HTTP_STATUS.SUCCESSFUL_CREATED).send(result);
    });
}


function findOne(req, res){
  employeeObj.findById(req.params.id, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(HTTP_STATUS.NOT_FOUND).send({
          message: `Not found Employee with id ${req.params.id}.`
        });
      } else {
        res.status(HTTP_STATUS.SERVER_ERROR).send({
          message: "Error retrieving Employee with id " + req.params.id
        });
      }
    } else res.send(result);
  });
}



/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT brackets!
 */
module.exports = {
  create,
  findOne
}
