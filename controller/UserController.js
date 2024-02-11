const { DataTypes } = require("sequelize");
const { sequelize } = require("../models");
const User = require("../models/pdfuser.model")(sequelize, DataTypes);
const bcrypt = require("bcrypt");



class UserController {
    static async RegisterUser(req, res) {
        try {
            const { username, email, password, role, permissions } = req.body;

            const existingUser = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username: username,
                email: email,
                password: hashedPassword,
                role: role || 'user',
                permissions: permissions || [],
            });

            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async LoginUser(req, res) {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({
                where: {
                    email: email,
                },
            });
    
            if (!existingUser) {
                return res.status(400).render("/");
            }
    
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return res.status(400).render('/');
            }
    
            // Kullanıcı doğrulaması başarılı olduğunda oturum nesnesine kullanıcı bilgilerini ata
            req.session.user = existingUser;
    
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).render('/');
        }
    }
    
    static async LogoutUser(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.redirect('/');
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async GetRegister(req, res) {
        res.render("register")
    }
}



module.exports = { UserController }
