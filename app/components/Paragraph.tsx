

interface ParagraphProps{
  title: string,
  className?: string
}
const Paragraph = ({title, className}: ParagraphProps) => {
  return <h2 className={`m-0 text-sm opacity-50 ${className}`}>{title}</h2>;
};

export default Paragraph;
