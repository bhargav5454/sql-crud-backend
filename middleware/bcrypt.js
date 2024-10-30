const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const bcryptRounds =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password, bcryptRounds);
    return hashedPassword;
}

const comparePasswords = (password, hashedPassword) => {
    const isMatch = bcrypt.compareSync(password, hashedPassword);
    return isMatch;
}

module.exports = {
    hashPassword,
    comparePasswords
};