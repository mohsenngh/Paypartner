import React, { useState, useRef } from 'react';
import { CameraIcon } from './icons';

interface ImageUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  id: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onFileSelect, id }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
      onFileSelect(file);
    } else {
      setPreview(null);
      setFileName(null);
      onFileSelect(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>
        <div
            onClick={handleClick}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition"
        >
            {preview ? (
                <div className="text-center">
                    <img src={preview} alt="Preview" className="mx-auto h-24 w-auto rounded-md object-contain" />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 truncate max-w-xs">{fileName}</p>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">برای تغییر کلیک کنید</span>
                </div>
            ) : (
                <div className="space-y-1 text-center">
                    <CameraIcon className="mx-auto h-12 w-12 text-slate-400" />
                    <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                        <p className="ps-1">فایل را اینجا بکشید یا</p>
                        <span className="relative cursor-pointer rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                           برای انتخاب کلیک کنید
                        </span>
                    </div>
                     <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF up to 10MB</p>
                </div>
            )}
            <input
                id={id}
                name={id}
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
            />
        </div>
    </div>
  );
};

export default ImageUpload;