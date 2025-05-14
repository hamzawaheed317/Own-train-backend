const JWT_SECRET = process.env.JWT_SECRET;
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //if the email and the password is recieved
    const client = await Admin.findOne({ email: email });

    console.log("Client Details", client);
    

    if (client) {
      req.admin = client;
      //login krty wqt hi tokenn bny ga
      const token = jwt.sign(
        {
          id: client._id,
          email: client.email,
          companyName: client.companyname,
          companyUrl: client.companyurl,
          country: client.country,
          region: client.region,
          telephone: client.telephone,
          role: client.role,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      console.log("Token Value ", token);
      res
        .cookie("accessToken", token, {
          httpOnly: false,
          secure: false,
          // secure: process.env.NODE_ENV === "production", other than https calls , it will drop cookie silently
          // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 2 * 60 * 60 * 1000,
          // path: "/",
          // domain:
          //   process.env.NODE_ENV === "production"
          //     ? ".yourdomain.com"
          //     : undefined,

          //the things that i have been commented , are production grade things if set this then only the request from the secure https website should read the cookies , as i am having the local host frotend , therefore, the cookies are droping silently
        })
        .status(200)
        .json({
          success: true,
          message: "Login successful",
          user: {
            id: client._id,
            email: client.email,
            role: client.role,
          },
        });
    }else{
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error in registerAdmin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginAdmin;
