import { useState } from 'react';
import { Printer } from 'lucide-react';

export function CmykMark({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const blockSize = size === 'sm' ? 'w-1.5 h-3.5' : 'w-2 h-5';
  return (
    <span
      className="inline-flex items-center gap-[2px] shrink-0"
      aria-hidden="true"
    >
      <span className={`${blockSize} rounded-[1px] bg-[#009FE3]`} />
      <span className={`${blockSize} rounded-[1px] bg-[#D90368]`} />
      <span className={`${blockSize} rounded-[1px] bg-[#EAB308]`} />
      <span className={`${blockSize} rounded-[1px] bg-[#0C1220]`} />
    </span>
  );
}

export function CmykRule() {
  return (
    <div className="flex h-[2px] w-20 overflow-hidden rounded-full" aria-hidden="true">
      <span className="flex-1 bg-[#009FE3]" />
      <span className="flex-1 bg-[#D90368]" />
      <span className="flex-1 bg-[#EAB308]" />
      <span className="flex-1 bg-[#0C1220]" />
    </div>
  );
}

interface SafeImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function SafeImage({
  src,
  alt,
  title,
  className = '',
  loading = 'lazy',
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F4F6] via-[#E5E7EB] to-[#DBEAFE] text-[#0C1220] p-6 text-center ${className}`}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-[#CBD5E1] bg-white">
          <Printer className="h-5 w-5 text-[#0369A1]" aria-hidden="true" />
        </div>
        <p className="font-display text-sm font-semibold text-[#0C1220]">{title}</p>
        <p className="mt-1 text-xs text-[#475569]">Velan Ads Digital Printer</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
