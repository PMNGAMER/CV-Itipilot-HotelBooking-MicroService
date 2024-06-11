import cookie from "../cookie";
export const getUserData = async (req, res) => {
    try {
      cookie.set('userData', req.body);
      res.status(200).json("ok" );
    } catch (err) {
      console.log(err);
      res.status(500).json("Failed to get userData!");
    }
};
