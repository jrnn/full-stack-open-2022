const mongoose = require("mongoose")

const { argv: arguments } = process
const password = arguments[2]
const personSchema = new mongoose.Schema({
  name: String,
  phone: String
})
const PersonModel = mongoose.model("Person", personSchema)

function openConnection() {
  return mongoose
    .connect(`mongodb+srv://fso22:${password}@fso22.4vb4j.mongodb.net/phonebook?retryWrites=true&w=majority`)
    .then(() => console.log("Now connected to MongoDB"))
}
function printPersons() {
  return openConnection()
    .then(() => console.log("phonebook:"))
    .then(() => PersonModel.find({}))
    .then(result => result.forEach(({ name, phone }) => console.log(name, phone)))
}
function createPerson(name, phone) {
  return openConnection()
    .then(() => new PersonModel({ name, phone }).save())
    .then(_ => console.log(`added ${name} ${phone} to phonebook`))
}

if (arguments.length < 3) {
  console.error("give db password as the first argument")
  process.exit(1)
} else if (arguments.length === 4) {
  console.error("give the phone number as the third argument")
  process.exit(1)
} else if (arguments.length >= 5) {
  createPerson(arguments[3], arguments[4])
    .catch(error => console.error("Oops! Something went wrong:", error))
    .finally(() => mongoose.connection.close())
} else {
  printPersons()
    .catch(error => console.error("Oops! Something went wrong:", error))
    .finally(() => mongoose.connection.close())
}
