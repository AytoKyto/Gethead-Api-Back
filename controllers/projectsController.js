import Project from "../models/ProjectModel.js";
import Route from "../models/RouteModel.js";

// Get all projects with user_id
export const getProjects = async (req, res) => {
  try {
    const { user_id } = req.params;
    const projects = await Project.find({ user_id: user_id });
    res.status(200).json({
      status: true,
      message: "Tous les projets",
      data: projects,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};

// Get one project
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json({
      status: true,
      message: "Projet " + req.params.id,
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};

// Create one project
export const createProject = async (req, res) => {
  const newProject = new Project(req.body);

  if (!newProject.date_created) {
    newProject.date_created = Date.now();
  }
  if (!newProject.date_updated) {
    newProject.date_updated = Date.now();
  }

  try {
    const savedProject = await newProject.save();

    // Créez une instance de Route
    const newRoute = new Route({
      project_id: savedProject._id,
      endpoint: "hello_world",
      description: null,
      number_of_loops: 1,
      date_updated: Date.now(),
      date_created: Date.now(),
    });

    // Sauvegarder la nouvelle route
    const savedRoute = await newRoute.save();

    res.status(200).json({
      status: true,
      message: "Le projet a été créé avec succès",
      data: {
        project: savedProject,
        route: savedRoute,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};

// Update one project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({
      status: true,
      message: "Le projet a été mis à jour avec succès",
      data: project,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};

// Delete one project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json("Compte supprimé");
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};
