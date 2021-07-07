import React from 'react';
import PropTypes from 'prop-types';
import { formatRelative } from 'date-fns';
import firebase from 'firebase/app';

const formatDate = date => {
  let formattedDate = '';
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Message = ({
  createdAt = null,
  text = '',
  displayName = '',
  photoURL = '',
  uid = '',
}) => {
  if (!text) return null;
  const classo = (uid === firebase.auth().currentUser.uid) ? 'sent' : 'received';
  const messageClass = uid === firebase.auth().currentUser.uid ? 'flex-row-reverse' : 'flex-row';
  const shift = uid === firebase.auth().currentUser.uid ? 'flex-row-reverse' : '';
  const space = uid === firebase.auth().currentUser.uid ? 'mr-2' : 'ml-2';


  const messageBodyClass = uid === firebase.auth().currentUser.uid ? 'sent-message-bg text-right' : 'received-message-bg';
  const imageClass = uid === firebase.auth().currentUser.uid ? 'ml-2' : 'mr-2';
  console.log(messageClass)
  //
  return (
    <div className={`px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-center ${messageClass} `} >
      {/* for image */}
      {photoURL ? (
        <img
          src={photoURL}
          alt="Avatar"
          className={`rounded-full mr-4 ${imageClass}`}
          width={45}
          height={45}
        />
      ) : null}
      <div className={`block w-80 break-words p-2 rounded-md ${messageBodyClass}`}>
        <div className={`flex items-center mb-1  ${shift}`}>
          {/* for time */}


          {displayName ? (
            <p className="text-primary-500">{displayName}</p>
          ) : null}

          {createdAt?.seconds ? (
            <span className={` ${space} text-gray-500 text-xs`}>
              {formatDate(new Date(createdAt.seconds * 1000))}
            </span>
          ) : null}


        </div>
        <div>{text}</div>
      </div>



    </div>

  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;
