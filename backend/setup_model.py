"""
Setup script to configure the model environment.
This script ensures that the model file is in the correct location.
"""

import os
import shutil
import sys
import tensorflow as tf
import numpy as np

def convert_model(model_path, output_path):
    """
    Convert an older TensorFlow model to a format compatible with the current version
    """
    try:
        # Try to load the model directly
        print(f"Attempting to load model from {model_path}...")
        
        # Load the model with special handling for older formats
        model = None
        try:
            # Try loading with custom options
            model = tf.keras.models.load_model(
                model_path,
                compile=False,
                custom_objects=None
            )
        except Exception as e:
            print(f"Initial loading failed: {str(e)}")
            try:
                # Try an alternative approach
                model = tf.keras.models.load_model(
                    model_path,
                    compile=False,
                    custom_objects=None,
                    options=tf.saved_model.LoadOptions(
                        experimental_io_device='/job:localhost'
                    )
                )
            except Exception as e2:
                print(f"Alternative loading failed: {str(e2)}")
                return False
        
        if model is None:
            print("Failed to load the model.")
            return False
            
        print("Model loaded successfully, saving in the current format...")
        
        # Create a new model with the same architecture
        inputs = tf.keras.Input(shape=(128, 128, 3))
        x = model(inputs)
        new_model = tf.keras.Model(inputs=inputs, outputs=x)
        
        # Save the model in the current format
        new_model.save(output_path)
        print(f"Model converted and saved to {output_path}")
        return True
        
    except Exception as e:
        print(f"Error converting model: {str(e)}")
        return False

def setup_model():
    # Define paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    src_model_path = os.path.join(base_dir, "..", "firepre", "wildfire_cnn_model.h5")
    alt_src_model_path = os.path.join(base_dir, "..", "models", "wildfire_cnn_model.h5")
    dst_model_path = os.path.join(base_dir, "models", "wildfire_cnn_model.h5")
    converted_model_path = os.path.join(base_dir, "models", "wildfire_cnn_model_converted.h5")
    
    # Check if destination directory exists
    dst_dir = os.path.dirname(dst_model_path)
    if not os.path.exists(dst_dir):
        os.makedirs(dst_dir)
        print(f"Created directory: {dst_dir}")
    
    # Check if model exists at the source path
    if os.path.exists(src_model_path):
        # Copy model to destination
        shutil.copy2(src_model_path, dst_model_path)
        print(f"Model copied from {src_model_path} to {dst_model_path}")
        success = convert_model(dst_model_path, converted_model_path)
        return success
    elif os.path.exists(alt_src_model_path):
        # Copy from alternative source
        shutil.copy2(alt_src_model_path, dst_model_path)
        print(f"Model copied from {alt_src_model_path} to {dst_model_path}")
        success = convert_model(dst_model_path, converted_model_path)
        return success
    elif os.path.exists(dst_model_path):
        # Model already exists at the destination
        print(f"Model already exists at {dst_model_path}")
        success = convert_model(dst_model_path, converted_model_path)
        return success
    else:
        print(f"ERROR: Could not find model file at {src_model_path} or {alt_src_model_path}")
        print("Please place the 'wildfire_cnn_model.h5' file in the correct location.")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("SETTING UP WILDFIRE MODEL ENVIRONMENT")
    print("=" * 50)
    
    success = setup_model()
    
    print("\n" + "=" * 50)
    if success:
        print("Setup completed successfully!")
    else:
        print("Setup failed. Please check the errors above.")
    print("=" * 50)
