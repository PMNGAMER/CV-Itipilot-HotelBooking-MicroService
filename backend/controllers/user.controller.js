import  User  from "../models/user.js";
export const getUser = async (req, res) => {
  const id = req.params.id;
  console.log("id "+id);
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};