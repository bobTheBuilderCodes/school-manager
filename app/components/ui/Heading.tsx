

interface HeadingProps{
  title: string,
  className?: string
}
const Heading = ({title, className}: HeadingProps) => {
  return <h2 className={`mb-3 text-2xl font-semibold ${className}`}>{title}</h2>;
};

export default Heading;
