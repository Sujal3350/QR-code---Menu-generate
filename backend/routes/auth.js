import Router from 'express'
import User from '../models/User.js';
import {body,validationResult} from 'express-validator'
import fetchUser from '../middleware/fetchUser.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../config/envConfig.js';

const router = Router()

router.get('/user', fetchUser, async (req, res) => {
    try {
      const email = req.query.email;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          error: "Email parameter is required"
        });
      }
  
      const user = await User.findOne({ email }).select("-password");
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found"
        });
      }
  
      res.json({
        success: true,
        user: {
          email: user.email,
          name: user.full_name,
          id: user._id,
          isAdmin: user.isAdmin,
          phone: user.phone || '',
          address: user.address || ''
        }
      });
  
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        error: "Internal server error occurred"
      });
    }
  });
// ROUTE 1: create a user using : POST "/auth/signup". doesn't require auth
router.post('/signup', [
    body('name', 'Minimum length should be 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters long and include a lowercase letter, uppercase letter, and number')
      .isLength({ min: 6 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'i'),
    body('businessName', 'Business name is required').notEmpty(), // validate businessName
], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({success, errors: error.array() });
    }
    //check if user already exist
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "User already exists" });
        }
        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //create a new user
        user = await User.create({
            full_name: req.body.name,
            businessName: req.body.businessName, // save businessName
            email: req.body.email,
            password: hashedPassword,
            isAdmin: false,
        })

        const data = {
            user: {
                id: user.id,
                isAdmin: user.isAdmin,
                name: user.full_name,
                businessName: user.businessName, // include businessName
            }
        }
        const authToken = jwt.sign(data, config.JWT_SECRET);
        success=true;

        res.json({success, authToken,isAdmin: user.isAdmin,name: user.full_name, id: user.id, businessName: user.businessName });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success, error: "Internal server error occurred", details: error.message });
    }
});


// ROUTE 2: Authenticate a user using : POST "/auth/signin". doesn't require auth
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Minimum length should be 5').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        //user check
        let user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({success, error: "User not found" });
        }
        // Compare password using bcrypt
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            console.log("password not matched");
            return res.status(400).json({
                success: false, 
                error: "Incorrect password."
            });
        }
        const data = {
            user: {
                email: user.email,
                id: user.id,
                isAdmin: user.isAdmin,
                name: user.full_name,
                businessName: user.businessName, // include businessName in JWT
                phone: user.phone || '',
                address: user.address || ''
            }
        }
        const authToken = jwt.sign(data, config.JWT_SECRET);
        success = true;
        res.json({
            success, 
            authToken, 
            isAdmin: user.isAdmin,
            name: user.full_name, 
            id: user.id, 
            email: user.email,
            businessName: user.businessName, // include businessName in response
            phone: user.phone || '',
            address: user.address || ''
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({success, error:"Internal server error occured" , details: error.message });
    }
});



export default router