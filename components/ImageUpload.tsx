"use client";

import config from "@/lib/config";
import NextImage from "next/image";
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { upload } from "@imagekit/next";

const {
  env: {
    imagekit: { urlEndpoint },
  },
} = config;

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void; 
  value?: string; 
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(value ?? null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const abortController = useRef(new AbortController());


  const displayName = fileName || (fileUrl ? fileUrl.split("/").pop()?.split("?")[0] : null);

  const styles = {
    container: "w-full space-y-4",
    button:
      variant === "dark"
        ? "bg-dark-300 hover:bg-dark-200"
        : "bg-light-600 border border-gray-200 hover:bg-gray-50",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
    placeholder: variant === "dark" ? "text-light-200" : "text-slate-500",
    filename: variant === "dark" ? "text-light-400" : "text-gray-700",
  };

  const onError = (message: string) => {
    toast({
      title: `${type === "image" ? "Изображение" : "Видео"} не загружено`,
      description: message,
      variant: "destructive",
    });
  };

  const authenticator = async () => {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);
    if (!response.ok) {
      const err = await response.text();
      throw new Error("Не удалось получить подпись для загрузки");
    }
    return response.json(); 
  };

  const uploadFile = async (file: File) => {
    if (!onValidate(file)) return;

    setProgress(0);
    setFileName(file.name);

    let authParams;
    try {
      authParams = await authenticator();
    } catch (err: any) {
      onError(err.message || "Ошибка авторизации ImageKit");
      setFileName(null);
      return;
    }

    try {
      const res = await upload({
        file,
        fileName: file.name,
        folder,
        useUniqueFileName: true,
        ...authParams,
        onProgress: (e) => {
          if (e.total) {
            const percent = Math.round((e.loaded / e.total) * 100);
            setProgress(percent);
          }
        },
        abortSignal: abortController.current.signal,
      });

      const url = res.url;
      if (url) {
        setFileUrl(url);
        setFileName(file.name);
        onFileChange(url);
        toast({
          title: "Успешно!",
          description: `${type === "image" ? "Изображение" : "Видео"} загружено`,
        });
      }
    } catch (err: any) {
      console.error(err);
      setFileName(null);
      if (err.message) onError(err.message);
      else onError("Неизвестная ошибка при загрузке");
    } finally {
      setProgress(0);
    }
  };

  const onValidate = (file: File): boolean => {
    const maxSize = type === "image" ? 20 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > maxSize) {
      onError(
        `Файл слишком большой. Максимум ${type === "image" ? "20" : "50"} МБ`
      );
      return false;
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f);
        }}
      />

      <button
        className={cn(
          "upload-btn",
          styles.button
        )}
        onClick={() => inputRef.current?.click()} 
      >
        <NextImage
          src="/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
          className="object-contain"
        />
        <div className="text-left flex-1">
          <p className={cn("text-base", styles.placeholder)}>
            {placeholder}
          </p>
          {displayName && (
            <p className={cn("upload-filename", styles.text)}>
              {displayName}
            </p>
          )}
        </div>
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div
            className="progress"
            style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {fileUrl && (
        <div className="relative rounded-xl overflow-hidden border border-gray-200">
          {type === "image" ? (
            <NextImage
              src={fileUrl}
              alt={displayName || "preview"}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          ) : (
            <video
              src={fileUrl}
              controls
              className="w-full max-h-96 rounded-xl"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;