import Image from 'next/image';

type ResponsiveImageProps = {
  src: string;
  alt?: string;
};

export const ResponsiveImage = ({ src, alt = '' }: ResponsiveImageProps) => {
  return <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} />;
};
