import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {User} from '../models/UserModel.js'


dotenv.config()

const AuthController = {
    signup: async (req, res) => {
        const {firstName, lastName, email, password, confirmPassword} = req.body 

        try {
            if(!firstName || !lastName || !email || !password || !confirmPassword) {
                return res
                .status(400)
                .json({message: 'All fields must be provided'})
            }

            if(password !== confirmPassword) {
                return res.status(400).json({message: 'Password does not match'})
            }

            const emailValidation = (email) => {
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                return isValid
            }

            if(!emailValidation(email)) {
                return res.status(400).json({message: 'Enter a valid email address'})
            }

            if(password.length < 8) {
                return res.status(400).json({message: 'Password should not be less than 8 characters long'})
            }

            const findUser = await User.findOne({email})

            if(findUser) {
                return res.status(400).json({message: 'User already exist. Please login'})
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt)


            if (hash) {
                const newUser = new User({ firstName, lastName, email, password: hash})
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