import bcrypt from "bcrypt";

export const register = async (req, res) => {
    // destructuring the req data
    const { username, email, password } = req.body;
    
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword)
    // After hashing create new user 

    
}

export const login = (req, res) => {
    // DB operations
}

export const logout = (req, res) => {
    // DB operations
}