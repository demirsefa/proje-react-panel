import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputConfiguration } from '../../decorators/form/Input';

interface UploaderProps {
  input: InputConfiguration;
  maxLength?: number;
  fieldName: string;
}

export function Uploader({ input, maxLength = 1, fieldName }: UploaderProps) {
  const form = useFormContext();
  const [files, setFiles] = useState<File[]>([]);
  const id = fieldName;

  useEffect(() => {
    // Update form value whenever files change
    form.setValue(fieldName + '_files', files.length > 0);
  }, [files, form, fieldName]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxLength > 1) {
      throw new Error('TODO: Multiple file upload is not implemented yet');
    }

    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      setFiles(prevFiles => [...prevFiles, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="uploader-container">
      <button
        type="button"
        className="uploader-button"
        onClick={() => document.getElementById(id)?.click()}
      >
        Upload Files
      </button>
      <input id={id} hidden name={input.name} onChange={onChange} type="file" multiple />
      {files.length > 0 && (
        <div className="uploader-files">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="uploader-file">
              <p>{file.name}</p>
              <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <p>{file.type || 'Unknown type'}</p>
              <button
                onClick={() => removeFile(index)}
                className="remove-file-button"
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
