const sql = require("../db.js");

module.exports = class Employee {
    // constructor
    constructor() {
    }

    /***
     * Create a new employee
     * @param newEmployee: employee data (object literal)
     * @param cbResult: result of sql statement
     */
    create(newEmployee, cbResult) {
        sql.query('INSERT INTO employees SET ?', newEmployee, (err, res) => {
            if (err) {
                console.log("error: ", err);
                cbResult(err, null);
                return;
            }

            console.log("created employee: ", {id: res.insertId, ...newEmployee});
            cbResult(null,
                {msg: "New employee from has been inserted!", id: res.insertId, ...newEmployee});
        });
    }


    /**
     * Select employee by ID
     * @param id
     * @param cbResult: result of sql statement
     */
    findById(id, cbResult) {
        /*
         Aufgabe (4/4): Model ergänzen (app.server)
         Geben Sie einen Angestellten anhand seiner ID aus.
         Als Resultat geben Sie den Code zwischen Begin und End ab.
         */
        //--Begin
        sql.query(`--?`, id, (err, result) => {
        //--End
            if (err) {
                console.log("error: ", err);
                cbResult(err, null);
                return;
            }

            //result of the select (greater than 0) has found a record (Tupel)
            if (result.length) {
                console.log("found employee: ", result[0]);
                cbResult(null, result[0]);
                return;
            }

            // not found Employee with the id
            cbResult({kind: "not_found"}, null);
        });
    };

}

