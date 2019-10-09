import * as mongoose from "mongoose";
export default class Database {
  open(mongoUri) {
    mongoose.connect(
      mongoUri,
      err => {
        if (err) {
          console.log("error is >>>>>", err);
        }

        console.log("successfully connected");
      },
      { useNewUrlParser: true }
    );
  }
}
