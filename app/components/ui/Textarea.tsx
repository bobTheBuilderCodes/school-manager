interface TextareaProps{
    content: string
}

const Textarea = ({content}: TextareaProps) => {
  return (
    <textarea
      className=" outline-none w-full mb-5 bg-gray-900 p-4 resize-none"
      rows={6}
    >
      {content}
    </textarea>
  );
};

export default Textarea;
