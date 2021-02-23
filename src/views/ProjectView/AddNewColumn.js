import './AddNewColumn.css';
import firebase from 'firebase/app';
import { useState, useEffect, useRef } from 'react';

const AddNewColumn = ({ data }) => {
  const [title, setTitle] = useState('');
  const [currentCollumnContent, setCurrentCollumnContent] = useState({});
  const inputRef = useRef();

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      return <div>Loading...</div>;
    } else {
      const columnsOfUser = data[0].board.project0.projectContent;
      setCurrentCollumnContent(columnsOfUser);
    }
  }, [data]);

  const addNewColumn = () => {
    const id = data[0].id;
    const timeStamp = Date.now();
    const columnId = 'column' + timeStamp;

    if (!title || !title.trim()) {
      return;
    } else {
      firebase
        .firestore()
        .collection('users')
        .doc(id)
        .update({
          'board.project0.projectContent': {
            ...currentCollumnContent,
            [columnId]: {
              columnName: title.trim(),
              columnContent: {},
            },
          },
        });
      inputRef.current.value = '';
    }
  };

  return (
    <div className="new-column">
      <div className="add-column">
        <button onClick={addNewColumn}>➕</button>{' '}
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addNewColumn();
            }
          }}
        />
      </div>
    </div>
  );
};

export default AddNewColumn;
