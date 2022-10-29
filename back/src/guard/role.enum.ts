export enum Role {
    Atleta  = 'Atleta',
    Organizador  = 'Organizador',
    Public = 'Public'
  }

export const RoleCollaction = {
  Organizador: [Role.Organizador],
  Atleta: [Role.Atleta, Role.Organizador],
  Public: [Role.Public],

}