const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.solde = !isEmpty(data.solde) ? data.solde : "";
  data.typedonnee = !isEmpty(data.typedonnee) ? data.typedonnee : "";
  data.forfait = !isEmpty(data.forfait) ? data.forfait : "";
  data.mobilenumber = !isEmpty(data.mobilenumber) ? data.mobilenumber : "";

  // firstName checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "firstName field is required";
  }
  // lastName checks
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "lastName field is required";
  }
  //address Checks
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }
  //Solde Checks
  if (Validator.isEmpty(data.solde)) {
    errors.solde = "Solde field is required";
  }
  // Type de donnee Checks
  if (Validator.isEmpty(data.typedonnee)) {
    errors.typedonnee = "Type de donnee field is required";
  }
  //Forfait Checks
  if (Validator.isEmpty(data.forfait)) {
    errors.forfait = "forfait field is required";
  }
  //Number Chcks
  if (Validator.isEmpty(data.mobilenumber)) {
    errors.mobilenumber = "Mobile Number  field is required";
  }
};
