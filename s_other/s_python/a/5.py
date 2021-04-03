from rembg.bg import remove
import numpy as np
import io
from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

input_path = './a.jpeg'
output_path = './out.png'

f = np.fromfile(input_path)
result = remove(f, alpha_matting=True)
img = Image.open(io.BytesIO(result)).convert("RGBA")
img.save(output_path)