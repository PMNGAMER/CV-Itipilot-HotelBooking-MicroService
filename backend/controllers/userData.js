import { cookie, change } from "../cookie.js";
export const getUserData = async (req, res) => {
    try {
      change(req.body.data);
      // console.log(cookie);
      res.status(200).json("ok" );
    } catch (err) {
      console.log(err);
      res.status(500).json("Failed to get userData!");
    }
};
