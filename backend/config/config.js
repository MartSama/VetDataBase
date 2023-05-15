import oracledb from "oracledb";
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
async function conectarDB() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "martsama",
      password: "2812",
      connectString: "localhost:1521/ORCL",
    });
    return connection;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export default conectarDB;
