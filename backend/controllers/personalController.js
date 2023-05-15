import conectarDB from "../config/config.js";
export const newPersonal = async (req, res) => {
  //ToDo: Validate that personal cannot be create twice (check RFC)
  try {
    const connection = await conectarDB();
    console.log(connection, "Working...");
    const {
      tipo_empleado,
      nombre_completo,
      fecha_nacimiento,
      fecha_ingreso,
      numero_telefonico,
      direccion,
      turno,
      rfc,
    } = req.body;
    const result = await connection.execute(
      "INSERT INTO PERSONAL (TIPO_EMPLEADO, NOMBRE_COMPLETO, FECHA_NACIMIENTO, FECHA_INGRESO, NUMERO_TELEFONICO, DIRECCION, TURNO, RFC) VALUES (:tipo_empleado, :nombre_completo,TO_DATE(:fecha_nacimiento, 'YYYY-MM-DD'), TO_DATE(:fecha_ingreso, 'YYYY-MM-DD'), :numero_telefonico, :direccion, :turno, :rfc )",
      {
        tipo_empleado,
        nombre_completo,
        fecha_nacimiento,
        fecha_ingreso,
        numero_telefonico,
        direccion,
        turno,
        rfc,
      }
    );
    res.json(result);
    await connection.commit();
    await connection.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error al crear registro" });
  }
};
