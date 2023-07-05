import { gql } from "@apollo/client";

export const medicosSchema = gql`
  type PacienteMedico {
    _id: ID!
    nombre: String!
    apellido: String!
    familiaId: ID!
    familiaName: String!
  }
  type TelefonosMedicos {
    _id: ID
    telefono: String
    tipo: String
  }
  type Medicos {
    _id: ID!
    nombre: String!
    apellido: String!
    telefonos: [TelefonosMedicos]!
    especialidad: String!
    direccion: String
    pacientes: [PacienteMedico]
    email: String
  }
  type VisitasMedicas {
    _id: ID!
    fecha: Date!
    motivo: String!
    diagnostico: String!
    tratamiento: String!
    medicoId: ID!
    pacienteId: ID!
    pacienteName: String!
    medicoName: String!
  }
  input PacienteMedicoInput {
    _id: ID
    nombre: String!
    apellido: String!
    familiaId: ID!
    familiaName: String!
  }
  input TelefonosMedicosInput {
    _id: ID!
    telefono: String!
    tipo: String!
  }
  input MedicosInput {
    nombre: String!
    apellido: String!
    telefonos: [TelefonosMedicosInput]!
    especialidad: String!
    direccion: String!
    pacientes: [PacienteMedicoInput]!
    email: String
  }
  type Query {
    getMedicos(nombre: String!): [Medicos]
  }
  type Mutation {
    addMedico(input: MedicosInput!, addNew: Boolean!): GeneralResponse!
  }
`;
