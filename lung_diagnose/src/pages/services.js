import React, { useState, useRef } from 'react';

const Services = () => {

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const uploadInputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(selectedFile);
        } else {
            setFile(null);
            setPreviewUrl('');
        }
    };

    const handleClick = () => {
        uploadInputRef.current.click();
    };

    return (
        <section className="container w-full mx-auto items-center py-32">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                <div className="px-4 py-6">
                <div id="image-preview" className={`max-w-full p-6 mb-4 ${previewUrl ? 'rounded-lg' : 'border-dashed border-2 border-gray-400'} bg-gray-100 items-center mx-auto text-center cursor-pointer`}
                 onClick={handleClick}>
                    <input ref={uploadInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    {previewUrl && <img src={previewUrl} className="max-h-full max-w-full rounded-lg mx-auto" alt="Image preview" />}
                    {!previewUrl && <div>No image preview</div>}
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-full">
                    <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                        <span className="text-center ml-2">Upload</span>
                    </label>
                    </div>
                </div>
                </div>
            </div>
        </section>
      )
}

export default Services