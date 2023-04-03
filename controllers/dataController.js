// import DataModel from "../models/dataModel.js";

// export const createData = async (req, res) => {
//   try {
//     const {
//       project_id,
//       route_id,
//       name,
//       type,
//       valeur,
//       argument
//     } = req.body;
//     const newData = new DataModel({
//       project_id,
//       route_id,
//       name,
//       type,
//       valeur,
//       argument
//     });

//     // control name, delete spaces by _ and lower case and remove accents and special characters
//     const nameControl = newData.name.replace(/ /g, "_").toLowerCase();
//     const nameControl2 = nameControl.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//     const nameControl3 = nameControl2.replace(/[^a-zA-Z0-9_]/g, "");
//     newData.name = nameControl3;

//     if (!newData.date_created) {
//       newData.date_created = Date.now();
//     }
//     if (!newData.date_updated) {
//       newData.date_updated = Date.now();
//     }

//     await newData.save();
//     res.status(200).json({
//       satatus: true,
//       message: "La données a été créée avec succès",
//       data: newData
//     });
//   } catch (error) {
//     res.status(500).json({
//       satatus: false,
//       message: "Une erreur serveur est survenue, veuillez réessayer",
//       error: error
//     });
//   }
// };

// export const getData = async (req, res) => {
//   try {
//     const { route_id } = req.params;
//     const data = await DataModel.find({ route_id: route_id });

//     res.status(200).json({
//       satatus: true,
//       message: "Toutes les données",
//       data: data
//     });
//   } catch (error) {
//     res.status(500).json({
//       satatus: false,
//       message: "Une erreur serveur est survenue, veuillez réessayer",
//       error: error
//     });
//   }
// };

// // Get one data
// export const getOneData = async (req, res) => {
//   try {
//     const data = await DataModel.findById(req.params.id);
//     res.status(200).json({
//       satatus: true,
//       message: "Données " + req.params.id,
//       data: data
//     });
//   } catch (err) {
//     res.status(500).json({
//       satatus: false,
//       message: "Erreur serveur",
//       error: err
//     });
//   }
// };

// export const updateData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = await DataModel.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updatedData.name) {
//       // control name, delete spaces and replace by (_) and lower case and remove accents and special characters sauf _
//       const nameControl = updatedData.name.replace(/ /g, "_").toLowerCase();
//       const nameControl2 = nameControl.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//       const nameControl3 = nameControl2.replace(/[^a-zA-Z0-9_]/g, "");
//       updatedData.name = nameControl3;
//     }

//     if (!updatedData.date_updated) {
//       updatedData.date_updated = Date.now();
//     }

//     res.status(200).json({
//       satatus: true,
//       message: "La données a été mise à jour avec succès",
//       data: updatedData
//     });
//   } catch (error) {
//     res.status(500).json({
//       satatus: false,
//       message: "Une erreur serveur est survenue, veuillez réessayer",
//       error: error
//     });
//   }
// };

// // Delete one data
// export const deleteData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedData = await DataModel.findByIdAndDelete(id);

//     res.status(200).json({
//       satatus: true,
//       message: "La données a été supprimée avec succès",
//       data: deletedData
//     });
//   } catch (error) {
//     res.status(500).json({
//       satatus: false,
//       message: "Une erreur serveur est survenue, veuillez réessayer",
//       error: error
//     });
//   }
// };