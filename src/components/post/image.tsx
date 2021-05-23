interface ImageProps {
  src: string;
  caption: string;
}

const Image: React.FC<ImageProps> = ({ src, caption }) => {
  return <img src={src} alt={caption} />;
};

export default Image;
