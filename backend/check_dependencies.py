#!/usr/bin/env python3
"""
Simple validation script to check if all required modules can be imported
"""

import sys
import importlib

required_modules = [
    'fastapi',
    'uvicorn', 
    'pydantic',
    'numpy',
    'pandas',
    'sklearn',
    'joblib',
    'requests',
    'tensorflow',
    'matplotlib',
    'PIL',  # pillow
    'seaborn'
]

def check_imports():
    """Check if all required modules can be imported"""
    missing_modules = []
    
    for module in required_modules:
        try:
            importlib.import_module(module)
            print(f"✓ {module}")
        except ImportError:
            print(f"✗ {module} - NOT FOUND")
            missing_modules.append(module)
    
    if missing_modules:
        print(f"\nMissing modules: {missing_modules}")
        print("Run: pip install -r requirements.txt")
        return False
    else:
        print("\n✓ All required modules are available!")
        return True

if __name__ == "__main__":
    success = check_imports()
    sys.exit(0 if success else 1)
