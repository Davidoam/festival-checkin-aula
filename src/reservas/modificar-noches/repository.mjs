import { UpdateItemCommand } from 'dynamodb-toolbox/entity/actions/update';
import { MODELO_RESERVA, MODELO_HOTEL, TABLA_RESERVAS } from '../../models/hotel-reserva.model.mjs';
 
export async function modificarNochesRepository(reservaId, noches) {
  const { Attributes } = await MODELO_RESERVA.build(UpdateItemCommand)
    .item({ reservaId, noches })
    .options({
      condition: { attr: 'reservaId', exists: true },
      returnValues: 'ALL_NEW'
    })
    .send();
  return Attributes;
}