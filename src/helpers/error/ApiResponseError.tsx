
  export const ResponseApiErrors = (res: any, form: any) => {
    console.log(res?.errors)
    if (res?.errors) {
      Object.entries(res.errors).forEach(([field, messages]) => {
        let msg: string = 'Invalid value';
        if (Array.isArray(messages) && messages.length > 0 && typeof messages[0] === 'string') {
          msg = messages[0];
        }
        form.setError(field, {
          type: 'manual',
          message: msg,
        });
      });
    }
  };
  