#!/usr/bin/env python3
"""
Script to update programming/json/head.json and outreach/json/head.json
with the contents of json/head.json
"""

import json
import os
from pathlib import Path

def update_head_json():
    # Get the root directory (where this script is located)
    root_dir = Path(__file__).parent
    
    # Define file paths
    source_file = root_dir / "json" / "head.json"
    dest_files = [
        root_dir / "programming" / "json" / "head.json",
        root_dir / "outreach" / "json" / "head.json"
    ]
    
    # Check if source file exists
    if not source_file.exists():
        print(f"Error: Source file not found: {source_file}")
        return False
    
    # Read the source file
    try:
        with open(source_file, 'r', encoding='utf-8') as f:
            content = json.load(f)
        print(f"Successfully read source file: {source_file}")
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in source file: {e}")
        return False
    except Exception as e:
        print(f"Error reading source file: {e}")
        return False
    
    # Write to destination files
    for dest_file in dest_files:
        try:
            # Create parent directory if it doesn't exist
            dest_file.parent.mkdir(parents=True, exist_ok=True)
            
            # Write the content
            with open(dest_file, 'w', encoding='utf-8') as f:
                json.dump(content, f, indent=2)
            print(f"Successfully updated: {dest_file}")
        except Exception as e:
            print(f"Error writing to {dest_file}: {e}")
            return False
    
    print("\nAll files updated successfully!")
    return True

if __name__ == "__main__":
    update_head_json()
