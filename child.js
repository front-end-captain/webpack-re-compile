
console.log("child id", process.pid);

process.env.APP_ROLE_IS_CHILD = "APP_ROLE_IS_CHILD";

console.log(process.env.APP_ROLE_IS_CHILD);
