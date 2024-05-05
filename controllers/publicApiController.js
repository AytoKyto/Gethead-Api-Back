import { faker } from "@faker-js/faker";
import Data from "../models/DataModel.js";
import Route from "../models/RouteModel.js";

const fakeJsRenderer = (data) => {
  const dataFakeJs = {};

  data.forEach((item) => {
    switch (item.typeId) {
      case 1:
        try {
          if (item.value.includes("faker")) {
            dataFakeJs[item.name] = eval(item.value + "()");
          } else {
            try {
              if (item.value === "Number") {
                dataFakeJs[item.name] = Number(item.subValue);
              } else if (item.value === "Array" || item.value === "Object") {
                dataFakeJs[item.name] = JSON.parse(item.subValue);
              } else {
                dataFakeJs[item.name] = item.subValue;
              }
            } catch (innerError) {
              console.error(
                `Erreur lors du traitement de l'élément ${item.name}:`,
                innerError
              );
              // Définir une valeur par défaut ou autre traitement en cas d'erreur
              dataFakeJs[item.name] = null;
            }
          }
        } catch (outerError) {
          console.error(
            "Erreur lors de l'utilisation de 'Function':",
            outerError
          );
          throw outerError;
        }
        break;
      case 2:
        try {
          const nestedData = item.value.map((subItem) =>
            fakeJsRenderer([subItem])
          );
          dataFakeJs[item.name] = nestedData;
        } catch (e) {
          console.error("Erreur lors de l'utilisation de 'Function':", e);
          throw e;
        }
        break;
      case 3:
        try {
          const nestedData = {};
          item.value.forEach((subItem, index) => {
            nestedData[subItem.name] = fakeJsRenderer([subItem]);
          });
          dataFakeJs[item.name] = nestedData;
        } catch (e) {
          console.error("Erreur lors de l'utilisation de 'Function':", e);
          throw e;
        }
        break;

      default:
        console.error("typeId inconnu:", item.typeId);
    }
  });

  return dataFakeJs;
};

export const returnRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id);

    if (!route) {
      return res.status(404).json({
        status: false,
        message: "La route n'a pas été trouvée",
      });
    }

    const data = await Data.find({ route_id: id });

    const dataToSend = [];
    const dataFakeJs = {};

    for (let i = 0; i < route.number_of_loops; i++) {
      dataToSend.push(fakeJsRenderer(data[0].value));
    }

    res.status(200).json({
      status: true,
      message: "Success",
      data: dataToSend,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Une erreur serveur est survenue, veuillez réessayer",
      error: error.message,
    });
  }
};
