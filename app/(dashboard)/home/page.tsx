"use client";

import FormButton from "@/components/FormButton";
import { Button } from "@/components/ui/button";
import { CircleDashed } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleUploadImage = () => {
    setUploading(true);
  }

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row justify-between gap-4">
      {/* Left Side */}
      <div className="w-full lg:w-1/2" >
        <div style={styles.uploadBox}>

          {selectedImage ? (
            <div style={styles.previewContainer} className="flex-col">

              <img src={selectedImage} alt="Preview" style={styles.previewImage} className="object-cover" />

            </div>
          ) : (
            <label style={styles.uploadLabel} className="flex-col">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInput}
              />
              <span style={styles.uploadText}>Click to upload an image</span>
            </label>
          )}

        </div>

        {/* Quick Actions */}
        <div className="mt-4 gap-2 flex items-center">
          <Button className="" onClick={handleUploadImage} type="submit" disabled={uploading}>
            {uploading ? <CircleDashed className=" animate-spin mr-2" /> : ''}
            Upload Image
          </Button>
          {selectedImage ? (
            <Button
              onClick={handleRemoveImage}
              className="bg-red-400 text-white hover:bg-red-600"
            >
              Remove
            </Button>
          ) : ''}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 min-h-[500px] border border-gray-300 rounded-lg p-2 flex items-center justify-center">
      {uploading ? <span className="animate-pulse">Thinking what it is...</span> : ''}
       
        
      </div>
    </div>
  );
}



const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  uploadBox: {
    width: "100%",
    height: "500px",
    border: "2px dashed #ccc",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  uploadLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  uploadText: {
    fontSize: "16px",
    color: "#666",
  },
  fileInput: {
    display: "none",
  },
  previewContainer: {
    display: "flex",
    alignItems: "center",
  },
  previewImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "10px",
  },
  removeButton: {
    position: 'relative',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    padding: "8px 12px",
    border: "none",
    backgroundColor: "#e74c3c",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
