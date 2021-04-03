from rembg.bg import remove
import numpy as np
import io
from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

input_path = './533-bigskin-2.jpg'
output_path = './591615007749_.pic.png'

f = np.fromfile(input_path)
result = remove(f, alpha_matting=True)
img = Image.open(io.BytesIO(result)).convert("RGBA")
img.save(output_path)