"""
Script to recreate the CNN model for wildfire prediction.
This will create a new model with the same architecture but compatible with the current TensorFlow version.
"""

import os
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

def create_new_model():
    """
    Create a CNN model with the same architecture as the original wildfire prediction model
    """
    print("Creating a new CNN model with the same architecture...")
    
    # Define model parameters
    input_shape = (128, 128, 3)  # RGB images of size 128x128
    
    # Create the model
    model = Sequential()
    
    # First convolutional block
    model.add(Conv2D(32, (3, 3), activation='relu', input_shape=input_shape))
    model.add(MaxPooling2D((2, 2)))
    
    # Second convolutional block
    model.add(Conv2D(64, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2, 2)))
    
    # Third convolutional block
    model.add(Conv2D(128, (3, 3), activation='relu'))
    model.add(MaxPooling2D((2, 2)))
    
    # Flatten and dense layers
    model.add(Flatten())
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(1, activation='sigmoid'))  # Binary classification (wildfire/no wildfire)
    
    # Compile the model
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def save_model(model, output_path):
    """
    Save the model to the specified path
    """
    model.save(output_path)
    print(f"Model saved to {output_path}")

if __name__ == "__main__":
    print("=" * 50)
    print("RECREATING WILDFIRE CNN MODEL")
    print("=" * 50)
    
    # Define paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    models_dir = os.path.join(base_dir, "models")
    new_model_path = os.path.join(models_dir, "wildfire_cnn_model_new.h5")
    
    # Create new model
    model = create_new_model()
    
    # Print model summary
    model.summary()
    
    # Save the model
    save_model(model, new_model_path)
    
    print("\n" + "=" * 50)
    print(f"New model created and saved to {new_model_path}")
    print("This model has not been trained. It will provide random predictions.")
    print("To use it for actual predictions, you should transfer weights from the original model or retrain it.")
    print("=" * 50)
