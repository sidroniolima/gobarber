import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';

import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    console.log('A fila executou');

    const dateFormatted = format(
      parseISO(appointment.date),
      "dd 'de' MMMM', às' H'h':mm'min'",
      {
        locale: pt,
      }
    );

    await Mail.senddMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        date: dateFormatted,
        user: appointment.user.name,
      },
    });
  }
}

export default new CancellationMail();
