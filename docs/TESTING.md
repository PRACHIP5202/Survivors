# Testing Guide for EmberEye

## Overview
EmberEye uses a comprehensive testing strategy covering both frontend and backend components.

## Test Structure
```
tests/
├── backend/          # Python/FastAPI tests
│   ├── test_api.py          # API endpoint tests
│   ├── test_model.py        # ML model tests
│   ├── test_load_model.py   # Model loading tests
│   └── api_test_scenarios.py # Test scenarios
└── frontend/         # Frontend tests
    └── test_frontend_api.html # Manual API testing
```

## Running Tests

### Backend Tests
```bash
# Navigate to backend directory
cd backend

# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run all tests
python -m pytest

# Run specific test file
python -m pytest tests/backend/test_api.py

# Run with verbose output
python -m pytest -v

# Run with coverage
python -m pytest --cov=app
```

### Frontend Tests
```bash
# Navigate to frontend directory
cd firepre

# Install test dependencies (if not already installed)
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Categories

### Backend Tests

#### API Tests (`test_api.py`)
- Health check endpoints
- Prediction API endpoints
- Weather API endpoints
- Error handling
- Input validation

#### Model Tests (`test_model.py`)
- Model loading
- Prediction accuracy
- Input preprocessing
- Output formatting

#### Load Tests (`test_load_model.py`)
- Model initialization
- Memory usage
- Performance benchmarks

### Frontend Tests

#### Component Tests
- Component rendering
- User interactions
- Props handling
- State management

#### Integration Tests
- API communication
- Error handling
- User workflows

#### E2E Tests
- Complete user journeys
- Cross-browser compatibility
- Performance testing

## Writing Tests

### Backend Test Example
```python
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_predict_endpoint():
    test_data = {
        "latitude": 37.7749,
        "longitude": -122.4194,
        "temperature": 25.0,
        "humidity": 60.0,
        "windSpeed": 10.0,
        "vegetation": 70.0
    }
    response = client.post("/api/predict", json=test_data)
    assert response.status_code == 200
    data = response.json()
    assert "riskLevel" in data
    assert "riskPercentage" in data
```

### Frontend Test Example
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PredictionPanel from '../components/PredictionPanel';

describe('PredictionPanel', () => {
  test('renders prediction form', () => {
    render(<PredictionPanel />);
    expect(screen.getByText('Risk Prediction')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    const mockPredict = vi.fn();
    render(<PredictionPanel onPredict={mockPredict} />);
    
    const submitButton = screen.getByText('Predict Risk');
    fireEvent.click(submitButton);
    
    expect(mockPredict).toHaveBeenCalled();
  });
});
```

## Test Data

### Sample Prediction Data
```json
{
  "low_risk": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "temperature": 20.0,
    "humidity": 70.0,
    "windSpeed": 5.0,
    "vegetation": 30.0
  },
  "high_risk": {
    "latitude": 34.0522,
    "longitude": -118.2437,
    "temperature": 40.0,
    "humidity": 20.0,
    "windSpeed": 25.0,
    "vegetation": 80.0
  }
}
```

## Continuous Integration

### GitHub Actions Example
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: '3.11'
      - run: pip install -r backend/requirements.txt
      - run: cd backend && python -m pytest

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd firepre && npm install
      - run: cd firepre && npm run test
```

## Performance Testing

### Backend Performance
- API response times
- Model inference speed
- Memory usage monitoring
- Concurrent request handling

### Frontend Performance
- Page load times
- Component rendering speed
- Bundle size optimization
- Network request efficiency

## Best Practices

1. **Test Isolation**: Each test should be independent
2. **Descriptive Names**: Test names should describe what they test
3. **Mock External Dependencies**: Use mocks for API calls and external services
4. **Test Edge Cases**: Include tests for error conditions and boundary values
5. **Regular Test Runs**: Run tests frequently during development
6. **Code Coverage**: Aim for high test coverage but focus on critical paths
