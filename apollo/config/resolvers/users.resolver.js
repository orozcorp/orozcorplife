import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

function isYoungerThan18(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age < 18;
}
import nodemailer from "nodemailer";
const nodemailerMailgun = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: process.env.EMAIL_SERVER_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});
export const usersResolvers = {
  Query: {
    getUserProfile: async (root, { idUser, oldMed }, { db }) => {
      const filterCondition = oldMed
        ? { $lte: ["$$medicamento.fechaFin", new Date()] }
        : { $gte: ["$$medicamento.fechaFin", new Date()] };

      const projection = {
        _id: 1,
        email: 1,
        "profile.name": 1,
        "profile.lastName": 1,
        "profile.picture": 1,
        "profile.caratulaSeguro": 1,
        "profile.tarjetaSeguro": 1,
        "profile.fechaNacimiento": 1,
        "profile.peso": 1,
        "profile.estatura": 1,
        "profile.tipoSangre": 1,
        "profile.alergias": 1,
        "profile.enfermedades": 1,
        "profile.medicos": 1,
        "profile.rfc": 1,
        "profile.curp": 1,
        "profile.minor": 1,
        "profile.telefono": 1,
        "profile.estudios": 1,
        "profile.fechaVencimientoSeguro": 1,
        "profile.historialPeso": 1,
        "profile.historialMedico": 1,
        "profile.medicamentos": {
          $filter: {
            input: "$profile.medicamentos",
            as: "medicamento",
            cond: filterCondition,
          },
        },
      };

      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(idUser) }, { projection });

      return user;
    },
    getInformacionForDoctors: async (root, { idUser }, { db }) => {
      const userFamilias = await db
        .collection("users")
        .findOne({ _id: new ObjectId(idUser) });
      const familias = userFamilias.profile.familias.map((val) => val._id);
      const apellidos = userFamilias.profile.lastName.split(" ");
      const familyMembers = await db
        .collection("users")
        .aggregate([
          {
            $match: {
              $and: [
                { "profile.familias._id": { $in: familias } },
                {
                  $or: [
                    {
                      "profile.lastName": {
                        $regex: apellidos[0],
                        $options: "i",
                      },
                    },
                    {
                      "profile.lastName": {
                        $regex: apellidos[1],
                        $options: "i",
                      },
                    },
                  ],
                },
              ],
            },
          },
          {
            $project: {
              _id: 1,
              name: { $concat: ["$profile.name", " ", "$profile.lastName"] },
              alergias: "$profile.alergias",
              enfermedades: "$profile.enfermedades",
            },
          },
        ])
        .toArray();
      const filteredFamilyMembers = familyMembers.filter(
        (val) =>
          val.name !==
          userFamilias.profile.name + " " + userFamilias.profile.lastName
      );
      return {
        _id: userFamilias._id,
        name: userFamilias.profile.name,
        lastName: userFamilias.profile.lastName,
        peso: userFamilias.profile.peso,
        estatura: userFamilias.profile.estatura,
        tipoSangre: userFamilias.profile.tipoSangre,
        alergias: userFamilias.profile.alergias,
        enfermedades: userFamilias.profile.enfermedades,
        medicamentos: userFamilias.profile.medicamentos?.sort((a, b) => {
          const dateA = new Date(a.fechaInicio);
          const dateB = new Date(b.fechaInicio);
          return dateB - dateA;
        }),
        historialMedico: userFamilias.profile.historialMedico?.sort((a, b) => {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);
          return dateB - dateA;
        }),
        fechaNacimiento: userFamilias.profile.fechaNacimiento,
        estudios: userFamilias.profile.estudios?.sort((a, b) => {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);
          return dateB - dateA;
        }),
        familiares: filteredFamilyMembers,
      };
    },
    getFamilyMembers: async (root, { idUser }, { db }) => {
      const userFamilias = await db
        .collection("users")
        .findOne({ _id: new ObjectId(idUser) });
      const familias = userFamilias.profile.familias.map((val) => val._id);
      return await db
        .collection("users")
        .find(
          { "profile.familias._id": { $in: familias } },
          {
            projection: {
              _id: 1,
              "profile.name": 1,
              "profile.lastName": 1,
              "profile.picture": 1,
              "profile.familias": 1,
            },
          }
        )
        .sort({ "profile.name": 1, "profile.lastName": 1 })
        .toArray();
    },
    getFamilyDoctors: async (root, { idUser, nombre }, { db }) => {
      if (nombre === "") return [];
      return await db
        .collection("users")
        .aggregate([
          {
            $match: {
              _id: new ObjectId(idUser),
            },
          },
          {
            $unwind: "$profile.medicos",
          },
          {
            $match: {
              $or: [
                {
                  "profile.medicos.nombre": {
                    $regex: nombre,
                    $options: "i",
                  },
                },
                {
                  "profile.medicos.apellido": {
                    $regex: nombre,
                    $options: "i",
                  },
                },
              ],
            },
          },
          {
            $group: {
              _id: "$_id",
              medicos: {
                $push: "$profile.medicos",
              },
            },
          },
          {
            $project: {
              _id: 0,
              medicos: 1,
            },
          },
          {
            $unwind: "$medicos",
          },
          {
            $project: {
              _id: "$medicos._id",
              nombre: "$medicos.nombre",
              apellido: "$medicos.apellido",
              telefonos: "$medicos.telefonos",
              especialidad: "$medicos.especialidad",
              direccion: "$medicos.direccion",
            },
          },
          {
            $sort: {
              nombre: 1,
              apellido: 1,
            },
          },
        ])
        .toArray();
    },
    createPesoGraphData: async (root, { idUser }, { db }) => {
      try {
        const aggregatePeso = await db
          .collection("users")
          .aggregate([
            { $match: { _id: new ObjectId(idUser) } },
            { $unwind: "$profile.historialPeso" },
            {
              $project: {
                fecha: "$profile.historialPeso.fecha",
                peso: "$profile.historialPeso.peso",
              },
            },
            { $sort: { fecha: 1 } },
            {
              $group: {
                _id: {
                  year: { $year: "$fecha" },
                  week: { $week: "$fecha" },
                },
                peso: { $avg: "$peso" },
              },
            },
            {
              $sort: {
                "_id.year": 1,
                "_id.week": 1,
              },
            },
            {
              $project: {
                _id: 0,
                label: {
                  $concat: [
                    { $toString: "$_id.year" },
                    " - ",
                    { $toString: "$_id.week" },
                  ],
                },
                peso: 1,
              },
            },
          ])
          .toArray();
        return {
          labels: aggregatePeso.map((item) => item.label),
          datasets: [
            {
              label: "Peso en kg",
              data: aggregatePeso.map((item) => item.peso),
              backgroundColor: "rgba(220, 10, 10, 1)",
              borderColor: "rgba(220, 10, 10, 1)",
            },
          ],
        };
      } catch (error) {
        return {
          labels: [],
          datasets: [],
        };
      }
    },
    createEstaturaGraphData: async (root, { idUser }, { db }) => {
      try {
        const aggregatePeso = await db
          .collection("users")
          .aggregate([
            { $match: { _id: new ObjectId(idUser) } },
            { $unwind: "$profile.historialPeso" },
            {
              $project: {
                fecha: "$profile.historialPeso.fecha",
                estatura: "$profile.historialPeso.estatura",
              },
            },
            { $sort: { fecha: 1 } },
            {
              $group: {
                _id: {
                  year: { $year: "$fecha" },
                  week: { $week: "$fecha" },
                },
                estatura: { $avg: "$estatura" },
              },
            },
            {
              $sort: {
                "_id.year": 1,
                "_id.week": 1,
              },
            },
            {
              $project: {
                _id: 0,
                label: {
                  $concat: [
                    { $toString: "$_id.year" },
                    " - ",
                    { $toString: "$_id.week" },
                  ],
                },
                estatura: 1,
              },
            },
          ])
          .toArray();
        return {
          labels: aggregatePeso.map((item) => item.label),
          datasets: [
            {
              label: "Estatura en cm",
              data: aggregatePeso.map((item) => item.estatura),
              backgroundColor: "rgba(220, 10, 10, 1)",
              borderColor: "rgba(220, 10, 10, 1)",
            },
          ],
        };
      } catch (error) {
        return {
          labels: [],
          datasets: [],
        };
      }
    },
  },
  Mutation: {
    insertUser: async (root, { input }, { db }) => {
      const familyArray = input.familias.map((item) => item._id);
      const families = await db
        .collection("users")
        .aggregate([
          { $match: { "profile.familias._id": { $in: familyArray } } },
          { $unwind: "$profile.familias" },
          { $match: { "profile.familias._id": { $in: familyArray } } },
          { $group: { _id: "$profile.familias._id", count: { $sum: 1 } } },
        ])
        .toArray();
      const canAdd = families.every((item) => item.count < 19);
      if (!canAdd) {
        return {
          code: 400,
          message: "No se puede agregar más de 20 miembros a una familia",
          success: false,
        };
      }
      const { email, fechaNacimiento, ...profile } = input;
      const newUser = {
        email,
        profile: {
          ...profile,
          fechaNacimiento: new Date(fechaNacimiento),
          minor: isYoungerThan18(new Date(fechaNacimiento)),
          medicamentos: [],
          medicos: [],
          estudios: [],
          roles: ["familiar"],
        },
        createdAt: new Date(),
      };
      try {
        const { insertedId } = await db.collection("users").insertOne(newUser);
        await nodemailerMailgun.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Hola ${profile.name} un familiar te ha agregado a su familia en la app de salud Orozcorp`,
          text: `Estimado(a) ${profile.name} ${profile.lastName},\n\nNos complace informarte que un familiar te ha inscrito en OrozCorp, una aplicación que te permite llevar un registro médico familiar. OrozCorp te ayuda a mantener un seguimiento de los historiales médicos de todos tus seres queridos, proporcionándote una manera organizada y fácil de acceder a esta información importante.\n\nPara comenzar a utilizar OrozCorp, por favor accede a la aplicación en https://orozcorp.live e inicia sesión utilizando la siguiente dirección de correo electrónico: ${email}\n\nUna vez que inicies sesión, podrás ver y actualizar los historiales médicos de los miembros de tu familia, así como añadir nuevos registros médicos según sea necesario.\n\nSi tienes alguna pregunta o necesitas ayuda con la aplicación, no dudes en ponerte en contacto con nuestro equipo de soporte. Estaremos encantados de ayudarte en lo que necesites.\n\nGracias por formar parte de la familia OrozCorp. ¡Esperamos que nuestra aplicación te resulte valiosa para mantener a tu familia saludable y protegida!\n\nAtentamente,\n\nEl equipo de OrozCorp`,
          html: `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Bienvenido a OrozCorp</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          <p>Estimado(a) ${profile.name} ${profile.lastName},</p>

          <p>Nos complace informarte que un familiar te ha inscrito en OrozCorp, una aplicación que te permite llevar un registro médico familiar. OrozCorp te ayuda a mantener un seguimiento de los historiales médicos de todos tus seres queridos, proporcionándote una manera organizada y fácil de acceder a esta información importante.</p>

          <p>Para comenzar a utilizar OrozCorp, por favor accede a la aplicación en <a href="https://orozcorp.live">https://orozcorp.live</a> e inicia sesión utilizando la siguiente dirección de correo electrónico: ${email}</p>

          <p>Una vez que inicies sesión, podrás ver y actualizar los historiales médicos de los miembros de tu familia, así como añadir nuevos registros médicos según sea necesario.</p>

          <p>Si tienes alguna pregunta o necesitas ayuda con la aplicación, no dudes en ponerte en contacto con nuestro equipo de soporte. Estaremos encantados de ayudarte en lo que necesites.</p>

          <p>Gracias por formar parte de la familia OrozCorp. ¡Esperamos que nuestra aplicación te resulte valiosa para mantener a tu familia saludable y protegida!</p>

          <p>Atentamente,</p>

          <p>El equipo de OrozCorp</p>
        </body>
        </html>`,
        });
        return {
          message: "Usuario creado",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al crear usuario",
          success: false,
        };
      }
    },
    notifyUserFamily: async (root, { family, email }, { db }) => {
      try {
        const user = await db.collection("users").findOne({ email });
        if (!user) {
          return {
            code: 400,
            message: "No se encontró el usuario",
            success: false,
          };
        }
        const updated = await db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(user._id) },
            { $push: { "profile.familyInvitations": family } }
          );
        await nodemailerMailgun.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Hola ${user.profile.name} un familiar quiere ha agregarte a su familia en la app de salud Orozcorp`,
          text: `Estimado(a) ${user.profile.name} ${user.profile.lastName},\n\nNos complace informarte quiere agregarte a su familia en OrozCorp. \n\nPara aceptar la invitacion por favor accede a la aplicación en https://orozcorp.live e inicia sesión\n\nSi tienes alguna pregunta o necesitas ayuda con la aplicación, no dudes en ponerte en contacto con nuestro equipo de soporte. Estaremos encantados de ayudarte en lo que necesites.\n\nGracias por formar parte de la familia OrozCorp. ¡Esperamos que nuestra aplicación te resulte valiosa para mantener a tu familia saludable y protegida!\n\nAtentamente,\n\nEl equipo de OrozCorp`,
          html: `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="UTF-8">
                    <title>Bienvenido a OrozCorp</title>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                      }
                    </style>
                  </head>
                  <body>
                    <p>Estimado(a) ${user.profile.name} ${user.profile.lastName},</p>

                    <p>Nos complace informarte que un familiar quiere agregarte a su familia en OrozCorp. </p>

                    <p>Para aceptar por favor accede a la aplicación en <a href="https://orozcorp.live">https://orozcorp.live</a> e inicia sesión </p>

                    <p>Si tienes alguna pregunta o necesitas ayuda con la aplicación, no dudes en ponerte en contacto con nuestro equipo de soporte. Estaremos encantados de ayudarte en lo que necesites.</p>

                    <p>Gracias por formar parte de la familia OrozCorp. ¡Esperamos que nuestra aplicación te resulte valiosa para mantener a tu familia saludable y protegida!</p>

                    <p>Atentamente,</p>

                    <p>El equipo de OrozCorp</p>
                  </body>
                  </html>`,
        });
        return {
          message: "Usuario creado",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al crear usuario",
          success: false,
        };
      }
    },
    updateUserWeightHeight: async (
      root,
      { idUser, estatura, peso, fecha },
      { db }
    ) => {
      try {
        const obj = {
          _id: uuidv4(),
          user: idUser,
          peso,
          estatura,
          fecha: new Date(fecha),
        };

        await db.collection("users").updateOne(
          { _id: new ObjectId(idUser) },
          {
            $set: {
              "profile.estatura": estatura,
              "profile.peso": peso,
            },
            $push: { "profile.historialPeso": obj },
          }
        );

        return {
          message: "Estatura actualizada",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al actualizar estatura",
          success: false,
        };
      }
    },
    updateUserSeguro: async (root, { idUser, seguro }, { db }) => {
      try {
        await db.collection("users").updateOne(
          { _id: new ObjectId(idUser) },
          {
            $set: {
              "profile.caratulaSeguro": seguro.caratulaSeguro,
              "profile.tarjetaSeguro": seguro.tarjetaSeguro,
              "profile.fechaVencimientoSeguro": seguro.fechaVencimientoSeguro,
            },
          }
        );
        return {
          message: "Seguro actualizado",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al actualizar seguro",
          success: false,
        };
      }
    },
    insertUserMedicamentos: async (root, { idUser, medicamento }, { db }) => {
      medicamento._id = new ObjectId();
      medicamento.fechaInicio = new Date(medicamento.fechaInicio);
      medicamento.fechaFin = new Date(medicamento.fechaFin);
      try {
        const update = await db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(idUser) },
            { $push: { "profile.medicamentos": medicamento } }
          );
        return {
          message: "Medicamentos agregados",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar medicamentos",
          success: false,
        };
      }
    },
    updateUserProfile: async (root, { userId, email, input }, { db }) => {
      try {
        await db.collection("users").updateOne(
          {
            _id: new ObjectId(userId),
          },
          {
            $set: {
              email,
              "profile.tipoSangre": input.tipoSangre,
              "profile.alergias": input.alergias,
              "profile.enfermedades": input.enfermedades,
              "profile.fechaNacimeinto": new Date(input.fechaNacimeinto),
              "profile.rfc": input.rfc,
              "profile.curp": input.curp,
              "profile.name": input.name,
              "profile.lastName": input.lastName,
            },
          }
        );
        return {
          message: "User profile updated",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar medicamentos",
          success: false,
        };
      }
    },
    insertUserHistorialMedico: async (root, { idUser, historial }, { db }) => {
      historial._id = uuidv4();
      try {
        await db.collection("users").updateOne(
          {
            _id: new ObjectId(idUser),
          },
          {
            $push: {
              "profile.historialMedico": historial,
            },
          }
        );
        return {
          message: "Historial medico agregado",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar historial medico",
          success: false,
        };
      }
    },
    insertUserEstudios: async (root, { idUser, estudio }, { db }) => {
      estudio._id = uuidv4();
      try {
        await db.collection("users").updateOne(
          {
            _id: new ObjectId(idUser),
          },
          {
            $push: {
              "profile.estudios": estudio,
            },
          }
        );
        return {
          message: "Estudio medico agregado",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar estudio medico",
          success: false,
        };
      }
    },
    updateMedicoCabecera: async (root, { idUser, idMedico }, { db }) => {
      try {
        // Get the user data
        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(idUser) });

        // Set the specific idMedico's cabecera to true and others to false
        const updatedMedicos = user.profile.medicos.map((medico) =>
          medico._id === idMedico
            ? { ...medico, cabecera: true }
            : { ...medico, cabecera: false }
        );

        // Update the user's medicos with the updated medicos list
        await db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(idUser) },
            { $set: { "profile.medicos": updatedMedicos } }
          );

        return {
          message: "Medico cabecera agregado",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al agregar medico cabecera",
          success: false,
        };
      }
    },
    insertUserSignUp: async (root, { input, familia }, { db }) => {
      const email = input.email;
      delete input.email;
      input.fechaNacimiento = new Date(input.fechaNacimiento);
      input.minor = isYoungerThan18(input.fechaNacimiento);
      input.medicamentos = [];
      input.medicos = [];
      input.estudios = [];
      input.roles = ["familiar"];
      const user = {
        profile: { ...input },
        createdAt: new Date(),
        email,
      };
      try {
        const { insertedId } = await db.collection("users").insertOne(user);
        const familiaInsert = {
          nombre: familia,
          adminstradorName: `${input.name} ${input.lastName}`,
          adminstradorId: insertedId.toString(),
        };
        const familiaInserted = await db
          .collection("Familias")
          .insertOne(familiaInsert);
        const familiaObject = {
          ...familiaInsert,
          _id: familiaInserted.insertedId.toString(),
          nuclear: true,
        };
        await db
          .collection("users")
          .updateOne(
            { _id: insertedId },
            { $push: { "profile.familias": familiaObject } }
          );
        await nodemailerMailgun.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Bienvenid@ ${input.name} a la app de salud Orozcorp`,
          text: `Estimado(a) ${input.name} ${input.lastName},\n\nNos complace informarte que te has inscrito en OrozCorp, una aplicación que te permite llevar un registro médico familiar. OrozCorp te ayuda a mantener un seguimiento de los historiales médicos de todos tus seres queridos, proporcionándote una manera organizada y fácil de acceder a esta información importante.\n\nPara comenzar a utilizar OrozCorp, por favor accede a la aplicación en https://orozcorp.live e inicia sesión utilizando la siguiente dirección de correo electrónico: ${email}\n\nUna vez que inicies sesión, podrás ver y actualizar los historiales médicos de los miembros de tu familia, así como añadir nuevos registros médicos según sea necesario.\n\nSi tienes alguna pregunta o necesitas ayuda con la aplicación, no dudes en ponerte en contacto con nuestro equipo de soporte. Estaremos encantados de ayudarte en lo que necesites.\n\nGracias por formar parte de la familia OrozCorp. ¡Esperamos que nuestra aplicación te resulte valiosa para mantener a tu familia saludable y protegida!\n\nAtentamente,\n\nEl equipo de OrozCorp`,
          html: `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Bienvenido a OrozCorp</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          <p>Estimado(a) ${input.name} ${input.lastName},</p>

          <p>Nos complace informarte que has inscrito en OrozCorp, una aplicación que te permite llevar un registro médico familiar. OrozCorp te ayuda a mantener un seguimiento de los historiales médicos de todos tus seres queridos, proporcionándote una manera organizada y fácil de acceder a esta información importante.</p>

          <p>Para comenzar a utilizar OrozCorp, por favor accede a la aplicación en <a href="https://orozcorp.live">https://orozcorp.live</a> e inicia sesión utilizando la siguiente dirección de correo electrónico: ${email}</p>

          <p>Una vez que inicies sesión, podrás ver y actualizar los historiales médicos de los miembros de tu familia, así como añadir nuevos registros médicos según sea necesario.</p>

          <p>Si tienes alguna pregunta o necesitas ayuda con la aplicación, no dudes en ponerte en contacto con nuestro equipo de soporte. Estaremos encantados de ayudarte en lo que necesites.</p>

          <p>Gracias por formar parte de la familia OrozCorp. ¡Esperamos que nuestra aplicación te resulte valiosa para mantener a tu familia saludable y protegida!</p>

          <p>Atentamente,</p>

          <p>El equipo de OrozCorp</p>
        </body>
        </html>`,
        });
        return {
          message: "Usuario creado",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.error(error);
        return {
          code: 400,
          message: "Error al crear usuario",
          success: false,
        };
      }
    },
    updateMedicamentoDate: async (root, { idUser, idMedicamento }, { db }) => {
      try {
        const update = await db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(idUser) },
            { $set: { "profile.medicamentos.$[elem].fechaFin": new Date() } },
            { arrayFilters: [{ "elem._id": new ObjectId(idMedicamento) }] }
          );
        return {
          message: "Medicamento actualizado",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.log(error);
        return {
          code: 400,
          message: "Error al actualizar fecha",
          success: false,
        };
      }
    },
    insertUserFamilia: async (root, { idUser, familia }, { db }) => {
      try {
        const nuclear = familia.nuclear;
        delete familia.nuclear;

        const familiaInsert = await db
          .collection("Familias")
          .insertOne(familia);

        const user = await db
          .collection("users")
          .findOne({ _id: new ObjectId(idUser) });
        const currentFamilias = user.profile.familias;

        let newFamilias;

        if (nuclear) {
          newFamilias = currentFamilias.map((familia) => ({
            ...familia,
            nuclear: false,
          }));
        } else {
          newFamilias = [...currentFamilias];
        }

        newFamilias.push({
          ...familia,
          _id: familiaInsert.insertedId.toString(),
          nuclear,
        });

        await db.collection("users").updateOne(
          {
            _id: new ObjectId(idUser),
          },
          {
            $set: {
              "profile.familias": newFamilias,
            },
          }
        );

        return {
          message: "Familia agregada",
          success: true,
          code: 200,
        };
      } catch (error) {
        console.log(error);
        return {
          code: 400,
          message: "Error al agregar familia",
          success: false,
        };
      }
    },
    aceptarInvitacionFamilia: async (
      root,
      { idUser, idInvitacion },
      { db }
    ) => {
      try {
        //First we get the invitation
        const invitation = await db.collection("users").findOne(
          {
            _id: new ObjectId(idUser),
            "profile.familyInvitations._id": idInvitacion,
          },
          {
            projection: {
              "profile.familyInvitations.$": 1,
              "profile.familias": 1,
            },
          }
        );
        const familiaToAdd = await db
          .collection("Familias")
          .findOne({ _id: invitation.profile.familyInvitations[0].familiaId });
        const currentFamilias = user.profile.familias;
        const newFamilias = [
          ...currentFamilias,
          {
            ...familiaToAdd,
            _id: familiaToAdd._id.toString(),
          },
        ];
        const addUserToFamilia = await db.collection("users").updateOne(
          { _id: new ObjectId(idUser) },
          {
            $set: { "profile.familias": newFamilias },
            $pull: { "profile.familyInvitations": { _id: idInvitacion } },
          }
        );
      } catch (error) {
        console.log(error);
        return {
          code: 400,
          message: "Error al agregar familia",
          success: false,
        };
      }
    },
  },
};
