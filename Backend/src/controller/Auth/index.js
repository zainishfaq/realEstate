import UserModel from "../../model/user/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authController = {
  SignUp: async (req, res) => {
    try {
      const payload = req.body;
      const saltRounds = 10;
      const hPassword = await bcrypt.hash(payload.password, saltRounds);

      const user = await UserModel.create({
        username: payload.username,
        email: payload.email,
        password: hPassword
      });

      res.status(201).json({
        message: "User is signed up"
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  SignIn: async (req, res) => {
    try {
      const payload = req.body;

      const user = await UserModel.findOne({
        where: { email: payload.email }
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const result = await bcrypt.compare(payload.password, user.password);

      if (!result) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "50m"
        }
      );

      res.json({
        message: "User logged in",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        }
      });
    } catch (error) {
      console.error("Error signing in:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  GoogleSignIn: async (req, res) => {
    try {
      console.log(req.body);
      const { username, email, imageurl } = req.body;

      let user = await UserModel.findOne({ where: { email } });

      if (!user) {
        user = await UserModel.create({ username, email, avatar: imageurl });
      } else if (!user.avatar) {
        await user.update({ avatar: imageurl });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        }
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      res.status(500).json({ message: "Google sign-in failed" });
    }
  },

   signOut : (req, res) => {
    req.session.destroy(error => {

      if (error) {
        console.error('Error destroying session:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
      
      res.clearCookie('session-id'); 
      res.json({ success: true, message: 'User signed out successfully' });
    });
  }
}

export default authController;
