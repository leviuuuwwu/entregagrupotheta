import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EventCard } from './EventCard';

describe('EventCard', () => {
  it('renderiza información del evento', () => {
    const evento = {
      event_id: 1,
      event_name: 'Evento Demo',
      description: 'Descripción demo',
      location: 'San Salvador',
      max_attendanse: 100,
    };

    render(<EventCard evento={evento} />);

    expect(screen.getByText('Evento Demo')).toBeInTheDocument();
    expect(screen.getByText('San Salvador')).toBeInTheDocument();
  });
});