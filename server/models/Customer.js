import supabase from '../database'
const User = require("User")

class Customer extends User{
        customerID;
        firstname;
        lastname;
        dateOfBirth;
        phoneNumber;

        async createNewCustomer()
        {
                const {data, error} = await supabase
                .from('customer')
                .insert([
                        {firstname : this.firstname, lastname: this.lastname, date_of_birth : this.dateOfBirth, phone_number : this.phoneNumber }
                ])
                if(error)
                {
                        console.log(error);
                }
                else    
                        return;
        }
}