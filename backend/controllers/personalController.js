import { useState } from "react";
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

export const editPersonal = async (req, res) => {
  // ToDo: Validate that ID exist in data Base
  try {
    const connection = await conectarDB();
    const {
      id,
      tipo_empleado,
      nombre_completo,
      fecha_nacimiento,
      fecha_ingreso,
      numero_telefonico,
      direccion,
      turno,
      rfc,
    } = req.body;
    const query = `
      UPDATE PERSONAL
      SET TIPO_EMPLEADO = :TIPO_EMPLEADO,
          NOMBRE_COMPLETO = :NOMBRE_COMPLETO,
          FECHA_NACIMIENTO = TO_DATE(:FECHA_NACIMIENTO, 'YYYY-MM-DD'),
          FECHA_INGRESO = TO_DATE(:FECHA_INGRESO, 'YYYY-MM-DD'),
          NUMERO_TELEFONICO = :NUMERO_TELEFONICO,
          DIRECCION = :DIRECCION,
          TURNO = :TURNO,
          RFC = :RFC
      WHERE IDENTIFICADOR = :IDENTIFICADOR
    `;

    // Ejecutar el query de actualización
    const result = await connection.execute(query, {
      TIPO_EMPLEADO: tipo_empleado,
      NOMBRE_COMPLETO: nombre_completo,
      FECHA_NACIMIENTO: fecha_nacimiento,
      FECHA_INGRESO: fecha_ingreso,
      NUMERO_TELEFONICO: numero_telefonico,
      DIRECCION: direccion,
      TURNO: turno,
      RFC: rfc,
      IDENTIFICADOR: id,
    });
    if (result.rowsAffected) {
      res.json({ update: true, result });
      connection.commit();
      connection.close();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al editar registro" });
  }
};
