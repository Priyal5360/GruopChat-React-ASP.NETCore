import PropTypes from 'prop-types';

function ConnectedUser({ user }) {
    return (
        <div className='user-list'>
            <h4>Connected User</h4>
            {user.map((u, idx) => <h6 key={idx}>{u}</h6>)}
        </div>
  );
}

ConnectedUser.propTypes = {
    user: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ConnectedUser;