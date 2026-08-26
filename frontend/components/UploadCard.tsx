interface UploadCardProps {
  title: string;
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function UploadCard({
  title,
  file,
  onChange,
}: UploadCardProps) {
  return (
    <label
      className="
        w-[380px]
        h-[180px]
        border-2
        border-dashed
        border-gray-300
        rounded-3xl
        flex
        items-center
        justify-center
        cursor-pointer
        bg-white
      "
    >
      <input
        type="file"
        className="hidden"
        accept=".pdf,image/*"
        onChange={(e) =>
          onChange(e.target.files?.[0] || null)
        }
      />

      {!file ? (
        <div className="text-center">
          <p className="font-semibold">{title}</p>
        </div>
      ) : (
        <div className="text-center px-6">
          <p className="font-semibold break-all">
            {file.name}
          </p>

          <p className="text-gray-500 text-sm mt-2">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}
    </label>
  );
}