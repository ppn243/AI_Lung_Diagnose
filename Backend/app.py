from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
app = Flask(__name__)

# Load pre-trained model
model = tf.keras.models.load_model('my_model.h5')

if model is None:
    raise ValueError("Model not loaded")

class_names = ['Bacterial Pneumonia', 'Corona Virus Disease',
               'Normal', 'Tuberculosis', 'Viral Pneumonia']


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Nhận ảnh từ request
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']

        # Kiểm tra xem file có tồn tại không
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        # Đọc dữ liệu của file vào đối tượng BytesIO
        file_data = BytesIO(file.read())

        # Chuyển đổi dữ liệu của file thành đối tượng PIL Image
        image = Image.open(file_data)
        image = image.resize((224, 224))
        image_array = np.array(image)
        image_array = np.stack(
            [image_array, image_array, image_array], axis=-1)
        print(image_array.shape)
        image_array = image_array / 255.0  # Chuẩn hóa pixel về đoạn [0, 1]

        # Thêm chiều mới cho batch
        image_array = np.expand_dims(image_array, axis=0)

        # Thực hiện dự đoán
        prediction = model.predict(image_array)
        # Trả về kết quả
        class_index = np.argmax(prediction)
        class_name = class_names[class_index]
        confidence = prediction[0][class_index]

        return jsonify({'class_name': class_name, 'confidence': float(confidence)})

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(port=9090)
