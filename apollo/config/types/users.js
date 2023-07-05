import { gql } from "@apollo/client";

export const usersSchema = gql`
  enum AllowedRoles {
    admin
    superAdmin
    client
    familiar
  }
  type BabyGrowth {
    _id: ID!
    user: ID!
    fecha: Date!
    peso: Float!
    estatura: Float
  }
  type Familia {
    _id: ID!
    nombre: String!
    administradorName: String!
    administradorId: ID!
    nuclear: Boolean
  }

  type Medicamentos {
    _id: ID!
    fechaInicio: Date!
    fechaFin: Date!
    nombre: String!
    dosis: String!
    frecuencia: String!
    observaciones: String
    sirvePara: String!
    medicoName: String!
    medicoId: ID!
  }
  input MedicamentosInput {
    fechaInicio: Date!
    fechaFin: Date!
    nombre: String!
    dosis: String!
    frecuencia: String!
    observaciones: String
    sirvePara: String!
    medicoName: String!
    medicoId: ID!
  }
  type MedicosProfile {
    _id: ID!
    nombre: String!
    apellido: String!
    telefonos: [TelefonosMedicos]
    especialidad: String!
    cabecera: Boolean!
    direccion: String
  }
  type HistorialMedico {
    _id: ID!
    fecha: Date!
    descripcion: String!
    medicoName: String!
    medicoId: ID!
  }
  type Estudios {
    _id: ID!
    fecha: Date!
    descripcion: String!
    medicoName: String!
    medicoId: ID!
    estudio: String!
  }
  input HistorialMedicoInput {
    fecha: Date!
    descripcion: String!
    medicoName: String!
    medicoId: ID!
  }
  input EstudiosInput {
    fecha: Date!
    descripcion: String!
    medicoName: String!
    medicoId: ID!
    estudio: String!
  }
  type FamiliaUserSendDoctor {
    _id: ID!
    name: String!
    alergias: [String]
    enfermedades: [String]
    telefono: String
  }
  type UserSendDoctor {
    _id: ID!
    name: String!
    lastName: String!
    peso: Float
    estatura: Float
    tipoSangre: String
    fechaNacimiento: Date
    alergias: [String]
    enfermedades: [String]
    medicamentos: [Medicamentos]
    historialMedico: [HistorialMedico]
    estudios: [Estudios]
    familiares: [FamiliaUserSendDoctor]
    medicos: [MedicosProfile]
    tarjetaSeguro: String
  }
  type FamilyInvitation {
    _id: ID!
    familiaName: String!
    familiaId: ID!
    userWhoInvited: String!
    userWhoInvitedId: ID!
    estatus: String!
    fecha: Date!
  }

  input FamilyInvitationInput {
    _id: ID!
    familiaName: String!
    familiaId: ID!
    userWhoInvited: String!
    userWhoInvitedId: ID!
    estatus: String!
    fecha: Date!
  }
  type UserProfile {
    name: String!
    lastName: String!
    roles: [AllowedRoles!]!
    picture: String
    caratulaSeguro: String
    tarjetaSeguro: String
    telefono: String
    fechaVencimientoSeguro: Date
    fechaNacimiento: Date
    peso: Float
    estatura: Float
    historialPeso: [BabyGrowth]
    tipoSangre: String
    alergias: [String]
    enfermedades: [String]
    medicamentos: [Medicamentos]
    medicos: [MedicosProfile]
    estudios: [Estudios]
    minor: Boolean
    familias: [Familia]
    rfc: String!
    curp: String!
    historialMedico: [HistorialMedico]
    familyInvitations: [FamilyInvitation]
  }
  input FamiliaInput {
    _id: ID
    nombre: String!
    administradorName: String!
    administradorId: ID!
    nuclear: Boolean
  }
  input UserInput {
    email: String!
    name: String!
    lastName: String!
    telefono: String!
    roles: [AllowedRoles!]!
    peso: Float!
    estatura: Float!
    alergias: [String]
    enfermedades: [String]
    familias: [FamiliaInput]
    tipoSangre: String!
    fechaNacimiento: Date!
    rfc: String!
    curp: String!
  }
  input UserSignUpInput {
    email: String!
    name: String!
    lastName: String!
    peso: Float!
    telefono: String!
    estatura: Float!
    alergias: [String]
    enfermedades: [String]
    tipoSangre: String!
    fechaNacimiento: Date!
    rfc: String!
    curp: String!
  }
  input UserInputEdit {
    tipoSangre: String!
    fechaNacimiento: Date!
    rfc: String!
    curp: String!
    peso: Float!
    estatura: Float!
    name: String!
    telefono: String
    lastName: String!
    picture: String
    alergias: [String]
    enfermedades: [String]
  }
  input SeguroInput {
    caratulaSeguro: String!
    tarjetaSeguro: String!
    fechaVencimientoSeguro: Date!
  }
  type User {
    _id: ID!
    createdAt: Date!
    email: String!
    emailVerified: Date
    profile: UserProfile
  }
  type Dataset {
    label: String!
    data: [Float]!
    backgroundColor: String!
    borderColor: String!
  }
  type LineChart {
    labels: [String]!
    datasets: [Dataset]!
  }
  type Query {
    getUserProfile(idUser: String!, oldMed: Boolean!): User
    getFamilyMembers(idUser: String!): [User]
    getFamilyDoctors(idUser: ID!, nombre: String): [MedicosProfile]
    createPesoGraphData(idUser: String!): LineChart!
    createEstaturaGraphData(idUser: String!): LineChart!
    getInformacionForDoctors(idUser: String!): UserSendDoctor
  }
  type Mutation {
    insertUser(input: UserInput!): GeneralResponse!
    notifyUserFamily(
      family: FamilyInvitationInput!
      email: String
    ): GeneralResponse!
    updateUserProfile(
      userId: ID!
      email: String!
      input: UserInputEdit!
    ): GeneralResponse!
    updateUserWeightHeight(
      idUser: String!
      estatura: Float!
      peso: Float!
      fecha: Date!
    ): GeneralResponse!
    updateUserSeguro(idUser: String!, seguro: SeguroInput!): GeneralResponse!
    insertUserMedicamentos(
      idUser: String!
      medicamento: MedicamentosInput!
    ): GeneralResponse!
    insertUserHistorialMedico(
      idUser: String!
      historial: HistorialMedicoInput!
    ): GeneralResponse!
    insertUserEstudios(
      idUser: String!
      estudio: EstudiosInput!
    ): GeneralResponse!
    updateMedicoCabecera(idUser: String!, idMedico: String!): GeneralResponse!
    insertUserSignUp(
      input: UserSignUpInput!
      familia: String!
    ): GeneralResponse!
    updateMedicamentoDate(
      idUser: String!
      idMedicamento: String!
    ): GeneralResponse!
    insertUserFamilia(idUser: String!, familia: FamiliaInput!): GeneralResponse!
    aceptarInvitacionFamilia(
      idUser: String!
      idInvitacion: String!
    ): GeneralResponse!
  }
`;
