export const post = async (apiUrl: string, data: any) => {
  const host = window.location.origin;

  try {
    return await fetch(`${host}/${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log('Do something here!');
  }
};
