import firebase from '../../firebase/firebaseConfig';
import { useState } from 'react';
import '../../sass/main.scss';

function NewProjectBtn({ board, userId }) {
  const [projectName, setProjectName] = useState('');

  const addNewProject = (event) => {
    event.preventDefault();
    firebase
      .firestore()
      .collection(`users/${userId}/projects`)
      .add({
        projectName: projectName.trim(),
        archive: false,
        favourite: false,
        // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: Date.now(),
      })
      .then((ref) => {
        setProjectName('');

        ref
          .collection('columns')
          .add({
            columnName: 'Todo',
            createdAt: Date.now(),
          })
          .then((ref) => {
            ref.collection('tasks').add({
              taskName: 'Be awesome',
              createdAt: Date.now(),
            });
          });

        ref.collection('columns').add({
          columnName: 'In Progress',
          createdAt: Date.now(),
        });

        ref.collection('columns').add({
          columnName: 'Done',
          createdAt: Date.now(),
        });
      });
  };
  return (
    <div className='newProjectBtn'>
      <form
        className='project__form'
        onSubmit={addNewProject}
        autoComplete='off'
      >
        <input
          placeholder='🖍 New Project'
          required
          pattern='^[^\s]+(\s+[^\s]+)*$'
          title='Give a nice and.. normal title 😉'
          className='project__input'
          id='project-name'
          value={projectName}
          type='text'
          onChange={(e) => setProjectName(e.target.value)}
        />
      </form>
    </div>
  );
}

export default NewProjectBtn;
