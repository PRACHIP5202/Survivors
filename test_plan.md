# Wildfire Risk Prediction API Integration Test Plan

## Overview
This document outlines the test plan for verifying the integration between the React frontend and FastAPI backend for the Wildfire Risk Prediction application.

## Prerequisites
- Backend API server running on http://localhost:8000
- Frontend development server running on http://localhost:5173
- Test browser with developer console open to monitor API calls

## Test Cases

### 1. Basic API Connection Test

**Objective**: Verify the backend API is accessible and responding to requests.

**Steps**:
1. Open the test HTML file at file:///Users/aditya/Documents/Survivors/test_frontend_api.html
2. Enter test values in the form
3. Click the "Test API" button
4. Verify a 200 status response is received with prediction data

**Expected Result**: API responds with a valid JSON object containing risk level, score, confidence, factors, and recommendations.

### 2. Map Selection and Weather Data Retrieval

**Objective**: Verify that clicking on the map retrieves location-specific weather data.

**Steps**:
1. Navigate to the Risk Map page
2. Click on a location on the map
3. Observe the Weather Info panel

**Expected Result**: 
- Location coordinates should be displayed
- Weather data should be loaded for the selected location

### 3. Frontend-to-Backend Prediction Flow

**Objective**: Verify that the full prediction flow works from frontend to backend.

**Steps**:
1. Navigate to the Risk Map page
2. Click on a location on the map to set coordinates
3. Fill in the prediction form or use auto-filled weather data
4. Click "Predict Risk" button
5. Monitor browser console for API request logs
6. Check for API status notification

**Expected Result**:
- API request should show in console logs
- Notification should show "loading" then "success" states
- Risk assessment card should appear with results from the backend API

### 4. Error Handling Test

**Objective**: Verify proper error handling when API calls fail.

**Steps**:
1. Stop the backend server
2. Navigate to the Risk Map page
3. Click on a location on the map
4. Fill in the prediction form
5. Click "Predict Risk" button

**Expected Result**:
- Error notification should appear
- Frontend should fall back to client-side prediction
- Console should show error logs

### 5. Input Validation Test

**Objective**: Verify the input validation works correctly.

**Steps**:
1. Navigate to the Risk Map page
2. Enter extreme values in the form fields:
   - Temperature: 100°C
   - Humidity: 0%
   - Wind Speed: 200 km/h
3. Submit the form

**Expected Result**:
- Backend should still process these values (even if extreme)
- Risk level should be set to "Extreme" or "Very High"

## Test Results Documentation

For each test case, document:
- Pass/Fail status
- Actual behavior vs. expected behavior
- Any error messages or unexpected results
- Screenshots of the UI during testing
