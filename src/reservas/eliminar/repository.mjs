import { DeleteItemCommand } from 'dynamodb-toolbox/entity/actions/delete';
import { MODELO_RESERVA, MODELO_HOTEL, TABLA_RESERVAS } from '../../models/hotel-reserva.model.mjs';
 
export async function eliminarReservaRepository(reservaId) {
  await MODELO_RESERVA.build(DeleteItemCommand)
    .key({ reservaId })
    .send();
}