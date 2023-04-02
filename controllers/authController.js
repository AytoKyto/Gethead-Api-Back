import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({
        status: false,
        message: "Cette adresse email est déjà utilisée pour un autre compte",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    
    const accessToken = jwt.sign(
      {
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const savedUser = await newUser.save();

    res.status(201).json({
      status: true,
      message: "Compte créé avec succès",
      id: savedUser._id,
      token: accessToken,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Une erreur s'est produite lors de la création du compte",
      error: err,
    });
  }
};

/* LOGIN USER */
export const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        status: false,
        message: "Utilisateur non trouvé, veuillez vérifier votre " + email,
        body: req.body,
      });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({
        status: false,
        message: "Mot de passe incorrect",
      });

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: remember ? "14d" : "2h" }
    );

    const { password: userPassword, ...others } = user._doc;
    res.status(200).json({
      status: true,
      message: "Connexion réussie",
      ...others,
      token: accessToken,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Une erreur s'est produite lors de la création du compte",
    });
  }
};