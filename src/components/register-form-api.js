import { CreateRequest, APIConstructor } from '@colorfy-software/apify';
const registerEmail = new CreateRequest('/api/register-form', {
  method: 'POST',
});

const api = APIConstructor(
  { registerEmail },
  {
    //baseUrl: 'https://google.com', // Can define base url
    // Can hook into life-cycle events
    onRequestStart: ({ requestName, params }) => {
      console.log('ON REQUEST START:', { requestName, params });
    },
    onSuccess: ({ requestName, response }) => {
      console.log('ON SUCCESS: ', { requestName, response });
    },
    onError: ({ requestName, error }) => {
      console.log('ON ERROR: ', { requestName, error });
    },
  },
);

export default api;
