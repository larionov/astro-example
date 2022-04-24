export default [
  {
    url: '/api/register-form',
    timeout: 1000,
    method: 'post',
    response: (request) => {
      console.log(request);
      const email = request.body[0].email;

      const res = {
        code: 0,
        result: { email },
        message: 'ok',

        type: 'success',
      };

      if (email.trim().length === 0) {
        res.type = 'failure';
        res.message = 'validate_email_empty';
      } else if (!email.includes('@') || !email.includes('.')) {
        res.type = 'failure';
        res.message = 'message_email_not_valid';
      } else if (email === 'test@test.te') {
        res.type = 'failure';
        res.message = 'message_email_exists';
      }
      return res;
    },
  },
];
