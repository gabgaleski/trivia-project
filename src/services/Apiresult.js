const urlToken = async () => {
  const link = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(link);
  const data = await response.json();
  // console.log(data.token);
  return data.token;
};

export default urlToken;
