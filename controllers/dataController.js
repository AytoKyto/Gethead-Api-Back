import Data from "../models/DataModel.js";

export const createData = async (req, res) => {
  try {
    const { project_id, route_id, value } = req.body;
    const newData = new Data({
      project_id,
      route_id,
      value,
    });

    if (!newData.date_created) {
      newData.date_created = Date.now();
    }
    if (!newData.date_updated) {
      newData.date_updated = Date.now();
    }

    await newData.save();
    res.status(200).json({
      satatus: true,
      message: "La données a été créée avec succès",
      data: newData,
    });
  } catch (error) {
    res.status(500).json({
      satatus: false,
      message: "Une erreur serveur est survenue, veuillez réessayer",
      error: error,
    });
  }
};

export const getData = async (req, res) => {
  try {
    const { route_id } = req.params;
    const data = await Data.find({ route_id: route_id });

    res.status(200).json({
      satatus: true,
      message: "Toutes les données",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      satatus: false,
      message: "Une erreur serveur est survenue, veuillez réessayer",
      error: error,
    });
  }
};

// Get one data
export const getOneData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    res.status(200).json({
      satatus: true,
      message: "Données " + req.params.id,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      satatus: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};

export const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    // Correction : Suppression du "new"
    const updatedData = await Data.findByIdAndUpdate(
      id,
      {
        value,
        date_updated: Date.now(), // Ajout de date_updated lors de la mise à jour
      },
      { new: true } // Pour retourner l'objet mis à jour
    );

    if (!updatedData) {
      return res.status(404).json({
        status: false,
        message: "La donnée n'a pas été trouvée",
      });
    }

    res.status(200).json({
      status: true,
      message: "La donnée a été mise à jour avec succès",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Une erreur serveur est survenue, veuillez réessayer",
      error: error.message,
    });
  }
};

// Delete one data
export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Data.findByIdAndDelete(id);

    res.status(200).json({
      satatus: true,
      message: "La données a été supprimée avec succès",
      data: deletedData,
    });
  } catch (error) {
    res.status(500).json({
      satatus: false,
      message: "Une erreur serveur est survenue, veuillez réessayer",
      error: error,
    });
  }
};
