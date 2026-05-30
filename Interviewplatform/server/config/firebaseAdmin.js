// import admin from "firebase-admin";
// import fs from "fs";

// const serviceAccount = JSON.parse(
//   fs.readFileSync(new URL("./serverkey.json", import.meta.url))
// );

// // prevent re-initialization issue
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// export default admin;
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;