// import Realm, { BSON, ObjectSchema } from "realm";

// export class Dream extends Realm.Object<Dream> {
//   _id!: BSON.ObjectId;
//   title: string;
//   description?: string;
//   created_at: Date;
//   update_at: Date;
//   static schema: ObjectSchema = {
//     name: "Dream",
//     properties: {
//       _id: "objectId",
//       name: { type: "string" },
//       description: { type: "string", optional: true },
//       created_at: { type: "date", default: () => Date.now() },
//       update_at: { type: "date", default: () => Date.now() },
//     },
//     primaryKey: "_id",
//   };
// }
