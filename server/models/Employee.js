const User = require("./User");
const Position = require('./Position')
const supabase = require("../database");
const e = require("express");

class Employee extends User{
    constructor(newEmployee)
    {
        this.#employeeID = newEmployee.id;
        this.#firstname = newEmployee.firstname;
        this.#lastname = newEmployee.lastname;
        this.#dateOfBirth = newEmployee.date_of_birth;
        this.#phoneNumber = newEmployee.phone_number;
        this.#salary = newEmployee.salary;
        this.#startWorkingDate = newEmployee.start_working_date;
        this.#position = newEmployee.position_id;
    }
    get employeeID()
        {
                return this.employeeID;
        }
        get firstname()
        {
                return this.firstname;
        }
        set firstname(newFirstname)
        {
                this.firstname = newFirstname;
        }
        get lastname()
        {
                return this.lastname;
        }
        set lastname(newLastname)
        {
                this.lastname = newLastname;
        }
        get dateOfBirth()
        {
                return this.dateOfBirth;
        }
        set dateOfBirth(newDateOfBirth)
        {
                this.dateOfBirth = newDateOfBirth;
        }
        get phoneNumber()
        {
                return this.phoneNumber;
        }
        set phoneNumber(newPhoneNumber)
        {
                this.phoneNumber = newPhoneNumber;
        }
        get salary()
        {
            return this.salary;
        }
        set salary(newSalary)
        {
            this.salary = newSalary;
        }
        get startWorkingDate()
        {
            return this.startWorkingDate;
        }
        set startWorkingDate(newDate)
        {
            this.startWorkingDate = newDate;
        }
        get position()
        {
            return this.position;
        }
        set position(newPosition)
        {
            this.position = newPosition;
        }
}