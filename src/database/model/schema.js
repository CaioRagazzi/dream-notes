import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "dreams",
      columns: [
        { name: "title", type: "string" },
        { name: "description", type: "string", isOptional: true },
      ],
    }),
  ],
});
