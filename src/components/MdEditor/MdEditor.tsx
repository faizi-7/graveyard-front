import 'react-quill/dist/quill.snow.css'; // Quill styles
import ReactQuill from 'react-quill'; // Import the Quill component
import './MdEditor.css'

export function MdEditor({ ideaDescription, setIdeaDescription }: any) {

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': '2' }],
      ['blockquote', 'code-block'],
      [{ 'list': 'bullet' }],
      ['link', 'image'] 
    ],
  };

  return (
    <div>
      <ReactQuill
        value={ideaDescription}
        onChange={(content) => setIdeaDescription(content)} // Output is stored as HTML string
        modules={modules}
        theme="snow"
      />
    </div>
  );
}