import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {User} from '../models/UserModel.js'
import validatePassword from '../utils/validatePassword.js'
import emailValidation from '../utils/validateEmail.js'


dotenv.config()

const AuthController = {
    signup: async (req, res) => {
        const {name, email, password} = req.body 

        try {
            if(!name || !email || !password) {
                return res
                .status(400)
                .json({message: 'All fields must be provided'})
            }


            if(!emailValidation(email)) {
                return res.status(400).json({message: 'Enter a valid email address'})
            }

            if(password.length < 7) {
                return res.status(400).json({message: 'Password should not be less than 7 characters'})
            }

            if(!validatePassword(password)) {
                return res.status(400).json({message: 'Password must be alphanumeric characters'})
            }

            const findUser = await User.findOne({email})

            if(findUser) {
                return res.status(400).json({message: 'User already exist. Please login'})
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt)


            if (hash) {
                const newUser = new User({ name, email, password: hash})
                const savedUser = await newUser.save()
     
                if (savedUser) {
                    jwt.sign(
                    {id: savedUser._id},
                    process.env.SECRET,
                        {expiresIn: 3600},
                        (err, token) => {
                            if (err) {
                                throw err
                            }
     
                            res.status(200).json(
                                { 
                                     status: 'success',
                                     data: {
                                         token: `Bearer ${token}`,
                                         id: savedUser._id,
                                         name: savedUser.name,
                                         email: savedUser.email,
                                     }, 
                                     message: 'successful'
                                 })
                        }
                    )
                }
            }



        } catch (err) {
            console.log(err)
            return res.status(500).json({message: 'server error'})
        }
    },

    //sign in goes here
   
}


export default AuthController