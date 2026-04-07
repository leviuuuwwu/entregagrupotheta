import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EventCatalog } from './EventCatalog';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          event_id: 1,
          event_name: 'Evento Test',
          description: 'Desc',
          location: 'San Salvador',
          max_attendanse: 100,
        },
      ]),
  })
);

describe('EventCatalog', () => {
  it('muestra eventos después de cargar', async () => {
    render(<EventCatalog />);

    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();

    // Esperar render
    const event = await screen.findByText('Evento Test');
    expect(event).toBeInTheDocument();
  });
});