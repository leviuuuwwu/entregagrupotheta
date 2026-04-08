import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EventForm } from './EventForm';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe('EventForm', () => {
  it('permite escribir en inputs', () => {
    render(<EventForm />);

    const input = screen.getByPlaceholderText(/Cumbre de Innovación/i);

    fireEvent.change(input, {
      target: { value: 'Evento Test' },
    });

    expect(input.value).toBe('Evento Test');
  });
});
