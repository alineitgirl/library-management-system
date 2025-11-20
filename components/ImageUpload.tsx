"use client";

import config from "@/lib/config";
import NextImage from 'next/image';
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey },
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
  const [filePath, setFilePath] = useState<string | null>(value ?? null);
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onError = (message: string) => {
    toast({
      title: `${type} upload failed`,
      description: message,
      variant: "destructive",
    });
  };

  const uploadFile = (file: File) => {
    if (!onValidate(file)) return;

    const endpoint = "https://upload.imagekit.io/api/v1/files/upload";
    const form = new FormData();
    form.append("file", file);
    form.append("fileName", file.name);
    form.append("folder", folder);
    form.append("publicKey", publicKey);
    form.append("useUniqueFileName", "true");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          const url = res.url || res.filePath || null;
          if (url) {
            setFilePath(url);
            onFileChange(url);
            toast({ title: `${type} uploaded successfully`, description: `${url} uploaded successfully!` });
          } else {
            onError("Upload succeeded but response parsing failed.");
          }
        } catch (err) {
          console.error(err);
          onError("Failed to parse upload response.");
        }
      } else {
        onError(`Upload failed with status ${xhr.status}`);
      }
    };

    xhr.onerror = () => onError("Network error during upload.");

    setProgress(0);
    xhr.send(form);
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        onError("Please upload a file that is less than 20MB in size");
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        onError("Please upload a file that is less than 50MB in size");
        return false;
      }
    }

    return true;
  };

  return (
    <div>
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
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          inputRef.current?.click();
        }}
      >
        <NextImage src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain" />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {filePath && <p className={cn("upload-filename", styles.text)}>{filePath}</p>}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>{progress}%</div>
        </div>
      )}

      {filePath && (
        type === "image" ? (
          <NextImage alt={filePath} src={filePath} width={500} height={300} />
        ) : (
          <video src={filePath} controls={true} className="h-96 w-full rounded-xl" />
        )
      )}
    </div>
  );
};

export default FileUpload;