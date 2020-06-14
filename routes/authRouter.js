const {Router} =require('express');
const router =Router();
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const {check,validationResult}=require('express-validator')
const User =require('../models/User');
const keys = require('../keys/index');

router.post(
    '/register',
    [
        check('email','Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({min:6})
    ],
    async (req,res)=>{
        try{
            const errors =validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message: errors.array()[0].msg
                })
            }

            const {email,password}= req.body;
            const candidate = await User.findOne({email:email});
            if (candidate){
                return   res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password,12);
            const user =new User({email:email,password:hashedPassword});

            await user.save();

            res.status(201).json({message: 'Пользователь создан'})

        }catch (e) {
            res.status(500).json({message:"Try again"})
        }
    });
router.post(
    '/login',
    [
        check('email','Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req,res)=>{
        try{
            const errors =validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    message: errors.array()[0].msg
                })
            }


            const {email,password}= req.body;

            const user =await User.findOne({email:email});

            if(!user){
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMath =await bcrypt.compare(password,user.password);

            if(!isMath){
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token =jwt.sign(
                {userId: user.id},
                keys.JWT_SECRET,
                {expiresIn: '240h'}
            );

            res.json({token,userId: user.id})


        }catch (e) {
            res.status(500).json({message:"Try again"})
        }
    });

module.exports =router;