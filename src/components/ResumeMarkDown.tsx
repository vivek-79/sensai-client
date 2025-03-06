
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

const ResumeMarkDown = () => {

    const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  return (
    <div className="text-white">
          <MDEditor
              value={value}
              onChange={setValue}
          />
          <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
    </div>
  )
}

export default ResumeMarkDown