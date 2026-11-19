import { GetItemCommand } from 'dynamodb-toolbox/entity/actions/get';
import { QueryCommand } from 'dynamodb-toolbox/table/actions/query';
import { MODELO_RESERVA, MODELO_HOTEL, TABLA_RESERVAS } from '../../models/hotel-reserva.model.mjs';
 
export async function buscarHotelRepository(hotelId) {
  const { Item } = await MODELO_HOTEL.build(GetItemCommand)
    .key({ hotelId }).options({ consistent: true }).send();
  return Item ?? null;
}
 
export async function consultarHotelRepository(hotelId, minimo) {
  const { Items = [] } = await TABLA_RESERVAS.build(QueryCommand)
    .entities(MODELO_RESERVA)
    .query({ index: 'PorHotel', partition: hotelId })
    .options({ filters: { Reserva: { attr: 'noches', gte: minimo } } })
    .send();
  return Items;
}