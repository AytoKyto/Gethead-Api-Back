import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/UserModel.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
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
      error: err.message,
    });
  }
};

/* LOGIN USER */
export const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        status: false,
        message: "Utilisateur non trouvé, veuillez vérifier votre " + email,
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
      message: "Une erreur s'est produite lors de la connexion",
      error: err.message,
    });
  }
};

/* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Utilisateur non trouvé",
      });
    }

    // Générer un token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure

    await user.save();

    // Envoyer le token par email (simulé ici)
    const resetLink = `http://localhost:3000/api/auth/reset-password?token=${token}`;
    console.log(`Lien pour réinitialiser le mot de passe : ${resetLink}`);

    res.status(200).json({
      status: true,
      message: "Email de réinitialisation envoyé",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Erreur serveur",
      error: err.message,
    });
  }
};

