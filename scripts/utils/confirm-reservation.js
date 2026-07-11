/**
 * Mensagem WhatsApp — confirmação de reserva Booking
 */

/** @param {{ name: string, reservationCode: string, apartmentName: string }} data */
export function buildConfirmReservationMessage({ name, reservationCode, apartmentName }) {
  const guest = name.trim();
  const code = reservationCode.trim();
  const apt = apartmentName.trim();

  return (
    `Olá, meu nome é ${guest}. Reservei o apartamento pelo Booking, o número da minha reserva é ${code} e o apartamento é ${apt}. ` +
    'Gostaria de saber como posso finalizar a reserva com vocês.'
  );
}
