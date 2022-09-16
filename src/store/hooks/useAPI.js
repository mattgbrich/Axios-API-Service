import { useSelector, useDispatch } from 'react-redux';
// USE AXIOS TO MORE EASILY COMBINE CUSTOM OPTIONS WITH INSTANCE DEFAULTS
import axios from 'axios';
import { setError } from '../actions/notificationsActions';

// USE REACT HOOK FOR OPTIONS TO INTEGRATE EITHER IN REDUX OR COMPONENTS
function useAPI () {
  const dispatch = useDispatch();
  // PULL BASE URL AND ACCESS TOKEN FROM STATE SO IT NEVER NEEDS TO BE PASSED TO METHODS
  const { baseURL } = useSelector(state => state.env);
  const { accessToken } = useSelector(state => state.user);

  // CREATE INSTANCE OF AXIOS SETTING THE BASE URL AND AUTHORIZATION HEADERS FOR ALL HTTP CALLS
  const HTTP = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  /**
   * GENERIC METHOD GENERATOR FOR COMMON CODE
   */
  const createMethod = (url, config, options = {}, method) => {
    const { suppressErrors, customMessageMap } = options;
    // CALL INSTANCE WITHOUT METHOD FOR ABILITY TO ACCESS FULL AXIOS CONFIG IF NEEDED
    return HTTP(url, {...config, method})
      // RETURN RESPONSE DATA AND STATUS FOR ALL CALLS
      .then(response => ({
        data: response.data.data,
        status: response.status
      }))
      // GLOBAL CATCH FOR ALL NON 4xx RESPONSES RECEIVED
      .catch(err => {
        const { status, statusText } = err.response;
        // IF A CUSTOM MESSAGE IS DEFINED USE IT, OTHERWISE USE err.message
        const message = customMessageMap && customMessageMap[status] || err.message;
        const suppressGlobalError = suppressErrors && suppressErrors.includes(status);
        // IF NOT SUPPRESSING GLOBAL ERRORS FOR THIS STATUS DISPATCH TO REDUX TO OPEN THE NOTIFICATION COMPONENT
        if (!suppressGlobalError) {
          dispatch(setError({
            status: `${status}: ${statusText}`,
            message
          }));
        }
        // REJECT AND RETURN THE ERR SO IT CAN OPTIONALLY BE HANDLED DOWNSTREAM
        return Promise.reject(err);
      });
  }

  /**
   * CREATE CONVENIENCE FUNCTIONS TO WRAP COMMON HTTP METHODS
   * @param {String} url The path after baseURL to make the request to
   * @param {Object} [config] May contain any Axios config options to be added to the call
   * @param {Object} [options] Options to suppress notifications or provide custom messages
   * @param {Array}  [options.suppressErrors] Array of statuses to suppress global error notifications for
   * @param {Object} [options.customMessageMap] Map of custom messages - [statusCode]: 'Message'
   */
  const get = (url, config, options) => createMethod(url, config, options, 'GET');
  const post = (url, config, options) => createMethod(url, config, options, 'POST');
  const put = (url, config, options) => createMethod(url, config, options, 'PUT');
  const _delete = (url, config, options) => createMethod(url, config, options, 'DELETE');

  return {
    get,
    post,
    put,
    delete: _delete,
  };
}
 export default useAPI;

