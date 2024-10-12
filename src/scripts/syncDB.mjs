import dbSequelize from '../config/database.mjs';
import User from '../models/User.mjs';
import Child from '../models/Child.mjs';

(async () => {
  try {
    await dbSequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    await dbSequelize.sync({ force: true });
    console.log('Tablas creadas correctamente.');

    process.exit(0);
  } catch (error) {
    console.error('Error al conectarse a la base de datos:', error);
    process.exit(1);
  }
})();
