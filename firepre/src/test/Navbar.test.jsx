import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'

// Test wrapper component
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )

    // Check if main navigation items are present
    expect(screen.getByText('EmberEye')).toBeInTheDocument()
    expect(screen.getAllByText('Home')).toHaveLength(2) // Desktop and mobile nav
    expect(screen.getAllByText('AI Risk Map')).toHaveLength(2)
    expect(screen.getAllByText('How It Works')).toHaveLength(2)
    expect(screen.getAllByText('Resources')).toHaveLength(2)
    expect(screen.getAllByText('Contact')).toHaveLength(2)
  })

  it('has correct navigation structure', () => {
    render(
      <TestWrapper>
        <Navbar />
      </TestWrapper>
    )

    // Check if nav element exists
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})
