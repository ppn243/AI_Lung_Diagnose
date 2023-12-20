import React, { useState, useRef } from "react";

const Services = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const uploadInputRef = useRef(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setError(null); // Reset error state
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreviewUrl("");
    }
  };

  const handlePredictClick = async () => {
    setResult(null);
    setError(null);
    if (file) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://127.0.0.1:9090/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Server responded with an error!");
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error when calling API:", error);
        setError("Lỗi khi gọi API. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn("Chưa chọn file");
      setError("Vui lòng chọn một file ảnh.");
    }
  };

  return (
    <section className="container w-full mx-auto items-center py-32">
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
        <div className="px-4 py-6">
          <div
            id="image-preview"
            className={`max-w-full p-6 mb-4 ${
              previewUrl
                ? "rounded-lg"
                : "border-dashed border-2 border-gray-400"
            } bg-gray-100 items-center mx-auto text-center cursor-pointer`}
            onClick={() => uploadInputRef.current.click()}
          >
            <input
              ref={uploadInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                className="max-h-full max-w-full rounded-lg mx-auto"
                alt="Imgpreview"
              />
            )}
            {!previewUrl && <div>No image preview</div>}
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full" onClick={handlePredictClick}>
              <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                <span className="text-center ml-2" >
                  Predict
                </span>
              </label>
            </div>
          </div>
          {result && (
            <div className="mt-4">
              <p><span className="font-bold">Class Name:</span> {result.class_name}</p>
              <p><span className="font-bold">Confidence:</span> {result.confidence}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
