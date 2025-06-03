# Backend Dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies and clean up in single layer
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    libhdf5-dev \
    libhdf5-serial-dev \
    pkg-config \
    python3-dev \
    build-essential \
    libblas-dev \
    liblapack-dev \
    gfortran \
    && pip install --upgrade pip \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Create non-root user
RUN useradd --create-home --shell /bin/bash --uid 1000 app

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies as root to avoid permission issues
RUN pip install --no-cache-dir --upgrade pip setuptools wheel \
    && pip install --no-cache-dir --timeout=1000 --retries=3 -r requirements.txt

# Copy application code
COPY . .

# Change ownership to app user and set proper permissions
RUN chown -R app:app /app \
    && chmod -R 755 /app

# Switch to non-root user
USER app

# Set environment variables
ENV PORT=8000
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Expose port
EXPOSE $PORT

# Health check with better timeout and more specific endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:$PORT/health || exit 1

# Run the application with better configuration
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT --workers 1 --access-log"]
