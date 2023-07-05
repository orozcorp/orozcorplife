import { ObjectId } from "mongodb";
export const medicosResolvers = {
  Query: {
    getMedicos: async (root, { nombre }, { db }) => {
      if (nombre === "") return [];
      const medico = await db
        .collection("Medicos")
        .find(
          { $text: { $search: nombre } },
          { score: { $meta: "textScore" }, limit: 10 }
        )
        .sort({ nombre: 1, apellido: 1 })
        .toArray();
      return medico;
    },
  },
  Mutation: {
    addMedico: async (root, { input, addNew }, { db }) => {
      const { pacientes } = input;
      try {
        if (!addNew && !input?._id) {
          const newMedico = await db.collection("Medicos").insertOne(input);
          const medicosProfile = input;
          medicosProfile._id = newMedico.insertedId.toString();
          medicosProfile.cabecera = false;
          delete medicosProfile.pacientes;
          const addToFamilia = await db.collection("users").updateMany(
            {
              _id: new ObjectId(pacientes[0]._id),
            },
            {
              $push: { "profile.medicos": medicosProfile },
            }
          );
          return {
            code: 200,
            message: "Médico agregado exitosamente",
            success: true,
          };
        } else {
          const updatedMedico = await db
            .collection("Medicos")
            .updateOne({ _id: input._id }, { $push: pacientes });
          return {
            code: 200,
            success: true,
            message: "Médico actualizado exitosamente",
          };
        }
      } catch (error) {
        console.log(error);
        return {
          code: 400,
          message: `Error al agregar médico: ${error}`,
          success: false,
        };
      }
    },
  },
};
