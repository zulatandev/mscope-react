import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

const ErrorPage = ({ isFetchingMe }) => (
  <div className="page">
    <h1>{isFetchingMe ? '...' : 'Error - 404'}</h1>
  </div>
);

ErrorPage.propTypes = {
  isFetchingMe: PropTypes.bool.isRequired
};

const mapStateToProps = store => ({
  isFetchingMe: store.rootReducer.auth.isFetchingMe
});

export default connect(mapStateToProps)(ErrorPage);
