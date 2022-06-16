import { messageHelper } from "../../helpers/message.helper"

const userMessage = {
  username: 'username ' + messageHelper.notNull,
  firstName: 'O primeiro nome ' + messageHelper.notNull,
  lastName: 'O ultimo nome ' + messageHelper.notNull,
  cpf: 'CPF precisa ser valido!',
  password: 'A senha não pode ser nula',
  email: 'O email precisa ser valido!',
  existEmail: 'O email informado já está em uso!',
  sex: 'O sexo não pode ser nulo',
  birthDate: 'A data de nascimento não pode ser nula',
  state: 'O estado não pode ser nulo',
  city: 'A cidade não pode ser nula',
  phoneNumber: 'O telefone não pode ser nulo',
  emergencyContactName: 'O contato para emergências não pode ser nulo',
  emergencyContactPhoneNumber: 'O telefone do contato de emergências não pode ser nulo',
  accountType: 'O tipo da conta criada deve ser informado'
};


export {userMessage}