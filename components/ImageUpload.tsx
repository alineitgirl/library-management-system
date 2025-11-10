'use client';

import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { Image } from "@imagekit/next";
import { useRef, useState } from "react";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
    apiEndpoint,
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const ImageUpload = ({ onFileChange }: { onFileChange: (filepath: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Предпросмотр перед загрузкой
    const previewUrl = URL.createObjectURL(selectedFile);
    setFilePreview(previewUrl);

    try {
      setIsUploading(true);
      const { signature, expire, token } = await authenticator();

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("publicKey", publicKey);
      formData.append("signature", signature);
      formData.append("expire", expire);
      formData.append("token", token);

      const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      const result = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(result.message || "Ошибка при загрузке файла");
      }

      setImageUrl(result.url);
      onFileChange(result.url);

      toast({
        title: "Файл успешно загружен",
        description: `${result.name} успешно загружен.`,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Ошибка загрузки",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-2xl max-w-sm mx-auto">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        className="upload-btn flex items-center gap-2 bg-blue-600 text-white rounded-xl px-4 py-2 disabled:opacity-50"
        onClick={(e) => {
          e.preventDefault();
          fileInputRef.current?.click();
        }}
        disabled={isUploading}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p>{isUploading ? "Загрузка..." : "Загрузить файл"}</p>
      </button>

      {filePreview && !imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Предпросмотр:</p>
          <img
            src={filePreview}
            alt="preview"
            className="rounded-xl mt-2 max-h-60 object-contain"
          />
        </div>
      )}

      {imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Загруженное изображение:</p>
          <Image
            src={imageUrl}
            alt="uploaded"
            width={500}
            height={500}
            className="rounded-xl mt-2 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;