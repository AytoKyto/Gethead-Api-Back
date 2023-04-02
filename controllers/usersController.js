import User from '../models/UserModel.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateUser = async (req, res) => {
    if (req.body._id === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json("Compte mis à jour");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Vous ne pouvez pas mettre à jour ce compte");
    }
}

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
}