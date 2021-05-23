interface FooterProps {
  username: string;
  caption: string;
}

const Footer: React.FC<FooterProps> = ({ caption, username }) => {
  return (
    <div className="p-4 pt-2 pb-1">
      <span className="mr-1 font-bold">{username}</span>
      <span className="italic">{caption}</span>
    </div>
  );
};
export default Footer;
