import User from "../modals/user"
import {hashPassword,comparePassword} from "../utils/auth"
export const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        // validation
        // if no name
        if(!name) return res.status(400).send({message:"Name Required"})

        // if no email
        if(!email) return res.status(400).send({message:"Email Required"})

        // if no password or password's length is less than 6
        if(!password || password.length < 6) return res.status(400).send({message:"Password should be greater than 6 characters"})
        
        // check if user is already there
        let userExists = await User.findOne({email})

        // if user is already there return error message
        if(userExists){
            return res.status(400).send({message:"Email already Registered"})
        }

        // hash password
        let hashedPassword = await hashPassword(password)

        // creating user's instance
        const user = new User({
            name,email,password:hashedPassword
        })

        // save user
        await user.save()

        // send success reponse
        return res.send({message:"User saved successfully"})

    }catch(e){
        console.log(e)
        // send error response
        return res.send(400).send("Error. Try again")
    }
}