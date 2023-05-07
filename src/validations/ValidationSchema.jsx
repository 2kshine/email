import * as yup from "yup";
const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//Dummy data
const domain = [
  "upstreamtech",
  "athlead",
  "performancetravel",
  "operation",

];

//check if email is of valid domain.
const isEmailDomainValid = (email)=> {
  //Split email into 2 parts. (1st@2nd)
  let parts = email.split("@");
  //Split 2nd part into two parts. (1st.2nd)
  let userDomain = parts[1].split(".");
  if (userDomain[1] === "io") {
    for (let i = 0; i < domain.length; i++) {
      if (userDomain[0] === domain[i]) {
        return true;
      }
    }
  }
  return false;
}
//check if email is available from the server
const isEmailAvailable = async (email) => {

}


//define signupSchema
const SignupSchema = yup.object().shape({
  first_name: yup.string().required("First name is required."),
  last_name: yup.string().required("Last name is required."),
  email: yup
    .string()
    .required("Email is required")
    .availableEmailDomain()
  // user_level: yup.string().required("Select user role."),
});

//add email domain validation check
yup.addMethod(yup.string, 'availableEmailDomain', ()=> {
  return this.test('availableEmailDomain', 'Email domain is not available', (value)=>{
    const isAvailable = isEmailDomainValid(value)
    console.log(isAvailable)
    return isAvailable
  })
})

export default SignupSchema;
