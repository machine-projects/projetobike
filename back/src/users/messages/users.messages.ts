import { messageHelper } from "../../helpers/message.helper"

const userMessage = {
  username: 'username ' + messageHelper.notNull,
  firstName: 'O primeiro nome ' + messageHelper.notNull,
  lastName: 'O ultimo nome ' + messageHelper.notNull,
  cpf: 'CPF precisa ser valido!',
  password: 'A senha não pode ser nula',
  email: 'O email precisa ser valido!',
  existEmail: 'O email informado já está em uso!'
};


export {userMessage}