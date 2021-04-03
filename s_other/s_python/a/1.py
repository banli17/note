from rembg.bg import remove
import numpy as np
import io
from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

for i in range(0, 92):
    print(i)
    input_path = '/Users/banli/Desktop/my_project/haowan_资源/qq飞车/道具/A/use/show' + str(i) + '.jpg'
    output_path = '/Users/banli/Desktop/my_project/haowan_资源/qq飞车/道具/A/koutu/koutu' + str(i) + '.png'

    f = np.fromfile(input_path)
    result = remove(f, alpha_matting=True)
    img = Image.open(io.BytesIO(result)).convert("RGBA")
    img.save(output_path)
