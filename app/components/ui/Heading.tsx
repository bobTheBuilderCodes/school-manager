

interface HeadingProps{
  title: string | undefined,
  className?: string
}
const Heading = ({title, className}: HeadingProps) => {
  return <h2 className={`text-2xl font-semibold ${className}`}>{title}</h2>;
};

export default Heading;
