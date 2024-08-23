import { Editor as EditorTinymce } from '@tinymce/tinymce-react';

const Editor = ({ value, onChange }) => {

    const handleChange = (editorValue) => {
        onChange(editorValue);
    };
    
    return (
        <EditorTinymce
            onEditorChange={handleChange}
            apiKey="j13ks5nfta7dgljey2ui0nyxdmna6iv6uk9jea5zfntp26vw"
            value={value}
            init={{
            height: 300,
            menubar: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount','image'
            ],
            toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
      />
    )
};

export default Editor;


