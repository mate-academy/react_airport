import React from 'react';

export const ErrorPage = () => (
  <div className="container">
    <h3
      style={{
        textAlign: 'center',
        textTransform: 'uppercase',
        opacity: '0.4',
        marginTop: '40px',
      }}
    >
      Oops... Something went wrong here
    </h3>
    <h4
      style={{
        textAlign: 'center',
        opacity: '0.4',
        marginTop: '20px',
      }}
    >
      The link you followed probably broken
    </h4>
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        height: '100%',
        marginTop: '30%',
        fontSize: '10em',
      }}
    >
      404
    </div>
  </div>
);


