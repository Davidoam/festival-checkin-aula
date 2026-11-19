import { PutItemCommand } from 'dynamodb-toolbox/entity/actions/put';
import { ScanCommand } from 'dynamodb-toolbox/table/actions/scan';
import { MODELO_RESERVA, MODELO_HOTEL, TABLA_RESERVAS } from '../../models/hotel-reserva.model.mjs';
 
export async function crearReservaRepository(reserva) {
  await MODELO_RESERVA.build(PutItemCommand)
    .item(reserva)
    .options({ condition: { attr: 'reservaId', exists: false } })
    .send();
}
 
export async function listarReservasRepository() {
  const { Items = [] } = await TABLA_RESERVAS.build(ScanCommand)
    .entities(MODELO_RESERVA)
    .options({ consistent: true })
    .send();
  return Items;
}