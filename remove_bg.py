#!/usr/bin/env python3
"""
Background removal for Montrez logo images using rembg.
Removes off-white backgrounds and exports as transparent PNGs.
"""

from rembg import remove
from PIL import Image
import os

def remove_background(input_path, output_path):
    """Remove background from image and save as PNG with transparency."""
    print(f"Processing: {input_path}...")
    
    # Open image
    with open(input_path, 'rb') as input_file:
        input_data = input_file.read()
    
    # Remove background
    output_data = remove(input_data)
    
    # Save as PNG
    with open(output_path, 'wb') as output_file:
        output_file.write(output_data)
    
    # Verify output
    img = Image.open(output_path)
    print(f"[OK] Saved: {output_path} ({img.size[0]}x{img.size[1]}px, {img.mode})")
    
    # Optimize file size
    img.save(output_path, 'PNG', optimize=True)
    file_size = os.path.getsize(output_path) / 1024
    print(f"   Optimized size: {file_size:.1f}KB\n")

def main():
    print("Montrez Background Removal Tool\n")
    print("=" * 50)
    
    images = [
        {
            'input': 'public/images/montrez-logo-castle.jpg',
            'output': 'public/images/montrez-logo-castle.png'
        },
        {
            'input': 'public/images/montrez-logo-panther.jpg',
            'output': 'public/images/montrez-logo-panther.png'
        }
    ]
    
    for img in images:
        input_path = img['input']
        output_path = img['output']
        
        if not os.path.exists(input_path):
            print(f"[ERROR] File not found: {input_path}")
            continue
        
        try:
            remove_background(input_path, output_path)
        except Exception as e:
            print(f"[ERROR] Error processing {input_path}: {str(e)}\n")
    
    print("=" * 50)
    print("[OK] Background removal complete!\n")
    print("Next steps:")
    print("1. Review output images for quality")
    print("2. Update image references in components:")
    print("   - Navbar.jsx: montrez-logo-castle.jpg → .png")
    print("   - Collections.jsx: montrez-logo-panther.jpg → .png")
    print("3. Delete old .jpg files (after verification)")
    print("4. Commit: 'Fix: Remove logo and panther backgrounds'")
    print("5. Deploy and verify on live site\n")

if __name__ == '__main__':
    main()
