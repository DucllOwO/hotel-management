import supabase from '../database'
const User = require("User")

class Customer extends User{
        constructor(newCustomer)
        {
                this.#customerID = newCustomer.id;
                this.#firstname = newCustomer.firstname;
                this.#lastname = newCustomer.lastname;
                this.#dateOfBirth = newCustomer.date_of_birth;
                this.#phoneNumber = newCustomer.phone_number;
        }
        get customerID()
        {
                return this.customerID;
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
}