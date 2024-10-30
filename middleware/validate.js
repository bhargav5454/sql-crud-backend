const validate = (schema) => (req, res, next) => {
    const validationTypes = ['body', 'params', 'query']; 
    
    for (const type of validationTypes) {
        if (schema[type]) {
            const { error } = schema[type].validate(req[type]);
            if (error) return res.status(400).json({ message: error.details[0].message });
        }
    }
    req.user
    next(); 
};

module.exports = validate;
