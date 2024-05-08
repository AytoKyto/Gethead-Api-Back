import User from "../models/UserModel.js";
import bcrypt from "bcrypt";


export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: false,
        message: "Cette adresse email est déjà utilisée pour un autre compte",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true, // Retourne l'objet modifié
        runValidators: true, // Assure que les nouvelles données respectent le schéma
      }
    );

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ status: true, message: "Compte mis à jour", user });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "Erreur serveur", error: err.message });
  }
};

/* REQUEST PASSWORD RESET */
export const resetPassword = async (req, res) => {
  try {
    const { id, newPassword } = req.body;

    const user = await User.findOne({ id });
    // Hash du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      status: true,
      message: "Mot de passe réinitialisé avec succès",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "Erreur serveur",
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  if (req.body._id === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Compte supprimé");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Vous ne pouvez pas supprimer ce compte");
  }
};
