// Import all models to ensure they're registered with Mongoose
// Import base models first (no dependencies)
require("./Asset");
require("./Base");

// Import models that depend on base models
require("./User"); // depends on Base
require("./Purchase"); // depends on Asset, Base, User
require("./Transfer"); // depends on Asset, Base
require("./Assignment"); // depends on Asset, Base
require("./AuditLog"); // depends on User

