import Route from "../models/RouteModel.js";

// Get all routes
export const getRoutes = async (req, res) => {
  try {
    const { project_id } = req.params;
    const routes = await Route.find({ project_id: project_id });
    res.status(200).json({
      satatus: true,
      message: "Toutes les routes",
      data: routes,
    });
  } catch (err) {
    res.status(500).json({
      satatus: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};

// Get one route
export const getRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    res.status(200).json({
      satatus: true,
      message: "Route " + req.params.id,
      data: route,
    });
  } catch (err) {
    res.status(500).json({
      satatus: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};

// Create one route
export const createRoute = async (req, res) => {
  const newRoute = new Route(req.body);

  // control endpoint, delete spaces by _ and lower case and remove accents and special characters
  const endpointControl = newRoute.endpoint.replace(/ /g, "_").toLowerCase();
  const endpointControl2 = endpointControl.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const endpointControl3 = endpointControl2.replace(/[^a-zA-Z0-9_]/g, "");
  newRoute.endpoint = endpointControl3;

  if (!newRoute.date_created) {
    newRoute.date_created = Date.now();
  }
  if (!newRoute.date_updated) {
    newRoute.date_updated = Date.now();
  }
  if (!newRoute.number_of_loops) {
    newRoute.number_of_loops = 1;
  }

  try {
    const savedRoute = await newRoute.save();
    res.status(200).json({
      satatus: true,
      message: "La route a été créée avec succès",
      data: savedRoute,
    });
  } catch (err) {
    res.status(500).json({
      satatus: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};

// Update one route
export const updateRoute = async (req, res) => {
  try {
    if (req.body.endpoint) {
      // control endpoint, delete spaces by _ and lower case and remove accents and special characters
      const endpointControl = req.body.endpoint.replace(/ /g, "_").toLowerCase();
      const endpointControl2 = endpointControl.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const endpointControl3 = endpointControl2.replace(/[^a-zA-Z0-9_]/g, "");
      req.body.endpoint = endpointControl3;
    }

    if (!req.body.date_updated) {
      req.body.date_updated = Date.now();
    }

    const route = await Route.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).json({
      satatus: true,
      message: "La route a été mise à jour avec succès",
      data: route,
    });
  } catch (err) {
    res.status(500).json({
      satatus: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};

// Delete one route
export const deleteRoute = async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.status(200).json({
      satatus: true,
      message: "La route a été supprimée avec succès",
    });
  } catch (err) {
    res.status(500).json({
      satatus: false,
      message: "Erreur serveur",
      error: err,
    });
  }
};