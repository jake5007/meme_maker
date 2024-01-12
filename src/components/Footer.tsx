const Footer = () => {
  const currYear = new Date().getFullYear();

  return (
    <footer className="flex justify-center">
      <p>&copy; {currYear} Meme Maker. All Rights Reserved.</p>
    </footer>
  );
};
export default Footer;
