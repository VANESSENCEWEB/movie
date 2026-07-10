/**
 * Utilitários do fluxo de reserva /bio (estilo HostBio).
 */

/** @param {string} iso YYYY-MM-DD */
export function formatDateBR(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).replace('.', '');
}

/** @param {string} checkin @param {string} checkout */
export function nightsBetween(checkin, checkout) {
  if (!checkin || !checkout) return 0;
  const a = new Date(`${checkin}T12:00:00`);
  const b = new Date(`${checkout}T12:00:00`);
  const diff = Math.round((b - a) / 86400000);
  return Math.max(1, diff);
}

/** @param {number} n */
export function nightsLabel(n) {
  return n === 1 ? '1 noite' : `${n} noites`;
}

export function defaultCheckin() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
}

export function defaultCheckout(checkin) {
  const d = new Date(`${checkin}T12:00:00`);
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
}

/** @param {string} value */
export function formatPhoneBR(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * @param {{
 *   apt: { name: string, building?: string },
 *   checkin: string,
 *   checkout: string,
 *   rooms: number,
 *   adults: number,
 *   name: string,
 *   phone: string,
 *   email?: string,
 * }} data
 */
export function buildBioWhatsAppMessage(data) {
  const nights = nightsBetween(data.checkin, data.checkout);
  const lines = [
    'Olá! Vim pelo link da bio e quero verificar disponibilidade.',
    '',
    `🏠 ${data.apt.name}`,
    `📅 ${formatDateBR(data.checkin)} → ${formatDateBR(data.checkout)} (${nightsLabel(nights)})`,
    `👥 ${data.adults} adulto${data.adults > 1 ? 's' : ''} · ${data.rooms} quarto${data.rooms > 1 ? 's' : ''}`,
    `📞 ${data.name} — ${data.phone}`,
  ];
  if (data.email?.trim()) lines.push(`✉️ ${data.email.trim()}`);
  lines.push('', 'Pode me confirmar disponibilidade e valor?');
  return lines.join('\n');
}
