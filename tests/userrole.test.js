const { Model } = require("sequelize");
const { sequelize, User, Role, UserRole } = require("../models");

describe("UserRole model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  test("Should create a user with role", async () => {
    const role1 = await Role.create({ role_name: "Administrator" });
    const role2 = await Role.create({ role_name: "Developer" });

    const user = await User.create(
      {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        password: "password",
      });

    await UserRole.create({user_id:user.id, role_id:role1.id});
    await UserRole.create({user_id:user.id, role_id:role2.id});

    const fetchedUser = await User.findByPk(user.id, { include: Role });

    // Assert that the user and groups were saved correctly
    expect(fetchedUser.first_name).toEqual("John");
    expect(fetchedUser.last_name).toEqual("Doe");
    expect(fetchedUser.email).toEqual("johndoe@example.com");
    expect(fetchedUser.Roles.length).toEqual(2);
    expect(fetchedUser.Roles[0].role_name).toEqual("Administrator");
    expect(fetchedUser.Roles[1].role_name).toEqual("Developer");
  });
});

