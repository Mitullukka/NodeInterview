// const { check, validationResult } = require("express-validator");

// exports.signup = [
//     check("name").notEmpty().withMessage("Name is required").bail()
//         .isLength({ min: 3,max:30 }).withMessage("Name must be between 3 and 30 characters"),

//     check("email")
//         .isEmail().withMessage("Invalid email format"),

//     check("mobile")
//         .notEmpty().withMessage("Mobile number is required").bail()
//         .isMobilePhone().withMessage("Invalid mobile number"),

//     (req:any, res:any, next:any) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             const formattedErrors = errors.array().reduce((acc:any, err:any) => {
//                 acc[err.path] = err.msg; 
//                 return acc;
//             }, {});

//             return res.status(422).json({ errors: formattedErrors });
//         }
//         next();
//     }
// ];


const Validator = require("validatorjs");

Validator.register('phone', (value: string) => {
    const phoneRegex = /^[+]?(\d{1,4})?[-.\s]?(\(?\d{1,3}\)?[-.\s]?)?(\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4})$/;
    return phoneRegex.test(value);
}, 'Invalid phone number');

async function validateRegister(req: any, res: any, next: any) {
    const rules = {
        name: "required|min:3|max:30",
        email: "required|email",
        phone: "required|phone",
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        const formattedErrors = Object.keys(validation.errors.errors).reduce((acc:any,key:string)=>{
            acc[key] = validation.errors.errors[key][0];
            return acc;
        },{});
        return res.status(422).json({ errors: formattedErrors });
    }

    next();
};

module.exports = {
    validateRegister
}
