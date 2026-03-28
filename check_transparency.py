from PIL import Image
import numpy as np

def check_transparency(path):
    img = Image.open(path)
    print(f"\nFile: {path}")
    print(f"Mode: {img.mode}")
    print(f"Size: {img.size}")
    
    if img.mode == 'RGBA':
        # Check if alpha channel has any transparency
        alpha = np.array(img)[:,:,3]
        min_alpha = alpha.min()
        max_alpha = alpha.max()
        unique_alpha = len(np.unique(alpha))
        
        print(f"Alpha range: {min_alpha} - {max_alpha}")
        print(f"Unique alpha values: {unique_alpha}")
        
        if min_alpha == 255 and max_alpha == 255:
            print("WARNING: No transparency detected (all pixels fully opaque)")
        elif min_alpha == 0:
            print("OK: Has fully transparent pixels")
        else:
            print("OK: Has partial transparency")
    else:
        print("WARNING: No alpha channel")

check_transparency('public/images/montrez-logo-castle.png')
check_transparency('public/images/montrez-logo-panther.png')
