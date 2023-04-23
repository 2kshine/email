// const { sequelize, User } = require("../models");

// describe("User model", () => {
//   beforeAll(async () => {
//     await sequelize.sync({ force: true });
//   });

//   test("should create a new user", async () => {
//     const user = await User.create({
//       first_name: "John",
//       last_name: "Doe",
//       email: "johndoe@example.com",
//       password: "password"
//     });

//     expect(user.first_name).toBe('John');
//     expect(user.last_name).toBe('Doe');
//     expect(user.email).toBe('johndoe@example.com');
//   });

//   afterAll(async () => {
//     await sequelize.close();
//   })
// });
