import { User } from "../modules/users/user.model";

const adminData = {
  name: "hasan",
  username: "admin",
  email: "hasan@gmail.com",
  role: "Admin",
  password: "1111",
};

export const seedAdmin = async () => {
  const user = await User.findOne({ role: "Admin" });
  if (user) {
    return;
  }
  await User.create(adminData)
};
