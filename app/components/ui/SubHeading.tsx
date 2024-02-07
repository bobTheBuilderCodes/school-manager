

interface HeadingProps{
  title: string | number | undefined,
  className?: string
}
const SubHeading = ({title, className}: HeadingProps) => {
  return <h2 className={`text-lg text-gray-300 font-medium ${className}`}>{title}</h2>;
};

export default SubHeading;
