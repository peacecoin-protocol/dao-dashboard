import { useEffect, useRef, useState, type DragEvent, type MouseEvent } from 'react';

const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif';
const MAX_BYTES = 10 * 1024 * 1024;

interface Props {
  value: File | null;
  onChange: (file: File | null) => void;
  id?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImageUploadField({ value, onChange, id }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  function validateAndSet(file: File | undefined) {
    if (!file) return;
    setLocalError(null);

    if (!file.type.startsWith('image/')) {
      setLocalError('Please choose an image file (PNG, JPG, WEBP, or GIF).');
      return;
    }
    if (file.size > MAX_BYTES) {
      setLocalError('Image must be 10 MB or smaller.');
      return;
    }
    onChange(file);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    validateAndSet(e.dataTransfer.files[0]);
  }

  function openPicker() {
    inputRef.current?.click();
  }

  function clearImage(e: MouseEvent) {
    e.stopPropagation();
    setLocalError(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <div className="image-upload">
      <span className="field-label">Token image</span>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPT}
        className="image-upload-input"
        onChange={(e) => validateAndSet(e.target.files?.[0])}
      />

      {previewUrl && value ? (
        <div className="image-upload-preview">
          <img src={previewUrl} alt={value.name} />
          <div className="image-upload-meta">
            <p className="image-upload-name" title={value.name}>
              {value.name}
            </p>
            <p className="image-upload-size">{formatFileSize(value.size)}</p>
          </div>
          <div className="image-upload-actions">
            <button type="button" className="btn-secondary btn-sm" onClick={openPicker}>
              Replace
            </button>
            <button type="button" className="btn-link btn-sm" onClick={clearImage}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={`image-upload-dropzone${dragOver ? ' drag-over' : ''}`}
          onClick={openPicker}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          <span className="image-upload-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="image-upload-title">Drop image here</span>
          <span className="image-upload-hint">or click to browse</span>
          <span className="image-upload-formats">PNG, JPG, WEBP, GIF · max 10 MB</span>
        </button>
      )}

      {localError && <p className="image-upload-error">{localError}</p>}
    </div>
  );
}
