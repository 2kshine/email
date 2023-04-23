// const { sequelize, Role } = require("../models");

// describe("Role model", () => {
//     beforeAll(async () => {
//         await sequelize.sync({force:true});
//     });

//     test("Should create a new role", async () => {
//         const role1 = await Role.create({
//             role_name: "Administrator"
//         })
//         const role2 = await Role.create({
//             role_name: "Developer"
//         })

//         expect(role1.role_name).toBe('Administrator');
//         expect(role2.role_name).toBe('Developer');
//     })

//     afterAll (async () => {
//         await sequelize.close();
//     })

// })