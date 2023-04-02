// importations nécessaires
import TestModel from "../models/TestModel.js";
import { faker } from "@faker-js/faker";

// utilisation de la fonction stockée

export const generateUsername = async (req, res, next) => {
  try {
    TestModel.findOne({ name: "generateUsername" }, function (err, func) {
      if (err) return next(err);
      const generateUsername = eval(`(${func.code})`);
      const username = generateUsername();
      res.json({ username: username });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// fonction stockée une fonction en base de données
// créer une fonction de test

export const generateTest = async (req, res, next) => {
  try {
    const test = new TestModel({
      name: "generateUsername",
      code: `function generateUsername() {
            return faker.name.firstName();
        }`,
    });
    const savedTest = await test.save();
    res.status(200).json(savedTest);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get data and get function from database

export const getTests = async (req, res, next) => {
  try {
    const tests = await TestModel.find();
    const code = tests[0].code;
    // transform string to function
    const myNumber = "{ min: 10, max: 100, precision: 0.01 }";
    const myFunctionString = "faker.company.companyName()";
    const functionParts = myFunctionString.split("(");
    const functionString = functionParts[0] + "(" + myNumber + functionParts[1];
    const returnVal = { firstName: eval(`(${functionString})`) };

    const myObject = {};

    for (let i = 0; i < 12; i++) {
      // add value to array
      myObject["firstName" + i] = eval(`(${functionString})`);
    }

    res.json(myObject);
  } catch (err) {
    res.status(500).json(err);
  }
};
