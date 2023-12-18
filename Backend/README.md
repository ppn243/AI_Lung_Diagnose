# Flask Image Prediction API

This is a Flask API for predicting the class of an image using a pre-trained machine learning model. The API utilizes TensorFlow for image classification and accepts image files via a POST request.

## Getting Started

### Prerequisites

- Python 3.x
- Flask
- TensorFlow
- NumPy
- Pillow

Install the required dependencies using the following command:

```bash
pip install -r requirements.txt
Usage
1. Ensure that you have a pre-trained model file (e.g., my_model.h5) in the project directory.
2. Run the Flask application:
```bash
python app.py
The API will be available at http://localhost:9090.

Use a tool like Postman to send a POST request with an image file to http://localhost:9090/predict.
Example using Postman:

Method: POST
Endpoint: http://localhost:9090/predict
Body: Form-data (Key: 'file', Value: select an image file)
The API will respond with the predicted class and confidence level.

Code Structure
app.py: The main Flask application.
my_model.h5: Pre-trained TensorFlow model file.
requirements.txt: List of Python dependencies.
Optimization
The code has been optimized for better performance:

Threading is used to perform predictions asynchronously.
Locks are implemented for thread safety.
Input image is resized and normalized before prediction.
Feel free to customize and extend the code based on your project requirements.

Issues and Contributions
If you encounter any issues or would like to contribute, please open an issue or pull request on GitHub.