import { faker } from "@faker-js/faker";
import Data from '../models/DataModel.js';
import Route from '../models/RouteModel.js';

export const returnRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await Route.findById(id);
        const data = await Data.find({ route_id: id });

        let dataToSend = [];

        for (let i = 0; i < route.number_of_loops; i++) {
            const dataObj = {};
            dataObj.id = i;

            for (let j = 0; j < data.length; j++) {
                const argumentString = data[j].argument;
                const valeurString = data[j].valeur;

                if (valeurString.includes("faker")) {
                    const valeurSplit = valeurString.split("(");
                    const valeurFu = valeurSplit[0] + "(" + argumentString + valeurSplit[1];

                    dataObj[data[j].name] = eval(valeurFu);
                } else {
                    res.status(500).json({
                        satatus: false,
                        message: 'Une erreur serveur est survenue, car la valeur n\'est pas une fonction valide',
                    });
                }
            }
            dataToSend.push(dataObj);
        }

        res.status(200).json({
            satatus: true,
            message: 'Success',
            data: dataToSend
        });

    } catch (error) {
        res.status(500).json({
            satatus: false,
            message: 'Une erreur serveur est survenue, veuillez réessayer',
            error: error
        });
    }
};