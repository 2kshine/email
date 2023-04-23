//Dummy data 
const domain = ["upstreamtech", "athlead", "performancetravel", "operation", "gmail"];

const Validation = async (User, email) => {
  //Format Validation

  if (!checkFormat(email)) {
    const error = new Error("Invalid email format");
    error.code = "INV_EMAIL";
    throw error;
  }

  if (!checkDomain(email)) {
    const error = new Error("Invalid domain name");
    error.code = "INV_DOMAIN";
    throw error;
  }
 
  if (! (await checkAvailablity(User, email))) {
    const error = new Error("Email id is already registered.");
    error.code = "EMAIL_DUP_ENTRY";
    throw error;
  }
};

const checkFormat = (userEmail) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(userEmail)) {
    return true;
  }
  return false;
};
const checkDomain = (userEmail) => {
  //Split email into 2 parts. (1st@2nd)
  console.log(userEmail);
  let parts = userEmail.split("@");
  //Split 2nd part into two parts. (1st.2nd)
  let userDomain = parts[1].split(".");
  if (userDomain[1] === "io" || userDomain[1] === "com" ) {
    for (let i = 0; i < domain.length; i++) {
      if (userDomain[0] === domain[i]) {
        return true;
      }
    }
  }
  return false;
};

const checkAvailablity = async (User, userEmail) => {
    //Find the email in database and return false if matches.
  const user = await User.findOne({ where: { email: userEmail } });
  if (user) {
    return false;
  }
  return true;
};

module.exports = Validation;
